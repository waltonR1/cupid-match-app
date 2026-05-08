export type PrivateIntroductionDebugStatus =
  | 'requested'
  | 'accepted'
  | 'declined'
  | 'cooldown'

export interface PrivateIntroductionDebugItem {
  id: string
  requesterUserId: string
  requesterName: string
  profileId: string
  profileName: string
  status: PrivateIntroductionDebugStatus
  requestedAt: string
  respondedAt?: string
  cooldownUntil?: string
}

export interface PrivateIntroductionDebugResponse {
  items: PrivateIntroductionDebugItem[]
}
