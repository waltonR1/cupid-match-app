import {apiRequest} from '@/api/shared/http'
import type {
  ProfileAccessPreviewDetail,
  ProfileAccessPreviewMode,
  ProfileAccessPreviewType,
} from './profile-access-preview.types'

export function getProfileAccessPreview(params: {
  profileType: ProfileAccessPreviewType
  profileId: string
  mode: ProfileAccessPreviewMode
}): Promise<ProfileAccessPreviewDetail> {
  return apiRequest<ProfileAccessPreviewDetail>(
    `/debug/profile-access-preview/${params.profileType}/${params.profileId}`,
    {query: {mode: params.mode}},
  )
}
