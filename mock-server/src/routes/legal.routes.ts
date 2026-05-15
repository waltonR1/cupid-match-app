import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { getLegalDocument } from '../services/legal.service.js'
import { resolveApiLocale } from '../utils/localized.js'
import type { QueryRecord } from '../types/common.js'

export async function registerLegalRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/legal/documents/:type`, async (request, reply) => {
    const { type } = request.params as { type: string }
    if (type !== 'terms' && type !== 'privacy') {
      return reply.code(400).send({ error: 'Invalid document type. Use "terms" or "privacy".' })
    }

    const query = request.query as QueryRecord
    const locale = resolveApiLocale(query.lang)
    const doc = getLegalDocument(getDb().data, type, locale)

    if (!doc) {
      return reply.code(404).send({ error: 'Document not found' })
    }

    return doc
  })
}
