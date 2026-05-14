import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { cancelEventRegistration, eventDetail, listEvents, registerForEvent } from '../services/event.service.js'
import type { QueryRecord } from '../types/common.js'
import { resolveApiLocale } from '../utils/localized.js'
import { resolveUserIdHeader } from '../utils/request.js'

export async function registerEventRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/events`, async (request) => {
    const query = request.query as QueryRecord
    return listEvents(resolveApiLocale(query.lang), getDb().data, query)
  })

  app.get(`/events/:id`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const query = request.query as QueryRecord
    const userId = resolveUserIdHeader(request.headers['x-user-id'])
    const detail = eventDetail(resolveApiLocale(query.lang), getDb().data, id, userId)
    if (!detail) {
      return reply.code(404).send({ error: 'Event not found' })
    }

    return detail
  })

  app.post(`/events/:id/register`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const userId = resolveUserIdHeader(request.headers['x-user-id'])
    const db = getDb()
    const result = registerForEvent(db.data, id, userId)

    if (result.status === 'not_found') {
      return reply.code(404).send({ error: 'Event not found' })
    }

    if (result.status === 'login_required') {
      return reply.code(401).send(result.payload)
    }

    if (result.status === 'blocked') {
      return reply.code(409).send(result.payload)
    }

    await db.write()
    return result.payload
  })

  app.post(`/events/:id/cancel`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const userId = resolveUserIdHeader(request.headers['x-user-id'])
    const db = getDb()
    const result = cancelEventRegistration(db.data, id, userId)

    if (result.status === 'not_found') {
      return reply.code(404).send({ error: 'Event not found' })
    }

    if (result.status === 'login_required') {
      return reply.code(401).send(result.payload)
    }

    if (result.status === 'blocked') {
      return reply.code(409).send(result.payload)
    }

    await db.write()
    return result.payload
  })
}
