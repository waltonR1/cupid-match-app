import type { Database, MembershipLevel } from '../types/database.js'
import type { ApiLocale } from '../types/common.js'
import type { ProfileRecord } from '../types/profile.js'
import { resolveLocalizedText } from '../utils/localized.js'
import { buildProfileView } from './profile.service.js'
import { nextId } from '../utils/id.js'
import { mergeTranslatedText } from './translation.service.js'

// -- DTOs -- //

interface AccountMeDTO {
  user: { id: string; accountName: string; avatarUrl: string; preferredLocale: string; status: string }
}

interface AccountDashboardDTO {
  user: AccountMeDTO['user']
  profiles: ManagedProfileSummaryDTO[]
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  upcomingEvents: AccountEventRegistrationDTO[]
  recentIntroductions: AccountIntroductionSummaryDTO[]
  favoriteCount: number
  userVisibleFollowUps: AdvisorFollowUpDTO[]
}

interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

interface AccountProfileDetailDTO {
  profileId: string
  profileType: ProfileRecord['profileType']
  displayName: string
  avatarUrl: string
  isBlankDraft: boolean
  ownership: {
    relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
    permission: Database['profile_ownerships'][number]['permission']
    status: Database['profile_ownerships'][number]['status']
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
    isPrimary: boolean
  }
  verification: AccountProfileVerificationDTO
  visibility: AccountProfileVisibilityDTO[]
  contact: AccountProfileContactDTO
  photos: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number; status: Database['profile_photos'][number]['status'] }>
  gender: string
  birthYear: number
  height: number
  city: string
  country: string
  nationality: string
  languages: string[]
  profileStatus: string
  isPriorityProfile: boolean
  lastActiveAt: string
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
  degreeLevel: string
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: string
  hasChildren: boolean
  childrenPlan: string
  acceptsLongDistance: boolean
  datingIntentionCode: string
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
  smoking: string
  drinking: string
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

interface AccountMembershipDTO {
  tier: MembershipLevel
  name: string
  status: Database['user_memberships'][number]['status']
  startedAt: string
  expiresAt?: string
  conciergePriority: boolean
}

interface MembershipPlanDTO {
  id: string
  tier: MembershipLevel
  name: string
  description: string
  priceCents?: number
  currency?: string
  billingPeriod?: string
  conciergePriority: boolean
  entitlements: Database['membership_entitlements'][number]['code'][]
}

interface AccountEntitlementBalanceDTO {
  code: Database['membership_entitlements'][number]['code']
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  resetAt?: string
}

