const http = require('node:http')
const { URL } = require('node:url')
const { host, port, enableRequestLogging } = require('./config')
const { applyCorsHeaders, sendJson } = require('./http')
const { handleRoute } = require('./router')

const server = http.createServer(async (req, res) => {
  const startedAt = Date.now()
  applyCorsHeaders(res)

  if (enableRequestLogging) {
    res.on('finish', () => {
      console.info('[mock-server]', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
      })
    })
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const pathname = url.pathname
  const query = Object.fromEntries(url.searchParams.entries())

  try {
    await handleRoute(req, res, pathname, query)
  } catch (error) {
    console.error('Mock server request failed.')
    console.error(error)
    sendJson(res, 500, { error: 'Internal Server Error' })
  }
})

server.listen(port, host, () => {
  console.log(`Mock server started on http://${host}:${port}`)
  console.log(`Health: http://${host}:${port}/api/health`)
})
