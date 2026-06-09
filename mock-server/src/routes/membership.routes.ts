import type {FastifyInstance} from 'fastify'

import {getDb} from '../db.js'
import {getMembershipCatalog} from '../services/membership.service.js'
import type {QueryRecord} from '../types/common.js'
import {resolveApiLocale} from '../utils/localized.js'

export async function registerMembershipRoutes(app: FastifyInstance): Promise<void> {
    app.get('/membership/catalog', async (request) => {
        const query = request.query as QueryRecord
        return getMembershipCatalog(resolveApiLocale(query.lang), getDb().data)
    })
}
