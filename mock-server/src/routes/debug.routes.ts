import type {FastifyInstance} from 'fastify'

import {getDb} from '../db.js'
import {
    acceptPrivateIntroductionDebugRequest,
    declinePrivateIntroductionDebugRequest,
    listPrivateIntroductionDebugRequests,
} from '../services/private-introduction-debug.service.js'
import type {QueryRecord} from '../types/common.js'
import {resolveApiLocale} from '../utils/localized.js'

export async function registerDebugRoutes(app: FastifyInstance): Promise<void> {
    app.get('/debug/private-introductions', async (request) => {
        const query = request.query as QueryRecord
        return listPrivateIntroductionDebugRequests(resolveApiLocale(query.lang), getDb().data)
    })

    app.post('/debug/private-introductions/:id/accept', async (request, reply) => {
        const {id} = request.params as { id: string }
        const query = request.query as QueryRecord
        const db = getDb()
        const result = acceptPrivateIntroductionDebugRequest(resolveApiLocale(query.lang), db.data, id)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Private introduction request not found'})
        }

        if (result.status === 'invalid_status') {
            return reply.code(409).send(result.item)
        }

        await db.write()
        return result.item
    })

    app.post('/debug/private-introductions/:id/decline', async (request, reply) => {
        const {id} = request.params as { id: string }
        const query = request.query as QueryRecord
        const db = getDb()
        const result = declinePrivateIntroductionDebugRequest(resolveApiLocale(query.lang), db.data, id)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Private introduction request not found'})
        }

        if (result.status === 'invalid_status') {
            return reply.code(409).send(result.item)
        }

        await db.write()
        return result.item
    })
}
