import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { getAccountOverview } from '../services/account.service.js'
import { resolveUserIdHeader } from '../utils/request.js'

export async function registerAccountRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/account/overview`, async (request, reply) => {
    const userId = resolveUserIdHeader(request.headers['x-user-id'])

    if (!userId) {
      return reply.code(400).send({ error: 'userId is required' })
    }

    const overview = getAccountOverview(getDb().data, userId)

    if (!overview) {
      return reply.code(404).send({ error: 'Account not found' })
    }

    return overview
  })
}
