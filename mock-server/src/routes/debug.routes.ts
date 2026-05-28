import type {FastifyInstance} from 'fastify'

import {getDb} from '../db.js'
import {
    acceptPrivateIntroductionDebugRequest,
    declinePrivateIntroductionDebugRequest,
    listPrivateIntroductionDebugRequests,
} from '../services/private-introduction-debug.service.js'
import {
    listEventDebugItems,
    updateEventDebugStatus,
} from '../services/event-debug.service.js'
import {
    listInboxDebugThreads,
    sendInboxDebugNotification,
} from '../services/inbox-debug.service.js'
import {
    listEventRegistrationDebugItems,
    reviewEventRegistrationDebugItem,
    type EventRegistrationReviewStatus,
} from '../services/event-registration-debug.service.js'
import {cancelEventRegistration, eventDetail, registerForEvent} from '../services/event.service.js'
import {
    getProfileAccessDebugPreview,
    type ProfileAccessDebugMode,
    type ProfileAccessDebugType,
} from '../services/profile-access-debug.service.js'
import {
    listProfilePhotoDebugItems,
    reviewProfilePhotoDebugItem,
    type ProfilePhotoDebugStatus,
} from '../services/profile-photo-debug.service.js'
import {
    listProfileVerificationDebugItems,
    reviewProfileVerificationDebugItem,
    type ProfileVerificationDebugField,
    type ProfileVerificationDebugStatus,
} from '../services/profile-verification-debug.service.js'
import type {QueryRecord} from '../types/common.js'
import {resolveApiLocale} from '../utils/localized.js'
import {resolveUserIdHeader} from '../utils/request.js'

