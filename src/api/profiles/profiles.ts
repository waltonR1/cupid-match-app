import {isApiStatusError, requestJson} from '@/api/shared/http'
import type {
    FamilyProfileDetail,
    FamilyProfileDirectoryQuery,
    FamilyProfileDirectoryResponse,
    FeaturedSelfProfilesResponse,
    SelfProfileDetail,
    SelfProfileDirectoryQuery,
    SelfProfileDirectoryResponse,
    PrivateIntroduction,
} from './profiles.types'

export function getSelfProfileDirectory(query: SelfProfileDirectoryQuery): Promise<SelfProfileDirectoryResponse> {
    return requestJson<SelfProfileDirectoryResponse>('/profiles/self', {query})
}

export function getFeaturedSelfProfiles(pageSize = 3): Promise<FeaturedSelfProfilesResponse> {
    return requestJson<FeaturedSelfProfilesResponse>('/profiles/featured', {query: {pageSize}})
}

export function getFamilyProfileDirectory(query: FamilyProfileDirectoryQuery): Promise<FamilyProfileDirectoryResponse> {
    return requestJson<FamilyProfileDirectoryResponse>('/profiles/family', {query})
}

export async function getSelfProfileDetail(profileId: string): Promise<SelfProfileDetail | null> {
    try {
        return await requestJson<SelfProfileDetail>(`/profiles/self/${profileId}`)
    } catch (error) {
        if (isApiStatusError(error, 404)) return null
        throw error
    }
}

export async function requestSelfProfilePrivateIntroduction(profileId: string): Promise<PrivateIntroduction> {
    try {
        return await requestJson<PrivateIntroduction>(`/profiles/self/${profileId}/private-introduction`, {
            method: 'POST',
            data: {},
        })
    } catch (error) {
        if (isApiStatusError(error, 409) && error && typeof error === 'object' && 'payload' in error) {
            return error.payload as PrivateIntroduction
        }
        throw error
    }
}

export async function requestFamilyProfilePrivateIntroduction(profileId: string): Promise<PrivateIntroduction> {
    try {
        return await requestJson<PrivateIntroduction>(`/profiles/family/${profileId}/private-introduction`, {
            method: 'POST',
            data: {},
        })
    } catch (error) {
        if (isApiStatusError(error, 409) && error && typeof error === 'object' && 'payload' in error) {
            return error.payload as PrivateIntroduction
        }
        throw error
    }
}

export async function getFamilyProfileDetail(id: string): Promise<FamilyProfileDetail | null> {
    try {
        return await requestJson<FamilyProfileDetail>(`/profiles/family/${id}`)
    } catch (error) {
        if (isApiStatusError(error, 404)) return null
        throw error
    }
}
