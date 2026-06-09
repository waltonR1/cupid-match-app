import {fastify} from 'fastify'

import {config} from './config.js'
import {getDb, initDb} from './db.js'
import {registerAccountRoutes} from './routes/account.routes.js'
import {registerAuthRoutes} from './routes/auth.routes.js'
import {registerDebugRoutes} from './routes/debug.routes.js'
import {registerEventRoutes} from './routes/events.routes.js'
import {registerInboxRoutes} from './routes/inbox.routes.js'
import {registerLegalRoutes} from './routes/legal.routes.js'
import {registerMembershipRoutes} from './routes/membership.routes.js'
import {registerPingRoutes} from './routes/ping.routes.js'
import {registerUploadedAssetRoutes, registerUploadRoutes} from './routes/upload.routes.js'
import {registerProfileRoutes} from './routes/profiles.routes.js'

/** 创建服务实例 */
export async function createServer() {
    const app = fastify({
        logger: config.enableRequestLogging,
    })

    /** 配置跨域 */
    app.addHook('onRequest', async (_request, reply) => {
        reply.header('Access-Control-Allow-Origin', '*')
        reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
        reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-User-Id')
    })

    /** 将 mock Bearer token 转换为现有业务路由使用的用户上下文 */
    app.addHook('preHandler', async (request) => {
        if (request.headers['x-user-id']) return

        const token = resolveBearerToken(request.headers.authorization)
        if (!token?.startsWith('mock-token-')) return

        const identityId = token.slice('mock-token-'.length)
        const identity = getDb().data.auth_identities.find((item) => item.id === identityId)
        if (identity) request.headers['x-user-id'] = identity.userId
    })

    /** 模拟 Java 产品 API 的统一传输层响应 */
    app.addHook('preSerialization', async (_request, reply, payload) => {
        if (isApiResponse(payload)) return payload

        const statusCode = reply.statusCode
        if (statusCode >= 200 && statusCode < 300) {
            return {
                code: 200,
                msg: 'OK',
                data: payload,
            }
        }

        return {
            code: statusCode,
            msg: resolveErrorMessage(payload, statusCode),
            data: payload,
        }
    })

    /** 处理预检请求 */
    app.options('*', async (_request, reply) => {
        return reply.code(204).send()
    })

    /** 404 处理 */
    app.setNotFoundHandler(async (_request, reply) => {
        return reply.code(404).send({error: 'Not Found'})
    })

    /** 注册路由 */
    await app.register(registerPingRoutes, {prefix: config.apiPrefix})
    await app.register(registerProfileRoutes, {prefix: config.apiPrefix})
    await app.register(registerEventRoutes, {prefix: config.apiPrefix})
    await app.register(registerAuthRoutes, {prefix: config.apiPrefix})
    await app.register(registerAccountRoutes, {prefix: config.apiPrefix})
    await app.register(registerMembershipRoutes, {prefix: config.apiPrefix})
    await app.register(registerLegalRoutes, {prefix: config.apiPrefix})
    await app.register(registerDebugRoutes, {prefix: config.apiPrefix})
    await app.register(registerInboxRoutes, {prefix: config.apiPrefix})
    await app.register(registerUploadRoutes, {prefix: config.apiPrefix})
    await app.register(registerUploadedAssetRoutes)

    return app
}

function resolveBearerToken(value: string | undefined): string {
    if (!value) return ''

    const match = /^Bearer\s+(.+)$/i.exec(value.trim())
    return match?.[1]?.trim() ?? ''
}

function isApiResponse(payload: unknown): payload is {code: number; msg: string; data?: unknown} {
    return (
        payload !== null
        && typeof payload === 'object'
        && 'code' in payload
        && 'msg' in payload
        && typeof payload.code === 'number'
        && typeof payload.msg === 'string'
    )
}

function resolveErrorMessage(payload: unknown, statusCode: number): string {
    if (payload !== null && typeof payload === 'object') {
        const record = payload as Record<string, unknown>
        for (const key of ['msg', 'message', 'error'] as const) {
            const value = record[key]
            if (typeof value === 'string' && value) {
                return value
            }
        }
    }

    return `Request failed with status ${statusCode}`
}

/** 启动服务 */
async function start(): Promise<void> {
    await initDb()

    const app = await createServer()

    await app.listen({
        host: config.host,
        port: config.port,
    })

    console.log(`Mock server started on http://${config.host}:${config.port}`)
    console.log(`Ping: http://${config.host}:${config.port}${config.apiPrefix}/ping`)
}

void start()
