export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type EntitlementCode = 'private_introduction' | 'event_priority' | 'advisor_review' | 'profile_detail_access'
export type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
export type AdvisorReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
export type AccountPreferenceCode = 'preferred_city' | 'advisor_contact_enabled' | 'family_assist_enabled'
export type AccountEventRegistrationStatus = 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
export type AccountIntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired' | 'cooldown'
export type AccountRoomStatus = 'open' | 'paused' | 'closed'

export interface AccountMeDTO {
  user: { id: string; accountName: string; avatarUrl: string; preferredLocale: string; status: string }
  onboarding: { path: string; step: string; profileId?: string } | null
}

export interface AccountDashboardDTO {
  user: AccountMeDTO['user']
  onboarding: AccountMeDTO['onboarding']
  profiles: ManagedProfileSummaryDTO[]
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  upcomingEvents: AccountEventRegistrationDTO[]
  recentIntroductions: AccountIntroductionSummaryDTO[]
  favoriteCount: number
  userVisibleFollowUps: AdvisorFollowUpDTO[]
}

export interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

export interface AccountProfileDetailDTO {
  profileId: string
  displayName: string
  avatarUrl: string
  ownership: {
    role: 'self' | 'parent' | 'guardian' | 'advisor'
    relationshipToProfile?: 'self' | 'father' | 'mother' | 'relative' | 'advisor'
    permission: 'owner' | 'manager' | 'viewer'
    isPrimary: boolean
  }
  verification: AccountProfileVerificationDTO
  visibility: AccountProfileVisibilityDTO[]
  photos: Array<{ id: string; url: string; caption: string; isPrimary: boolean; sortOrder: number }>
  prompts: Array<{ id: string; promptCode: string; prompt: string; answer: string; sortOrder: number }>
  gender: 'male' | 'female'
  birthYear: number
  height: number
  city: string
  country: string
  nationality: string
  languages: string[]
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  isPriorityProfile: boolean
  lastActiveAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  childrenPlan: 'wants' | 'open_to_discuss' | 'does_not_want'
  acceptsLongDistance: boolean
  datingIntentionCode: 'serious' | 'marriage' | 'exclusive' | 'cross_border'
  relationshipPlan: string
  residencePlan: string
  relocationWillingness: string
  values: string[]
  preferredAgeMin: number
  preferredAgeMax: number
  locationScope: string
  preferredEducation: string
  familyPlan: string
  dealBreakers: string[]
  smoking: 'never' | 'social' | 'often'
  drinking: 'never' | 'social' | 'often'
  exercise: string
  activityLevel: string
  weekendStyle: string
  pets: string
  personalityTraits: string[]
  interests: string[]
  communicationStyle: string
  summary: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface AccountMembershipDTO {
  tier: AccountMembershipLevel
  name: string
  status: 'active' | 'expired' | 'cancelled' | 'paused'
  startedAt: string
  expiresAt?: string
  conciergePriority: boolean
}

export interface MembershipPlanDTO {
  id: string
  tier: AccountMembershipLevel
  name: string
  description: string
  priceCents?: number
  currency?: string
  billingPeriod?: string
  conciergePriority: boolean
  entitlements: EntitlementCode[]
}

export interface AccountEntitlementBalanceDTO {
  code: EntitlementCode
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  resetAt?: string
}

export interface AccountSettingsDTO {
  preferences: AccountPreferenceDTO[]
}

export interface AccountPreferenceDTO {
  code: AccountPreferenceCode
  value: string | boolean | number | string[]
}

export interface ManagedProfileSummaryDTO {
  profileId: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  role: 'self' | 'parent' | 'guardian' | 'advisor'
  relationshipToProfile?: 'self' | 'father' | 'mother' | 'relative' | 'advisor'
  permission: 'owner' | 'manager' | 'viewer'
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  isPriorityProfile: boolean
  isPrimary: boolean
  verification: AccountProfileVerificationDTO
}

export interface AccountProfileVerificationDTO {
  identityStatus: ProfileVerificationStatus
  educationStatus: ProfileVerificationStatus
  incomeStatus: ProfileVerificationStatus
  maritalStatus: ProfileVerificationStatus
  advisorStatus: AdvisorReviewStatus
}

export interface AccountProfileVisibilityDTO {
  profileId: string
  fieldCode: string
  visibility: 'public' | 'member' | 'introduced' | 'owner_only' | 'hidden'
  lockedByAdvisor: boolean
}

export interface AccountEventRegistrationDTO {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
  address?: string
  date: string
  startTime: string
  endTime: string
  status: AccountEventRegistrationStatus
}

export interface AccountIntroductionSummaryDTO {
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: AccountIntroductionStatus
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
}

export interface FavoriteProfileSummaryDTO {
  favoriteId: string
  profileId: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  createdAt: string
}

export interface AccountPrivateIntroductionRoomDTO {
  roomId: string
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: AccountRoomStatus
  openedAt: string
  closedAt?: string
  lastMessage?: string
}

export interface AdvisorFollowUpDTO {
  id: string
  status: 'open' | 'done' | 'snoozed'
  priority: 'low' | 'normal' | 'high'
  note: string
  dueAt?: string
  completedAt?: string
}
