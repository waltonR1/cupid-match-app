import type {LocalizedText} from './common.js'
import type {ProfileRecord, RegisterRole} from './profile.js'

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
    membership: string
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

/** 数据库结构 */
export interface Database {
    profiles: ProfileRecord[]
    events: EventRecord[]
    accounts: AccountRecord[]
    user_registrations: UserRegistrationRecord[]
    favorite_profiles: FavoriteProfileRecord[]
    message_threads: MessageThreadRecord[]
    privacy_settings: PrivacySettingRecord[]
    auth_users: AuthUserRecord[]
}