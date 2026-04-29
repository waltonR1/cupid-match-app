import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import { featuredProfiles, listFamilyProfiles, listSelfProfiles, profileDetail } from '../services/profile.service.js'
import type { QueryRecord } from '../types/common.js'

export async function registerProfileRoutes(app: FastifyInstance): Promise<void> {
  app.get(`/profiles/featured`, async (request) => {
    return featuredProfiles(getDb().data.profiles, (request.query as QueryRecord).pageSize)
  })

  app.get(`/profiles/self`, async (request) => {
    return listSelfProfiles(getDb().data.profiles, request.query as QueryRecord)
  })

  app.get(`/profiles/family`, async (request) => {
    return listFamilyProfiles(getDb().data.profiles, request.query as QueryRecord)
  })

  app.get(`/profiles/:id`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const profile = profileDetail(getDb().data.profiles, id)
    if (!profile) {
      return reply.code(404).send({ error: 'Profile not found' })
    }

    return profile
  })
}
