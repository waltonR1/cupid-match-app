/// <reference types="node" />
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {parseEnvBoolean} from './utils/string.js'

/** mock-server 根目录 */
const mockServerDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** 数据目录 */
const rootDir = process.env.MOCK_DATA_DIR
  ? path.resolve(process.env.MOCK_DATA_DIR)
  : mockServerDir

/** 默认配置 */
const DEFAULT = {
    apiPrefix: '/api',
    host: '127.0.0.1',
    renderHost: '0.0.0.0',
    port: 52173,
    enableRequestLogging: true,
    renderRequestLogging: false,
} as const

const isRenderTarget = process.env.MOCK_SERVER_TARGET === 'render' || process.argv.includes('--render')

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
    host: process.env.HOST || (isRenderTarget ? DEFAULT.renderHost : DEFAULT.host),
    port: parsePort(process.env.PORT),
    enableRequestLogging: parseEnvBoolean(
        process.env.ENABLE_REQUEST_LOGGING,
        isRenderTarget ? DEFAULT.renderRequestLogging : DEFAULT.enableRequestLogging,
    ),
    dbPath: path.join(rootDir, 'db.json'),
    uploadsDir: path.join(rootDir, 'uploads'),
}
