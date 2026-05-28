import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { getInboxMessages, getInboxThreads, markInboxRead } from '../services/inbox.service.js'
import { resolveUserIdHeader } from '../utils/request.js'

function requireUser(request: any, reply: any) {
  const userId = resolveUserIdHeader(request.headers['x-user-id'])
  if (!userId) {
    reply.code(400).send({ error: 'X-User-Id header is required' })
    return null
  }
  return userId
}

export async function registerInboxRoutes(app: FastifyInstance): Promise<void> {
  app.get('/inbox/threads', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    return getInboxThreads(getDb().data, userId)
  })

  app.get('/inbox/threads/:threadId/messages', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    const { threadId } = request.params as { threadId: string }
    const query = request.query as Record<string, string>
    const result = getInboxMessages(getDb().data, userId, threadId, query.before, query.limit ? Number(query.limit) : undefined)
    if (!result) return reply.code(404).send({ error: 'Thread not found' })
    return result
  })

  app.post('/inbox/threads/:threadId/read', async (request, reply) => {
    const userId = requireUser(request, reply)
    if (!userId) return
    const { threadId } = request.params as { threadId: string }
    const result = markInboxRead(getDb().data, userId, threadId)
    if (!result) return reply.code(404).send({ error: 'Thread not found' })
    await getDb().write()
    return result
  })
}
