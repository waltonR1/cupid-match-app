import { isApiStatusError, requestJson } from '@/api/shared/http'
import type { ProfilesApiClient } from './profiles.contract'
import type {
  FamilyProfileDirectoryQuery,
  FamilyProfileDirectoryResponse,
  ProfileDTO,
  SelfProfileDirectoryQuery,
  SelfProfileDirectoryResponse,
} from './profiles.types'

export function createHttpProfilesApiClient(): ProfilesApiClient {
  return {
    getSelfProfileDirectory(query) {
      return requestJson<SelfProfileDirectoryResponse>('/profiles/self', { query })
    },
    getFamilyProfileDirectory(query) {
      return requestJson<FamilyProfileDirectoryResponse>('/profiles/family', { query })
    },
    async getProfileDetail(id) {
      try {
        return await requestJson<ProfileDTO>(`/profiles/${id}`)
      } catch (error) {
        if (isApiStatusError(error, 404)) return null
        throw error
      }
    },
  }
}
