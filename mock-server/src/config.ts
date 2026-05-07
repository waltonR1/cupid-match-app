/// <reference types="node" />
import path from 'node:path'

import {parseEnvBoolean} from './utils/string.js'

/** 项目根目录 */
const rootDir = path.resolve(process.cwd(), 'mock-server')

/** 默认配置 */
const DEFAULT = {
    apiPrefix: '/api',
    host: '127.0.0.1',
    port: 52173,
    enableRequestLogging: true,
} as const

/** 解析端口 */
function parsePort(value?: string) {
    const port = Number.parseInt(value ?? '', 10)
    return Number.isFinite(port) && port > 0
        ? port
        : DEFAULT.port
}

/** 服务配置 */
export const config = {
    apiPrefix: DEFAULT.apiPrefix,
    host: process.env.HOST || DEFAULT.host,
    port: parsePort(process.env.PORT),
    enableRequestLogging: parseEnvBoolean(process.env.ENABLE_REQUEST_LOGGING, DEFAULT.enableRequestLogging),
    dbPath: path.join(rootDir, 'db.json'),
}