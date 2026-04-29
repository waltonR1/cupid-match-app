import type { DbInstance } from '../db.js'
import type { AccountRecord, AuthUserRecord, Database } from '../types/database.js'
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

export function login(authUsers: AuthUserRecord[], body: Record<string, unknown>): AuthSession | null {
  const identity = getString(body.identity)
  const password = getString(body.password)
  const authUser = authUsers.find((item) => item.identity === identity || item.email === identity)

  if (!authUser || authUser.password !== password) {
    return null
  }

  return buildSession(authUser)
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

  const duplicate = db.data.auth_users.find((item) => item.email === email || item.identity === email)
  if (duplicate) {
    return {
      statusCode: 409,
      body: { error: 'Account already exists' },
    }
  }

  const accountId = nextId('u', db.data.accounts)
  const authId = nextId('auth', db.data.auth_users)
  const cityName = city || 'Paris'

  const newAccount: AccountRecord = {
    id: accountId,
    role,
    realName: nickName,
    nickName,
    avatarUrl: '',
    city: localized(cityName, cityName, cityName),
    joinedAt: new Date().toISOString().slice(0, 10),
    profileId: '',
    completion: 0,
    membership: 'free',
    bio: localized('新注册用户。', 'Nouvel utilisateur inscrit.', 'Newly registered user.'),
  }

  const newAuthUser: AuthUserRecord = {
    id: authId,
    accountId,
    role,
    identity: email,
    email,
    password,
    displayName: nickName,
    avatarUrl: '',
  }

  db.data.accounts.push(newAccount)
  db.data.auth_users.push(newAuthUser)
  await db.write()

  return {
    statusCode: 201,
    body: buildSession(newAuthUser),
  }
}

function buildSession(authUser: AuthUserRecord): AuthSession {
  return {
    token: `mock-token-${authUser.id}`,
    user: {
      id: authUser.accountId,
      displayName: authUser.displayName,
      avatarUrl: authUser.avatarUrl || '',
    },
  }
}

function isRegisterRole(value: string): value is RegisterRole {
  return value === 'self' || value === 'parent'
}
