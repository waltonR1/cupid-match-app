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
    targetProfileId: string
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

/** 协议文档类型 */
export type LegalDocumentType = 'terms' | 'privacy'

/** 协议文档状态 */
export type LegalDocumentStatus = 'draft' | 'active' | 'archived'

export interface LegalDocumentClause {
    number: string
    body: string
}

/** 协议文档 section */
export interface LegalDocumentSection {
    heading: string
    clauses: LegalDocumentClause[]
    sortOrder: number
}

/** 协议文档记录 */
export interface LegalDocumentRecord {
    id: string
    type: LegalDocumentType
    version: string
    locale: string
    title: string
    sections: LegalDocumentSection[]
    status: LegalDocumentStatus
    effectiveAt: string
    createdAt: string
    updatedAt: string
}

/** 用户协议确认记录 */
export interface UserAgreementAcceptanceRecord {
    id: string
    userId: string
    documentType: LegalDocumentType
    documentVersion: string
    locale: string
    acceptedAt: string
    createdAt: string
}

/** 会员套餐定义 */
export interface MembershipPlanRecord {
    id: string
    tier: MembershipLevel
    name: LocalizedText
    description: LocalizedText
    priceCents?: number
    currency?: 'EUR' | 'USD' | 'CNY'
    billingPeriod?: 'monthly' | 'quarterly' | 'yearly'
    conciergePriority: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
}

/** 权益编码 */
export type EntitlementCode = 'private_introduction' | 'event_priority' | 'advisor_review' | 'profile_detail_access'

/** 套餐权益定义 */
export interface MembershipEntitlementRecord {
    id: string
    planId: string
    code: EntitlementCode
    quota: number
    period: 'none' | 'monthly' | 'quarterly' | 'yearly'
    createdAt: string
    updatedAt: string
}

/** 用户权益余额 */
export interface UserEntitlementBalanceRecord {
    id: string
    userId: string
    entitlementCode: EntitlementCode
    period: string
    quotaTotal: number
    quotaUsed: number
    quotaRemaining: number
    resetAt?: string
    createdAt: string
    updatedAt: string
}

/** 账户偏好编码 */
export type AccountPreferenceCode =
    | 'preferred_city'
    | 'preferred_contact_channel'
    | 'advisor_contact_enabled'
    | 'family_assist_enabled'
    | 'introduction_updates_enabled'
    | 'event_reminders_enabled'
    | 'service_announcements_enabled'
    | 'marketing_emails_enabled'
    | 'analytics_consent_enabled'

/** 账户偏好 */
export interface UserPreferenceRecord {
    id: string
    userId: string
    code: AccountPreferenceCode
    value: string | boolean | number | string[]
    createdAt: string
    updatedAt: string
}

/** 顾问跟进记录可见性 */
export type AdvisorFollowUpVisibility = 'internal' | 'user_visible'

/** 顾问跟进记录 */
export interface AdvisorFollowUpRecord {
    id: string
    advisorId: string
    userId?: string
    profileId?: string
    requestId?: string
    eventId?: string
    status: 'open' | 'done' | 'snoozed'
    priority: 'low' | 'normal' | 'high'
    visibility: AdvisorFollowUpVisibility
    note: LocalizedText
    dueAt?: string
    completedAt?: string
    createdAt: string
    updatedAt: string
}

/** 私人介绍 room */
export interface PrivateIntroductionRoomRecord {
    id: string
    requestId: string
    requesterUserId: string
    targetProfileId: string
    status: 'open' | 'paused' | 'closed'
    openedAt: string
    closedAt?: string
    advisorId?: string
    createdAt: string
    updatedAt: string
}

/** 私人介绍 room 消息 */
export interface PrivateIntroductionRoomMessageRecord {
    id: string
    roomId: string
    senderType: 'user' | 'advisor' | 'system'
    senderUserId?: string
    body: string
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
    membership_plans: MembershipPlanRecord[]
    membership_entitlements: MembershipEntitlementRecord[]
    user_memberships: UserMembershipRecord[]
    user_entitlement_balances: UserEntitlementBalanceRecord[]
    user_preferences: UserPreferenceRecord[]
    advisor_follow_ups: AdvisorFollowUpRecord[]
    private_introduction_rooms: PrivateIntroductionRoomRecord[]
    private_introduction_room_messages: PrivateIntroductionRoomMessageRecord[]
    legal_documents: LegalDocumentRecord[]
    user_agreement_acceptances: UserAgreementAcceptanceRecord[]
    users: UserRecord[]
    auth_identities: AuthIdentityRecord[]
    profile_ownerships: ProfileOwnershipRecord[]
    favorite_profiles: FavoriteProfileRecord[]
    private_introduction_requests: PrivateIntroductionRequestRecord[]
}
