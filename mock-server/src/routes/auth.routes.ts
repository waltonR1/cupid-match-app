import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { login, register } from '../services/auth.service.js'
import type { QueryRecord } from '../types/common.js'
import { resolveApiLocale } from '../utils/localized.js'

export async function registerAuthRoutes(app: FastifyInstance): Promise<void> {
  app.post(`/auth/login`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const db = getDb()
    const query = request.query as QueryRecord
    const session = login(db.data, body, resolveApiLocale(query.lang))

    if (!session) {
      return reply.code(401).send({ error: 'Invalid credentials' })
    }

    await db.write()
    return session
  })

  app.post(`/auth/register`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const result = await register(getDb(), body)
    return reply.code(result.statusCode).send(result.body)
  })
}