interface AccountSettingsDTO {
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

interface AccountAuthIdentityDTO {
  id: string
  provider: Database['auth_identities'][number]['provider']
  identifier: string
  verifiedAt?: string
}

interface AccountPasswordSecurityDTO {
  isSet: boolean
  lastChangedAt?: string
  canReset: boolean
  requiresMfa: boolean
}

interface AccountPreferencesDTO {
  preferredCity?: string
  preferredContactChannel?: Database['user_preferences'][number]['preferredContactChannel']
  advisorContactEnabled: boolean
  familyAssistEnabled: boolean
  introductionUpdatesEnabled: boolean
  eventRemindersEnabled: boolean
  serviceAnnouncementsEnabled: boolean
  marketingEmailsEnabled: boolean
  analyticsConsentEnabled: boolean
}

interface ManagedProfileSummaryDTO {
  profileId: string
  profileType: ProfileRecord['profileType']
  displayName: string
  avatarUrl: string
  age: number
  city: string
  relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
  permission: Database['profile_ownerships'][number]['permission']
  ownershipStatus: Database['profile_ownerships'][number]['status']
  profileStatus: string
  isPriorityProfile: boolean
  isPrimary: boolean
  verification: AccountProfileVerificationDTO
}

interface AccountProfileVerificationDTO {
  identityStatus: Database['profile_verifications'][number]['identityStatus']
  educationStatus: Database['profile_verifications'][number]['educationStatus']
  incomeStatus: Database['profile_verifications'][number]['incomeStatus']
  maritalStatus: Database['profile_verifications'][number]['maritalStatus']
  reviewStatus: Database['profile_verifications'][number]['reviewStatus']
  verifiedAt?: string
  verifiedByUserId?: string
}

interface AccountProfileContactDTO {
  phone?: string
  phoneVerificationStatus: Database['profile_contacts'][number]['phoneVerificationStatus']
  email?: string
  emailVerificationStatus: Database['profile_contacts'][number]['emailVerificationStatus']
  wechat?: string
  wechatVerificationStatus: Database['profile_contacts'][number]['wechatVerificationStatus']
  preferredChannel?: Database['profile_contacts'][number]['preferredChannel']
  visibility: Database['profile_contacts'][number]['visibility']
}

interface AccountProfileVisibilityDTO {
  profileId: string
  fieldCode: string
  visibility: Database['profile_visibility_settings'][number]['visibility']
  lockedByAdvisor: boolean
}

interface AccountEventRegistrationDTO {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  status: Database['event_registrations'][number]['status']
}

interface AccountIntroductionSummaryDTO {
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: string
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
}

interface FavoriteProfileSummaryDTO {
  favoriteId: string
  profileId: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  createdAt: string
}

interface AccountPrivateIntroductionRoomDTO {
  roomId: string
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: string
  openedAt: string
  closedAt?: string
  lastMessage?: string
}

interface AdvisorFollowUpDTO {
  id: string
  status: 'open' | 'done' | 'snoozed'
  priority: 'low' | 'normal' | 'high'
  note: string
  dueAt?: string
  completedAt?: string
}

type AccountProfileMutablePayload = {
  gender: ProfileRecord['gender']
  birthYear: number
  height: number
  city: string
  country: string
  nationality: string
  languages: string[]
  degreeLevel: ProfileRecord['degreeLevel']
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: ProfileRecord['maritalStatus']
  hasChildren: boolean
  childrenPlan: ProfileRecord['childrenPlan']
  acceptsLongDistance: boolean
  datingIntentionCode: ProfileRecord['datingIntentionCode']
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
  smoking: ProfileRecord['smoking']
  drinking: ProfileRecord['drinking']
  exercise: string
  activityLevel: string
  weekendStyle: string
  pets: string
  personalityTraits: string[]
  interests: string[]
  communicationStyle: string
  summary: string
  tags: string[]
  familyVisible: boolean
  allowFamilyContact: boolean
  familyPriority: boolean
}

interface AccountManagedProfileCreatePayload {
  profileType?: ProfileRecord['profileType']
  relationshipToProfile?: Database['profile_ownerships'][number]['relationshipToProfile']
}

type AccountProfileUpdatePayload = AccountProfileMutablePayload

interface AccountProfileOwnershipUpdatePayload {
  relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
  isPrimary: boolean
}

type AccountProfileContactUpdatePayload = Partial<Pick<AccountProfileContactDTO,
  | 'phone'
  | 'email'
  | 'wechat'
  | 'preferredChannel'
  | 'visibility'
>>

interface AccountProfileVisibilityUpdatePayload {
  entries: Array<{ fieldCode: string; visibility: Database['profile_visibility_settings'][number]['visibility'] }>
}

interface ProfilePhotoMutationPayload {
  url: string
  isPrimary?: boolean
  sortOrder?: number
}

interface AccountMeUpdatePayload {
  accountName?: string
  avatarUrl?: string
}

interface AccountPreferenceUpdatePayload {
  preferences: Partial<AccountPreferencesDTO>
}

interface AccountProfileArchiveResultDTO {
  profileId: string
  archivedAt: string
}

interface AccountMembershipUpgradeResultDTO {
  status: 'pending_external_flow'
  requestedTier: MembershipLevel
}

// -- Helpers -- //

function findUser(data: Database, userId: string) {
  return data.users.find((u) => u.id === userId)
}

function findActiveMembership(data: Database, userId: string) {
  return data.user_memberships.find((m) => m.userId === userId && m.status === 'active')
}

function findActivePlan(data: Database, tier: MembershipLevel) {
  return data.membership_plans.find((p) => p.tier === tier && p.isActive)
}

function findVerification(data: Database, profileId: string) {
  return data.profile_verifications.find((v) => v.profileId === profileId)
}

function findContact(data: Database, profileId: string) {
  return data.profile_contacts.find((item) => item.profileId === profileId)
}

function toContactDto(contact: Database['profile_contacts'][number] | undefined): AccountProfileContactDTO {
  return {
    phone: contact?.phone,
    phoneVerificationStatus: contact?.phoneVerificationStatus ?? 'unverified',
    email: contact?.email,
    emailVerificationStatus: contact?.emailVerificationStatus ?? 'unverified',
    wechat: contact?.wechat,
    wechatVerificationStatus: contact?.wechatVerificationStatus ?? 'unverified',
    preferredChannel: contact?.preferredChannel,
    visibility: contact?.visibility ?? 'after_introduction',
  }
}

function normalizeOptionalString(value: string | undefined) {
  const next = value?.trim()
  return next ? next : undefined
}

function resolveUserLocale(data: Database, userId: string): ApiLocale {
  const locale = findUser(data, userId)?.preferredLocale
  return locale === 'zh' || locale === 'fr' || locale === 'en' ? locale : 'zh'
}

// -- Dashboard -- //

export function getAccountDashboard(data: Database, userId: string): AccountDashboardDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const membership = findActiveMembership(data, userId)
  const plan = membership ? findActivePlan(data, membership.tier) : findActivePlan(data, 'free')
  const locale = user.preferredLocale

  const ownerships = data.profile_ownerships.filter((o) => o.userId === userId && o.status === 'active')
  const profiles = ownerships.map((o) => {
    const profile = data.profiles.find((p) => p.id === o.profileId)
    if (!profile || profile.archivedAt) return null
    return toManagedProfileSummary(data, o, profile, locale)
  }).filter((p): p is ManagedProfileSummaryDTO => p !== null)

  const entitlements = getEntitlementBalances(data, userId)

