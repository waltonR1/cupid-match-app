import type {LocalizedText} from './common.js'
import type {
    ProfileContactRecord,
    ProfileInternalRecord,
    ProfilePhotoRecord,
    ProfilePrivacyPreferenceRecord,
    ProfileRecord,
    ProfileVerificationRecord,
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
    createdAt: string
    updatedAt: string
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
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
    permission: 'owner' | 'manager'
    status: 'pending' | 'active' | 'revoked'
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
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

/** 协议文档主记录 —— version 是跨语言的全局法律修订版本 */
export interface LegalDocumentRecord {
    id: string
    type: LegalDocumentType
    version: string
    status: LegalDocumentStatus
    effectiveAt: string
    createdAt: string
    updatedAt: string
}

/** 协议文档按 locale 的翻译内容 */
export interface LegalDocumentContentRecord {
    id: string
    documentId: string
    locale: string
    title: string
    sections: LegalDocumentSection[]
    createdAt: string
    updatedAt: string
}

/** 用户协议确认记录 —— version 是全局版本号，不再按 locale 存储 */
export interface UserAgreementAcceptanceRecord {
    id: string
    userId: string
    documentType: LegalDocumentType
    documentVersion: string
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

/** 偏好的联系渠道 */
export type PreferredContactChannel = 'email' | 'phone' | 'wechat'

/** 账户偏好 */
export interface UserPreferenceRecord {
    id: string
    userId: string
    preferredCity?: string
    preferredContactChannel?: PreferredContactChannel
    advisorContactEnabled: boolean
    familyAssistEnabled: boolean
    introductionUpdatesEnabled: boolean
    eventRemindersEnabled: boolean
    serviceAnnouncementsEnabled: boolean
    marketingEmailsEnabled: boolean
    analyticsConsentEnabled: boolean
    createdAt: string
    updatedAt: string
}

/** 后台任务关联对象 */
export type StaffTaskSubjectType = 'user' | 'profile' | 'private_introduction_request' | 'event'

/** 后台任务 */
export interface StaffTaskRecord {
    id: string
    assigneeUserId?: string
    subjectType: StaffTaskSubjectType
    subjectId: string
    status: 'open' | 'done' | 'snoozed'
    priority: 'low' | 'normal' | 'high'
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
    // Reserved for future staff operation tools. Currently empty in prototype data.
    profile_internal_records: ProfileInternalRecord[]
    profile_verifications: ProfileVerificationRecord[]
    profile_contacts: ProfileContactRecord[]
    profile_privacy_preferences: ProfilePrivacyPreferenceRecord[]
    events: EventRecord[]
    event_agenda_items: EventAgendaItemRecord[]
    event_registrations: EventRegistrationRecord[]
    membership_plans: MembershipPlanRecord[]
    membership_entitlements: MembershipEntitlementRecord[]
    user_memberships: UserMembershipRecord[]
    user_entitlement_balances: UserEntitlementBalanceRecord[]
    user_preferences: UserPreferenceRecord[]
    staff_tasks: StaffTaskRecord[]
    private_introduction_rooms: PrivateIntroductionRoomRecord[]
    private_introduction_room_messages: PrivateIntroductionRoomMessageRecord[]
    legal_documents: LegalDocumentRecord[]
    legal_document_contents: LegalDocumentContentRecord[]
    user_agreement_acceptances: UserAgreementAcceptanceRecord[]
    users: UserRecord[]
    auth_identities: AuthIdentityRecord[]
    profile_ownerships: ProfileOwnershipRecord[]
    favorite_profiles: FavoriteProfileRecord[]
    private_introduction_requests: PrivateIntroductionRequestRecord[]
}
