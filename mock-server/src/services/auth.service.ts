import type { DbInstance } from '../db.js'
import type { AuthIdentityRecord, Database, MembershipRecord, UserRecord } from '../types/database.js'
import type { RegisterRole } from '../types/profile.js'
import { nextId } from '../utils/id.js'
import { localized } from '../utils/localized.js'
import { getString } from '../utils/string.js'

export interface AuthSession {
  token: string
  user: {
    id: string
    displayName: string
    avatarUrl: string
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
  const identity = getString(body.identity)
  const password = getString(body.password)
  const authIdentity = data.auth_identities.find((item) => item.identity === identity || item.email === identity)

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
  const role = getString(body.role)
  const email = getString(body.email)
  const password = getString(body.password)
  const nickName = getString(body.nickName)
  const city = getString(body.city)

  if (!isRegisterRole(role) || !email || !password || !nickName) {
    return {
      statusCode: 400,
      body: { error: 'Missing required registration fields' },
    }
  }

  const duplicate = db.data.auth_identities.find((item) => item.email === email || item.identity === email)
  if (duplicate) {
    return {
      statusCode: 409,
      body: { error: 'Account already exists' },
    }
  }

  const userId = nextId('u', db.data.users)
  const cityName = city || 'Paris'
  const now = new Date().toISOString().slice(0, 10)

  const newUser: UserRecord = {
    id: userId,
    role,
    displayName: nickName,
    avatarUrl: '',
    city: localized(cityName, cityName, cityName),
    createdAt: now,
    bio: localized('新注册用户。', 'Nouvel utilisateur inscrit.', 'Newly registered user.'),
    profileCompletion: 0,
    language: 'zh',
  }

  const authId = nextId('auth', db.data.auth_identities)
  const newAuthIdentity: AuthIdentityRecord = {
    id: authId,
    userId,
    authType: 'email',
    identity: email,
    email,
    password,
    createdAt: now,
  }

  const membershipId = nextId('membership', db.data.memberships)
  const newMembership: MembershipRecord = {
    id: membershipId,
    userId,
    tier: 'free',
    startedAt: now,
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
      displayName: user.displayName,
      avatarUrl: user.avatarUrl || '',
    },
  }
}

function isRegisterRole(value: string): value is RegisterRole {
  return value === 'self' || value === 'parent'
}
