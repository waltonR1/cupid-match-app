import type { ProfilesApiClient } from './profiles.contract'
import { createHttpProfilesApiClient } from './profiles.http'
import type {
  FamilyProfileSortKey,
  FamilyProfileDirectoryQuery,
  FamilyProfileDirectoryResponse,
  FormatLocale,
  ProfileDTO,
  SelfProfileSortKey,
  SelfProfileDirectoryQuery,
  SelfProfileDirectoryResponse,
} from './profiles.types'

const profilesApiClient = createHttpProfilesApiClient()

export type { ProfilesApiClient }
export type {
  FamilyProfileSortKey,
  FamilyProfileDirectoryQuery,
  FamilyProfileDirectoryResponse,
  FormatLocale,
  ProfileDTO,
  SelfProfileSortKey,
  SelfProfileDirectoryQuery,
  SelfProfileDirectoryResponse,
} from './profiles.types'

export function getProfilesApiClient() {
  return profilesApiClient
}

export function getSelfProfileDirectory(query: SelfProfileDirectoryQuery): Promise<SelfProfileDirectoryResponse> {
  return profilesApiClient.getSelfProfileDirectory(query)
}

export function getFamilyProfileDirectory(query: FamilyProfileDirectoryQuery): Promise<FamilyProfileDirectoryResponse> {
  return profilesApiClient.getFamilyProfileDirectory(query)
}

export function getProfileDetail(id: string): Promise<ProfileDTO | null> {
  return profilesApiClient.getProfileDetail(id)
}
