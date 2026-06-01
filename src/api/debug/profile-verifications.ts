import {apiRequest} from '@/api/shared/http'
import type {
  ProfileVerificationDebugField,
  ProfileVerificationDebugItem,
  ProfileVerificationDebugResponse,
  ProfileVerificationDebugStatus,
} from './profile-verifications.types'

export function getProfileVerificationDebugItems(profileId?: string): Promise<ProfileVerificationDebugResponse> {
  return apiRequest<ProfileVerificationDebugResponse>('/debug/profile-verifications', {
    query: profileId ? {profileId} : undefined,
  })
}

export function reviewProfileVerificationDebugItem(
  profileId: string,
  field: ProfileVerificationDebugField,
  status: ProfileVerificationDebugStatus,
): Promise<ProfileVerificationDebugItem> {
  return apiRequest<ProfileVerificationDebugItem>(`/debug/profile-verifications/${profileId}/${field}/${status}`, {
    method: 'POST',
    data: {},
  })
}
