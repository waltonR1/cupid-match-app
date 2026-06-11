import type { Database, MembershipLevel } from '../types/database.js'
import type { ApiLocale, LocalizedText, LocalizedValue } from '../types/common.js'
import type { ProfileRecord } from '../types/profile.js'
import { emptyManualLocalizedText, resolveEditableLocalizedText, resolveLocalizedText } from '../utils/localized.js'
import { buildProfileView } from './profile.service.js'
import { nextId } from '../utils/id.js'
import { mockHashPassword } from '../utils/password.js'
import { generateCode, verifyAndConsume } from './verification-code.service.js'
import { getMfaStatus } from './mfa.service.js'
import { mergeManualLocalizedText, mergeTranslatedText } from './translation.service.js'
import {toMembershipPlanDTO, type MembershipPlanDTO} from './membership.service.js'

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
}

interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

interface AccountProfileDetailDTO {
  profileId: string
  profileType: ProfileRecord['profileType']
  profileName: string
  avatarUrl: string
  isBlankDraft: boolean
  ownership: {
    relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
    permission: Database['profile_ownerships'][number]['permission']
    status: Database['profile_ownerships'][number]['status']
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
  }
  verification: AccountProfileVerificationDTO
  privacyPreferences: AccountProfilePrivacyPreferencesDTO
  localizedMeta: AccountProfileLocalizedMetaDTO
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
  lastActiveAt: string
  familyVisible: boolean
  degreeLevel: string
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: string
  hasChildren: boolean
  childrenPlan: string
  acceptsLongDistance: boolean
  datingIntentionCode: string
  relationshipGoal: string
  residencePlan: string
  relocation: string
  relationshipValues: string[]
  preferredAgeMin: number
  preferredAgeMax: number
  preferredLocation: string
  preferredEducation: string
  familyLife: string
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

interface AccountEntitlementBalanceDTO {
  code: Database['user_entitlement_balances'][number]['entitlementCode']
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

interface AccountProfileLocalizedMetaDTO {
  editLocale: ApiLocale
  fields: Record<string, EditableLocalizedFieldMetaDTO | EditableLocalizedFieldMetaDTO[]>
}

interface EditableLocalizedFieldMetaDTO {
  locale: ApiLocale
  source: LocalizedValue['source'] | null
  provider: LocalizedValue['provider']
  status: LocalizedValue['status'] | 'missing'
  updatedAt?: string
  hasValue: boolean
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
  staffContactEnabled: boolean
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
  profileName: string
  avatarUrl: string
  age: number
  city: string
  relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
  permission: Database['profile_ownerships'][number]['permission']
  ownershipStatus: Database['profile_ownerships'][number]['status']
  profileStatus: string
  verification: AccountProfileVerificationDTO
}

interface AccountProfileVerificationDTO {
  legalName?: string
  dateOfBirth?: string
  identityStatus: Database['profile_verifications'][number]['identityStatus']
  educationStatus: Database['profile_verifications'][number]['educationStatus']
  incomeStatus: Database['profile_verifications'][number]['incomeStatus']
  maritalStatus: Database['profile_verifications'][number]['maritalStatus']
  reviewStatus: Database['profile_verifications'][number]['reviewStatus']
  verifiedByUserId?: string
}

interface AccountProfileContactDTO {
  phone?: string
  email?: string
  wechat?: string
  preferredChannel?: Database['profile_contacts'][number]['preferredChannel']
  visibility: Database['profile_contacts'][number]['visibility']
}

type AccountProfilePrivacyPreferencesDTO = Pick<Database['profile_privacy_preferences'][number],
  | 'hideMaritalStatus'
  | 'hideHasChildren'
  | 'hideChildrenPlan'
  | 'hideAcceptsLongDistance'
  | 'hideSmoking'
  | 'hideDrinking'
>

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
  status: Database['private_introduction_requests'][number]['status'] | 'expired' | 'cooldown'
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
}

interface FavoriteProfileSummaryDTO {
  favoriteId: string
  profileId: string
  profileType: ProfileRecord['profileType']
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

type AccountProfileMutablePayload = {
  profileName: string
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
  relationshipGoal: string
  residencePlan: string
  relocation: string
  relationshipValues: string[]
  preferredAgeMin: number
  preferredAgeMax: number
  preferredLocation: string
  preferredEducation: string
  familyLife: string
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
}

type AccountProfileCreatePayload = AccountProfileMutablePayload & {
  profileType: ProfileRecord['profileType']
  relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
  contact?: AccountProfileContactUpdatePayload
  verification?: AccountProfileVerificationUpdatePayload
}

type AccountProfileUpdatePayload = AccountProfileMutablePayload

interface AccountProfileOwnershipUpdatePayload {
  relationshipToProfile: Database['profile_ownerships'][number]['relationshipToProfile']
}

type AccountProfileContactUpdatePayload = Partial<Pick<AccountProfileContactDTO,
  | 'phone'
  | 'email'
  | 'wechat'
  | 'preferredChannel'
  | 'visibility'
>>

type AccountProfilePrivacyPreferencesUpdatePayload = Partial<AccountProfilePrivacyPreferencesDTO>

interface AccountProfileVerificationUpdatePayload {
  legalName?: string
  dateOfBirth?: string
}

interface AccountProfilePhotoSavePayload {
  id?: string
  url: string
  isPrimary: boolean
  sortOrder: number
  delete?: boolean
}

interface AccountProfileDetailSavePayload {
  profileId?: string
  profileType: ProfileRecord['profileType']
  ownership: AccountProfileOwnershipUpdatePayload
  profile: AccountProfileUpdatePayload
  contact?: AccountProfileContactUpdatePayload
  verification?: AccountProfileVerificationUpdatePayload
  photos?: AccountProfilePhotoSavePayload[]
}

interface AccountMeUpdatePayload {
  accountName?: string
  avatarUrl?: string
  preferredLocale?: 'zh' | 'en' | 'fr'
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
    email: contact?.email,
    wechat: contact?.wechat,
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
      startedAt: membership?.startedAt ?? user.createdAt,
      expiresAt: membership?.expiresAt,
      conciergePriority: plan.conciergePriority,
    } : null,
    entitlements,
    upcomingEvents: eventRegs,
    recentIntroductions: introductions,
    favoriteCount,
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
  const privacyPreferences = toPrivacyPreferencesDto(data.profile_privacy_preferences.find((item) => item.profileId === profileId))
  const contact = findContact(data, profileId)