  const eventRegs = data.event_registrations
    .filter((r) => r.userId === userId && (r.status === 'requested' || r.status === 'confirmed' || r.status === 'waitlist'))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3)
    .map((r) => toAccountEventReg(data, r, locale))

  const introductions = data.private_introduction_requests
    .filter((r) => r.requesterUserId === userId)
    .sort((a, b) => b.requestedAt.localeCompare(a.requestedAt))
    .slice(0, 3)
    .map((r) => toIntroductionSummary(data, r, locale))

  const favoriteCount = data.favorite_profiles.filter((f) => f.userId === userId).length

  const followUps = data.advisor_follow_ups
    .filter((f) => f.userId === userId && f.visibility === 'user_visible' && f.status === 'open')
    .slice(0, 3)
    .map(toAdvisorFollowUp)

  return {
    user: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl,
      preferredLocale: user.preferredLocale,
      status: user.status,
    },
    profiles,
    membership: plan ? {
      tier: plan.tier,
      name: resolveLocalizedText(locale, plan.name),
      status: membership?.status ?? 'active',
      startedAt: membership?.startedAt ?? '',
      expiresAt: membership?.expiresAt,
      conciergePriority: plan.conciergePriority,
    } : null,
    entitlements,
    upcomingEvents: eventRegs,
    recentIntroductions: introductions,
    favoriteCount,
    userVisibleFollowUps: followUps,
  }
}

// -- Me -- //

export function getAccountMe(data: Database, userId: string): AccountMeDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  return {
    user: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl,
      preferredLocale: user.preferredLocale,
      status: user.status,
    },
  }
}

// -- Profiles -- //

export function getAccountProfiles(data: Database, userId: string): AccountProfilesDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const locale = user.preferredLocale
  const ownerships = data.profile_ownerships.filter((o) => o.userId === userId && o.status === 'active')

  const profiles = ownerships.map((o) => {
    const profile = data.profiles.find((p) => p.id === o.profileId)
    if (!profile || profile.archivedAt) return null
    return toManagedProfileSummary(data, o, profile, locale)
  }).filter((p): p is ManagedProfileSummaryDTO => p !== null)

  return { profiles }
}

export function getAccountProfileDetail(data: Database, userId: string, profileId: string, requestedLocale?: ApiLocale): AccountProfileDetailDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const ownership = data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId && item.status === 'active')
  const profile = data.profiles.find((item) => item.id === profileId)
  if (!ownership || !profile || profile.archivedAt) return null

  const locale = requestedLocale ?? resolveUserLocale(data, userId)
  const view = buildProfileView(data, profile)
  const verification = findVerification(data, profileId)
  const visibility = buildVisibilityDto(data, profileId)
  const contact = findContact(data, profileId)

  return {
    profileId,
    profileType: profile.profileType,
    displayName: view.displayName,
    avatarUrl: view.avatarUrl,
    isBlankDraft: isBlankDraftProfile(profile),
    ownership: {
      relationshipToProfile: ownership.relationshipToProfile,
      permission: ownership.permission,
      status: ownership.status,
      invitedByUserId: ownership.invitedByUserId,
      acceptedAt: ownership.acceptedAt,
      revokedAt: ownership.revokedAt,
      isPrimary: ownership.isPrimary,
    },
    verification: {
      identityStatus: verification?.identityStatus ?? 'unverified',
      educationStatus: verification?.educationStatus ?? 'unverified',
      incomeStatus: verification?.incomeStatus ?? 'unverified',
      maritalStatus: verification?.maritalStatus ?? 'unverified',
      reviewStatus: verification?.reviewStatus ?? 'unreviewed',
      verifiedAt: verification?.verifiedAt,
      verifiedByUserId: verification?.verifiedByUserId,
    },
    visibility,
    contact: toContactDto(contact),
    photos: data.profile_photos
      .filter((item) => item.profileId === profileId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        id: item.id,
        url: item.url,
        isPrimary: item.isPrimary,
        sortOrder: item.sortOrder,
        status: item.status,
      })),
    gender: profile.gender,
    birthYear: profile.birthYear,
    height: profile.height,
    city: resolveLocalizedText(locale, profile.city),
    country: resolveLocalizedText(locale, profile.country),
    nationality: resolveLocalizedText(locale, profile.nationality),
    languages: profile.languages,
    profileStatus: profile.profileStatus,
    isPriorityProfile: profile.isPriorityProfile,
    lastActiveAt: profile.lastActiveAt,
    familyVisible: profile.familyVisible,
    allowFamilyContact: profile.allowFamilyContact,
    familyPriority: profile.familyPriority,
    degreeLevel: profile.degreeLevel,
    education: resolveLocalizedText(locale, profile.education),
    industry: resolveLocalizedText(locale, profile.industry),
    careerDirection: profile.careerDirection ? resolveLocalizedText(locale, profile.careerDirection) : undefined,
    maritalStatus: profile.maritalStatus,
    hasChildren: profile.hasChildren,
    childrenPlan: profile.childrenPlan,
    acceptsLongDistance: profile.acceptsLongDistance,
    datingIntentionCode: profile.datingIntentionCode,
    relationshipPlan: resolveLocalizedText(locale, profile.relationshipPlan),
    residencePlan: resolveLocalizedText(locale, profile.residencePlan),
    relocationWillingness: resolveLocalizedText(locale, profile.relocationWillingness),
    values: profile.values.map((item) => resolveLocalizedText(locale, item)),
    preferredAgeMin: profile.preferredAgeMin,
    preferredAgeMax: profile.preferredAgeMax,
    locationScope: resolveLocalizedText(locale, profile.locationScope),
    preferredEducation: resolveLocalizedText(locale, profile.preferredEducation),
    familyPlan: resolveLocalizedText(locale, profile.familyPlan),
    dealBreakers: profile.dealBreakers.map((item) => resolveLocalizedText(locale, item)),
    smoking: profile.smoking,
    drinking: profile.drinking,
    exercise: resolveLocalizedText(locale, profile.exercise),
    activityLevel: resolveLocalizedText(locale, profile.activityLevel),
    weekendStyle: resolveLocalizedText(locale, profile.weekendStyle),
    pets: resolveLocalizedText(locale, profile.pets),
    personalityTraits: profile.personalityTraits.map((item) => resolveLocalizedText(locale, item)),
    interests: profile.interests.map((item) => resolveLocalizedText(locale, item)),
    communicationStyle: resolveLocalizedText(locale, profile.communicationStyle),
    summary: resolveLocalizedText(locale, profile.summary),
    tags: profile.tags.map((item) => resolveLocalizedText(locale, item)),
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  }
}

