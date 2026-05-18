import type { Database, MembershipLevel } from '../types/database.js'
import type { ApiLocale } from '../types/common.js'
import { resolveLocalizedText } from '../utils/localized.js'
import { buildProfileView } from './profile.service.js'

// -- DTOs -- //

interface AccountMeDTO {
  user: { id: string; accountName: string; avatarUrl: string; preferredLocale: string; status: string }
  onboarding: { path: string; step: string; profileId?: string } | null
}

interface AccountDashboardDTO {
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

interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

interface AccountProfileDetailDTO {
  profileId: string
  displayName: string
  avatarUrl: string
  ownership: {
    role: string
    relationshipToProfile?: string
    permission: string
    isPrimary: boolean
  }
  verification: AccountProfileVerificationDTO
  visibility: AccountProfileVisibilityDTO[]
  contactMethods: Array<{
    type: Database['profile_contact_methods'][number]['type']
    value: string
    visibleAfterIntroduction: boolean
  }>
  photos: Array<{ id: string; url: string; caption: string; isPrimary: boolean; sortOrder: number }>
  prompts: Array<{ id: string; promptCode: string; prompt: string; answer: string; sortOrder: number }>
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
  preferences: AccountPreferenceDTO[]
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

interface AccountPreferenceDTO {
  code: Database['user_preferences'][number]['code']
  value: string | boolean | number | string[]
}

interface ManagedProfileSummaryDTO {
  profileId: string
  displayName: string
  avatarUrl: string
  age: number
  city: string
  role: string
  relationshipToProfile?: string
  permission: string
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
  advisorStatus: Database['profile_verifications'][number]['advisorStatus']
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

interface AccountProfileArchiveResultDTO {
  profileId: string
  archivedAt: string
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

function resolveUserLocale(data: Database, userId: string): ApiLocale {
  const locale = findUser(data, userId)?.preferredLocale
  return locale === 'zh' || locale === 'fr' || locale === 'en' ? locale : 'zh'
}

// -- Dashboard -- //

export function getAccountDashboard(data: Database, userId: string): AccountDashboardDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const onboardingState = data.user_onboarding_states.find((s) => s.userId === userId)
  const membership = findActiveMembership(data, userId)
  const plan = membership ? findActivePlan(data, membership.tier) : findActivePlan(data, 'free')
  const locale = user.preferredLocale

  const ownerships = data.profile_ownerships.filter((o) => o.userId === userId)
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
    onboarding: onboardingState ? {
      path: onboardingState.path,
      step: onboardingState.step,
      profileId: onboardingState.profileId,
    } : null,
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

  const onboardingState = data.user_onboarding_states.find((s) => s.userId === userId)

  return {
    user: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl,
      preferredLocale: user.preferredLocale,
      status: user.status,
    },
    onboarding: onboardingState ? {
      path: onboardingState.path,
      step: onboardingState.step,
      profileId: onboardingState.profileId,
    } : null,
  }
}

// -- Profiles -- //

export function getAccountProfiles(data: Database, userId: string): AccountProfilesDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const locale = user.preferredLocale
  const ownerships = data.profile_ownerships.filter((o) => o.userId === userId)

  const profiles = ownerships.map((o) => {
    const profile = data.profiles.find((p) => p.id === o.profileId)
    if (!profile || profile.archivedAt) return null
    return toManagedProfileSummary(data, o, profile, locale)
  }).filter((p): p is ManagedProfileSummaryDTO => p !== null)

  return { profiles }
}

export function getAccountProfileDetail(data: Database, userId: string, profileId: string): AccountProfileDetailDTO | null {
  const user = findUser(data, userId)
  if (!user) return null

  const ownership = data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId)
  const profile = data.profiles.find((item) => item.id === profileId)
  if (!ownership || !profile || profile.archivedAt) return null

  const locale = resolveUserLocale(data, userId)
  const view = buildProfileView(data, profile)
  const verification = findVerification(data, profileId)
  const visibility = data.profile_visibility_settings
    .filter((item) => item.profileId === profileId)
    .map((item) => ({
      profileId,
      fieldCode: item.fieldCode,
      visibility: item.visibility,
      lockedByAdvisor: false,
    }))
  const contactMethods = data.profile_contact_methods
    .filter((item) => item.profileId === profileId)
    .map((item) => ({
      type: item.type,
      value: item.value,
      visibleAfterIntroduction: item.visibleAfterIntroduction,
    }))

  return {
    profileId,
    displayName: view.displayName,
    avatarUrl: view.avatarUrl,
    ownership: {
      role: ownership.role,
      relationshipToProfile: ownership.relationshipToProfile,
      permission: ownership.permission,
      isPrimary: ownership.isPrimary,
    },
    verification: {
      identityStatus: verification?.identityStatus ?? 'unverified',
      educationStatus: verification?.educationStatus ?? 'unverified',
      incomeStatus: verification?.incomeStatus ?? 'unverified',
      maritalStatus: verification?.maritalStatus ?? 'unverified',
      advisorStatus: verification?.advisorStatus ?? 'unreviewed',
    },
    visibility,
    contactMethods,
    photos: data.profile_photos
      .filter((item) => item.profileId === profileId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        id: item.id,
        url: item.url,
        caption: resolveLocalizedText(locale, item.caption),
        isPrimary: item.isPrimary,
        sortOrder: item.sortOrder,
      })),
    prompts: data.profile_prompts
      .filter((item) => item.profileId === profileId)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        id: item.id,
        promptCode: item.promptCode,
        prompt: resolveLocalizedText(locale, item.prompt),
        answer: resolveLocalizedText(locale, item.answer),
        sortOrder: item.sortOrder,
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
  const ownership = data.profile_ownerships.find((item) => item.userId === userId && item.profileId === profileId)
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

  const preferences = data.user_preferences
    .filter((p) => p.userId === userId)
    .map((p) => ({
      code: p.code,
      value: p.value,
    }))

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
    preferences,
  }
}

// -- Internal helpers -- //

function toManagedProfileSummary(
  data: Database,
  ownership: { profileId: string; role: string; relationshipToProfile?: string; permission: string; isPrimary: boolean },
  profile: Database['profiles'][number],
  locale: ApiLocale,
): ManagedProfileSummaryDTO {
  const view = buildProfileView(data, profile)
  const verif = findVerification(data, profile.id)
  return {
    profileId: profile.id,
    displayName: view.displayName,
    avatarUrl: view.avatarUrl,
    age: view.age,
    city: resolveLocalizedText(locale, profile.city),
    role: ownership.role,
    relationshipToProfile: ownership.relationshipToProfile,
    permission: ownership.permission,
    profileStatus: profile.profileStatus,
    isPriorityProfile: profile.isPriorityProfile,
    isPrimary: ownership.isPrimary,
    verification: {
      identityStatus: verif?.identityStatus ?? 'unverified',
      educationStatus: verif?.educationStatus ?? 'unverified',
      incomeStatus: verif?.incomeStatus ?? 'unverified',
      maritalStatus: verif?.maritalStatus ?? 'unverified',
      advisorStatus: verif?.advisorStatus ?? 'unreviewed',
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
    note: f.note.zh,
    dueAt: f.dueAt,
    completedAt: f.completedAt,
  }
}
