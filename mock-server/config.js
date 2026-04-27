const path = require('node:path')

const rootDir = __dirname
const dbPath = path.join(rootDir, 'db.json')
const apiPrefix = '/api'
const defaultHost = '127.0.0.1'
const defaultPort = 52173
const defaultAccountId = 'u-001'
const enableRequestLogging = true

module.exports = {
  apiPrefix,
  host: process.env.HOST || defaultHost,
  port: Number(process.env.PORT || defaultPort),
  defaultAccountId,
  enableRequestLogging,
  dbPath,
}
