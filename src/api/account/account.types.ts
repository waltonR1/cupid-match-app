export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'
export type EntitlementCode = 'private_introduction' | 'event_priority' | 'staff_review' | 'profile_detail_access'
export type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
export type ProfileReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
export type PreferredContactChannel = 'email' | 'phone' | 'wechat'
export type AccountEventRegistrationStatus = 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
export type AccountIntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired' | 'cooldown'
export type AccountProfileType = 'self' | 'family'
export type AccountProfileRelationship = 'self' | 'father' | 'mother' | 'relative'
export type AccountProfileOwnershipStatus = 'pending' | 'active' | 'revoked'
export type ProfileContactVisibility = 'after_introduction' | 'owner_only' | 'disabled'
export type ProfileContactChannel = 'phone' | 'email' | 'wechat'
export type EditableLocalizedSource = 'manual' | 'machine'
export type EditableLocalizedProvider = 'human' | 'translation_api' | null
export type EditableLocalizedStatus = 'ready' | 'pending' | 'failed' | 'stale' | 'missing'

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
}

export interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

export interface AccountProfileDetailDTO {
  profileId: string
  profileType: AccountProfileType
  profileName: string
  avatarUrl: string
  isBlankDraft: boolean
  ownership: {
    relationshipToProfile: AccountProfileRelationship
    permission: 'owner' | 'manager'
    status: AccountProfileOwnershipStatus
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
  }
  verification: AccountProfileVerificationDTO
  privacyPreferences: AccountProfilePrivacyPreferencesDTO
  localizedMeta: AccountProfileLocalizedMetaDTO
  contact: AccountProfileContactDTO
  photos: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number; status: 'review' | 'approved' | 'hidden' }>
  gender: 'male' | 'female'
  birthYear: number
  height: number
  city: string
  country: string
  nationality: string
  languages: string[]
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  lastActiveAt: string
  familyVisible: boolean
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  childrenPlan: 'wants' | 'open_to_discuss' | 'does_not_want'
  acceptsLongDistance: boolean
  datingIntentionCode: 'serious' | 'marriage' | 'exclusive' | 'cross_border'
  relationshipGoal: string
  residencePlan: string
  relocation: 'willing' | 'unwilling' | 'open_to_discuss'
  relationshipValues: ('honesty' | 'trust' | 'communication' | 'respect' | 'loyalty' | 'family' | 'growth' | 'support' | 'humor' | 'ambition' | 'kindness' | 'independence' | 'romance' | 'stability')[]
  preferredAgeMin: number
  preferredAgeMax: number
  preferredLocation: 'local' | 'regional' | 'national' | 'international'
  preferredEducation: string
  familyLife: string
  dealBreakers: string[]
  smoking: 'never' | 'social' | 'often'
  drinking: 'never' | 'social' | 'often'
  exercise: string
  activityLevel: 'low' | 'moderate' | 'high'
  weekendStyle: 'outdoors' | 'indoors' | 'social' | 'flexible'
  pets: 'has' | 'none' | 'likes'
  personalityTraits: string[]
  interests: string[]
  communicationStyle: 'direct' | 'indirect' | 'balanced'
  summary: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface AccountProfileLocalizedMetaDTO {
  editLocale: 'zh' | 'fr' | 'en'
  fields: Record<string, EditableLocalizedFieldMetaDTO | EditableLocalizedFieldMetaDTO[]>
}

export interface EditableLocalizedFieldMetaDTO {
  locale: 'zh' | 'fr' | 'en'
  source: EditableLocalizedSource | null
  provider: EditableLocalizedProvider
  status: EditableLocalizedStatus
  updatedAt?: string
  hasValue: boolean
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
  privateIntroductionQuota: number
  privateIntroductionPeriod: 'monthly' | 'quarterly' | 'yearly'
  eventPriorityEnabled: boolean
  staffReviewEnabled: boolean
  profileDetailAccessLevel: 'registered' | 'premium'
  conciergePriority: boolean
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  sortOrder: number
  featured: boolean
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
  profileName: string
  avatarUrl: string
  age: number
  city: string
  relationshipToProfile: AccountProfileRelationship
  permission: 'owner' | 'manager'
  ownershipStatus: AccountProfileOwnershipStatus
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  verification: AccountProfileVerificationDTO
}

export interface AccountProfileVerificationDTO {
  legalName?: string
  dateOfBirth?: string
  identityStatus: ProfileVerificationStatus
  educationStatus: ProfileVerificationStatus
  incomeStatus: ProfileVerificationStatus
  maritalStatus: ProfileVerificationStatus
  reviewStatus: ProfileReviewStatus
  verifiedByUserId?: string
}

export interface AccountProfilePrivacyPreferencesDTO {
  hideMaritalStatus: boolean
  hideHasChildren: boolean
  hideChildrenPlan: boolean
  hideAcceptsLongDistance: boolean
  hideSmoking: boolean
  hideDrinking: boolean
}

