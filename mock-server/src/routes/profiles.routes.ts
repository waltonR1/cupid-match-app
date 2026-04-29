import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { familyProfileDetail, featuredProfiles, listFamilyProfiles, listSelfProfiles, selfProfileDetail } from '../services/profile.service.js'
import type { QueryRecord } from '../types/common.js'
import { resolveApiLocale } from '../utils/localized.js'

export async function registerProfileRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/profiles/featured`, async (request) => {
    const query = request.query as QueryRecord
    return featuredProfiles(resolveApiLocale(query.lang), getDb().data.profiles, query.pageSize)
  })

  app.get(`/profiles/self`, async (request) => {
    const query = request.query as QueryRecord
    return listSelfProfiles(resolveApiLocale(query.lang), getDb().data.profiles, query)
  })

  app.get(`/profiles/family`, async (request) => {
    const query = request.query as QueryRecord
    return listFamilyProfiles(resolveApiLocale(query.lang), getDb().data.profiles, query)
  })

  app.get(`/profiles/self/:id`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const profile = selfProfileDetail(resolveApiLocale((request.query as QueryRecord).lang), getDb().data.profiles, id)
    if (!profile) {
      return reply.code(404).send({ error: 'Profile not found' })
    }

    return profile
  })

  app.get(`/profiles/family/:id`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const profile = familyProfileDetail(resolveApiLocale((request.query as QueryRecord).lang), getDb().data.profiles, id)
    if (!profile) {
      return reply.code(404).send({ error: 'Profile not found' })
    }

    return profile
  })
}
