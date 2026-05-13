import {config} from './config.js'
import type {Database} from './types/database.js'

/** 默认数据库 */
const defaultData: Database = {
    profiles: [],
    profile_photos: [],
    profile_prompts: [],
    profile_internal_records: [],
    profile_verifications: [],
    profile_contact_methods: [],
    profile_visibility_settings: [],
    events: [],
    users: [],
    auth_identities: [],
    memberships: [],
    profile_ownerships: [],
    user_registrations: [],
    favorite_profiles: [],
    message_threads: [],
    private_introduction_requests: [],
    privacy_settings: [],
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
    db.data.profile_prompts ??= []
    db.data.profile_internal_records ??= []
    db.data.profile_verifications ??= []
    db.data.profile_contact_methods ??= []
    db.data.profile_visibility_settings ??= []
}

/** 获取数据库实例 */
export function getDb(): DbInstance {
    if (db === null) {
        throw new Error('Database has not been initialized. Call initDb() before accessing the database.')
    }

    return db
}
