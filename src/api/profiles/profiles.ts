import {isApiStatusError, requestJson} from '@/api/shared/http'
import type {
    FamilyProfileDetail,
    FamilyProfileDirectoryFacets,
    FamilyProfileDirectoryQuery,
    FamilyProfileDirectoryResponse,
    FamilyProfileSortKey,
    FeaturedSelfProfilesResponse,
    FormatLocale,
    ProfileCardFactResponse,
    ProfileCardResponse,
    ProfileCardResponseItem,
    SelfProfileDetail,
    SelfProfileDirectoryFacets,
    SelfProfileDirectoryQuery,
    SelfProfileDirectoryResponse,
    SelfProfileSortKey,
} from './profiles.types'

export type {
    FamilyProfileDetail,
    FamilyProfileDirectoryFacets,
    FamilyProfileDirectoryQuery,
    FamilyProfileDirectoryResponse,
    FamilyProfileSortKey,
    FeaturedSelfProfilesResponse,
    FormatLocale,
    ProfileCardFactResponse,
    ProfileCardResponse,
    ProfileCardResponseItem,
    SelfProfileDetail,
    SelfProfileDirectoryFacets,
    SelfProfileDirectoryQuery,
    SelfProfileDirectoryResponse,
    SelfProfileSortKey,
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

export async function getSelfProfileDetail(id: string): Promise<SelfProfileDetail | null> {
    try {
        return await requestJson<SelfProfileDetail>(`/profiles/self/${id}`)
    } catch (error) {
        if (isApiStatusError(error, 404)) return null
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
