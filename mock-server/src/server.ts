import Fastify from 'fastify'

import {config} from './config.js'
import {initDb} from './db.js'
import {registerAccountRoutes} from './routes/account.routes.js'
import {registerAuthRoutes} from './routes/auth.routes.js'
import {registerEventRoutes} from './routes/events.routes.js'
import {registerPingRoutes} from './routes/ping.routes.js'
import {registerProfileRoutes} from './routes/profiles.routes.js'

export async function createServer() {
    const app = Fastify({
        logger: config.enableRequestLogging,
    })

    app.addHook('onRequest', async (_request, reply) => {
        reply.header('Access-Control-Allow-Origin', '*')
        reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
        reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    })

    app.options('*', async (_request, reply) => {
        return reply.code(204).send()
    })

    app.setNotFoundHandler(async (_request, reply) => {
        return reply.code(404).send({error: 'Not Found'})
    })

    await app.register(registerPingRoutes, {prefix: config.apiPrefix})
    await app.register(registerProfileRoutes, {prefix: config.apiPrefix})
    await app.register(registerEventRoutes, {prefix: config.apiPrefix})
    await app.register(registerAuthRoutes, {prefix: config.apiPrefix})
    await app.register(registerAccountRoutes, {prefix: config.apiPrefix})

    return app
}

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