  return {
    profileId,
    profileType: profile.profileType,
    profileName: resolveEditableLocalizedText(locale, profile.profileName),
    avatarUrl: view.avatarUrl,
    isBlankDraft: isBlankDraftProfile(profile),
    ownership: {
      relationshipToProfile: ownership.relationshipToProfile,
      permission: ownership.permission,
      status: ownership.status,
      invitedByUserId: ownership.invitedByUserId,
      acceptedAt: ownership.acceptedAt,
      revokedAt: ownership.revokedAt,
    },
    verification: {
      legalName: verification?.legalName,
      dateOfBirth: verification?.dateOfBirth,
      identityStatus: verification?.identityStatus ?? 'unverified',
      educationStatus: verification?.educationStatus ?? 'unverified',
      incomeStatus: verification?.incomeStatus ?? 'unverified',
      maritalStatus: verification?.maritalStatus ?? 'unverified',
      reviewStatus: verification?.reviewStatus ?? 'unreviewed',
      verifiedByUserId: verification?.verifiedByUserId,
    },
    privacyPreferences,
    localizedMeta: buildAccountProfileLocalizedMeta(profile, locale),
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
    city: resolveEditableLocalizedText(locale, profile.city),
    country: resolveEditableLocalizedText(locale, profile.country),
    nationality: resolveEditableLocalizedText(locale, profile.nationality),
    languages: profile.languages,
    profileStatus: profile.profileStatus,
    lastActiveAt: profile.lastActiveAt,
    familyVisible: profile.familyVisible,
    degreeLevel: profile.degreeLevel,
    education: resolveEditableLocalizedText(locale, profile.education),
    industry: resolveEditableLocalizedText(locale, profile.industry),
    careerDirection: profile.careerDirection ? resolveEditableLocalizedText(locale, profile.careerDirection) : undefined,
    maritalStatus: profile.maritalStatus,
    hasChildren: profile.hasChildren,
    childrenPlan: profile.childrenPlan,
    acceptsLongDistance: profile.acceptsLongDistance,
    datingIntentionCode: profile.datingIntentionCode,
    relationshipGoal: resolveEditableLocalizedText(locale, profile.relationshipGoal),
    residencePlan: resolveEditableLocalizedText(locale, profile.residencePlan),
    relocation: profile.relocation,
    relationshipValues: profile.relationshipValues,
    preferredAgeMin: profile.preferredAgeMin,
    preferredAgeMax: profile.preferredAgeMax,
    preferredLocation: profile.preferredLocation,
    preferredEducation: resolveEditableLocalizedText(locale, profile.preferredEducation),
    familyLife: resolveEditableLocalizedText(locale, profile.familyLife),
    dealBreakers: profile.dealBreakers.map((item) => resolveEditableLocalizedText(locale, item)),
    smoking: profile.smoking,
    drinking: profile.drinking,
    exercise: resolveEditableLocalizedText(locale, profile.exercise),
    activityLevel: profile.activityLevel,
    weekendStyle: profile.weekendStyle,
    pets: profile.pets,
    personalityTraits: profile.personalityTraits.map((item) => resolveEditableLocalizedText(locale, item)),
    interests: profile.interests.map((item) => resolveEditableLocalizedText(locale, item)),
    communicationStyle: profile.communicationStyle,
    summary: resolveEditableLocalizedText(locale, profile.summary),
    tags: profile.tags.map((item) => resolveEditableLocalizedText(locale, item)),
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

function createAccountProfileRecord(data: Database, userId: string, locale: ApiLocale, payload: AccountProfileCreatePayload) {
  const user = findUser(data, userId)
  if (!user) return null
  if (!payload || !isProfileType(payload.profileType)) return 'invalid_payload' as const
  const profileType = payload.profileType
  if (profileType === 'self' && data.profile_ownerships.some((o) => {
    const ownedProfile = data.profiles.find((profile) => profile.id === o.profileId)
    return o.userId === userId && o.status === 'active' && ownedProfile?.profileType === 'self' && !ownedProfile.archivedAt
  })) {
    return 'duplicate_self' as const
  }
  const requestedRelationship = isProfileRelationship(payload.relationshipToProfile)
    ? payload.relationshipToProfile
    : 'relative'
  const relationshipToProfile = profileType === 'self'
    ? 'self'
    : (requestedRelationship === 'self' ? 'relative' : requestedRelationship)

  const now = new Date().toISOString()
  const profileId = nextId('p', data.profiles)
  const profile = {
    id: profileId,
    profileType,
    profileStatus: 'draft' as const,
    lastActiveAt: now,
    createdAt: now,
    updatedAt: now,
    ...createEmptyStoredProfile(locale),
  } as ProfileRecord
  Object.assign(profile, toStoredProfilePayload(payload, locale, profile))
  data.profiles.push(profile)
  data.profile_internal_records.push({
    id: nextId('internal', data.profile_internal_records),
    profileId,
    isFeatured: false,
    riskFlags: [],
    createdAt: now,
    updatedAt: now,
  })
  data.profile_ownerships.push({
    id: nextId('ownership', data.profile_ownerships),
    profileId,
    userId,
    relationshipToProfile,
    permission: 'owner',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  })
  data.profile_verifications.push({
    id: nextId('verification', data.profile_verifications),
    profileId,
    legalName: normalizeOptionalString(payload.verification?.legalName),
    dateOfBirth: normalizeOptionalString(payload.verification?.dateOfBirth),
    identityStatus: 'unverified',
    educationStatus: 'unverified',
    incomeStatus: 'unverified',
    maritalStatus: 'unverified',
    reviewStatus: 'unreviewed',
    createdAt: now,
    updatedAt: now,
  })
  if (payload.contact) {
    data.profile_contacts.push({
      id: nextId('contact', data.profile_contacts),
      profileId,
      phone: normalizeOptionalString(payload.contact.phone),
      email: normalizeOptionalString(payload.contact.email),
      wechat: normalizeOptionalString(payload.contact.wechat),
      preferredChannel: payload.contact.preferredChannel,
      visibility: payload.contact.visibility ?? 'after_introduction',
      createdAt: now,
      updatedAt: now,
    })
  }
  return getAccountProfileDetail(data, userId, profileId, locale)
}


export function saveAccountProfileDetail(data: Database, userId: string, locale: ApiLocale, payload: AccountProfileDetailSavePayload) {
  if (!payload?.profile) return 'invalid_payload' as const

  if (!payload.profileId) {
    const result = createAccountProfileRecord(data, userId, locale, {
      ...payload.profile,
      profileType: payload.profileType,
      relationshipToProfile: payload.ownership?.relationshipToProfile ?? (payload.profileType === 'self' ? 'self' : 'relative'),
      contact: payload.contact,
      verification: payload.verification,
    })
    if (!result || typeof result === 'string') return result
    reconcileAccountProfilePhotos(data, result.profileId, payload.photos ?? [])
    return getAccountProfileDetail(data, userId, result.profileId, locale)
  }

  const permission = resolveProfileWritePermission(data, userId, payload.profileId)
  if (!permission) return null
  if (!canManageProfile(permission)) return 'forbidden' as const

  const profile = data.profiles.find((item) => item.id === payload.profileId)
  if (!profile || profile.archivedAt) return null

  const now = new Date().toISOString()
  if (assignChangedFields(profile, toStoredProfilePayload(payload.profile, locale, profile))) {
    profile.updatedAt = now
  }

  if (permission === 'owner' && payload.ownership) {
    const ownership = data.profile_ownerships.find((item) => item.userId === userId && item.profileId === payload.profileId && item.status === 'active')
    if (ownership && ownership.relationshipToProfile !== payload.ownership.relationshipToProfile) {
      ownership.relationshipToProfile = payload.ownership.relationshipToProfile
      ownership.updatedAt = now
    }
  }

  upsertProfileContact(data, payload.profileId, payload.contact ?? {}, now)
  upsertProfileVerification(data, payload.profileId, payload.verification ?? {}, now)
  reconcileAccountProfilePhotos(data, payload.profileId, payload.photos ?? [], now)
  return getAccountProfileDetail(data, userId, payload.profileId, locale)
}

export function requestAccountMembershipUpgrade(
  data: Database,
  userId: string,
  requestedTier: MembershipLevel,
): AccountMembershipUpgradeResultDTO | null {
  if (!findUser(data, userId)) return null
  return {status: 'pending_external_flow', requestedTier}
}

export function updateAccountProfilePrivacyPreferences(data: Database, userId: string, profileId: string, payload: AccountProfilePrivacyPreferencesUpdatePayload) {
  const permission = resolveProfileWritePermission(data, userId, profileId)
  if (!permission) return null
  if (!canManageProfile(permission)) return 'forbidden' as const
  const now = new Date().toISOString()
  const preferences = ensureProfilePrivacyPreferences(data, profileId, now)
  if (assignChangedFields(preferences, sanitizeProfilePrivacyPreferencesPatch(payload))) {
    preferences.updatedAt = now
  }
  return toPrivacyPreferencesDto(preferences)
}

function upsertProfileContact(data: Database, profileId: string, payload: AccountProfileContactUpdatePayload, now: string) {
  const existing = findContact(data, profileId)
  if (existing) {
    const changed = assignChangedFields(existing, {
      phone: normalizeOptionalString(payload.phone),
      email: normalizeOptionalString(payload.email),
      wechat: normalizeOptionalString(payload.wechat),
      preferredChannel: payload.preferredChannel,
      visibility: payload.visibility ?? existing.visibility,
    })
    if (changed) existing.updatedAt = now
    return
  }

  data.profile_contacts.push({
    id: nextId('contact', data.profile_contacts),
    profileId,
    phone: normalizeOptionalString(payload.phone),
    email: normalizeOptionalString(payload.email),
    wechat: normalizeOptionalString(payload.wechat),
    preferredChannel: payload.preferredChannel,
    visibility: payload.visibility ?? 'after_introduction',
    createdAt: now,
    updatedAt: now,
  })
}

function upsertProfileVerification(
  data: Database,
  profileId: string,
  payload: AccountProfileVerificationUpdatePayload,
  now: string,
) {
  const existing = findVerification(data, profileId)
  const legalName = normalizeOptionalString(payload.legalName)
  const dateOfBirth = normalizeOptionalString(payload.dateOfBirth)

  if (existing) {
    const identityChanged = existing.legalName !== legalName || existing.dateOfBirth !== dateOfBirth
    if (!identityChanged) return

    existing.legalName = legalName
    existing.dateOfBirth = dateOfBirth
    existing.identityStatus = legalName || dateOfBirth ? 'pending' : 'unverified'
    delete existing.verifiedAt
    delete existing.verifiedByUserId
    existing.updatedAt = now
    return
  }

  data.profile_verifications.push({
    id: nextId('verification', data.profile_verifications),
    profileId,
    legalName,
    dateOfBirth,
    identityStatus: legalName || dateOfBirth ? 'pending' : 'unverified',
    educationStatus: 'unverified',
    incomeStatus: 'unverified',
    maritalStatus: 'unverified',
    reviewStatus: 'unreviewed',
    createdAt: now,
    updatedAt: now,
  })
}

function reconcileAccountProfilePhotos(
  data: Database,
  profileId: string,
  photos: AccountProfilePhotoSavePayload[],
  now = new Date().toISOString(),
) {
  const incoming = photos.map((photo, index) => ({
    ...photo,
    sortOrder: photo.sortOrder || index + 1,
    url: photo.url.trim(),
  }))

  incoming.filter((photo) => photo.delete && photo.id).forEach((photo) => {
    data.profile_photos = data.profile_photos.filter((item) => !(item.profileId === profileId && item.id === photo.id))
  })

  incoming.filter((photo) => !photo.delete && photo.url).forEach((photo) => {
    const existing = photo.id
      ? data.profile_photos.find((item) => item.profileId === profileId && item.id === photo.id)
      : undefined

    if (existing) {
      const urlChanged = existing.url !== photo.url
      const changed = assignChangedFields(existing, {
        url: photo.url,
        isPrimary: photo.isPrimary,
        sortOrder: photo.sortOrder,
        status: urlChanged ? 'review' : existing.status,
      })
      if (changed) existing.updatedAt = now
      return
    }

    data.profile_photos.push({
      id: nextId('photo', data.profile_photos),
      profileId,
      url: photo.url,
      isPrimary: photo.isPrimary,
      sortOrder: photo.sortOrder,
      status: 'review',
      createdAt: now,
      updatedAt: now,
    })
  })

  const profilePhotos = data.profile_photos
    .filter((item) => item.profileId === profileId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
  if (profilePhotos.length === 0) return

  const primaryPhoto = profilePhotos.find((item) => item.isPrimary) ?? profilePhotos[0]
  profilePhotos.forEach((item, index) => {
    const changed = assignChangedFields(item, {
      sortOrder: index + 1,
      isPrimary: item.id === primaryPhoto.id,
    })
    if (changed) item.updatedAt = now
  })
}

export function updateAccountMe(data: Database, userId: string, payload: AccountMeUpdatePayload) {
  const user = findUser(data, userId)
  if (!user) return null

  if (payload.accountName !== undefined) {
    const accountName = payload.accountName.trim()
    if (!accountName || accountName.length > 30) return 'invalid_payload' as const
  }

  const patch: Partial<typeof user> = {}
  if (payload.accountName !== undefined) patch.accountName = payload.accountName.trim()
  if (payload.avatarUrl !== undefined) patch.avatarUrl = payload.avatarUrl.trim()
  if (payload.preferredLocale !== undefined) {
    if (!isAccountLocale(payload.preferredLocale)) return 'invalid_payload' as const
    patch.preferredLocale = payload.preferredLocale
  }
  if (assignChangedFields(user, patch)) user.updatedAt = new Date().toISOString()
  return getAccountMe(data, userId)
}

export function updateAccountPreferences(data: Database, userId: string, payload: AccountPreferenceUpdatePayload) {
  if (!findUser(data, userId)) return null
  let preferences = ensureUserPreferences(data, userId)
  if (!preferences) {
    preferences = {
      id: nextId('preference', data.user_preferences),
      userId,
      ...defaultAccountPreferences(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    data.user_preferences.push(preferences)
  }
  const now = new Date().toISOString()
  if (assignChangedFields(preferences, sanitizePreferencePatch(payload.preferences))) {
    preferences.updatedAt = now
  }
  return getAccountSettings(data, userId)
}

export function changeAccountPassword(
  data: Database,
  userId: string,
  payload: { currentPassword: string; newPassword: string },
) {
  const user = findUser(data, userId)
  if (!user) return null

  const pwIdentity = data.auth_identities.find(
    (item) => item.userId === userId && Boolean(item.passwordHash),
  )
  if (!pwIdentity || pwIdentity.passwordHash !== mockHashPassword(payload.currentPassword)) {
    return 'incorrect_current_password' as const
  }
  if (!isValidPassword(payload.newPassword)) {
    return 'invalid_password' as const
  }

  const now = new Date().toISOString()
  pwIdentity.passwordHash = mockHashPassword(payload.newPassword)
  pwIdentity.updatedAt = now
  return { passwordUpdatedAt: now }
}

function ensureUserPreferences(data: Database, userId: string) {
  return data.user_preferences.find((item) => item.userId === userId) ?? null
}

function defaultAccountPreferences(): AccountPreferencesDTO {
  return {
    preferredCity: '',
    preferredContactChannel: 'email',
    staffContactEnabled: true,
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
    ...(payload.staffContactEnabled !== undefined ? { staffContactEnabled: Boolean(payload.staffContactEnabled) } : {}),
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

function isAccountLocale(value: unknown): value is ApiLocale {
  return value === 'zh' || value === 'fr' || value === 'en'
}

function isValidPassword(value: string): boolean {
  return value.length >= 8 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value)
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
      startedAt: membership?.startedAt ?? user.createdAt,
      expiresAt: membership?.expiresAt,
      conciergePriority: plan.conciergePriority,
    } : null,
    entitlements: getEntitlementBalances(data, userId),
    availablePlans: data.membership_plans
      .filter((item) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => toMembershipPlanDTO(locale, item)),
  }
}

// -- Private Introduction Contact -- //

export function getIntroductionContact(data: Database, userId: string, requestId: string) {
  const request = data.private_introduction_requests.find((r) => r.id === requestId)
  if (!request) return { available: false as const, reason: 'not_found' as const }
  if (request.requesterUserId !== userId) return { available: false as const, reason: 'forbidden' as const }
  if (request.status !== 'accepted') return { available: false as const, reason: 'not_accepted' as const }

  const contacts = data.profile_contacts.find((c) => c.profileId === request.targetProfileId)
  if (!contacts) return { available: false as const, reason: 'contact_unavailable' as const }
  if (contacts.visibility === 'owner_only' || contacts.visibility === 'disabled') {
    return { available: false as const, reason: 'visibility_restricted' as const }
  }

  return {
    available: true as const,
    phone: maskContactValue(contacts.phone),
    email: maskContactValue(contacts.email),
    wechat: maskContactValue(contacts.wechat),
    preferredChannel: contacts.preferredChannel ?? null,
    visibility: contacts.visibility,
  }
}

function maskContactValue(value?: string) {
  if (!value) return null
  return value
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

export function addFavorite(data: Database, userId: string, profileId: string) {
  const profile = data.profiles.find((p) => p.id === profileId)
  if (!profile || profile.archivedAt) return 'unavailable' as const

  const ownProfile = data.profile_ownerships.some((o) => o.userId === userId && o.profileId === profileId && o.status === 'active')
  if (ownProfile) return 'own_profile' as const

  const existing = data.favorite_profiles.find((f) => f.userId === userId && f.profileId === profileId)
  if (existing) return { favoriteId: existing.id, alreadyFavorited: true as const }

  const now = new Date().toISOString()
  const id = nextId('fav', data.favorite_profiles)
  data.favorite_profiles.push({ id, userId, profileId, createdAt: now, updatedAt: now })
  return { favoriteId: id, alreadyFavorited: false as const }
}

export function removeFavorite(data: Database, userId: string, profileId: string) {
  const index = data.favorite_profiles.findIndex((f) => f.userId === userId && f.profileId === profileId)
  if (index === -1) return { removed: false as const }
  data.favorite_profiles.splice(index, 1)
  return { removed: true as const }
}

export function getAccountFavorites(data: Database, userId: string): FavoriteProfileSummaryDTO[] {
  const locale = resolveUserLocale(data, userId)
  return data.favorite_profiles
    .filter((f) => f.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((f) => {
      const profile = data.profiles.find((p) => p.id === f.profileId)
      if (!profile) return null
      const view = buildProfileView(data, profile)
      return {
        favoriteId: f.id,
        profileId: profile.id,
        profileType: profile.profileType,
        displayName: view.displayName,
        avatarUrl: view.avatarUrl,
        age: view.age,
        city: resolveLocalizedText(locale, profile.city),
        education: resolveLocalizedText(locale, profile.education),
        industry: resolveLocalizedText(locale, profile.industry),
        summary: resolveLocalizedText(locale, profile.summary),
        tags: profile.tags.slice(0, 3).map((item) => resolveLocalizedText(locale, item)).filter(Boolean),
        createdAt: f.createdAt,
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

// -- Settings -- //

function flattenLocalized(text: LocalizedText): { zh: string; fr: string; en: string } {
  return { zh: text.zh.value, fr: text.fr.value, en: text.en.value }
}

function formatProfileExport(profile: ProfileRecord) {
  return {
    id: profile.id,
    profileType: profile.profileType,
    profileName: flattenLocalized(profile.profileName),
    gender: profile.gender,
    birthYear: profile.birthYear,
    height: profile.height,
    city: flattenLocalized(profile.city),
    country: flattenLocalized(profile.country),
    nationality: flattenLocalized(profile.nationality),
    languages: profile.languages,
    degreeLevel: profile.degreeLevel,
    education: flattenLocalized(profile.education),
    industry: flattenLocalized(profile.industry),
    careerDirection: profile.careerDirection ? flattenLocalized(profile.careerDirection) : undefined,
    maritalStatus: profile.maritalStatus,
    hasChildren: profile.hasChildren,
    childrenPlan: profile.childrenPlan,
    acceptsLongDistance: profile.acceptsLongDistance,
    datingIntentionCode: profile.datingIntentionCode,
    relationshipGoal: flattenLocalized(profile.relationshipGoal),
    residencePlan: flattenLocalized(profile.residencePlan),
    relocation: profile.relocation,
    relationshipValues: profile.relationshipValues,
    preferredAgeMin: profile.preferredAgeMin,
    preferredAgeMax: profile.preferredAgeMax,
    preferredLocation: profile.preferredLocation,
    preferredEducation: flattenLocalized(profile.preferredEducation),
    familyLife: flattenLocalized(profile.familyLife),
    dealBreakers: profile.dealBreakers.map((d) => flattenLocalized(d)),
    smoking: profile.smoking,
    drinking: profile.drinking,
    exercise: flattenLocalized(profile.exercise),
    activityLevel: profile.activityLevel,
    weekendStyle: profile.weekendStyle,
    pets: profile.pets,
    personalityTraits: profile.personalityTraits.map((t) => flattenLocalized(t)),
    interests: profile.interests.map((i) => flattenLocalized(i)),
    communicationStyle: profile.communicationStyle,
    summary: flattenLocalized(profile.summary),
    tags: profile.tags.map((t) => flattenLocalized(t)),
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  }
}

export function exportAccountData(data: Database, userId: string) {
  const user = findUser(data, userId)
  if (!user) return null

  const ownerships = data.profile_ownerships.filter((o) => o.userId === userId && o.status !== 'revoked')
  const profileIds = ownerships.map((o) => o.profileId)
  const profiles = data.profiles.filter((p) => profileIds.includes(p.id))
  const photos = data.profile_photos.filter((p) => profileIds.includes(p.profileId))
  const contacts = data.profile_contacts.filter((c) => profileIds.includes(c.profileId))
  const preferences = data.user_preferences.find((p) => p.userId === userId)
  const membership = data.user_memberships.find((m) => m.userId === userId && m.status === 'active')
  const acceptances = data.user_agreement_acceptances.filter((a) => a.userId === userId)

  const now = new Date().toISOString()
  return {
    exportedAt: now,
    account: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl,
      preferredLocale: user.preferredLocale,
      status: user.status,
    },
    profiles: profiles.map(formatProfileExport),
    photos: photos.map((p) => ({
      id: p.id,
      url: p.url,
      isPrimary: p.isPrimary,
      sortOrder: p.sortOrder,
      status: p.status,
      createdAt: p.createdAt,
    })),
    contacts: contacts.map((c) => ({
      id: c.id,
      profileId: c.profileId,
      phone: c.phone,
      email: c.email,
      wechat: c.wechat,
      preferredChannel: c.preferredChannel,
      visibility: c.visibility,
    })),
    preferences: preferences || null,
    membership: membership
      ? { id: membership.id, tier: membership.tier, status: membership.status, startedAt: membership.startedAt, expiresAt: membership.expiresAt }
      : null,
    agreementAcceptances: acceptances.map((a) => ({
      documentType: a.documentType,
      documentVersion: a.documentVersion,
      acceptedAt: a.acceptedAt,
    })),
  }
}

export function deactivateAccount(data: Database, userId: string) {
  const user = findUser(data, userId)
  if (!user) return 'not_found' as const
  if (user.status !== 'active') return 'not_active' as const
  const now = new Date().toISOString()
  user.status = 'deactivated'
  user.updatedAt = now
  return { status: 'deactivated' as const, deactivatedAt: now }
}

export function requestIdentityVerificationCode(data: Database, userId: string, provider: string, identifier: string) {
  if (!['email', 'phone'].includes(provider)) return 'invalid_provider' as const
  const trimmed = (identifier || '').trim()
  if (!trimmed) return 'invalid_identifier' as const
  if (!isValidIdentityIdentifier(provider, trimmed)) return 'invalid_identifier' as const
  const duplicate = data.auth_identities.find((item) => item.provider === provider && item.identifier === trimmed)
  if (duplicate) return 'duplicate' as const
  const passwordIdentity = data.auth_identities.find((item) => item.userId === userId && Boolean(item.passwordHash))
  if (!passwordIdentity) return 'no_login_identity' as const
  return generateCode(provider, trimmed)
}

export function bindIdentity(data: Database, userId: string, provider: string, identifier: string, code: string) {
  if (!['email', 'phone'].includes(provider)) return 'invalid_provider' as const
  const trimmed = (identifier || '').trim()
  if (!trimmed) return 'invalid_identifier' as const
  if (!isValidIdentityIdentifier(provider, trimmed)) return 'invalid_identifier' as const
  if (!code || !code.trim()) return 'invalid_code' as const
  const duplicate = data.auth_identities.find((item) => item.provider === provider && item.identifier === trimmed)
  if (duplicate) return 'duplicate' as const
  if (!verifyAndConsume(provider, trimmed, code)) return 'invalid_code' as const
  const passwordIdentity = data.auth_identities.find((item) => item.userId === userId && Boolean(item.passwordHash))
  if (!passwordIdentity?.passwordHash) return 'no_login_identity' as const
  const now = new Date().toISOString()
  const record = {
    id: nextId('auth', data.auth_identities),
    userId,
    provider: provider as 'email' | 'phone',
    identifier: trimmed,
    passwordHash: passwordIdentity.passwordHash,
    verifiedAt: now,
    createdAt: now,
    updatedAt: now,
  }
  data.auth_identities.push(record)
  return {
    identity: { id: record.id, provider: record.provider, identifier: record.identifier, verifiedAt: record.verifiedAt },
  }
}

export function unbindIdentity(data: Database, userId: string, identityId: string) {
  const index = data.auth_identities.findIndex((item) => item.id === identityId && item.userId === userId)
  if (index === -1) return 'not_found' as const
  const target = data.auth_identities[index]
  const securitySettings = data.user_security_settings.find((item) => item.userId === userId)
  if (securitySettings?.mfaEnabled && securitySettings.mfaIdentityId === identityId) {
    return 'mfa_identity' as const
  }
  const userIdentities = data.auth_identities.filter((item) => item.userId === userId)
  const usableLoginIdentities = userIdentities.filter((item) => Boolean(item.passwordHash))
  if (Boolean(target.passwordHash) && usableLoginIdentities.length <= 1) {
    return 'last_identity' as const
  }
  data.auth_identities.splice(index, 1)
  return { removed: true }
}

function isValidIdentityIdentifier(provider: string, value: string): boolean {
  return provider === 'email'
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    : /^\+?[1-9]\d{6,14}$/.test(value.trim().replace(/[\s-]/g, ''))
}

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
      requiresMfa: getMfaStatus(data, userId).enabled,
    },
    preferences: toAccountPreferencesDto(ensureUserPreferences(data, userId)),
  }
}

function toAccountPreferencesDto(preferences: Database['user_preferences'][number] | null): AccountPreferencesDTO {
  if (!preferences) return defaultAccountPreferences()
  return {
    preferredCity: preferences.preferredCity,
    preferredContactChannel: preferences.preferredContactChannel,
    staffContactEnabled: preferences.staffContactEnabled,
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
    profileName: resolveLocalizedText(locale, profile.profileName),
    avatarUrl: view.avatarUrl,
    age: view.age,
    city: resolveLocalizedText(locale, profile.city),
    relationshipToProfile: ownership.relationshipToProfile,
    permission: ownership.permission,
    ownershipStatus: ownership.status,
    profileStatus: profile.profileStatus,
    verification: {
      identityStatus: verif?.identityStatus ?? 'unverified',
      educationStatus: verif?.educationStatus ?? 'unverified',
      incomeStatus: verif?.incomeStatus ?? 'unverified',
      maritalStatus: verif?.maritalStatus ?? 'unverified',
      reviewStatus: verif?.reviewStatus ?? 'unreviewed',
      verifiedByUserId: verif?.verifiedByUserId,
    },
  }
}

function hasActiveProfileFlow(data: Database, profileId: string): boolean {
  return data.private_introduction_requests.some((request) =>
    request.targetProfileId === profileId && (request.status === 'requested' || request.status === 'accepted'),
  )
}

function resolveProfileWritePermission(data: Database, userId: string, profileId: string) {
  return data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId && item.status === 'active')?.permission
}

function canManageProfile(permission: unknown): permission is Database['profile_ownerships'][number]['permission'] {
  return permission === 'owner' || permission === 'manager'
}

function isProfileType(value: unknown): value is ProfileRecord['profileType'] {
  return value === 'self' || value === 'family'
}

function isProfileRelationship(value: unknown): value is Database['profile_ownerships'][number]['relationshipToProfile'] {
  return value === 'self' || value === 'father' || value === 'mother' || value === 'relative'
}

function ensureProfilePrivacyPreferences(data: Database, profileId: string, now = new Date().toISOString()) {
  let preferences = data.profile_privacy_preferences.find((item) => item.profileId === profileId)
  if (!preferences) {
    preferences = {
      id: nextId('privacy', data.profile_privacy_preferences),
      profileId,
      ...defaultProfilePrivacyPreferences(),
      createdAt: now,
      updatedAt: now,
    }
    data.profile_privacy_preferences.push(preferences)
  }
  return preferences
}

function defaultProfilePrivacyPreferences(): AccountProfilePrivacyPreferencesDTO {
  return {
    hideMaritalStatus: false,
    hideHasChildren: false,
    hideChildrenPlan: false,
    hideAcceptsLongDistance: false,
    hideSmoking: false,
    hideDrinking: false,
  }
}

function sanitizeProfilePrivacyPreferencesPatch(payload: AccountProfilePrivacyPreferencesUpdatePayload = {}): AccountProfilePrivacyPreferencesUpdatePayload {
  return {
    ...(payload.hideMaritalStatus !== undefined ? { hideMaritalStatus: Boolean(payload.hideMaritalStatus) } : {}),
    ...(payload.hideHasChildren !== undefined ? { hideHasChildren: Boolean(payload.hideHasChildren) } : {}),
    ...(payload.hideChildrenPlan !== undefined ? { hideChildrenPlan: Boolean(payload.hideChildrenPlan) } : {}),
    ...(payload.hideAcceptsLongDistance !== undefined ? { hideAcceptsLongDistance: Boolean(payload.hideAcceptsLongDistance) } : {}),
    ...(payload.hideSmoking !== undefined ? { hideSmoking: Boolean(payload.hideSmoking) } : {}),
    ...(payload.hideDrinking !== undefined ? { hideDrinking: Boolean(payload.hideDrinking) } : {}),
  }
}

function assignChangedFields<T extends object>(target: T, patch: Partial<T>): boolean {
  let changed = false

  Object.entries(patch).forEach(([key, value]) => {
    const current = (target as Record<string, unknown>)[key]
    if (areEqualValues(current, value)) return

    ;(target as Record<string, unknown>)[key] = value
    changed = true
  })

  return changed
}

function areEqualValues(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

function toPrivacyPreferencesDto(preferences?: Database['profile_privacy_preferences'][number]): AccountProfilePrivacyPreferencesDTO {
  if (!preferences) return defaultProfilePrivacyPreferences()
  return {
    hideMaritalStatus: preferences.hideMaritalStatus,
    hideHasChildren: preferences.hideHasChildren,
    hideChildrenPlan: preferences.hideChildrenPlan,
    hideAcceptsLongDistance: preferences.hideAcceptsLongDistance,
    hideSmoking: preferences.hideSmoking,
    hideDrinking: preferences.hideDrinking,
  }
}

function buildAccountProfileLocalizedMeta(profile: ProfileRecord, locale: ApiLocale): AccountProfileLocalizedMetaDTO {
  const scalarFields = [
    'profileName', 'city', 'country', 'nationality', 'education', 'industry', 'careerDirection', 'relationshipGoal',
    'residencePlan', 'preferredEducation', 'familyLife', 'exercise', 'summary',
  ] as const
  const arrayFields = ['dealBreakers', 'personalityTraits', 'interests', 'tags'] as const
  const fields: AccountProfileLocalizedMetaDTO['fields'] = {}

  scalarFields.forEach((key) => {
    fields[key] = toEditableLocalizedFieldMeta(locale, profile[key])
  })
  arrayFields.forEach((key) => {
    fields[key] = profile[key].map((item) => toEditableLocalizedFieldMeta(locale, item))
  })

  return {editLocale: locale, fields}
}

function toEditableLocalizedFieldMeta(locale: ApiLocale, text?: LocalizedText): EditableLocalizedFieldMetaDTO {
  const slot = text?.[locale]
  return {
    locale,
    source: slot?.source ?? null,
    provider: slot?.provider ?? null,
    status: slot?.status ?? 'missing',
    updatedAt: slot?.updatedAt,
    hasValue: Boolean(slot?.value.trim()),
  }
}

function toStoredProfilePayload(payload: Partial<AccountProfileMutablePayload>, locale: ApiLocale, current?: ProfileRecord): Partial<ProfileRecord> {
  const directFields = [
    'gender', 'birthYear', 'height', 'languages', 'familyVisible',
    'degreeLevel', 'maritalStatus', 'hasChildren', 'childrenPlan', 'acceptsLongDistance', 'datingIntentionCode',
    'preferredAgeMin', 'preferredAgeMax', 'smoking', 'drinking',
    'relocation', 'relationshipValues', 'preferredLocation', 'activityLevel', 'weekendStyle', 'pets', 'communicationStyle',
  ] as const
  const textFields = [
    'city', 'country', 'nationality', 'education', 'industry', 'careerDirection', 'relationshipGoal',
    'residencePlan', 'preferredEducation', 'familyLife', 'exercise', 'summary',
  ] as const
  const textArrayFields = ['dealBreakers', 'personalityTraits', 'interests', 'tags'] as const
  const next: Partial<ProfileRecord> = {}
  if (payload.profileName !== undefined) {
    next.profileName = mergeManualLocalizedText(current?.profileName, locale, payload.profileName)
  }
  directFields.forEach((key) => {
    const value = payload[key]
    if (value === undefined) return
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
    profileName: emptyManualLocalizedText(),
    gender: 'female',
    birthYear: 0,
    height: 0,
    city: mergeTranslatedText(undefined, locale, ''),
    country: mergeTranslatedText(undefined, locale, ''),
    nationality: mergeTranslatedText(undefined, locale, ''),
    languages: [],
    familyVisible: false,
    degreeLevel: 'bachelor',
    education: mergeTranslatedText(undefined, locale, ''),
    industry: mergeTranslatedText(undefined, locale, ''),
    maritalStatus: 'never_married',
    hasChildren: false,
    childrenPlan: 'open_to_discuss',
    acceptsLongDistance: false,
    datingIntentionCode: 'serious',
    relationshipGoal: mergeTranslatedText(undefined, locale, ''),
    residencePlan: mergeTranslatedText(undefined, locale, ''),
    relocation: 'willing' as const,
    relationshipValues: [],
    preferredAgeMin: 0,
    preferredAgeMax: 0,
    preferredLocation: 'local' as const,
    preferredEducation: mergeTranslatedText(undefined, locale, ''),
    familyLife: mergeTranslatedText(undefined, locale, ''),
    dealBreakers: [],
    smoking: 'never',
    drinking: 'never',
    exercise: mergeTranslatedText(undefined, locale, ''),
    activityLevel: 'moderate' as const,
    weekendStyle: 'flexible' as const,
    pets: 'none' as const,
    personalityTraits: [],
    interests: [],
    communicationStyle: 'balanced' as const,
    summary: mergeTranslatedText(undefined, locale, ''),
    tags: [],
  }
}

function isBlankDraftProfile(profile: ProfileRecord) {
  return profile.profileStatus === 'draft'
    && profile.birthYear === 0
    && profile.height === 0
    && profile.languages.length === 0
    && !hasLocalizedDisplayValue(profile.city)
    && !hasLocalizedDisplayValue(profile.education)
    && !hasLocalizedDisplayValue(profile.summary)
}

function hasLocalizedDisplayValue(text: LocalizedText) {
  return Boolean(resolveLocalizedText('zh', text) || resolveLocalizedText('fr', text) || resolveLocalizedText('en', text))
}

function getEntitlementBalances(data: Database, userId: string): AccountEntitlementBalanceDTO[] {
  return data.user_entitlement_balances
    .filter((b) => b.userId === userId)
    .map((b) => ({
      code: b.entitlementCode,
      quotaTotal: b.quotaTotal,
      quotaUsed: b.quotaUsed,
      quotaRemaining: b.quotaRemaining,
      resetAt: b.periodEndsAt,
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
    status: resolveAccountIntroductionStatus(req),
    requestedAt: req.requestedAt,
    respondedAt: req.respondedAt,
    cooldownUntil: req.cooldownUntil,
  }
}

function resolveAccountIntroductionStatus(
  req: Database['private_introduction_requests'][number],
): AccountIntroductionSummaryDTO['status'] {
  if (req.status === 'requested' && req.expiresAt && Date.parse(req.expiresAt) < Date.now()) return 'expired'
  if (req.status === 'declined' && req.cooldownUntil && Date.parse(req.cooldownUntil) > Date.now()) return 'cooldown'
  return req.status
}
