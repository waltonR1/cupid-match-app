export type ProfileVerificationDebugField =
  | 'identityStatus'
  | 'educationStatus'
  | 'incomeStatus'
  | 'maritalStatus'
  | 'reviewStatus'

export type ProfileVerificationDebugStatus =
  | 'unverified'
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'unreviewed'
  | 'approved'

export interface ProfileVerificationDebugItem {
  id: string
  profileId: string
  profileName: string
  legalName?: string
  dateOfBirth?: string
  identityStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  educationStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  incomeStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  maritalStatus: 'unverified' | 'pending' | 'verified' | 'rejected'
  reviewStatus: 'unreviewed' | 'pending' | 'approved' | 'rejected'
  verifiedAt?: string
  verifiedByUserId?: string
  createdAt: string
  updatedAt: string
}

export interface ProfileVerificationDebugResponse {
  items: ProfileVerificationDebugItem[]
}
