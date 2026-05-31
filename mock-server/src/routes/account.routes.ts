import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import {
  addFavorite,
  archiveAccountProfile,
  bindIdentity,
  changeAccountPassword,
  deactivateAccount,
  exportAccountData,
  getAccountDashboard,
  getIntroductionContact,
  removeFavorite,
  getAccountEvents,
  getAccountFavorites,
  getAccountIntroductions,
  getAccountMe,
  getAccountMembership,
  getAccountProfileDetail,
  getAccountProfiles,
  getAccountSettings,
  saveAccountProfileDetail,
  unbindIdentity,
  updateAccountMe,
  updateAccountPreferences,
  updateAccountProfilePrivacyPreferences,
  requestAccountMembershipUpgrade,
  requestIdentityVerificationCode,
} from '../services/account.service.js'
import {
  consumeSecurityChallenge,
  disableMfa,
  enableMfa,
  getMfaStatus,
  requestMfaVerificationCode,
  requestSecurityChallengeCode,
  verifySecurityChallenge,
} from '../services/mfa.service.js'
import type { QueryRecord } from '../types/common.js'
import { resolveApiLocale } from '../utils/localized.js'
import { resolveUserIdHeader } from '../utils/request.js'

function requireUser(request: any, reply: any) {
  const userId = resolveUserIdHeader(request.headers['x-user-id'])
  if (!userId) {
    reply.code(400).send({ error: 'X-User-Id header is required' })
    return null
  }
  return userId
}

function isSecurityChallengeAction(value: unknown): value is 'change_password' | 'deactivate_account' | 'export_data' | 'unbind_identity' {
  return value === 'change_password' || value === 'deactivate_account' || value === 'export_data' || value === 'unbind_identity'
}

