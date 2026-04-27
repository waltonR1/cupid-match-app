import {isApiStatusError, requestJson} from '@/api/shared/http'
import type {
    FamilyProfileDirectoryQuery,
    FamilyProfileDirectoryResponse,
    FamilyProfileDirectoryFacetsDTO,
    FormatLocale,
    ProfileDTO,
    FamilyProfileSortKey,
    SelfProfileDirectoryFacetsDTO,
    SelfProfileDirectoryQuery,
    SelfProfileDirectoryResponse,
    SelfProfileSortKey,
} from './profiles.types'

export type {
    FamilyProfileDirectoryQuery,
    FamilyProfileDirectoryResponse,
    FamilyProfileDirectoryFacetsDTO,
    FormatLocale,
    ProfileDTO,
    FamilyProfileSortKey,
    SelfProfileDirectoryFacetsDTO,
    SelfProfileDirectoryQuery,
    SelfProfileDirectoryResponse,
    SelfProfileSortKey,
} from './profiles.types'

export function getSelfProfileDirectory(query: SelfProfileDirectoryQuery): Promise<SelfProfileDirectoryResponse> {
    return requestJson<SelfProfileDirectoryResponse>('/profiles/self', {query})
}

export function getFeaturedSelfProfiles(pageSize = 3): Promise<SelfProfileDirectoryResponse> {
    return requestJson<SelfProfileDirectoryResponse>('/profiles/featured', {query: {pageSize}})
}

export function getFamilyProfileDirectory(query: FamilyProfileDirectoryQuery): Promise<FamilyProfileDirectoryResponse> {
    return requestJson<FamilyProfileDirectoryResponse>('/profiles/family', {query})
}

export async function getProfileDetail(id: string): Promise<ProfileDTO | null> {
    try {
        return await requestJson<ProfileDTO>(`/profiles/${id}`)
    } catch (error) {
        if (isApiStatusError(error, 404)) return null
        throw error
    }
}
