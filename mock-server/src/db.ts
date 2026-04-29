import { config } from './config.js'
import type { Database } from './types/database.js'

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

export interface DbInstance {
  data: Database
  write(): Promise<void>
}

let db: DbInstance | null = null

export async function initDb(): Promise<void> {
  const { JSONFilePreset } = await import('lowdb/node')
  db = await JSONFilePreset<Database>(config.dbPath, defaultData)
}

export function getDb(): DbInstance {
  if (db === null) {
    throw new Error('Database has not been initialized. Call initDb() before accessing the database.')
  }

  return db
}
