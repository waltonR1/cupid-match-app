import type { DbInstance } from '../db.js'
import type { AuthIdentityRecord, Database, MembershipRecord, OnboardingPath, UserRecord } from '../types/database.js'
import { nextId } from '../utils/id.js'
import { localized } from '../utils/localized.js'
import { getString } from '../utils/string.js'

const PASSWORD_MIN = 8

export interface AuthSession {
  token: string
  user: {
    id: string
    accountName: string
    avatarUrl: string
    onboardingPath: OnboardingPath
    onboardingStep: 'create_profile' | 'review_profile' | 'browse'
  }
}

export interface RegisterResult {
  statusCode: 201
  body: AuthSession
}

export interface ServiceErrorResult {
  statusCode: 400 | 401 | 409
  body: { error: string }
}

export function login(data: Database, body: Record<string, unknown>): AuthSession | null {
  const identifier = getString(body.identifier).trim()
  const password = getString(body.password)
  const authIdentity = data.auth_identities.find((item) => item.identifier === identifier)

  if (!authIdentity || authIdentity.password !== password) {
    return null
  }

  const user = data.users.find((item) => item.id === authIdentity.userId)
  if (!user) return null

  return buildSession(authIdentity, user)
}

export async function register(
  db: DbInstance,
  body: Record<string, unknown>,
): Promise<RegisterResult | ServiceErrorResult> {
  const path = getString(body.path)
  const provider = getString(body.provider)
  const identifier = getString(body.identifier).trim()
  const password = getString(body.password)
  const accountName = getString(body.accountName)
  const city = getString(body.city)
  const preferredLocale = getString(body.preferredLocale)

  if (!isOnboardingPath(path) || !isAuthProvider(provider) || !identifier || !password || !accountName || !city || !isPreferredLocale(preferredLocale)) {
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

  const duplicate = db.data.auth_identities.find((item) => item.identifier === identifier)
  if (duplicate) {
    return {
      statusCode: 409,
      body: { error: 'Account already exists' },
    }
  }

  const userId = nextId('u', db.data.users)
  const cityName = city.trim()
  const now = new Date().toISOString()

  const newUser: UserRecord = {
    id: userId,
    accountName: accountName.trim(),
    avatarUrl: '',
    city: localized(cityName, cityName, cityName),
    preferredLocale,
    status: 'active',
    onboardingPath: path as OnboardingPath,
    onboardingStep: 'create_profile',
    createdAt: now,
    updatedAt: now,
  }

  const authId = nextId('auth', db.data.auth_identities)
  const newAuthIdentity: AuthIdentityRecord = {
    id: authId,
    userId,
    provider: provider as AuthIdentityRecord['provider'],
    identifier,
    password,
    createdAt: now,
  }

  const membershipId = nextId('membership', db.data.memberships)
  const newMembership: MembershipRecord = {
    id: membershipId,
    userId,
    tier: 'free',
    startedAt: now.slice(0, 10),
  }

  db.data.users.push(newUser)
  db.data.auth_identities.push(newAuthIdentity)
  db.data.memberships.push(newMembership)
  await db.write()

  return {
    statusCode: 201,
    body: buildSession(newAuthIdentity, newUser),
  }
}

function buildSession(authIdentity: AuthIdentityRecord, user: UserRecord): AuthSession {
  return {
    token: `mock-token-${authIdentity.id}`,
    user: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl || '',
      onboardingPath: user.onboardingPath,
      onboardingStep: user.onboardingStep,
    },
  }
}

function isOnboardingPath(value: string): value is OnboardingPath {
  return value === 'self' || value === 'family'
}

function isAuthProvider(value: string): value is AuthIdentityRecord['provider'] {
  return value === 'email' || value === 'phone' || value === 'wechat'
}

function isValidIdentifierForProvider(provider: AuthIdentityRecord['provider'], value: string): boolean {
  if (provider === 'wechat') {
    return value.trim().length > 0
  }

  if (provider === 'email') {
    return isEmailIdentifier(value)
  }

  return isPhoneIdentifier(value)
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

function isPreferredLocale(value: string): value is 'zh' | 'fr' | 'en' {
  return value === 'zh' || value === 'fr' || value === 'en'
}
