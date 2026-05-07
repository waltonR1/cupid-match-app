import {config} from './config.js'
import type {Database} from './types/database.js'

/** 默认数据库 */
const defaultData: Database = {
    profiles: [],
    events: [],
    accounts: [],
    user_registrations: [],
    favorite_profiles: [],
    message_threads: [],
    privacy_settings: [],
    auth_users: [],
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
}

/** 获取数据库实例 */
export function getDb(): DbInstance {
    if (db === null) {
        throw new Error('Database has not been initialized. Call initDb() before accessing the database.')
    }

    return db
}