export function archiveAccountProfile(data: Database, userId: string, profileId: string):
  | { status: 'archived'; result: AccountProfileArchiveResultDTO }
  | { status: 'not_found' | 'forbidden' | 'already_archived' | 'active_flow' } {
  const ownership = data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId && item.status === 'active')
  const profile = data.profiles.find((item) => item.id === profileId)

  if (!ownership || !profile) return { status: 'not_found' }
  if (ownership.permission !== 'owner') return { status: 'forbidden' }
  if (profile.archivedAt) return { status: 'already_archived' }
  if (hasActiveProfileFlow(data, profileId)) return { status: 'active_flow' }

  const archivedAt = new Date().toISOString()
  profile.archivedAt = archivedAt
  profile.updatedAt = archivedAt

  return { status: 'archived', result: { profileId, archivedAt } }
}

export function createAccountProfile(data: Database, userId: string, locale: ApiLocale, _payload: AccountManagedProfileCreatePayload) {
  const user = findUser(data, userId)
  if (!user) return null
  const profileType = _payload?.profileType ?? 'self'
  if (profileType === 'self' && data.profile_ownerships.some((o) => {
    const ownedProfile = data.profiles.find((profile) => profile.id === o.profileId)
    return o.userId === userId && o.status === 'active' && ownedProfile?.profileType === 'self'
  })) {
    return 'duplicate_self' as const
  }
  const relationshipToProfile = profileType === 'self'
    ? 'self'
    : (_payload?.relationshipToProfile === 'self' ? 'relative' : _payload?.relationshipToProfile ?? 'relative')

  const now = new Date().toISOString()
  const profileId = nextId('p', data.profiles)
  const profile = {
    id: profileId,
    profileType,
    profileStatus: 'draft' as const,
    isPriorityProfile: false,
    lastActiveAt: now,
    createdAt: now,
    updatedAt: now,
    ...createEmptyStoredProfile(locale),
  } as ProfileRecord
  data.profiles.push(profile)
  data.profile_ownerships.push({
    id: nextId('ownership', data.profile_ownerships),
    profileId,
    userId,
    relationshipToProfile,
    permission: 'owner',
    status: 'active',
    isPrimary: false,
    createdAt: now,
    updatedAt: now,
  })
  data.profile_verifications.push({
    id: nextId('verification', data.profile_verifications),
    profileId,
    identityStatus: 'unverified',
    educationStatus: 'unverified',
    incomeStatus: 'unverified',
    maritalStatus: 'unverified',
    reviewStatus: 'unreviewed',
    createdAt: now,
    updatedAt: now,
  })
  return getAccountProfileDetail(data, userId, profileId, locale)
}

/**
 * 占位接口：正式产品中这里会进入支付或顾问确认流程，而不是直接改写会员等级。
 */
export function requestAccountMembershipUpgrade(
  data: Database,
  userId: string,
  requestedTier: MembershipLevel,
): AccountMembershipUpgradeResultDTO | null {
  if (!findUser(data, userId)) return null
  return {status: 'pending_external_flow', requestedTier}
}

export function updateAccountProfileOwnership(
  data: Database,
  userId: string,
  profileId: string,
  requestedLocale: ApiLocale,
  payload: AccountProfileOwnershipUpdatePayload,
) {
  const ownership = data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId && item.status === 'active')
  if (!ownership) return null
  if (ownership.permission !== 'owner') return 'forbidden' as const
  ownership.relationshipToProfile = payload.relationshipToProfile
  ownership.isPrimary = payload.isPrimary
  ownership.updatedAt = new Date().toISOString()
  return getAccountProfileDetail(data, userId, profileId, requestedLocale)
}

export function updateAccountProfile(data: Database, userId: string, profileId: string, locale: ApiLocale, payload: AccountProfileUpdatePayload) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (permission === 'viewer') return 'forbidden' as const
  const profile = data.profiles.find((item) => item.id === profileId)
  if (!profile) return null
  Object.assign(profile, toStoredProfilePayload(payload, locale, profile))
  profile.updatedAt = new Date().toISOString()
  return getAccountProfileDetail(data, userId, profileId, locale)
}

