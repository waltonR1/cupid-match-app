import type {
  FamilyProfileDirectoryQuery,
  FamilyProfileDirectoryResponse,
  ProfileDTO,
  SelfProfileDirectoryQuery,
  SelfProfileDirectoryResponse,
} from './profiles.types'

export interface ProfilesApiClient {
  getSelfProfileDirectory: (query: SelfProfileDirectoryQuery) => Promise<SelfProfileDirectoryResponse>
  getFamilyProfileDirectory: (query: FamilyProfileDirectoryQuery) => Promise<FamilyProfileDirectoryResponse>
  getProfileDetail: (id: string) => Promise<ProfileDTO | null>
}
