import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { login, register, requestPasswordResetCode, requestRegistrationVerificationCode, resetPassword } from '../services/auth.service.js'

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

  app.post('/auth/logout', async () => {
    return {}
  })

  app.post(`/auth/register`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const result = await register(getDb(), body)
    return reply.code(result.statusCode).send(result.body)
  })

  app.post(`/auth/verification-code`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const result = requestRegistrationVerificationCode(getDb().data, body)
    return reply.code(result.statusCode).send(result.body)
  })

  app.post(`/auth/password-reset-code`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const result = requestPasswordResetCode(getDb().data, body)
    return reply.code(result.statusCode).send(result.body)
  })

  app.post(`/auth/password/reset`, async (request, reply) => {
    const body = (request.body ?? {}) as Record<string, unknown>
    const db = getDb()
    const result = resetPassword(db.data, body)
    if (result.statusCode === 200) {
      await db.write()
    }
    return reply.code(result.statusCode).send(result.body)
  })
}