export function updateAccountProfileContact(data: Database, userId: string, profileId: string, requestedLocale: ApiLocale, payload: AccountProfileContactUpdatePayload) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (permission === 'viewer') return 'forbidden' as const
  const now = new Date().toISOString()
  const existing = findContact(data, profileId)
  if (existing) {
    existing.phone = normalizeOptionalString(payload.phone)
    existing.email = normalizeOptionalString(payload.email)
    existing.wechat = normalizeOptionalString(payload.wechat)
    existing.preferredChannel = payload.preferredChannel
    existing.visibility = payload.visibility ?? existing.visibility
    existing.updatedAt = now
  } else {
    data.profile_contacts.push({
      id: nextId('contact', data.profile_contacts),
      profileId,
      phone: normalizeOptionalString(payload.phone),
      phoneVerificationStatus: 'unverified',
      email: normalizeOptionalString(payload.email),
      emailVerificationStatus: 'unverified',
      wechat: normalizeOptionalString(payload.wechat),
      wechatVerificationStatus: 'unverified',
      preferredChannel: payload.preferredChannel,
      visibility: payload.visibility ?? 'after_introduction',
      createdAt: now,
      updatedAt: now,
    })
  }
  return getAccountProfileDetail(data, userId, profileId, requestedLocale)
}

export function createAccountProfilePhoto(data: Database, userId: string, profileId: string, locale: ApiLocale, payload: ProfilePhotoMutationPayload) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (permission === 'viewer') return 'forbidden' as const
  const now = new Date().toISOString()
  if (payload.isPrimary) clearPrimaryPhotos(data, profileId)
  data.profile_photos.push({
    id: nextId('photo', data.profile_photos),
    profileId,
    url: payload.url,
    isPrimary: payload.isPrimary ?? false,
    sortOrder: payload.sortOrder ?? data.profile_photos.filter((item) => item.profileId === profileId).length + 1,
    status: 'review',
    createdAt: now,
    updatedAt: now,
  })
  return getAccountProfileDetail(data, userId, profileId, locale)
}

export function updateAccountProfilePhoto(data: Database, userId: string, profileId: string, photoId: string, locale: ApiLocale, payload: ProfilePhotoMutationPayload) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (permission === 'viewer') return 'forbidden' as const
  const photo = data.profile_photos.find((item) => item.id === photoId && item.profileId === profileId)
  if (!photo) return null
  if (payload.isPrimary) clearPrimaryPhotos(data, profileId)
  photo.url = payload.url
  photo.isPrimary = payload.isPrimary ?? photo.isPrimary
  photo.sortOrder = payload.sortOrder ?? photo.sortOrder
  photo.updatedAt = new Date().toISOString()
  return getAccountProfileDetail(data, userId, profileId, locale)
}

export function deleteAccountProfilePhoto(data: Database, userId: string, profileId: string, photoId: string, requestedLocale: ApiLocale) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (permission === 'viewer') return 'forbidden' as const
  const before = data.profile_photos.length
  data.profile_photos = data.profile_photos.filter((item) => !(item.id === photoId && item.profileId === profileId))
  return before === data.profile_photos.length ? null : getAccountProfileDetail(data, userId, profileId, requestedLocale)
}

export function updateAccountProfileVisibility(data: Database, userId: string, profileId: string, payload: AccountProfileVisibilityUpdatePayload) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (permission === 'viewer') return 'forbidden' as const
  const isLocked = data.profile_visibility_settings.some((item) =>
    item.profileId === profileId && item.lockedByAdvisor && payload.entries.some((entry) => entry.fieldCode === item.fieldCode),
  )
  if (isLocked) return 'locked' as const
  const now = new Date().toISOString()
  payload.entries.forEach((entry) => {
    const existing = data.profile_visibility_settings.find((item) => item.profileId === profileId && item.fieldCode === entry.fieldCode)
    if (existing) {
      existing.visibility = entry.visibility
      existing.updatedAt = now
      return
    }
    data.profile_visibility_settings.push({
      id: nextId('visibility', data.profile_visibility_settings),
      profileId,
      fieldCode: entry.fieldCode,
      visibility: entry.visibility,
      createdAt: now,
      updatedAt: now,
    })
  })
  return buildVisibilityDto(data, profileId)
}

export function updateAccountMe(data: Database, userId: string, payload: AccountMeUpdatePayload) {
  const user = findUser(data, userId)
  if (!user) return null
  if (payload.accountName !== undefined) user.accountName = payload.accountName
  if (payload.avatarUrl !== undefined) user.avatarUrl = payload.avatarUrl
  user.updatedAt = new Date().toISOString()
  return getAccountMe(data, userId)
}

export function updateAccountPreferences(data: Database, userId: string, payload: AccountPreferenceUpdatePayload) {
  if (!findUser(data, userId)) return null
  const now = new Date().toISOString()
  const preferences = ensureUserPreferences(data, userId, now)
  Object.assign(preferences, sanitizePreferencePatch(payload.preferences))
  preferences.updatedAt = now
  return getAccountSettings(data, userId)
}

function ensureUserPreferences(data: Database, userId: string, now = new Date().toISOString()) {
  let preferences = data.user_preferences.find((item) => item.userId === userId)
  if (!preferences) {
    preferences = {
      id: nextId('preference', data.user_preferences),
      userId,
      ...defaultAccountPreferences(),
      createdAt: now,
      updatedAt: now,
    }
    data.user_preferences.push(preferences)
  }
  return preferences
}

