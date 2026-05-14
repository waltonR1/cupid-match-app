import type {LocalizedText} from './common.js'
import type {
    ProfileContactMethodRecord,
    ProfileInternalRecord,
    ProfilePhotoRecord,
    ProfilePromptRecord,
    ProfileRecord,
    ProfileVerificationRecord,
    ProfileVisibilitySettingRecord,
    RegisterRole,
} from './profile.js'

/** 会员等级 */
export type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'

/** 活动状态 */
export type EventStatus = 'draft' | 'open' | 'waitlist' | 'closed' | 'completed'

/** 活动可见性 */
export type EventVisibility = 'public' | 'registered' | 'member'

/** 活动精确地址可见性 */
export type EventAddressVisibility = 'registered_only' | 'confirmed_attendee_only'

/** 活动记录 */
export interface EventRecord {
    id: string
    slug: string
    status: EventStatus
    visibility: EventVisibility
    title: LocalizedText
    summary: LocalizedText
    city: LocalizedText
    venue: LocalizedText
    address?: LocalizedText
    addressVisibility: EventAddressVisibility
    date: string
    startTime: string
    endTime: string
    format: LocalizedText
    audience: LocalizedText
    relationshipFocus: LocalizedText[]
    languageCodes: string[]
    capacity: number
    registeredCountCache?: number
    waitlistCountCache?: number
    advisorNote: LocalizedText
    coverImageUrl: string
    createdAt: string
    updatedAt: string
}

/** 活动报名记录 */
export interface EventAgendaItemRecord {
    id: string
    eventId: string
    time: string
    title: LocalizedText
    desc: LocalizedText
    sortOrder: number
    createdAt: string
    updatedAt: string
}

/** 活动报名记录 */
export interface EventRegistrationRecord {
    id: string
    userId: string
    eventId: string
    status: 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
    requestedAt: string
    confirmedAt?: string
    declinedAt?: string
    cancelledAt?: string
    note?: LocalizedText
    createdAt: string
    updatedAt: string
}

/** 收藏记录 */
export interface FavoriteProfileRecord {
    id: string
    userId: string
    profileId: string
    savedAt: string
    note: LocalizedText
}

/** 会话记录 */
export interface MessageThreadRecord {
    id: string
    userId: string
    profileId: string
    updatedAt: string
    unread: number
    lastMessage: LocalizedText
}

/** 私人介绍请求状态 */
export type PrivateIntroductionStatus =
    | 'requested'
    | 'accepted'
    | 'declined'
    | 'cooldown'

/** 私人介绍请求记录 */
export interface PrivateIntroductionRequestRecord {
    id: string
    requesterUserId: string
    profileId: string
    status: PrivateIntroductionStatus
    requestedAt: string
    respondedAt?: string
    cooldownUntil?: string
}

/** 隐私设置记录 */
export interface PrivacySettingRecord {
    id: string
    userId: string
    enabled: boolean
    title: LocalizedText
    desc: LocalizedText
}

/** 认证身份提供方 */
export type AuthProvider = 'email' | 'phone' | 'wechat' | 'google'

/** 用户状态 */
export type UserStatus = 'active' | 'paused' | 'banned'

/** 注册路径 */
export type OnboardingPath = 'self' | 'family'

/** 注册步骤 */
export type OnboardingStep = 'create_profile' | 'review_profile' | 'browse'

/** 用户记录 */
export interface UserRecord {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: 'zh' | 'fr' | 'en'
    status: UserStatus
    createdAt: string
    updatedAt: string
}

/** 认证身份记录 */
export interface AuthIdentityRecord {
    id: string
    userId: string
    provider: AuthProvider
    identifier: string
    passwordHash?: string
    verifiedAt?: string
    createdAt: string
    updatedAt: string
}

/** 会员记录 */
export interface UserOnboardingStateRecord {
    id: string
    userId: string
    path: OnboardingPath
    step: OnboardingStep
    profileId?: string
    completedAt?: string
    createdAt: string
    updatedAt: string
}

/** 用户会员记录 */
export interface UserMembershipRecord {
    id: string
    userId: string
    tier: MembershipLevel
    status: 'active' | 'expired' | 'cancelled'
    startedAt: string
    expiresAt?: string
    createdAt: string
    updatedAt: string
}

/** 资料所有权记录 */
export interface ProfileOwnershipRecord {
    id: string
    profileId: string
    userId: string
    role: RegisterRole | 'guardian' | 'advisor'
    relationshipToProfile?: 'self' | 'father' | 'mother' | 'relative' | 'advisor'
    permission: 'owner' | 'manager' | 'viewer'
    isPrimary: boolean
    createdAt: string
    updatedAt: string
}

/** 数据库结构 */
export interface Database {
    profiles: ProfileRecord[]
    profile_photos: ProfilePhotoRecord[]
    profile_prompts: ProfilePromptRecord[]
    profile_internal_records: ProfileInternalRecord[]
    profile_verifications: ProfileVerificationRecord[]
    profile_contact_methods: ProfileContactMethodRecord[]
    profile_visibility_settings: ProfileVisibilitySettingRecord[]
    events: EventRecord[]
    event_agenda_items: EventAgendaItemRecord[]
    event_registrations: EventRegistrationRecord[]
    users: UserRecord[]
    auth_identities: AuthIdentityRecord[]
    user_onboarding_states: UserOnboardingStateRecord[]
    user_memberships: UserMembershipRecord[]
    profile_ownerships: ProfileOwnershipRecord[]
    favorite_profiles: FavoriteProfileRecord[]
    message_threads: MessageThreadRecord[]
    private_introduction_requests: PrivateIntroductionRequestRecord[]
    privacy_settings: PrivacySettingRecord[]
}
