import type {DbInstance} from '../db.js'
import type {
  AuthIdentityRecord,
  Database,
  UserMembershipRecord,
  UserRecord,
} from '../types/database.js'
import {nextId} from '../utils/id.js'
import {mockHashPassword} from '../utils/password.js'
import {getString} from '../utils/string.js'
import {upsertAgreementAcceptances} from './legal.service.js'
import {generateCode, verifyAndConsume} from './verification-code.service.js'

const PASSWORD_MIN = 8

type PreferredLocale = 'zh' | 'fr' | 'en'
type RegisterProvider = 'email' | 'phone'
type RegisterPath = 'self' | 'family'

export interface AuthSession {
  token: string
  user: {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: PreferredLocale
    status: UserRecord['status']
  }
  membership: {
    tier: UserMembershipRecord['tier']
    status: UserMembershipRecord['status']
  } | null
}

export interface RegisterResult {
  statusCode: 201
  body: AuthSession
}

export interface ServiceErrorResult {
  statusCode: 400 | 401 | 409
  body: { error: string }
}

export function requestRegistrationVerificationCode(data: Database, body: Record<string, unknown>) {
  const provider = getString(body.provider)
  const identifier = getString(body.identifier).trim()

  if (!isRegisterProvider(provider) || !identifier) {
    return {
      statusCode: 400,
      body: { error: 'Invalid verification request' },
    } as const
  }

  if (!isValidIdentifierForProvider(provider, identifier)) {
    return {
      statusCode: 400,
      body: { error: 'Invalid identifier format' },
    } as const
  }

  const duplicate = data.auth_identities.find((item) => item.provider === provider && item.identifier === identifier)
  if (duplicate) {
    return {
      statusCode: 409,
      body: { error: 'Account already exists' },
    } as const
  }

  const result = generateCode(provider, identifier)
  if (result === 'invalid_provider' || result === 'invalid_identifier') {
    return {
      statusCode: 400,
      body: { error: 'Invalid verification request' },
    } as const
  }

  return {
    statusCode: 200,
    body: result,
  } as const
}

export function login(data: Database, body: Record<string, unknown>): AuthSession | null {
  const identifier = getString(body.identifier).trim()
  const password = getString(body.password)
  const authIdentity = data.auth_identities.find((item) => item.identifier === identifier)

  if (!authIdentity || !isPasswordMatch(authIdentity, password)) {
    return null
  }

  const user = data.users.find((item) => item.id === authIdentity.userId)
  if (!user) return null

  if (user.status === 'deactivated') {
    user.status = 'active'
    user.updatedAt = new Date().toISOString()
  }

  upsertAgreementAcceptances(data, user.id, new Date().toISOString())
  return buildSession(data, authIdentity, user)
}

export async function register(
  db: DbInstance,
  body: Record<string, unknown>,
): Promise<RegisterResult | ServiceErrorResult> {
  const path = getString(body.path)
  const provider = getString(body.provider)
  const identifier = getString(body.identifier).trim()
  const code = getString(body.code)
  const password = getString(body.password)
  const accountName = getString(body.accountName)
  const preferredLocale = getString(body.preferredLocale)

  if (!isOnboardingPath(path) || !isRegisterProvider(provider) || !identifier || !code || !password || !accountName || !isPreferredLocale(preferredLocale)) {
    return {
      statusCode: 400,
      body: { error: 'Missing required registration fields' },
    }
  }

  if (!isValidIdentifierForProvider(provider, identifier)) {
    return {
      statusCode: 400,
      body: { error: 'Invalid identifier format' },
    }
  }

  if (!isValidPassword(password)) {
    return {
      statusCode: 400,
      body: { error: 'Password must be at least 8 characters with letters and digits' },
    }
  }

  if (accountName.trim().length === 0 || accountName.trim().length > 30) {
    return {
      statusCode: 400,
      body: { error: 'Account name must be 1-30 characters' },
    }
  }

  const duplicate = db.data.auth_identities.find((item) => item.provider === provider && item.identifier === identifier)
  if (duplicate) {
    return {
      statusCode: 409,
      body: { error: 'Account already exists' },
    }
  }

  if (!verifyAndConsume(provider, identifier, code)) {
    return {
      statusCode: 400,
      body: { error: 'Invalid or expired verification code' },
    }
  }

  const userId = nextId('u', db.data.users)
  const now = new Date().toISOString()

  const newUser: UserRecord = {
    id: userId,
    accountName: accountName.trim(),
    avatarUrl: '',
    preferredLocale,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  }

  const authId = nextId('auth', db.data.auth_identities)
  const newAuthIdentity: AuthIdentityRecord = {
    id: authId,
    userId,
    provider,
    identifier,
    passwordHash: mockHashPassword(password),
    verifiedAt: now,
    createdAt: now,
    updatedAt: now,
  }

  const membership: UserMembershipRecord = {
    id: nextId('user-membership', db.data.user_memberships),
    userId,
    planId: 'plan-free',
    tier: 'free',
    status: 'active',
    startedAt: now.slice(0, 10),
    createdAt: now,
    updatedAt: now,
  }

  db.data.users.push(newUser)
  db.data.auth_identities.push(newAuthIdentity)
  db.data.user_memberships.push(membership)
  db.data.user_preferences.push({
    id: nextId('preference', db.data.user_preferences),
    userId,
    preferredCity: '',
    preferredContactChannel: 'email',
    staffContactEnabled: true,
    familyAssistEnabled: true,
    introductionUpdatesEnabled: true,
    eventRemindersEnabled: true,
    serviceAnnouncementsEnabled: true,
    marketingEmailsEnabled: false,
    analyticsConsentEnabled: false,
    createdAt: now,
    updatedAt: now,
  })
  upsertAgreementAcceptances(db.data, userId, now)
  await db.write()

  return {
    statusCode: 201,
    body: buildSession(db.data, newAuthIdentity, newUser),
  }
}

