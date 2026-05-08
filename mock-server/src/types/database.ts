import type {LocalizedText} from './common.js'
import type {ProfileRecord, RegisterRole} from './profile.js'

/** 会员等级 */
export type MembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'

/** 活动日程项 */
export interface EventAgendaItem {
    time: string
    title: LocalizedText
    desc: LocalizedText
}

/** 活动记录 */
export interface EventRecord {
    id: string
    date: string
    city: LocalizedText
    venue: LocalizedText
    status: string
    title: LocalizedText
    format: LocalizedText
    audience: LocalizedText
    summary: LocalizedText
    seats: number
    registered: number
    agenda: EventAgendaItem[]
}

/** 账号记录 */
export interface AccountRecord {
    id: string
    role: RegisterRole
    realName: string
    nickName: string
    avatarUrl: string
    city: LocalizedText
    joinedAt: string
    profileId: string
    completion: number
    membership: MembershipLevel
    bio: LocalizedText
}

/** 活动报名记录 */
export interface UserRegistrationRecord {
    id: string
    accountId: string
    eventId: string
    status: string
    note: LocalizedText
}

/** 收藏记录 */
export interface FavoriteProfileRecord {
    id: string
    accountId: string
    profileId: string
    savedAt: string
    note: LocalizedText
}

/** 会话记录 */
export interface MessageThreadRecord {
    id: string
    accountId: string
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
    accountId: string
    profileId: string
    status: PrivateIntroductionStatus
    requestedAt: string
    respondedAt?: string
    cooldownUntil?: string
}

/** 隐私设置记录 */
export interface PrivacySettingRecord {
    id: string
    accountId: string
    enabled: boolean
    title: LocalizedText
    desc: LocalizedText
}

/** 认证用户记录 */
export interface AuthUserRecord {
    id: string
    accountId: string
    role: RegisterRole
    identity: string
    email: string
    password: string
    displayName: string
    avatarUrl: string
}

/** 认证身份类型 */
export type AuthType = 'email' | 'phone' | 'wechat' | 'google'

/** 用户记录 */
export interface UserRecord {
    id: string
    role: RegisterRole
    displayName: string
    avatarUrl: string
    city: LocalizedText
    createdAt: string
    bio: LocalizedText
    profileCompletion: number
    language: string
}

/** 认证身份记录 */
export interface AuthIdentityRecord {
    id: string
    userId: string
    authType: AuthType
    identity: string
    email: string
    password: string
    createdAt: string
}

/** 会员记录 */
export interface MembershipRecord {
    id: string
    userId: string
    tier: MembershipLevel
    startedAt: string
    expiresAt?: string
}

/** 资料所有权记录 */
export interface ProfileOwnershipRecord {
    id: string
    profileId: string
    userId: string
    role: RegisterRole
    isPrimary: boolean
}

/** 数据库结构 */
export interface Database {
    profiles: ProfileRecord[]
    events: EventRecord[]
    accounts: AccountRecord[]
    users: UserRecord[]
    auth_identities: AuthIdentityRecord[]
    memberships: MembershipRecord[]
    profile_ownerships: ProfileOwnershipRecord[]
    user_registrations: UserRegistrationRecord[]
    favorite_profiles: FavoriteProfileRecord[]
    message_threads: MessageThreadRecord[]
    private_introduction_requests: PrivateIntroductionRequestRecord[]
    privacy_settings: PrivacySettingRecord[]
    auth_users: AuthUserRecord[]
}
