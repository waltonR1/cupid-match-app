import {apiRequest} from '@/api/shared/http'
import type {
  ProfilePhotoDebugItem,
  ProfilePhotoDebugResponse,
  ProfilePhotoDebugStatus,
} from './profile-photos.types'

export function getProfilePhotoDebugItems(profileId?: string): Promise<ProfilePhotoDebugResponse> {
  return apiRequest<ProfilePhotoDebugResponse>('/debug/profile-photos', {
    query: profileId ? {profileId} : undefined,
  })
}

export function reviewProfilePhotoDebugItem(
  id: string,
  status: ProfilePhotoDebugStatus,
): Promise<ProfilePhotoDebugItem> {
  return apiRequest<ProfilePhotoDebugItem>(`/debug/profile-photos/${id}/review/${status}`, {
    method: 'POST',
    data: {},
  })
}