export async function registerAccountRoutes(app: FastifyInstance): Promise<void> {
  app.get('/account/me', async (request, reply) => readAccount(request, reply, getAccountMe))
  app.post('/account/me', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const db = getDb()
    const result = updateAccountMe(db.data, userId, request.body as never)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    if (result === 'invalid_payload') return reply.code(400).send({ error: 'Invalid account payload' })
    await db.write()
    return result
  })
  app.get('/account/dashboard', async (request, reply) => readAccount(request, reply, getAccountDashboard))
  app.get('/account/profiles', async (request, reply) => readAccount(request, reply, getAccountProfiles))
  app.post('/account/profiles/save', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const db = getDb()
    const result = saveAccountProfileDetail(db.data, userId, resolveApiLocale((request.query as QueryRecord).lang), request.body as never)
    if (!result) return reply.code(404).send({ error: 'Profile not found' })
    if (result === 'invalid_payload') return reply.code(400).send({ error: 'Invalid profile payload' })
    if (result === 'duplicate_self') return reply.code(409).send({ error: 'You already have a self profile' })
    if (result === 'forbidden') return reply.code(403).send({ error: 'Profile is read only' })
    await db.write()
    return reply.code((request.body as { profileId?: string })?.profileId ? 200 : 201).send(result)
  })
  app.get('/account/profiles/:profileId', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    const result = getAccountProfileDetail(
      getDb().data,
      userId,
      (request.params as { profileId: string }).profileId,
      resolveApiLocale((request.query as QueryRecord).lang),
    )
    if (!result) return reply.code(404).send({ error: 'Profile not found' })
    return result
  })
  app.post('/account/profiles/:profileId/privacy-preferences', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { profileId } = request.params as { profileId: string }
    const db = getDb()
    const result = updateAccountProfilePrivacyPreferences(db.data, userId, profileId, request.body as never)
    if (!result) return reply.code(404).send({ error: 'Profile not found' })
    if (result === 'forbidden') return reply.code(403).send({ error: 'Profile is read only' })
    await db.write()
    return result
  })
  app.post('/account/profiles/:profileId/archive', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { profileId } = request.params as { profileId: string }
    const db = getDb()
    const result = archiveAccountProfile(db.data, userId, profileId)
    if (result.status === 'not_found') return reply.code(404).send({ error: 'Profile not found' })
    if (result.status === 'forbidden') return reply.code(403).send({ error: 'Only profile owners can archive profiles' })
    if (result.status === 'already_archived') return reply.code(409).send({ error: 'Profile is already archived' })
    if (result.status === 'active_flow') return reply.code(409).send({ error: 'Profile has active formal relationship flows' })
    if (result.status !== 'archived') return reply.code(500).send({ error: 'Unexpected archive result' })
    await db.write()
    return result.result
  })
  app.get('/account/membership', async (request, reply) => readAccount(request, reply, getAccountMembership))
  app.post('/account/membership/upgrade', async (request, reply) => mutateAccount(request, reply, (db, userId) =>
    requestAccountMembershipUpgrade(db.data, userId, (request.body as { tier: 'free' | 'silver' | 'gold' | 'diamond' }).tier)))
  app.get('/membership/plans', async (request, reply) => {
    const lang = (request.query as Record<string, string>).lang || 'zh'
    const locale = lang === 'fr' || lang === 'en' ? lang : 'zh'
    const { resolveLocalizedText } = await import('../utils/localized.js')
    return getDb().data.membership_plans
      .filter((p) => p.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) => ({
        id: p.id,
        tier: p.tier,
        name: resolveLocalizedText(locale, p.name),
        description: resolveLocalizedText(locale, p.description),
        priceCents: p.priceCents,
        currency: p.currency,
        billingPeriod: p.billingPeriod,
        privateIntroductionQuota: p.privateIntroductionQuota,
        privateIntroductionPeriod: p.privateIntroductionPeriod,
        eventPriorityEnabled: p.eventPriorityEnabled,
        staffReviewEnabled: p.staffReviewEnabled,
        profileDetailAccessLevel: p.profileDetailAccessLevel,
        conciergePriority: p.conciergePriority,
        staffSupportLevel: p.staffSupportLevel,
        sortOrder: p.sortOrder,
        featured: p.featured,
      }))
  })
  app.get('/account/events', async (request, reply) => readCollection(request, reply, getAccountEvents))
  app.get('/account/favorites', async (request, reply) => readCollection(request, reply, getAccountFavorites))
  app.post('/favorites/:profileId', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { profileId } = request.params as { profileId: string }
    const db = getDb()
    const result = addFavorite(db.data, userId, profileId)
    if (result === 'unavailable') return reply.code(400).send({ error: 'Profile is not available for favorites' })
    if (result === 'own_profile') return reply.code(400).send({ error: 'Cannot favorite your own profile' })
    await db.write()
    return result
  })
  app.delete('/favorites/:profileId', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { profileId } = request.params as { profileId: string }
    const db = getDb()
    const result = removeFavorite(db.data, userId, profileId)
    await db.write()
    return result
  })
  app.get('/account/private-introductions', async (request, reply) => readCollection(request, reply, getAccountIntroductions))
  app.get('/account/private-introductions/:requestId/contact', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    const { requestId } = request.params as { requestId: string }
    const result = getIntroductionContact(getDb().data, userId, requestId)
    return result
  })
  app.post('/account/export', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { challengeToken } = (request.body || {}) as { challengeToken?: string }
    const db = getDb()
    const challenge = consumeSecurityChallenge(db.data, userId, 'export_data', challengeToken)
    if (challenge === 'challenge_required') return reply.code(403).send({ error: 'Security challenge is required' })
    if (challenge === 'invalid_challenge') return reply.code(403).send({ error: 'Security challenge is invalid or expired' })
    const result = exportAccountData(db.data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    await db.write()
    return { status: 'generated', downloadUrl: '/account/export/download' }
  })
  app.get('/account/export/download', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const result = exportAccountData(getDb().data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    return reply
      .header('Content-Type', 'application/json')
      .header('Content-Disposition', `attachment; filename="account-export.json"`)
      .send(JSON.stringify(result, null, 2))
  })
  app.get('/account/settings', async (request, reply) => readAccount(request, reply, getAccountSettings))
  app.post('/account/settings/preferences', async (request, reply) => mutateAccount(request, reply, (db, userId) =>
    updateAccountPreferences(db.data, userId, request.body as never)))
  app.post('/account/password/change', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const db = getDb()
    const { challengeToken } = (request.body || {}) as { challengeToken?: string }
    const challenge = consumeSecurityChallenge(db.data, userId, 'change_password', challengeToken)
    if (challenge === 'challenge_required') return reply.code(403).send({ error: 'Security challenge is required' })
    if (challenge === 'invalid_challenge') return reply.code(403).send({ error: 'Security challenge is invalid or expired' })
    const result = changeAccountPassword(db.data, userId, request.body as { currentPassword: string; newPassword: string })
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    if (result === 'incorrect_current_password') return reply.code(400).send({ error: 'Current password is incorrect' })
    if (result === 'invalid_password') return reply.code(400).send({ error: 'Invalid new password' })
    await db.write()
    return result
  })
  app.post('/account/deactivate', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const db = getDb()
    const { challengeToken } = (request.body || {}) as { challengeToken?: string }
    const challenge = consumeSecurityChallenge(db.data, userId, 'deactivate_account', challengeToken)
    if (challenge === 'challenge_required') return reply.code(403).send({ error: 'Security challenge is required' })
    if (challenge === 'invalid_challenge') return reply.code(403).send({ error: 'Security challenge is invalid or expired' })
    const result = deactivateAccount(db.data, userId)
    if (result === 'not_found') return reply.code(404).send({ error: 'Account not found' })
    if (result === 'not_active') return reply.code(400).send({ error: 'Account is not active' })
    await db.write()
    return result
  })
  app.post('/account/identities/verification-code', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { provider, identifier } = (request.body || {}) as { provider?: string; identifier?: string }
    const result = requestIdentityVerificationCode(getDb().data, userId, provider || '', identifier || '')
    if (result === 'invalid_provider') return reply.code(400).send({ error: 'Invalid provider' })
    if (result === 'invalid_identifier') return reply.code(400).send({ error: 'Invalid identifier' })
    if (result === 'duplicate') return reply.code(409).send({ error: 'Identity already exists' })
    if (result === 'no_login_identity') return reply.code(400).send({ error: 'No usable login identity' })
    return result
  })
  app.post('/account/identities', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { provider, identifier, code } = (request.body || {}) as { provider?: string; identifier?: string; code?: string }
    const db = getDb()
    const result = bindIdentity(db.data, userId, provider || '', identifier || '', code || '')
    if (result === 'invalid_provider') return reply.code(400).send({ error: 'Invalid provider' })
    if (result === 'invalid_identifier') return reply.code(400).send({ error: 'Invalid identifier' })
    if (result === 'invalid_code') return reply.code(400).send({ error: 'Invalid or expired verification code' })
    if (result === 'duplicate') return reply.code(409).send({ error: 'Identity already exists' })
    if (result === 'no_login_identity') return reply.code(400).send({ error: 'No usable login identity' })
    await db.write()
    return reply.code(201).send(result)
  })
  app.delete('/account/identities/:id', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { id } = request.params as { id: string }
    const db = getDb()
    const { challengeToken } = (request.body || {}) as { challengeToken?: string }
    const challenge = consumeSecurityChallenge(db.data, userId, 'unbind_identity', challengeToken)
    if (challenge === 'challenge_required') return reply.code(403).send({ error: 'Security challenge is required' })
    if (challenge === 'invalid_challenge') return reply.code(403).send({ error: 'Security challenge is invalid or expired' })
    const result = unbindIdentity(db.data, userId, id)
    if (result === 'not_found') return reply.code(404).send({ error: 'Identity not found' })
    if (result === 'last_identity') return reply.code(400).send({ error: 'Cannot remove the last identity' })
    if (result === 'mfa_identity') return reply.code(400).send({ error: 'Cannot remove the current MFA identity' })
    await db.write()
    return result
  })
  app.get('/account/mfa/status', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    return getMfaStatus(getDb().data, userId)
  })
  app.post('/account/mfa/enable', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { method, identityId, code } = (request.body || {}) as { method?: 'email' | 'phone'; identityId?: string; code?: string }
    const db = getDb()
    const result = enableMfa(db.data, userId, method || 'email', identityId || '', code || '')
    if (result === 'already_enabled') return reply.code(409).send({ error: 'MFA is already enabled' })
    if (result === 'invalid_identity') return reply.code(400).send({ error: 'Invalid or unverified identity' })
    if (result === 'invalid_code') return reply.code(400).send({ error: 'Invalid verification code' })
    await db.write()
    return result
  })
  app.post('/account/mfa/verification-code', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { method, identityId } = (request.body || {}) as { method?: 'email' | 'phone'; identityId?: string }
    const result = requestMfaVerificationCode(getDb().data, userId, method || 'email', identityId || '')
    if (result === 'invalid_identity') return reply.code(400).send({ error: 'Invalid or unverified identity' })
    if (result === 'invalid_provider') return reply.code(400).send({ error: 'Invalid provider' })
    if (result === 'invalid_identifier') return reply.code(400).send({ error: 'Invalid identifier' })
    return result
  })
  app.post('/account/mfa/disable', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { code } = (request.body || {}) as { code?: string }
    const db = getDb()
    const result = disableMfa(db.data, userId, code || '')
    if (result === 'not_enabled') return reply.code(400).send({ error: 'MFA is not enabled' })
    if (result === 'mfa_not_configured') return reply.code(400).send({ error: 'MFA is not configured' })
    if (result === 'identity_gone') return reply.code(400).send({ error: 'MFA identity no longer exists' })
    if (result === 'invalid_code') return reply.code(400).send({ error: 'Invalid verification code' })
    await db.write()
    return result
  })
  app.post('/account/security/challenge-code', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { action } = (request.body || {}) as { action?: unknown }
    if (!isSecurityChallengeAction(action)) return reply.code(400).send({ error: 'Invalid security challenge action' })
    const db = getDb()
    const result = requestSecurityChallengeCode(db.data, userId, action)
    if (result === 'mfa_not_configured') return reply.code(400).send({ error: 'MFA is not configured' })
    if (result === 'identity_gone') return reply.code(400).send({ error: 'MFA identity no longer exists' })
    if (result === 'invalid_provider') return reply.code(400).send({ error: 'Invalid provider' })
    if (result === 'invalid_identifier') return reply.code(400).send({ error: 'Invalid identifier' })
    await db.write()
    return result
  })
  app.post('/account/security/challenge', async (request, reply) => {
    const userId = requireActiveUser(request, reply)
    if (!userId) return
    const { action, code } = (request.body || {}) as { action?: unknown; code?: string }
    if (!isSecurityChallengeAction(action)) return reply.code(400).send({ error: 'Invalid security challenge action' })
    const db = getDb()
    const result = verifySecurityChallenge(db.data, userId, action, code || '')
    if (result === 'mfa_not_configured') return reply.code(400).send({ error: 'MFA is not configured' })
    if (result === 'identity_gone') return reply.code(400).send({ error: 'MFA identity no longer exists' })
    if (result === 'invalid_code') return reply.code(400).send({ error: 'Invalid verification code' })
    await db.write()
    return result
  })
}

async function readAccount(request: any, reply: any, read: (data: any, userId: string) => unknown) {
  const userId = requireUser(request, reply)
  if (!userId) return
  const result = read(getDb().data, userId)
  if (!result) return reply.code(404).send({ error: 'Account not found' })
  return result
}

async function readCollection(request: any, reply: any, read: (data: any, userId: string) => unknown) {
  const userId = requireUser(request, reply)
  if (!userId) return
  return read(getDb().data, userId)
}

async function mutateAccount(request: any, reply: any, mutate: (db: ReturnType<typeof getDb>, userId: string) => unknown) {
  const userId = requireActiveUser(request, reply)
  if (!userId) return
  const db = getDb()
  const result = mutate(db, userId)
  if (!result) return reply.code(404).send({ error: 'Account not found' })
  await db.write()
  return result
}

function requireActiveUser(request: any, reply: any) {
  const userId = requireUser(request, reply)
  if (!userId) return null

  const user = getDb().data.users.find((item) => item.id === userId)
  if (!user) {
    reply.code(404).send({ error: 'Account not found' })
    return null
  }

  if (user.status !== 'active') {
    reply.code(403).send({ error: 'Account is not active' })
    return null
  }

  return userId
}
