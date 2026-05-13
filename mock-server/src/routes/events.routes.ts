import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { eventDetail, listEvents } from '../services/event.service.js'
import type { QueryRecord } from '../types/common.js'
import { resolveApiLocale } from '../utils/localized.js'

export async function registerEventRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/events`, async (request) => {
    return listEvents(resolveApiLocale((request.query as QueryRecord).lang), getDb().data.events)
  })

  app.get(`/events/:id`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const detail = eventDetail(resolveApiLocale((request.query as QueryRecord).lang), getDb().data, id)
    if (!detail) {
      return reply.code(404).send({ error: 'Event not found' })
    }

    return detail
  })
}
