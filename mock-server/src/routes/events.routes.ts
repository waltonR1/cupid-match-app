import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { eventDetail, listEvents } from '../services/event.service.js'

export async function registerEventRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/events`, async () => {
    return listEvents(getDb().data.events)
  })

  app.get(`/events/:id`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const detail = eventDetail(getDb().data.events, getDb().data.profiles, id)
    if (!detail) {
      return reply.code(404).send({ error: 'Event not found' })
    }

    return detail
  })
}
