export type ProfilePhotoDebugStatus = 'review' | 'approved' | 'hidden'

export interface ProfilePhotoDebugItem {
  id: string
  profileId: string
  profileName: string
  url: string
  isPrimary: boolean
  sortOrder: number
  status: ProfilePhotoDebugStatus
  createdAt: string
  updatedAt: string
}

export interface ProfilePhotoDebugResponse {
  items: ProfilePhotoDebugItem[]
}