function defaultAccountPreferences(): AccountPreferencesDTO {
  return {
    preferredCity: '',
    preferredContactChannel: 'email',
    advisorContactEnabled: true,
    familyAssistEnabled: true,
    introductionUpdatesEnabled: true,
    eventRemindersEnabled: true,
    serviceAnnouncementsEnabled: true,
    marketingEmailsEnabled: false,
    analyticsConsentEnabled: false,
  }
}

function sanitizePreferencePatch(payload: Partial<AccountPreferencesDTO> = {}): Partial<AccountPreferencesDTO> {
  return {
    ...(payload.preferredCity !== undefined ? { preferredCity: String(payload.preferredCity) } : {}),
    ...(isPreferredContactChannel(payload.preferredContactChannel) ? { preferredContactChannel: payload.preferredContactChannel } : {}),
    ...(payload.advisorContactEnabled !== undefined ? { advisorContactEnabled: Boolean(payload.advisorContactEnabled) } : {}),
    ...(payload.familyAssistEnabled !== undefined ? { familyAssistEnabled: Boolean(payload.familyAssistEnabled) } : {}),
    ...(payload.introductionUpdatesEnabled !== undefined ? { introductionUpdatesEnabled: Boolean(payload.introductionUpdatesEnabled) } : {}),
    ...(payload.eventRemindersEnabled !== undefined ? { eventRemindersEnabled: Boolean(payload.eventRemindersEnabled) } : {}),
    ...(payload.serviceAnnouncementsEnabled !== undefined ? { serviceAnnouncementsEnabled: Boolean(payload.serviceAnnouncementsEnabled) } : {}),
    ...(payload.marketingEmailsEnabled !== undefined ? { marketingEmailsEnabled: Boolean(payload.marketingEmailsEnabled) } : {}),
    ...(payload.analyticsConsentEnabled !== undefined ? { analyticsConsentEnabled: Boolean(payload.analyticsConsentEnabled) } : {}),
  }
}

function isPreferredContactChannel(value: unknown): value is AccountPreferencesDTO['preferredContactChannel'] {
  return value === 'email' || value === 'phone' || value === 'wechat'
}

// -- Membership -- //

export function getAccountMembership(data: Database, userId: string): {
  membership: AccountMembershipDTO | null
  entitlements: AccountEntitlementBalanceDTO[]
  availablePlans: MembershipPlanDTO[]
} | null {
  const user = findUser(data, userId)
  if (!user) return null

  const membership = findActiveMembership(data, userId)
  const plan = membership ? findActivePlan(data, membership.tier) : findActivePlan(data, 'free')
  const locale = user.preferredLocale

  return {
    membership: plan ? {
      tier: plan.tier,
      name: resolveLocalizedText(locale, plan.name),
      status: membership?.status ?? 'active',
      startedAt: membership?.startedAt ?? '',
      expiresAt: membership?.expiresAt,
      conciergePriority: plan.conciergePriority,
    } : null,
    entitlements: getEntitlementBalances(data, userId),
    availablePlans: data.membership_plans
      .filter((item) => item.isActive)
      .map((item) => ({
        id: item.id,
        tier: item.tier,
        name: resolveLocalizedText(locale, item.name),
        description: resolveLocalizedText(locale, item.description),
        priceCents: item.priceCents,
        currency: item.currency,
        billingPeriod: item.billingPeriod,
        conciergePriority: item.conciergePriority,
        entitlements: data.membership_entitlements
          .filter((entitlement) => entitlement.planId === item.id)
          .map((entitlement) => entitlement.code),
      })),
  }
}

// -- Events -- //

