import type { Database, SecurityChallengeAction } from '../types/database.js'
import { nextId } from '../utils/id.js'
import { verifyAndConsume, generateCode } from './verification-code.service.js'

const CHALLENGE_TTL_MS = 5 * 60 * 1000

function ensureSettings(data: Database, userId: string) {
  let settings = data.user_security_settings.find((s) => s.userId === userId)
  if (!settings) {
    const now = new Date().toISOString()
    settings = {
      id: nextId('mfa-setting', data.user_security_settings),
      userId,
      mfaEnabled: false,
      createdAt: now,
      updatedAt: now,
    }
    data.user_security_settings.push(settings)
  }
  return settings
}

function findSettings(data: Database, userId: string) {
  return data.user_security_settings.find((s) => s.userId === userId)
}

function getVerifiedIdentity(data: Database, userId: string, identityId: string) {
  return data.auth_identities.find((item) =>
    item.id === identityId &&
    item.userId === userId &&
    Boolean(item.verifiedAt) &&
    (item.provider === 'email' || item.provider === 'phone'))
}

function getVerifiedIdentities(data: Database, userId: string) {
  return data.auth_identities
    .filter((item) => item.userId === userId && Boolean(item.verifiedAt) && (item.provider === 'email' || item.provider === 'phone'))
    .map((item) => ({
      identityId: item.id,
      method: item.provider as 'email' | 'phone',
      maskedIdentifier: maskIdentifier(item.identifier, item.provider),
      label: item.provider,
    }))
}

export function getMfaStatus(data: Database, userId: string) {
  const settings = findSettings(data, userId)
  const identity = settings?.mfaIdentityId
    ? getVerifiedIdentity(data, userId, settings.mfaIdentityId)
    : undefined
  return {
    enabled: settings?.mfaEnabled ?? false,
    method: settings?.mfaMethod,
    identityId: settings?.mfaIdentityId,
    identityLabel: identity ? maskIdentifier(identity.identifier, identity.provider) : undefined,
    enabledAt: settings?.mfaEnabledAt,
    availableMethods: getVerifiedIdentities(data, userId),
  }
}

export function requestMfaVerificationCode(data: Database, userId: string, method: 'email' | 'phone', identityId: string) {
  const identity = getVerifiedIdentity(data, userId, identityId)
  if (!identity) return 'invalid_identity' as const
  if (identity.provider !== method) return 'invalid_identity' as const
  const result = generateCode(identity.provider, identity.identifier)
  if (typeof result === 'string') return result
  return result
}

export function enableMfa(data: Database, userId: string, method: 'email' | 'phone', identityId: string, code: string) {
  const settings = ensureSettings(data, userId)
  if (settings.mfaEnabled) return 'already_enabled' as const
  const verified = getVerifiedIdentity(data, userId, identityId)
  if (!verified) return 'invalid_identity' as const
  if (verified.provider !== method) return 'invalid_identity' as const
  if (!verifyAndConsume(verified.provider, verified.identifier, code)) return 'invalid_code' as const
  const now = new Date().toISOString()
  settings.mfaEnabled = true
  settings.mfaMethod = verified.provider
  settings.mfaIdentityId = verified.id
  settings.mfaEnabledAt = now
  settings.updatedAt = now
  return getMfaStatus(data, userId)
}

export function disableMfa(data: Database, userId: string, code: string) {
  const settings = findSettings(data, userId)
  if (!settings) return 'not_enabled' as const
  if (!settings.mfaEnabled) return 'not_enabled' as const
  if (!settings.mfaIdentityId) return 'mfa_not_configured' as const
  const identity = getVerifiedIdentity(data, userId, settings.mfaIdentityId)
  if (!identity) return 'identity_gone' as const
  if (!verifyAndConsume(identity.provider, identity.identifier, code)) return 'invalid_code' as const

  const now = new Date().toISOString()
  settings.mfaEnabled = false
  settings.mfaMethod = undefined
  settings.mfaIdentityId = undefined
  settings.mfaEnabledAt = undefined
  settings.updatedAt = now
  return getMfaStatus(data, userId)
}

