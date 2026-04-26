const jsonServer = require('json-server')
const { apiPrefix, dbPath, defaultAccountId, enableRequestLogging, host, port } = require('./config')
const {
  normalizeProfileQuery,
  buildSelfDirectoryFacets,
  buildFamilyDirectoryFacets,
  matchesSelfDirectory,
  matchesFamilyDirectory,
  sortSelfProfiles,
  sortFamilyProfiles,
  buildPagination,
  paginate,
  getString,
} = require('./profiles')
const {
  withDisplayName,
  buildSession,
  buildRelatedProfiles,
  nextId,
  omitId,
  omitAccountId,
  localized,
} = require('./utils')

const server = jsonServer.create()
const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults({ logger: false })

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(requestLogger)

server.get(`${apiPrefix}/health`, (_req, res) => {
  res.status(200).jsonp({
    ok: true,
    apiPrefix,
    timestamp: new Date().toISOString(),
  })
})

server.get(`${apiPrefix}/profiles/self`, (req, res) => {
  const normalizedQuery = normalizeProfileQuery(req.query)
  const source = getDb().get('profiles').value().map(withDisplayName)
  const filtered = source.filter((profile) => matchesSelfDirectory(profile, normalizedQuery))
  const sorted = sortSelfProfiles(filtered, normalizedQuery.sort)

  res.status(200).jsonp({
    items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize),
    pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
    facets: buildSelfDirectoryFacets(source),
  })
})

server.get(`${apiPrefix}/profiles/family`, (req, res) => {
  const normalizedQuery = normalizeProfileQuery(req.query)
  const source = getDb()
    .get('profiles')
    .filter((profile) => profile.familyVisible)
    .value()
    .map(withDisplayName)
  const filtered = source.filter((profile) => matchesFamilyDirectory(profile, normalizedQuery))
  const sorted = sortFamilyProfiles(filtered, normalizedQuery.sort)

  res.status(200).jsonp({
    items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize),
    pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
    facets: buildFamilyDirectoryFacets(source),
  })
})

server.get(`${apiPrefix}/profiles/:id`, (req, res) => {
  const profile = getDb().get('profiles').find({ id: req.params.id }).value()
  if (!profile) {
    res.status(404).jsonp({ error: 'Profile not found' })
    return
  }

  res.status(200).jsonp(withDisplayName(profile))
})

server.get(`${apiPrefix}/events`, (_req, res) => {
  const items = getDb()
    .get('events')
    .sortBy('date')
    .value()

  res.status(200).jsonp({ items })
})

server.get(`${apiPrefix}/events/:id`, (req, res) => {
  const db = getDb()
  const event = db.get('events').find({ id: req.params.id }).value()
  if (!event) {
    res.status(404).jsonp({ error: 'Event not found' })
    return
  }

  res.status(200).jsonp({
    event,
    relatedProfiles: buildRelatedProfiles(db.get('profiles').value(), event.city.en),
  })
})

server.get(`${apiPrefix}/account/overview`, (req, res) => {
  const db = getDb()
  const accountId = getString(req.query.accountId) || defaultAccountId
  const account = db.get('accounts').find({ id: accountId }).value()
  if (!account) {
    res.status(404).jsonp({ error: 'Account not found' })
    return
  }

  const profile = db.get('profiles').find({ id: account.profileId }).value()
  const favorites = db.get('favorite_profiles')
    .filter({ accountId })
    .value()
    .map((favorite) => {
      const favoriteProfile = db.get('profiles').find({ id: favorite.profileId }).value()
      return favoriteProfile ? { favorite: omitId(favorite), profile: withDisplayName(favoriteProfile) } : null
    })
    .filter(Boolean)

  const threads = db.get('message_threads')
    .filter({ accountId })
    .value()
    .map((thread) => {
      const threadProfile = db.get('profiles').find({ id: thread.profileId }).value()
      return threadProfile ? { thread: omitId(thread), profile: withDisplayName(threadProfile) } : null
    })
    .filter(Boolean)

  const userEvents = db.get('user_registrations')
    .filter({ accountId })
    .value()
    .map((registration) => {
      const event = db.get('events').find({ id: registration.eventId }).value()
      return event ? { registration: omitId(registration), event } : null
    })
    .filter(Boolean)

  const privacySettings = db.get('privacy_settings')
    .filter({ accountId })
    .value()
    .map(omitAccountId)

  res.status(200).jsonp({
    account: withDisplayName(account),
    profile: profile ? withDisplayName(profile) : null,
    userEvents,
    favorites,
    threads,
    privacySettings,
  })
})

server.post(`${apiPrefix}/auth/login`, (req, res) => {
  const db = getDb()
  const identity = getString(req.body.identity)
  const password = getString(req.body.password)
  const authUser = db.get('auth_users')
    .find((item) => item.identity === identity || item.email === identity)
    .value()

  if (!authUser || authUser.password !== password) {
    res.status(401).jsonp({ error: 'Invalid credentials' })
    return
  }

  res.status(200).jsonp(buildSession(authUser))
})

server.post(`${apiPrefix}/auth/register`, (req, res) => {
  const db = getDb()
  const role = getString(req.body.role)
  const email = getString(req.body.email)
  const password = getString(req.body.password)
  const nickName = getString(req.body.nickName)
  const city = getString(req.body.city)

  if (!isRegisterRole(role) || !email || !password || !nickName) {
    res.status(400).jsonp({ error: 'Missing required registration fields' })
    return
  }

  const duplicate = db.get('auth_users')
    .find((item) => item.email === email || item.identity === email)
    .value()
  if (duplicate) {
    res.status(409).jsonp({ error: 'Account already exists' })
    return
  }

  const accounts = db.get('accounts').value()
  const authUsers = db.get('auth_users').value()
  const accountId = nextId('u', accounts)
  const authId = nextId('auth', authUsers)
  const cityName = city || 'Paris'

  const newAccount = {
    id: accountId,
    role,
    realName: nickName,
    nickName,
    avatarUrl: '',
    city: localized(cityName, cityName, cityName),
    joinedAt: new Date().toISOString().slice(0, 10),
    profileId: '',
    completion: 0,
    membership: 'free',
    bio: localized('新注册用户。', 'Nouvel utilisateur inscrit.', 'Newly registered user.'),
  }

  const newAuthUser = {
    id: authId,
    accountId,
    role,
    identity: email,
    email,
    password,
    displayName: nickName,
    avatarUrl: '',
  }

  db.get('accounts').push(newAccount).write()
  db.get('auth_users').push(newAuthUser).write()

  res.status(201).jsonp(buildSession(newAuthUser))
})

server.use((_req, res) => {
  res.status(404).jsonp({ error: 'Not Found' })
})

const instance = server.listen(port, host, () => {
  console.log(`Mock server started on http://${host}:${port}`)
  console.log(`Health: http://${host}:${port}${apiPrefix}/health`)
})

module.exports = { server, instance }

// 返回 json-server 的底层数据库访问对象。
function getDb() {
  return router.db
}

// 按开关打印每次请求的基础日志。
function requestLogger(req, res, next) {
  if (!enableRequestLogging) {
    next()
    return
  }

  const startedAt = Date.now()
  res.on('finish', () => {
    console.info('[mock-server]', {
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
    })
  })
  next()
}

// 校验注册身份字段是否在允许范围内。
function isRegisterRole(value) {
  return value === 'self' || value === 'parent'
}