export function getAccountEvents(data: Database, userId: string): AccountEventRegistrationDTO[] {
  const locale = resolveUserLocale(data, userId)
  return data.event_registrations
    .filter((r) => r.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((r) => toAccountEventReg(data, r, locale))
}

// -- Favorites -- //

export function getAccountFavorites(data: Database, userId: string): FavoriteProfileSummaryDTO[] {
  const locale = resolveUserLocale(data, userId)
  return data.favorite_profiles
    .filter((f) => f.userId === userId)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
    .map((f) => {
      const profile = data.profiles.find((p) => p.id === f.profileId)
      if (!profile) return null
      const view = buildProfileView(data, profile)
      return {
        favoriteId: f.id,
        profileId: profile.id,
        displayName: view.displayName,
        avatarUrl: view.avatarUrl,
        age: view.age,
        city: resolveLocalizedText(locale, profile.city),
        createdAt: f.savedAt,
      }
    })
    .filter((f): f is FavoriteProfileSummaryDTO => f !== null)
}

// -- Introductions -- //

export function getAccountIntroductions(data: Database, userId: string): AccountIntroductionSummaryDTO[] {
  const locale = resolveUserLocale(data, userId)
  return data.private_introduction_requests
    .filter((r) => r.requesterUserId === userId)
    .sort((a, b) => b.requestedAt.localeCompare(a.requestedAt))
    .map((r) => toIntroductionSummary(data, r, locale))
}

// -- Rooms -- //

export function getAccountRooms(data: Database, userId: string): AccountPrivateIntroductionRoomDTO[] {
  const locale = resolveUserLocale(data, userId)
  return data.private_introduction_rooms
    .filter((r) => r.requesterUserId === userId)
    .sort((a, b) => b.openedAt.localeCompare(a.openedAt))
    .map((r) => {
      const targetProfile = data.profiles.find((p) => p.id === r.targetProfileId)
      const view = targetProfile ? buildProfileView(data, targetProfile) : null
      const lastMsg = data.private_introduction_room_messages
        .filter((m) => m.roomId === r.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]

      return {
        roomId: r.id,
        requestId: r.requestId,
        targetProfileId: r.targetProfileId,
        targetDisplayName: view?.displayName ?? '',
        targetAvatarUrl: view?.avatarUrl ?? '',
        status: r.status,
        openedAt: r.openedAt,
        closedAt: r.closedAt,
        lastMessage: lastMsg?.body?.slice(0, 100),
      }
    })
}

// -- Settings -- //

export function getAccountSettings(data: Database, userId: string): AccountSettingsDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const identities = data.auth_identities
    .filter((item) => item.userId === userId)
    .map((item) => ({
      id: item.id,
      provider: item.provider,
      identifier: item.identifier,
      verifiedAt: item.verifiedAt,
    }))
  const passwordIdentity = data.auth_identities.find((item) => item.userId === userId && Boolean(item.passwordHash))

  return {
    account: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl,
      preferredLocale: user.preferredLocale,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    identities,
    password: {
      isSet: Boolean(passwordIdentity),
      lastChangedAt: passwordIdentity?.updatedAt,
      canReset: identities.some((item) => item.provider === 'email' || item.provider === 'phone'),
      requiresMfa: false,
    },
    preferences: toAccountPreferencesDto(ensureUserPreferences(data, userId)),
  }
}

function toAccountPreferencesDto(preferences: Database['user_preferences'][number]): AccountPreferencesDTO {
  return {
    preferredCity: preferences.preferredCity,
    preferredContactChannel: preferences.preferredContactChannel,
    advisorContactEnabled: preferences.advisorContactEnabled,
    familyAssistEnabled: preferences.familyAssistEnabled,
    introductionUpdatesEnabled: preferences.introductionUpdatesEnabled,
    eventRemindersEnabled: preferences.eventRemindersEnabled,
    serviceAnnouncementsEnabled: preferences.serviceAnnouncementsEnabled,
    marketingEmailsEnabled: preferences.marketingEmailsEnabled,
    analyticsConsentEnabled: preferences.analyticsConsentEnabled,
  }
}

// -- Internal helpers -- //

function toManagedProfileSummary(
  data: Database,
  ownership: Database['profile_ownerships'][number],
  profile: Database['profiles'][number],
  locale: ApiLocale,
): ManagedProfileSummaryDTO {
  const view = buildProfileView(data, profile)
  const verif = findVerification(data, profile.id)
  return {
    profileId: profile.id,
    profileType: profile.profileType,
    displayName: view.displayName,
    avatarUrl: view.avatarUrl,
    age: view.age,
    city: resolveLocalizedText(locale, profile.city),
    relationshipToProfile: ownership.relationshipToProfile,
    permission: ownership.permission,
    ownershipStatus: ownership.status,
    profileStatus: profile.profileStatus,
    isPriorityProfile: profile.isPriorityProfile,
    isPrimary: ownership.isPrimary,
    verification: {
      identityStatus: verif?.identityStatus ?? 'unverified',
      educationStatus: verif?.educationStatus ?? 'unverified',
      incomeStatus: verif?.incomeStatus ?? 'unverified',
      maritalStatus: verif?.maritalStatus ?? 'unverified',
      reviewStatus: verif?.reviewStatus ?? 'unreviewed',
      verifiedAt: verif?.verifiedAt,
      verifiedByUserId: verif?.verifiedByUserId,
    },
  }
}

function hasActiveProfileFlow(data: Database, profileId: string): boolean {
  return data.private_introduction_requests.some((request) =>
    request.targetProfileId === profileId && (request.status === 'requested' || request.status === 'accepted'),
  ) || data.private_introduction_rooms.some((room) =>
    room.targetProfileId === profileId && (room.status === 'open' || room.status === 'paused'),
  )
}

function resolveProfileWritePermission(data: Database, userId: string, profileId: string) {
  return data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId && item.status === 'active')?.permission
}

function buildVisibilityDto(data: Database, profileId: string): AccountProfileVisibilityDTO[] {
  return data.profile_visibility_settings
    .filter((item) => item.profileId === profileId)
    .map((item) => ({
      profileId,
      fieldCode: item.fieldCode,
      visibility: item.visibility,
      lockedByAdvisor: item.lockedByAdvisor ?? false,
    }))
}