export async function registerDebugRoutes(app: FastifyInstance): Promise<void> {
    app.get('/debug/profile-access-preview/:profileType/:id', async (request, reply) => {
        const {profileType, id} = request.params as { profileType: string, id: string }
        const query = request.query as QueryRecord
        const mode = resolvePreviewMode(query.mode)

        if (!isProfileAccessDebugType(profileType)) {
            return reply.code(400).send({error: 'Invalid profile type'})
        }

        const userId = resolveUserIdHeader(request.headers['x-user-id'])
        const detail = getProfileAccessDebugPreview(
            resolveApiLocale(query.lang),
            getDb().data,
            profileType,
            id,
            mode,
            userId,
        )

        if (!detail) {
            return reply.code(404).send({error: 'Profile not found'})
        }

        return detail
    })

    app.get('/debug/events-preview/:id', async (request, reply) => {
        const {id} = request.params as { id: string }
        const query = request.query as QueryRecord
        const userId = resolveEventDebugUserId(resolveEventDebugMode(query.mode))
        const detail = eventDetail(resolveApiLocale(query.lang), getDb().data, id, userId)

        if (!detail) {
            return reply.code(404).send({error: 'Event not found'})
        }

        return detail
    })

    app.post('/debug/events-preview/:id/register', async (request, reply) => {
        const {id} = request.params as { id: string }
        const query = request.query as QueryRecord
        const userId = resolveEventDebugUserId(resolveEventDebugMode(query.mode))
        const db = getDb()
        const result = registerForEvent(db.data, id, userId)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Event not found'})
        }

        if (result.status === 'login_required') {
            return reply.code(401).send(result.payload)
        }

        if (result.status === 'blocked') {
            return reply.code(409).send(result.payload)
        }

        await db.write()
        return result.payload
    })

    app.post('/debug/events-preview/:id/cancel', async (request, reply) => {
        const {id} = request.params as { id: string }
        const query = request.query as QueryRecord
        const userId = resolveEventDebugUserId(resolveEventDebugMode(query.mode))
        const db = getDb()
        const result = cancelEventRegistration(db.data, id, userId)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Event not found'})
        }

        if (result.status === 'login_required') {
            return reply.code(401).send(result.payload)
        }

        if (result.status === 'blocked') {
            return reply.code(409).send(result.payload)
        }

        await db.write()
        return result.payload
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

    app.get('/debug/event-registrations', async (request) => {
        const query = request.query as QueryRecord
        return listEventRegistrationDebugItems(resolveApiLocale(query.lang), getDb().data)
    })

    app.post('/debug/event-registrations/:id/review/:status', async (request, reply) => {
        const {id, status} = request.params as { id: string, status: string }
        const query = request.query as QueryRecord

        if (!isEventReviewStatus(status)) {
            return reply.code(400).send({error: 'Invalid review status'})
        }

        const db = getDb()
        const result = reviewEventRegistrationDebugItem(resolveApiLocale(query.lang), db.data, id, status)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Event registration not found'})
        }

        if (result.status === 'invalid_status') {
            return reply.code(409).send(result.item)
        }

        await db.write()
        return result.item
    })

    app.get('/debug/profile-photos', async (request) => {
        const query = request.query as QueryRecord
        const profileId = typeof query.profileId === 'string' ? query.profileId : undefined
        return listProfilePhotoDebugItems(getDb().data, profileId)
    })

    app.post('/debug/profile-photos/:id/review/:status', async (request, reply) => {
        const {id, status} = request.params as { id: string, status: string }

        if (!isProfilePhotoReviewStatus(status)) {
            return reply.code(400).send({error: 'Invalid photo review status'})
        }

        const db = getDb()
        const result = reviewProfilePhotoDebugItem(db.data, id, status)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Profile photo not found'})
        }

        await db.write()
        return result.item
    })

    app.get('/debug/profile-verifications', async (request) => {
        const query = request.query as QueryRecord
        const profileId = typeof query.profileId === 'string' ? query.profileId : undefined
        return listProfileVerificationDebugItems(getDb().data, profileId)
    })

    app.post('/debug/profile-verifications/:profileId/:field/:status', async (request, reply) => {
        const {profileId, field, status} = request.params as { profileId: string, field: string, status: string }

        if (!isProfileVerificationField(field)) {
            return reply.code(400).send({error: 'Invalid verification field'})
        }

        if (!isProfileVerificationStatus(field, status)) {
            return reply.code(400).send({error: 'Invalid verification status'})
        }

        const db = getDb()
        const result = reviewProfileVerificationDebugItem(db.data, profileId, field, status)

        if (result.status === 'not_found') {
            return reply.code(404).send({error: 'Profile verification not found'})
        }

        await db.write()
        return result.item
    })

    app.get('/debug/inbox/threads', async (_request) => {
        return listInboxDebugThreads(getDb().data)
    })

    app.post('/debug/inbox/notify', async (request, reply) => {
        const db = getDb()
        const result = sendInboxDebugNotification(db.data, request.body as never)
        await db.write()
        return result
    })

    app.get('/debug/events', async () => {
        return listEventDebugItems(getDb().data)
    })

    app.post('/debug/events/:id/status', async (request, reply) => {
        const { id } = request.params as { id: string }
        const { status } = request.body as { status: string }
        const result = updateEventDebugStatus(getDb().data, id, status)
        if (result.status === 'not_found') return reply.code(404).send({ error: 'Event not found' })
        if (result.status === 'invalid_status') return reply.code(400).send({ error: 'Invalid status' })
        await getDb().write()
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

type EventDebugMode = 'guest' | 'free' | 'member'

function resolveEventDebugMode(value: unknown): EventDebugMode {
    if (value === 'guest' || value === 'free' || value === 'member') {
        return value
    }

    return 'guest'
}

function resolveEventDebugUserId(mode: EventDebugMode) {
    if (mode === 'member') return 'u-001'
    if (mode === 'free') return 'u-debug-free'
    return ''
}

function isEventReviewStatus(value: string): value is EventRegistrationReviewStatus {
    return value === 'confirmed' || value === 'declined' || value === 'waitlist'
}

function isProfilePhotoReviewStatus(value: string): value is ProfilePhotoDebugStatus {
    return value === 'review' || value === 'approved' || value === 'hidden'
}

function isProfileVerificationField(value: string): value is ProfileVerificationDebugField {
    return value === 'identityStatus'
        || value === 'educationStatus'
        || value === 'incomeStatus'
        || value === 'maritalStatus'
        || value === 'reviewStatus'
}

function isProfileVerificationStatus(
    field: ProfileVerificationDebugField,
    value: string,
): value is ProfileVerificationDebugStatus {
    if (field === 'reviewStatus') {
        return value === 'unreviewed' || value === 'pending' || value === 'approved' || value === 'rejected'
    }

    return value === 'unverified' || value === 'pending' || value === 'verified' || value === 'rejected'
}
