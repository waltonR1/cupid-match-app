export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type EntitlementCode = 'private_introduction' | 'event_priority' | 'advisor_review' | 'profile_detail_access'
export type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
export type ProfileReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
export type PreferredContactChannel = 'email' | 'phone' | 'wechat'
export type AccountEventRegistrationStatus = 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
export type AccountIntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired' | 'cooldown'
export type AccountRoomStatus = 'open' | 'paused' | 'closed'
export type AccountProfileType = 'self' | 'family'
export type AccountProfileRelationship = 'self' | 'father' | 'mother' | 'relative'
export type AccountProfileOwnershipStatus = 'pending' | 'active' | 'revoked'

export interface AccountMeDTO {
  user: { id: string; accountName: string; avatarUrl: string; preferredLocale: string; status: string }
}

export interface AccountDashboardDTO {
  user: AccountMeDTO['user']
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
  profileType: AccountProfileType
  displayName: string
  avatarUrl: string
  isBlankDraft: boolean
  ownership: {
    relationshipToProfile: AccountProfileRelationship
    permission: 'owner' | 'manager' | 'viewer'
    status: AccountProfileOwnershipStatus
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
    isPrimary: boolean
  }
  verification: AccountProfileVerificationDTO
  visibility: AccountProfileVisibilityDTO[]
  contactMethods: Array<{
    type: 'phone' | 'email' | 'wechat'
    value: string
    visibleAfterIntroduction: boolean
  }>
  photos: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number; status: 'review' | 'approved' | 'hidden' }>
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
  account: {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: string
    status: string
    createdAt: string
    updatedAt: string
  }
  identities: AccountAuthIdentityDTO[]
  password: AccountPasswordSecurityDTO
  preferences: AccountPreferencesDTO
}

export interface AccountAuthIdentityDTO {
  id: string
  provider: 'email' | 'phone' | 'wechat' | 'google'
  identifier: string
  verifiedAt?: string
}

export interface AccountPasswordSecurityDTO {
  isSet: boolean
  lastChangedAt?: string
  canReset: boolean
  requiresMfa: boolean
}

export interface AccountPreferencesDTO {
  preferredCity?: string
  preferredContactChannel?: PreferredContactChannel
  advisorContactEnabled: boolean
  familyAssistEnabled: boolean
  introductionUpdatesEnabled: boolean
  eventRemindersEnabled: boolean
  serviceAnnouncementsEnabled: boolean
  marketingEmailsEnabled: boolean
  analyticsConsentEnabled: boolean
}

export interface ManagedProfileSummaryDTO {
  profileId: string
  profileType: AccountProfileType
  displayName: string
  avatarUrl: string
  age: number
  city: string
  relationshipToProfile: AccountProfileRelationship
  permission: 'owner' | 'manager' | 'viewer'
  ownershipStatus: AccountProfileOwnershipStatus
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
  reviewStatus: ProfileReviewStatus
  verifiedAt?: string
  verifiedByUserId?: string
}

export interface AccountProfileVisibilityDTO {
  profileId: string
  fieldCode: string
  visibility: 'public' | 'member' | 'introduced' | 'owner_only' | 'hidden'
  lockedByAdvisor: boolean
}

export interface AccountProfileArchiveResultDTO {
  profileId: string
  archivedAt: string
}

export type AccountManagedProfileOwnershipPayload = {
  relationshipToProfile: AccountProfileRelationship
  isPrimary?: boolean
}

export type AccountProfileMutablePayload = Pick<AccountProfileDetailDTO,
  | 'gender'
  | 'birthYear'
  | 'height'
  | 'city'
  | 'country'
  | 'nationality'
  | 'languages'
  | 'degreeLevel'
  | 'education'
  | 'industry'
  | 'careerDirection'
  | 'maritalStatus'
  | 'hasChildren'
  | 'childrenPlan'
  | 'acceptsLongDistance'
  | 'datingIntentionCode'
  | 'relationshipPlan'
  | 'residencePlan'
  | 'relocationWillingness'
  | 'values'
  | 'preferredAgeMin'
  | 'preferredAgeMax'
  | 'locationScope'
  | 'preferredEducation'
  | 'familyPlan'
  | 'dealBreakers'
  | 'smoking'
  | 'drinking'
  | 'exercise'
  | 'activityLevel'
  | 'weekendStyle'
  | 'pets'
  | 'personalityTraits'
  | 'interests'
  | 'communicationStyle'
  | 'summary'
  | 'tags'
  | 'familyVisible'
  | 'allowFamilyContact'
  | 'familyPriority'
>

export interface AccountManagedProfileCreatePayload {
  profileType: AccountProfileType
  relationshipToProfile: AccountProfileRelationship
}

export type AccountProfileUpdatePayload = AccountProfileMutablePayload

export interface AccountProfileOwnershipUpdatePayload {
  relationshipToProfile: AccountManagedProfileOwnershipPayload['relationshipToProfile']
  isPrimary: boolean
}

export interface AccountProfileContactMethodsUpdatePayload {
  entries: Array<{
    type: 'phone' | 'email' | 'wechat'
    value: string
    visibleAfterIntroduction: boolean
  }>
}

export interface AccountProfileVisibilityUpdatePayload {
  entries: Array<{
    fieldCode: string
    visibility: 'public' | 'member' | 'introduced' | 'owner_only' | 'hidden'
  }>
}

export interface ProfilePhotoMutationPayload {
  url: string
  isPrimary?: boolean
  sortOrder?: number
}

export interface AccountMeUpdatePayload {
  accountName?: string
  avatarUrl?: string
}

export interface AccountPreferenceUpdatePayload {
  preferences: Partial<AccountPreferencesDTO>
}

export interface AccountMembershipUpgradePayload {
  tier: 'free' | 'silver' | 'gold' | 'diamond'
}

export interface AccountMembershipUpgradeResultDTO {
  status: 'pending_external_flow'
  requestedTier: 'free' | 'silver' | 'gold' | 'diamond'
}

export interface AccountEventRegistrationDTO {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
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