function toStoredProfilePayload(payload: Partial<AccountProfileMutablePayload>, locale: ApiLocale, current?: ProfileRecord): Partial<ProfileRecord> {
  const textFields = [
    'city', 'country', 'nationality', 'education', 'industry', 'careerDirection', 'relationshipPlan',
    'residencePlan', 'relocationWillingness', 'locationScope', 'preferredEducation', 'familyPlan', 'exercise',
    'activityLevel', 'weekendStyle', 'pets', 'communicationStyle', 'summary',
  ] as const
  const textArrayFields = ['values', 'dealBreakers', 'personalityTraits', 'interests', 'tags'] as const
  const next: Partial<ProfileRecord> = {}
  Object.entries(payload).forEach(([key, value]) => {
    if (textFields.includes(key as never) || textArrayFields.includes(key as never)) return
    ;(next as Record<string, unknown>)[key] = value
  })
  textFields.forEach((key) => {
    const value = payload[key]
    if (value === undefined) return
    next[key] = mergeTranslatedText(current?.[key], locale, value) as never
  })
  textArrayFields.forEach((key) => {
    const value = payload[key]
    if (value === undefined) return
    next[key] = value.map((item, index) => mergeTranslatedText(current?.[key]?.[index], locale, item)) as never
  })
  return next
}

function createEmptyStoredProfile(locale: ApiLocale): Partial<ProfileRecord> {
  return {
    gender: 'female',
    birthYear: 0,
    height: 0,
    city: mergeTranslatedText(undefined, locale, ''),
    country: mergeTranslatedText(undefined, locale, ''),
    nationality: mergeTranslatedText(undefined, locale, ''),
    languages: [],
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'bachelor',
    education: mergeTranslatedText(undefined, locale, ''),
    industry: mergeTranslatedText(undefined, locale, ''),
    maritalStatus: 'never_married',
    hasChildren: false,
    childrenPlan: 'open_to_discuss',
    acceptsLongDistance: false,
    datingIntentionCode: 'serious',
    relationshipPlan: mergeTranslatedText(undefined, locale, ''),
    residencePlan: mergeTranslatedText(undefined, locale, ''),
    relocationWillingness: mergeTranslatedText(undefined, locale, ''),
    values: [],
    preferredAgeMin: 0,
    preferredAgeMax: 0,
    locationScope: mergeTranslatedText(undefined, locale, ''),
    preferredEducation: mergeTranslatedText(undefined, locale, ''),
    familyPlan: mergeTranslatedText(undefined, locale, ''),
    dealBreakers: [],
    smoking: 'never',
    drinking: 'never',
    exercise: mergeTranslatedText(undefined, locale, ''),
    activityLevel: mergeTranslatedText(undefined, locale, ''),
    weekendStyle: mergeTranslatedText(undefined, locale, ''),
    pets: mergeTranslatedText(undefined, locale, ''),
    personalityTraits: [],
    interests: [],
    communicationStyle: mergeTranslatedText(undefined, locale, ''),
    summary: mergeTranslatedText(undefined, locale, ''),
    tags: [],
  }
}

function isBlankDraftProfile(profile: ProfileRecord) {
  return profile.profileStatus === 'draft'
    && profile.birthYear === 0
    && profile.height === 0
    && profile.languages.length === 0
    && !resolveLocalizedText('zh', profile.city)
    && !resolveLocalizedText('zh', profile.education)
    && !resolveLocalizedText('zh', profile.summary)
}

function clearPrimaryPhotos(data: Database, profileId: string) {
  data.profile_photos.filter((item) => item.profileId === profileId).forEach((item) => {
    item.isPrimary = false
  })
}

function getEntitlementBalances(data: Database, userId: string): AccountEntitlementBalanceDTO[] {
  return data.user_entitlement_balances
    .filter((b) => b.userId === userId)
    .map((b) => ({
      code: b.entitlementCode,
      quotaTotal: b.quotaTotal,
      quotaUsed: b.quotaUsed,
      quotaRemaining: b.quotaRemaining,
      resetAt: b.resetAt,
    }))
}

function toAccountEventReg(data: Database, reg: Database['event_registrations'][number], locale: ApiLocale): AccountEventRegistrationDTO {
  const event = data.events.find((e) => e.id === reg.eventId)
  return {
    registrationId: reg.id,
    eventId: reg.eventId,
    title: event ? resolveLocalizedText(locale, event.title) : '',
    coverImageUrl: event?.coverImageUrl ?? '',
    city: event ? resolveLocalizedText(locale, event.city) : '',
    venue: event ? resolveLocalizedText(locale, event.venue) : '',
    date: event?.date ?? '',
    startTime: event?.startTime ?? '',
    endTime: event?.endTime ?? '',
    status: reg.status === 'attended' ? 'attended' : reg.status,
  }
}

function toIntroductionSummary(
  data: Database,
  req: Database['private_introduction_requests'][number],
  locale: ApiLocale,
): AccountIntroductionSummaryDTO {
  const targetProfileId = req.targetProfileId
  const profile = data.profiles.find((p) => p.id === targetProfileId)
  const view = profile ? buildProfileView(data, profile) : null
  return {
    requestId: req.id,
    targetProfileId,
    targetDisplayName: view?.displayName ?? '',
    targetAvatarUrl: view?.avatarUrl ?? '',
    status: req.status,
    requestedAt: req.requestedAt,
    respondedAt: req.respondedAt,
    cooldownUntil: req.cooldownUntil,
  }
}

function toAdvisorFollowUp(f: Database['advisor_follow_ups'][number]): AdvisorFollowUpDTO {
  return {
    id: f.id,
    status: f.status,
    priority: f.priority,
    note: resolveLocalizedText('zh', f.note),
    dueAt: f.dueAt,
    completedAt: f.completedAt,
  }
}
