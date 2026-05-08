import type { FastifyInstance } from 'fastify'

import { getDb } from '../db.js'
import {
  familyProfileDetail,
  featuredProfiles,
  listFamilyProfiles,
  listSelfProfiles,
  requestPrivateIntroduction,
  selfProfileDetail,
} from '../services/profile.service.js'
import type { QueryRecord } from '../types/common.js'
import { resolveApiLocale } from '../utils/localized.js'
import { resolveAccountIdHeader } from '../utils/request.js'

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
    const query = request.query as QueryRecord
    const accountId = resolveAccountIdHeader(request.headers['x-account-id'])

    const profile = selfProfileDetail(resolveApiLocale(query.lang), getDb().data, id, accountId)
    if (!profile) {
      return reply.code(404).send({ error: 'Profile not found' })
    }

    return profile
  })

  app.post(`/profiles/self/:id/private-introduction`, async (request, reply) => {
    const { id } = request.params as { id: string }
    const accountId = resolveAccountIdHeader(request.headers['x-account-id'])
    const db = getDb()
    const result = requestPrivateIntroduction(db.data, id, accountId)

    if (result.status === 'not_found') {
      return reply.code(404).send({ error: 'Profile not found' })
    }

    if (result.status === 'login_required') {
      return reply.code(401).send({ error: 'Login required' })
    }

    if (result.status === 'blocked') {
      return reply.code(409).send(result.introduction)
    }

    await db.write()
    return reply.code(201).send(result.introduction)
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
