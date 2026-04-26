const fs = require('node:fs')
const path = require('node:path')

const rootDir = __dirname
const dbPath = path.join(rootDir, 'db.json')
const routesPath = path.join(rootDir, 'routes.json')
const routesConfig = JSON.parse(fs.readFileSync(routesPath, 'utf8'))

const defaultData = {
  profiles: [],
  events: [],
  accounts: [],
  user_registrations: [],
  favorite_profiles: [],
  message_threads: [],
  privacy_settings: [],
  auth_users: [],
}

module.exports = {
  apiPrefix: routesConfig.apiPrefix || '/api',
  host: routesConfig.host || process.env.HOST || '127.0.0.1',
  port: Number(routesConfig.port || process.env.PORT || 3001),
  defaultAccountId: routesConfig.defaultAccountId || 'u-001',
  enableRequestLogging: routesConfig.enableRequestLogging === true,
  dbPath,
  defaultData,
}
