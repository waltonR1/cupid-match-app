import type {ApiLocale} from '../types/common.js'
import type {Database, EventRegistrationRecord} from '../types/database.js'
import {resolveLocalizedText} from '../utils/localized.js'

export type EventRegistrationReviewStatus = 'confirmed' | 'declined' | 'waitlist'

export interface EventRegistrationDebugItemDTO {
    id: string
    eventId: string
    eventTitle: string
    userId: string
    userName: string
    status: EventRegistrationRecord['status']
    requestedAt: string
    confirmedAt?: string
    declinedAt?: string
    cancelledAt?: string
}

export interface EventRegistrationDebugResponseDTO {
    items: EventRegistrationDebugItemDTO[]
}

export interface EventRegistrationDebugMutationResult {
    status: 'not_found' | 'invalid_status' | 'updated'
    item?: EventRegistrationDebugItemDTO
}

/** 列出活动申请，供 mock 后台审核调试使用 */
export function listEventRegistrationDebugItems(
    locale: ApiLocale,
    data: Database,
): EventRegistrationDebugResponseDTO {
    return {
        items: data.event_registrations
            .slice()
            .sort((left, right) => Date.parse(right.requestedAt) - Date.parse(left.requestedAt))
            .map((item) => toDebugItem(locale, data, item)),
    }
}

/** 审核活动申请 */
export function reviewEventRegistrationDebugItem(
    locale: ApiLocale,
    data: Database,
    registrationId: string,
    nextStatus: EventRegistrationReviewStatus,
): EventRegistrationDebugMutationResult {
    const registration = data.event_registrations.find((item) => item.id === registrationId)
    if (!registration) return {status: 'not_found'}
    if (registration.status !== 'requested') return {status: 'invalid_status', item: toDebugItem(locale, data, registration)}

    const now = new Date().toISOString()
    registration.status = nextStatus
    registration.confirmedAt = nextStatus === 'confirmed' ? now : undefined
    registration.declinedAt = nextStatus === 'declined' ? now : undefined
    registration.waitlistedAt = nextStatus === 'waitlist' ? now : undefined
    registration.cancelledAt = undefined
    registration.updatedAt = now

    return {status: 'updated', item: toDebugItem(locale, data, registration)}
}

function toDebugItem(
    locale: ApiLocale,
    data: Database,
    registration: EventRegistrationRecord,
): EventRegistrationDebugItemDTO {
    const event = data.events.find((item) => item.id === registration.eventId)
    const user = data.users.find((item) => item.id === registration.userId)

    return {
        id: registration.id,
        eventId: registration.eventId,
        eventTitle: event ? resolveLocalizedText(locale, event.title) : registration.eventId,
        userId: registration.userId,
        userName: user?.accountName || registration.userId,
        status: registration.status,
        requestedAt: registration.requestedAt,
        confirmedAt: registration.confirmedAt,
        declinedAt: registration.declinedAt,
        cancelledAt: registration.cancelledAt,
    }
}
