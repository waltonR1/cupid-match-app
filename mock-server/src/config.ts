import path from 'node:path'

import {parseEnvBoolean} from './utils/string.js'

const rootDir = path.resolve(process.cwd(), 'mock-server')

const DEFAULT = {
    apiPrefix: '/api',
    host: '127.0.0.1',
    port: 52173,
    accountId: 'u-001',
    enableRequestLogging: true,
} as const

function parsePort(value?: string) {
    const port = Number.parseInt(value ?? '', 10)
    return Number.isFinite(port) && port > 0
        ? port
        : DEFAULT.port
}

export const config = {
    apiPrefix: DEFAULT.apiPrefix,
    host: process.env.HOST || DEFAULT.host,
    port: parsePort(process.env.PORT),
    defaultAccountId: DEFAULT.accountId,
    enableRequestLogging: parseEnvBoolean(process.env.ENABLE_REQUEST_LOGGING, DEFAULT.enableRequestLogging),
    dbPath: path.join(rootDir, 'db.json'),
}
