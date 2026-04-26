const { apiPrefix, defaultAccountId } = require('./config')
const { db, persistDb } = require('./db')
const { readJsonBody, sendJson } = require('./http')
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

async function handleRoute(req, res, pathname, query) {
  if (req.method === 'GET' && pathname === `${apiPrefix}/health`) {
    return sendJson(res, 200, {
      ok: true,
      apiPrefix,
      timestamp: new Date().toISOString(),
    })
  }

  if (req.method === 'GET' && pathname === `${apiPrefix}/profiles/self`) {
    const normalizedQuery = normalizeProfileQuery(query)
    const source = db.profiles.map(withDisplayName)
    const filtered = source.filter((profile) => matchesSelfDirectory(profile, normalizedQuery))
    const sorted = sortSelfProfiles(filtered, normalizedQuery.sort)

    return sendJson(res, 200, {
      items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize),
      pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
      facets: buildSelfDirectoryFacets(source),
    })
  }

  if (req.method === 'GET' && pathname === `${apiPrefix}/profiles/family`) {
    const normalizedQuery = normalizeProfileQuery(query)
    const source = db.profiles
      .filter((profile) => profile.familyVisible)
      .map(withDisplayName)
    const filtered = source.filter((profile) => matchesFamilyDirectory(profile, normalizedQuery))
    const sorted = sortFamilyProfiles(filtered, normalizedQuery.sort)

    return sendJson(res, 200, {
      items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize),
      pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
      facets: buildFamilyDirectoryFacets(source),
    })
  }

  if (req.method === 'GET' && pathname.startsWith(`${apiPrefix}/profiles/`)) {
    const id = pathname.slice(`${apiPrefix}/profiles/`.length)
    const profile = db.profiles.find((item) => item.id === id)
    if (!profile) return sendJson(res, 404, { error: 'Profile not found' })
    return sendJson(res, 200, withDisplayName(profile))
  }

  if (req.method === 'GET' && pathname === `${apiPrefix}/events`) {
    return sendJson(res, 200, {
      items: [...db.events].sort((left, right) => left.date.localeCompare(right.date)),
    })
  }

  if (req.method === 'GET' && pathname.startsWith(`${apiPrefix}/events/`)) {
    const id = pathname.slice(`${apiPrefix}/events/`.length)
    const event = db.events.find((item) => item.id === id)
    if (!event) return sendJson(res, 404, { error: 'Event not found' })

    return sendJson(res, 200, {
      event,
      relatedProfiles: buildRelatedProfiles(db.profiles, event.city.en),
    })
  }

  if (req.method === 'GET' && pathname === `${apiPrefix}/account/overview`) {
    const accountId = getString(query.accountId) || defaultAccountId
    const account = db.accounts.find((item) => item.id === accountId)
    if (!account) return sendJson(res, 404, { error: 'Account not found' })

    const profile = db.profiles.find((item) => item.id === account.profileId)
    const favorites = db.favorite_profiles
      .filter((item) => item.accountId === accountId)
      .map((favorite) => {
        const favoriteProfile = db.profiles.find((profileItem) => profileItem.id === favorite.profileId)
        return favoriteProfile ? { favorite: omitId(favorite), profile: withDisplayName(favoriteProfile) } : null
      })
      .filter(Boolean)

    const threads = db.message_threads
      .filter((item) => item.accountId === accountId)
      .map((thread) => {
        const threadProfile = db.profiles.find((profileItem) => profileItem.id === thread.profileId)
        return threadProfile ? { thread: omitId(thread), profile: withDisplayName(threadProfile) } : null
      })
      .filter(Boolean)

    const userEvents = db.user_registrations
      .filter((item) => item.accountId === accountId)
      .map((registration) => {
        const event = db.events.find((eventItem) => eventItem.id === registration.eventId)
        return event ? { registration: omitId(registration), event } : null
      })
      .filter(Boolean)

    const privacySettings = db.privacy_settings
      .filter((item) => item.accountId === accountId)
      .map(omitAccountId)

    return sendJson(res, 200, {
      account: withDisplayName(account),
      profile: profile ? withDisplayName(profile) : null,
      userEvents,
      favorites,
      threads,
      privacySettings,
    })
  }

  if (req.method === 'POST' && pathname === `${apiPrefix}/auth/login`) {
    const payload = await readJsonBody(req)
    const identity = getString(payload.identity)
    const password = getString(payload.password)
    const authUser = db.auth_users.find((item) => item.identity === identity || item.email === identity)

    if (!authUser || authUser.password !== password) {
      return sendJson(res, 401, { error: 'Invalid credentials' })
    }

    return sendJson(res, 200, buildSession(authUser))
  }

  if (req.method === 'POST' && pathname === `${apiPrefix}/auth/register`) {
    const payload = await readJsonBody(req)
    const role = getString(payload.role)
    const email = getString(payload.email)
    const password = getString(payload.password)
    const nickName = getString(payload.nickName)
    const city = getString(payload.city)

    if (!isRegisterRole(role) || !email || !password || !nickName) {
      return sendJson(res, 400, { error: 'Missing required registration fields' })
    }

    const duplicate = db.auth_users.find((item) => item.email === email || item.identity === email)
    if (duplicate) {
      return sendJson(res, 409, { error: 'Account already exists' })
    }

    const accountId = nextId('u', db.accounts)
    const authId = nextId('auth', db.auth_users)
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

    db.accounts.push(newAccount)
    db.auth_users.push(newAuthUser)
    persistDb()

    return sendJson(res, 201, buildSession(newAuthUser))
  }

  return sendJson(res, 404, { error: 'Not Found' })
}

module.exports = {
  handleRoute,
}

function isRegisterRole(value) {
  return value === 'self' || value === 'parent'
}