function buildSession(data: Database, authIdentity: AuthIdentityRecord, user: UserRecord): AuthSession {
  const membership = data.user_memberships.find((item) => item.userId === user.id && item.status === 'active') ?? null

  return {
    token: `mock-token-${authIdentity.id}`,
    user: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl || '',
      preferredLocale: user.preferredLocale,
      status: user.status,
    },
    membership: membership ? {
      tier: membership.tier,
      status: membership.status,
    } : null,
  }
}

function isPasswordMatch(authIdentity: AuthIdentityRecord, password: string): boolean {
  return authIdentity.passwordHash === mockHashPassword(password)
}

function isOnboardingPath(value: string): value is RegisterPath {
  return value === 'self' || value === 'family'
}

function isRegisterProvider(value: string): value is RegisterProvider {
  return value === 'email' || value === 'phone'
}

function isValidIdentifierForProvider(provider: RegisterProvider, value: string): boolean {
  return provider === 'email' ? isEmailIdentifier(value) : isPhoneIdentifier(value)
}

function isEmailIdentifier(value: string): boolean {
  const trimmed = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

function isPhoneIdentifier(value: string): boolean {
  return /^\+?[1-9]\d{6,14}$/.test(value.trim().replace(/[\s-]/g, ''))
}

function isValidPassword(value: string): boolean {
  return value.length >= PASSWORD_MIN && /[a-zA-Z]/.test(value) && /[0-9]/.test(value)
}

export function requestPasswordResetCode(data: Database, body: Record<string, unknown>) {
  const provider = getString(body.provider)
  const identifier = getString(body.identifier).trim()

  if (!isRegisterProvider(provider) || !identifier) {
    return {
      statusCode: 400,
      body: { error: 'Invalid verification request' },
    } as const
  }

  if (!isValidIdentifierForProvider(provider, identifier)) {
    return {
      statusCode: 400,
      body: { error: 'Invalid identifier format' },
    } as const
  }

  const identity = data.auth_identities.find(
    (item) => item.provider === provider && item.identifier === identifier,
  )
  if (!identity) {
    return {
      statusCode: 404,
      body: { error: 'Identity not found' },
    } as const
  }

  const result = generateCode(provider, identifier)
  if (result === 'invalid_provider' || result === 'invalid_identifier') {
    return {
      statusCode: 400,
      body: { error: 'Invalid verification request' },
    } as const
  }

  return {
    statusCode: 200,
    body: result,
  } as const
}

export function resetPassword(data: Database, body: Record<string, unknown>) {
  const provider = getString(body.provider)
  const identifier = getString(body.identifier).trim()
  const code = getString(body.code)
  const newPassword = getString(body.newPassword)

  if (!isRegisterProvider(provider) || !identifier || !code || !newPassword) {
    return {
      statusCode: 400,
      body: { error: 'Missing required fields' },
    } as const
  }

  if (!isValidPassword(newPassword)) {
    return {
      statusCode: 400,
      body: { error: 'Password must be at least 8 characters with letters and digits' },
    } as const
  }

  const identity = data.auth_identities.find(
    (item) => item.provider === provider && item.identifier === identifier,
  )
  if (!identity) {
    return {
      statusCode: 404,
      body: { error: 'Identity not found' },
    } as const
  }

  if (!verifyAndConsume(provider, identifier, code)) {
    return {
      statusCode: 400,
      body: { error: 'Invalid or expired verification code' },
    } as const
  }

  identity.passwordHash = mockHashPassword(newPassword)
  identity.updatedAt = new Date().toISOString()

  return {
    statusCode: 200,
    body: { success: true },
  } as const
}

function isPreferredLocale(value: string): value is PreferredLocale {
  return value === 'zh' || value === 'fr' || value === 'en'
}
