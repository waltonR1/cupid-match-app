import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import {
  getAccountDashboard,
  getAccountMe,
  getAccountProfiles,
  getAccountProfileDetail,
  archiveAccountProfile,
  getAccountMembership,
  getAccountEvents,
  getAccountFavorites,
  getAccountIntroductions,
  getAccountRooms,
  getAccountSettings,
} from '../services/account.service.js'
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
  app.get(`/account/me`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    const result = getAccountMe(getDb().data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    return result
  })

  app.get(`/account/dashboard`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    const result = getAccountDashboard(getDb().data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    return result
  })

  app.get(`/account/profiles`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    const result = getAccountProfiles(getDb().data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    return result
  })

  app.get(`/account/profiles/:profileId`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    const { profileId } = request.params as { profileId: string }
    const result = getAccountProfileDetail(getDb().data, userId, profileId)
    if (!result) return reply.code(404).send({ error: 'Profile not found' })
    return result
  })

  app.post(`/account/profiles/:profileId/archive`, async (request, reply) => {
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

  app.get(`/account/membership`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    const result = getAccountMembership(getDb().data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    return result
  })

  app.get(`/account/events`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    return getAccountEvents(getDb().data, userId)
  })

  app.get(`/account/favorites`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    return getAccountFavorites(getDb().data, userId)
  })

  app.get(`/account/private-introductions`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    return getAccountIntroductions(getDb().data, userId)
  })

  app.get(`/account/private-introduction-rooms`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    return getAccountRooms(getDb().data, userId)
  })

  app.get(`/account/settings`, async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return

    const result = getAccountSettings(getDb().data, userId)
    if (!result) return reply.code(404).send({ error: 'Account not found' })
    return result
  })
}
