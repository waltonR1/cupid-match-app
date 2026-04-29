import type { FastifyInstance } from 'fastify'

import { config } from '../config.js'
import { getDb } from '../db.js'
import { getAccountOverview } from '../services/account.service.js'
import { getString } from '../utils/string.js'

export async function registerAccountRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/account/overview`, async (request, reply) => {
    const query = (request.query ?? {}) as Record<string, unknown>
    const accountId = getString(query.accountId) || config.defaultAccountId
    const overview = getAccountOverview(getDb().data, accountId)

    if (!overview) {
      return reply.code(404).send({ error: 'Account not found' })
    }

    return overview
  })
}