export interface AccountProfileContactDTO {
  phone?: string
  email?: string
  wechat?: string
  preferredChannel?: ProfileContactChannel
  visibility: ProfileContactVisibility
}

export interface AccountProfileArchiveResultDTO {
  profileId: string
  archivedAt: string
}

export type AccountProfileMutablePayload = Pick<AccountProfileDetailDTO,
  | 'profileName'
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
  | 'relationshipGoal'
  | 'residencePlan'
  | 'relocation'
  | 'relationshipValues'
  | 'preferredAgeMin'
  | 'preferredAgeMax'
  | 'preferredLocation'
  | 'preferredEducation'
  | 'familyLife'
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
>

export type AccountProfileUpdatePayload = AccountProfileMutablePayload

export interface AccountProfileOwnershipUpdatePayload {
  relationshipToProfile: AccountProfileRelationship
}

export type AccountProfileContactUpdatePayload = Partial<Pick<AccountProfileContactDTO,
  | 'phone'
  | 'email'
  | 'wechat'
  | 'preferredChannel'
  | 'visibility'
>>

export type AccountProfilePrivacyPreferencesUpdatePayload = Partial<AccountProfilePrivacyPreferencesDTO>

export interface AccountProfileVerificationUpdatePayload {
  legalName?: string
  dateOfBirth?: string
}

export interface AccountProfilePhotoSavePayload {
  id?: string
  url: string
  isPrimary: boolean
  sortOrder: number
  delete?: boolean
}

export interface AccountProfileDetailSavePayload {
  profileId?: string
  profileType: AccountProfileType
  ownership: AccountProfileOwnershipUpdatePayload
  profile: AccountProfileUpdatePayload
  contact: AccountProfileContactUpdatePayload
  verification: AccountProfileVerificationUpdatePayload
  photos: AccountProfilePhotoSavePayload[]
}

export interface AccountMeUpdatePayload {
  accountName?: string
  avatarUrl?: string
  preferredLocale?: 'zh' | 'en' | 'fr'
}

export interface AccountPasswordChangePayload {
  currentPassword: string
  newPassword: string
  challengeToken?: string
}

export interface AccountPasswordChangeResultDTO {
  passwordUpdatedAt: string
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

export interface AccountExportResultDTO {
  status: 'generated'
  downloadUrl: string
}

export interface AccountSensitiveActionPayload {
  challengeToken?: string
}

export interface AccountDeactivateResultDTO {
  status: 'deactivated'
  deactivatedAt: string
}

export interface AccountMfaStatusDTO {
  enabled: boolean
  method?: 'email' | 'phone'
  identityId?: string
  identityLabel?: string
  enabledAt?: string
  availableMethods: Array<{
    method: 'email' | 'phone'
    identityId: string
    maskedIdentifier: string
    label: string
  }>
}

export interface AccountMfaVerificationCodePayload {
  method: 'email' | 'phone'
  identityId: string
}

export interface AccountMfaEnablePayload {
  method: 'email' | 'phone'
  identityId: string
  code: string
}

export interface AccountMfaDisablePayload {
  code: string
}

export interface AccountSecurityChallengeCodeResultDTO {
  id: string
  expiresAt: string
  maskedIdentifier: string
}

export type AccountSecurityChallengeAction = 'change_password' | 'deactivate_account' | 'export_data' | 'unbind_identity'

export interface AccountSecurityChallengeCodePayload {
  action: AccountSecurityChallengeAction
}

export interface AccountSecurityChallengeVerifyPayload {
  action: AccountSecurityChallengeAction
  code: string
}

export interface AccountSecurityChallengeResultDTO {
  challengeToken: string
  expiresAt: string
}

export interface AccountIdentityCreatePayload {
  provider: 'email' | 'phone'
  identifier: string
  code: string
}

export interface VerificationCodeRequestPayload {
  provider: 'email' | 'phone'
  identifier: string
}

export interface VerificationCodeRequestResultDTO {
  id: string
  expiresAt: string
}

export interface AccountIdentityActionResultDTO {
  identity: AccountAuthIdentityDTO
}

export interface AccountIdentityDeleteResultDTO {
  removed: boolean
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

export interface IntroductionContactDTO {
  available: true
  phone: string | null
  email: string | null
  wechat: string | null
  preferredChannel: 'phone' | 'email' | 'wechat' | null
  visibility: string
}

export interface FavoriteActionResult {
  favoriteId: string
  alreadyFavorited: boolean
}

export interface IntroductionContactUnavailableDTO {
  available: false
  reason: 'not_found' | 'forbidden' | 'not_accepted' | 'contact_unavailable' | 'visibility_restricted'
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
  profileType: AccountProfileType
  displayName: string
  avatarUrl: string
  age: number
  city: string
  education: string
  industry: string
  summary: string
  tags: string[]
  createdAt: string
}
