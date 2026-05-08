import type {ApiLocale} from '../types/common.js'
import type {Database, PrivateIntroductionRequestRecord, PrivateIntroductionStatus} from '../types/database.js'
import {PRIVATE_INTRODUCTION_COOLDOWN_DAYS} from '../constants/membership.js'

export interface PrivateIntroductionDebugItemDTO {
    id: string
    requesterUserId: string
    requesterName: string
    profileId: string
    profileName: string
    status: PrivateIntroductionStatus
    requestedAt: string
    respondedAt?: string
    cooldownUntil?: string
}

export interface PrivateIntroductionDebugResponseDTO {
    items: PrivateIntroductionDebugItemDTO[]
}

export interface PrivateIntroductionDebugMutationResult {
    status: 'not_found' | 'invalid_status' | 'updated'
    item?: PrivateIntroductionDebugItemDTO
}

/** 列出私人介绍请求 */
export function listPrivateIntroductionDebugRequests(
    locale: ApiLocale,
    data: Database,
): PrivateIntroductionDebugResponseDTO {
    return {
        items: data.private_introduction_requests
            .slice()
            .sort((left, right) => Date.parse(right.requestedAt) - Date.parse(left.requestedAt))
            .map((item) => toDebugItem(locale, data, item)),
    }
}

/** 接受私人介绍请求 */
export function acceptPrivateIntroductionDebugRequest(
    locale: ApiLocale,
    data: Database,
    requestId: string,
): PrivateIntroductionDebugMutationResult {
    const request = data.private_introduction_requests.find((item) => item.id === requestId)
    if (!request) return {status: 'not_found'}
    if (request.status !== 'requested') return {status: 'invalid_status', item: toDebugItem(locale, data, request)}

    request.status = 'accepted'
    request.respondedAt = new Date().toISOString()
    delete request.cooldownUntil

    return {status: 'updated', item: toDebugItem(locale, data, request)}
}

/** 拒绝私人介绍请求 */
export function declinePrivateIntroductionDebugRequest(
    locale: ApiLocale,
    data: Database,
    requestId: string,
): PrivateIntroductionDebugMutationResult {
    const request = data.private_introduction_requests.find((item) => item.id === requestId)
    if (!request) return {status: 'not_found'}
    if (request.status !== 'requested') return {status: 'invalid_status', item: toDebugItem(locale, data, request)}

    const now = Date.now()
    request.status = 'declined'
    request.respondedAt = new Date(now).toISOString()
    request.cooldownUntil = new Date(now + PRIVATE_INTRODUCTION_COOLDOWN_DAYS * 24 * 60 * 60 * 1000).toISOString()

    return {status: 'updated', item: toDebugItem(locale, data, request)}
}

function toDebugItem(
    locale: ApiLocale,
    data: Database,
    request: PrivateIntroductionRequestRecord,
): PrivateIntroductionDebugItemDTO {
    const requester = data.users.find((item) => item.id === request.requesterUserId)
    const profile = data.profiles.find((item) => item.id === request.profileId)

    return {
        id: request.id,
        requesterUserId: request.requesterUserId,
        requesterName: requester?.displayName || request.requesterUserId,
        profileId: request.profileId,
        profileName: profile?.displayName || profile?.nickname || request.profileId,
        status: request.status,
        requestedAt: request.requestedAt,
        respondedAt: request.respondedAt,
        cooldownUntil: request.cooldownUntil,
    }
}
