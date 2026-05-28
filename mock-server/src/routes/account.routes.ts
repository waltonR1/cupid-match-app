import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import {
  archiveAccountProfile,
  changeAccountPassword,
  getAccountDashboard,
  getIntroductionContact,
  getAccountEvents,
  getAccountFavorites,
  getAccountIntroductions,
  getAccountMe,
  getAccountMembership,
  getAccountProfileDetail,
  getAccountProfiles,
  getAccountSettings,
  saveAccountProfileDetail,
  updateAccountMe,
  updateAccountPreferences,
  updateAccountProfilePrivacyPreferences,
  requestAccountMembershipUpgrade,
} from '../services/account.service.js'
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

export async function registerAccountRoutes(app: FastifyInstance): Promise<void> {
  app.get('/account/me', async (request, reply) => readAccount(request, reply, getAccountMe))
  app.post('/account/me', async (request, reply) => {
    const userId = requireUser(request, reply)
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
    const userId = requireUser(request, reply)
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
    const userId = requireUser(request, reply)
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
    const userId = requireUser(request, reply)
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
  app.get('/account/events', async (request, reply) => readCollection(request, reply, getAccountEvents))
  app.get('/account/favorites', async (request, reply) => readCollection(request, reply, getAccountFavorites))
  app.get('/account/private-introductions', async (request, reply) => readCollection(request, reply, getAccountIntroductions))
  app.get('/account/private-introductions/:requestId/contact', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    const { requestId } = request.params as { requestId: string }
    const result = getIntroductionContact(getDb().data, userId, requestId)
    return result
  })
  app.get('/account/settings', async (request, reply) => readAccount(request, reply, getAccountSettings))
  app.post('/account/settings/preferences', async (request, reply) => mutateAccount(request, reply, (db, userId) =>
    updateAccountPreferences(db.data, userId, request.body as never)))
  app.post('/account/password/change', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    const db = getDb()
    const result = changeAccountPassword(db.data, userId, request.body as { currentPassword: string; newPassword: string })
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    if (result === 'incorrect_current_password') return reply.code(400).send({ error: 'Current password is incorrect' })
    if (result === 'invalid_password') return reply.code(400).send({ error: 'Invalid new password' })
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
  const userId = requireUser(request, reply)
  if (!userId) return
  const db = getDb()
  const result = mutate(db, userId)
  if (!result) return reply.code(404).send({ error: 'Account not found' })
  await db.write()
  return result
}
