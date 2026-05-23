import {config} from './config.js'
import type {Database} from './types/database.js'

/** 默认数据库 */
const defaultData: Database = {
    profiles: [],
    profile_photos: [],
    profile_internal_records: [],
    profile_verifications: [],
    profile_contacts: [],
    profile_visibility_settings: [],
    events: [],
    event_agenda_items: [],
    event_registrations: [],
    membership_plans: [],
    membership_entitlements: [],
    user_memberships: [],
    user_entitlement_balances: [],
    user_preferences: [],
    advisor_follow_ups: [],
    private_introduction_rooms: [],
    private_introduction_room_messages: [],
    legal_documents: [],
    legal_document_contents: [],
    user_agreement_acceptances: [],
    users: [],
    auth_identities: [],
    profile_ownerships: [],
    favorite_profiles: [],
    private_introduction_requests: [],
}

/** 数据库实例 */
export interface DbInstance {
    data: Database

    write(): Promise<void>
}

/** 数据库连接 */
let db: DbInstance | null = null

/** 初始化数据库 */
export async function initDb(): Promise<void> {
    const {JSONFilePreset} = await import('lowdb/node')
    db = await JSONFilePreset<Database>(config.dbPath, defaultData)
    db.data.private_introduction_requests ??= []
    db.data.profile_photos ??= []
    db.data.profile_internal_records ??= []
    db.data.profile_verifications ??= []
    db.data.profile_contacts ??= []
    db.data.profile_visibility_settings ??= []
    db.data.event_agenda_items ??= []
    db.data.event_registrations ??= []
    db.data.user_memberships ??= []
    db.data.membership_plans ??= []
    db.data.membership_entitlements ??= []
    db.data.user_entitlement_balances ??= []
    db.data.user_preferences ??= []
    db.data.advisor_follow_ups ??= []
    db.data.private_introduction_rooms ??= []
    db.data.private_introduction_room_messages ??= []
    db.data.legal_documents ??= []
    db.data.legal_document_contents ??= []
    db.data.user_agreement_acceptances ??= []
    db.data.favorite_profiles ??= []
}

/** 获取数据库实例 */
export function getDb(): DbInstance {
    if (db === null) {
        throw new Error('Database has not been initialized. Call initDb() before accessing the database.')
    }

    return db
}
