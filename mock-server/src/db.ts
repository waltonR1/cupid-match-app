import {config} from './config.js'
import type {Database} from './types/database.js'

/** 默认数据库 */
const defaultData: Database = {
    profiles: [],
    profile_photos: [],
    profile_internal_records: [],
    profile_verifications: [],
    profile_contacts: [],
    profile_privacy_preferences: [],
    events: [],
    event_agenda_items: [],
    event_registrations: [],
    membership_plans: [],
    user_memberships: [],
    user_entitlement_balances: [],
    user_preferences: [],
    staff_tasks: [],
    legal_documents: [],
    legal_document_contents: [],
    user_agreement_acceptances: [],
    users: [],
    auth_identities: [],
    profile_ownerships: [],
    favorite_profiles: [],
    private_introduction_requests: [],
    inbox_threads: [],
    inbox_messages: [],
    inbox_reads: [],
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
    db.data.profile_privacy_preferences ??= []
    db.data.event_agenda_items ??= []
    db.data.event_registrations ??= []
    db.data.user_memberships ??= []
    db.data.membership_plans ??= []
    db.data.user_entitlement_balances ??= []
    db.data.user_preferences ??= []
    db.data.staff_tasks ??= []
    db.data.legal_documents ??= []
    db.data.legal_document_contents ??= []
    db.data.user_agreement_acceptances ??= []
    db.data.favorite_profiles ??= []
    db.data.inbox_threads ??= []
    db.data.inbox_messages ??= []
    db.data.inbox_reads ??= []
}

/** 获取数据库实例 */
export function getDb(): DbInstance {
    if (db === null) {
        throw new Error('Database has not been initialized. Call initDb() before accessing the database.')
    }

    return db
}
