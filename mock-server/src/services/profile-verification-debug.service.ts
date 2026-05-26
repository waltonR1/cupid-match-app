import type {Database} from '../types/database.js'
import type {ProfileVerificationRecord} from '../types/profile.js'

export type ProfileVerificationDebugField =
    | 'identityStatus'
    | 'educationStatus'
    | 'incomeStatus'
    | 'maritalStatus'
    | 'reviewStatus'

export type ProfileVerificationDebugStatus = ProfileVerificationRecord[ProfileVerificationDebugField]

export interface ProfileVerificationDebugItem {
    id: string
    profileId: string
    profileName: string
    legalName?: string
    dateOfBirth?: string
    identityStatus: ProfileVerificationRecord['identityStatus']
    educationStatus: ProfileVerificationRecord['educationStatus']
    incomeStatus: ProfileVerificationRecord['incomeStatus']
    maritalStatus: ProfileVerificationRecord['maritalStatus']
    reviewStatus: ProfileVerificationRecord['reviewStatus']
    verifiedAt?: string
    verifiedByUserId?: string
    createdAt: string
    updatedAt: string
}

export interface ProfileVerificationDebugResponse {
    items: ProfileVerificationDebugItem[]
}

export function listProfileVerificationDebugItems(
    data: Database,
    profileId?: string,
): ProfileVerificationDebugResponse {
    return {
        items: data.profile_verifications
            .filter((item) => !profileId || item.profileId === profileId)
            .sort((left, right) => left.profileId.localeCompare(right.profileId))
            .map((item) => toDebugItem(data, item)),
    }
}

export function reviewProfileVerificationDebugItem(
    data: Database,
    profileId: string,
    field: ProfileVerificationDebugField,
    status: ProfileVerificationDebugStatus,
): {status: 'updated', item: ProfileVerificationDebugItem} | {status: 'not_found'} {
    const verification = data.profile_verifications.find((item) => item.profileId === profileId)
    if (!verification) return {status: 'not_found'}

    verification[field] = status as never
    verification.updatedAt = new Date().toISOString()
    if (isFullyVerified(verification)) {
        verification.verifiedAt = verification.verifiedAt ?? verification.updatedAt
        verification.verifiedByUserId = verification.verifiedByUserId ?? 'staff-debug'
    } else {
        delete verification.verifiedAt
        delete verification.verifiedByUserId
    }

    return {status: 'updated', item: toDebugItem(data, verification)}
}

function isFullyVerified(verification: ProfileVerificationRecord) {
    return verification.identityStatus === 'verified' && verification.reviewStatus === 'approved'
}

function toDebugItem(data: Database, verification: ProfileVerificationRecord): ProfileVerificationDebugItem {
    const profile = data.profiles.find((item) => item.id === verification.profileId)

    return {
        id: verification.id,
        profileId: verification.profileId,
        profileName: profile?.id ?? verification.profileId,
        legalName: verification.legalName,
        dateOfBirth: verification.dateOfBirth,
        identityStatus: verification.identityStatus,
        educationStatus: verification.educationStatus,
        incomeStatus: verification.incomeStatus,
        maritalStatus: verification.maritalStatus,
        reviewStatus: verification.reviewStatus,
        verifiedAt: verification.verifiedAt,
        verifiedByUserId: verification.verifiedByUserId,
        createdAt: verification.createdAt,
        updatedAt: verification.updatedAt,
    }
}
