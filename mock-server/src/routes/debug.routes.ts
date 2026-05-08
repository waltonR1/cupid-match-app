import type {FastifyInstance} from 'fastify'

import {getDb} from '../db.js'
import {
    acceptPrivateIntroductionDebugRequest,
    declinePrivateIntroductionDebugRequest,
    listPrivateIntroductionDebugRequests,
} from '../services/private-introduction-debug.service.js'
import {
    getProfileAccessDebugPreview,
    type ProfileAccessDebugMode,
    type ProfileAccessDebugType,
} from '../services/profile-access-debug.service.js'
import type {QueryRecord} from '../types/common.js'
import {resolveApiLocale} from '../utils/localized.js'
import {resolveAccountIdHeader} from '../utils/request.js'

export async function registerDebugRoutes(app: FastifyInstance): Promise<void> {
    app.get('/debug/profile-access-preview/:profileType/:id', async (request, reply) => {
        const {profileType, id} = request.params as { profileType: string, id: string }
        const query = request.query as QueryRecord
        const mode = resolvePreviewMode(query.mode)

        if (!isProfileAccessDebugType(profileType)) {
            return reply.code(400).send({error: 'Invalid profile type'})
        }

        const accountId = resolveAccountIdHeader(request.headers['x-account-id'])
        const detail = getProfileAccessDebugPreview(
            resolveApiLocale(query.lang),
            getDb().data,
            profileType,
            id,
            mode,
            accountId,
        )

        if (!detail) {
            return reply.code(404).send({error: 'Profile not found'})
        }

        return detail
    })

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

function isProfileAccessDebugType(value: string): value is ProfileAccessDebugType {
    return value === 'self' || value === 'family'
}

function resolvePreviewMode(value: unknown): ProfileAccessDebugMode {
    if (value === 'guest' || value === 'free' || value === 'member' || value === 'backend') {
        return value
    }

    return 'backend'
}