export function requestSecurityChallengeCode(data: Database, userId: string, action: SecurityChallengeAction) {
  const settings = findSettings(data, userId)
  if (!settings?.mfaEnabled || !settings.mfaIdentityId || !settings.mfaMethod) return 'mfa_not_configured' as const
  const identity = getVerifiedIdentity(data, userId, settings.mfaIdentityId)
  if (!identity) return 'identity_gone' as const
  const result = generateCode(identity.provider, identity.identifier)
  if (typeof result === 'string') return result
  const now = new Date().toISOString()
  settings.lastChallengeAt = now
  settings.updatedAt = now
  data.user_security_challenges.push({
    id: nextId('security-challenge', data.user_security_challenges),
    userId,
    action,
    method: identity.provider as 'email' | 'phone',
    identityId: identity.id,
    status: 'pending',
    expiresAt: result.expiresAt,
    createdAt: now,
    updatedAt: now,
  })
  return { id: result.id, expiresAt: result.expiresAt, maskedIdentifier: maskIdentifier(identity.identifier, identity.provider) }
}

export function verifySecurityChallenge(data: Database, userId: string, action: SecurityChallengeAction, code: string) {
  const settings = findSettings(data, userId)
  if (!settings?.mfaEnabled || !settings.mfaIdentityId || !settings.mfaMethod) return 'mfa_not_configured' as const
  const identity = getVerifiedIdentity(data, userId, settings.mfaIdentityId)
  if (!identity) return 'identity_gone' as const
  if (!verifyAndConsume(identity.provider, identity.identifier, code)) return 'invalid_code' as const
  const now = new Date().toISOString()
  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS).toISOString()
  const challengeToken = `challenge-${nextId('security-token', data.user_security_challenges)}-${Date.now()}`
  const challenge = [...data.user_security_challenges]
    .reverse()
    .find((item) =>
      item.userId === userId &&
      item.action === action &&
      item.identityId === identity.id &&
      item.status === 'pending' &&
      new Date(item.expiresAt).getTime() >= Date.now())
  if (challenge) {
    challenge.status = 'verified'
    challenge.challengeToken = challengeToken
    challenge.expiresAt = expiresAt
    challenge.verifiedAt = now
    challenge.updatedAt = now
  } else {
    data.user_security_challenges.push({
      id: nextId('security-challenge', data.user_security_challenges),
      userId,
      action,
      method: identity.provider as 'email' | 'phone',
      identityId: identity.id,
      status: 'verified',
      challengeToken,
      expiresAt,
      verifiedAt: now,
      createdAt: now,
      updatedAt: now,
    })
  }
  return { challengeToken, expiresAt }
}

export function consumeSecurityChallenge(
  data: Database,
  userId: string,
  action: SecurityChallengeAction,
  challengeToken?: string,
) {
  const settings = findSettings(data, userId)
  if (!settings?.mfaEnabled) return true
  if (!challengeToken) return 'challenge_required' as const

  const now = new Date()
  const challenge = data.user_security_challenges.find((item) =>
    item.userId === userId &&
    item.action === action &&
    item.challengeToken === challengeToken)
  if (!challenge) return 'invalid_challenge' as const
  if (challenge.status !== 'verified') return 'invalid_challenge' as const
  if (new Date(challenge.expiresAt).getTime() < now.getTime()) {
    challenge.status = 'expired'
    challenge.updatedAt = now.toISOString()
    return 'invalid_challenge' as const
  }

  const consumedAt = now.toISOString()
  challenge.status = 'consumed'
  challenge.consumedAt = consumedAt
  challenge.updatedAt = consumedAt
  return true
}

function maskIdentifier(identifier: string, provider: string): string {
  if (provider === 'email') {
    const [name, domain] = identifier.split('@')
    return `${name.slice(0, 2)}***@${domain}`
  }
  return `***${identifier.slice(-4)}`
}
