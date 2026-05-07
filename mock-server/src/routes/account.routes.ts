import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { getAccountOverview } from '../services/account.service.js'
import { getString } from '../utils/string.js'
import { resolveApiLocale } from '../utils/localized.js'

export async function registerAccountRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/account/overview`, async (request, reply) => {
    const query = (request.query ?? {}) as Record<string, unknown>
    const accountId = getString(query.accountId)

    if (!accountId) {
      return reply.code(400).send({ error: 'accountId is required' })
    }

    const overview = getAccountOverview(resolveApiLocale(query.lang), getDb().data, accountId)

    if (!overview) {
      return reply.code(404).send({ error: 'Account not found' })
    }

    return overview
  })
}
