import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { login, register } from '../services/auth.service.js'

export async function registerAuthRoutes(app: FastifyInstance): Promise<void> {
  app.post(`/auth/login`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const db = getDb()
    const session = login(db.data, body)

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
