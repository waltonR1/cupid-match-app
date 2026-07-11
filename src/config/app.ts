/**
 * Frontend runtime configuration.
 *
 * Keep environment variables centralized here so deployment behavior is easy
 * to audit before staging or production releases.
 */

export type AppEnvironment = 'development' | 'staging' | 'production'

/** Current application environment. Defaults to Vite mode semantics. */
export function resolveAppEnvironment(): AppEnvironment {
  const envValue = import.meta.env.VITE_APP_ENV
  if (envValue === 'production' || envValue === 'staging' || envValue === 'development') {
    return envValue
  }

  return import.meta.env.PROD ? 'production' : 'development'
}

/** API base URL used by the frontend request adapter. */
export function resolveApiBaseUrl() {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (typeof envBaseUrl === 'string' && envBaseUrl.trim()) {
    const baseUrl = trimTrailingSlash(envBaseUrl.trim())
    if (resolveAppEnvironment() === 'production' && baseUrl.includes('api.example.com')) {
      throw new Error('Replace VITE_API_BASE_URL before production deployment.')
    }

    return baseUrl
  }

  throw new Error('VITE_API_BASE_URL is required.')
}

/** Public asset base URL used for uploaded images and files. */
export function resolveAssetBaseUrl() {
  const envBaseUrl = import.meta.env.VITE_ASSET_BASE_URL
  if (typeof envBaseUrl === 'string' && envBaseUrl.trim()) {
    const baseUrl = trimTrailingSlash(envBaseUrl.trim())
    if (resolveAppEnvironment() === 'production' && baseUrl.includes('static.example.com')) {
      throw new Error('Replace VITE_ASSET_BASE_URL before production deployment.')
    }

    return baseUrl
  }

  throw new Error('VITE_ASSET_BASE_URL is required.')
}

export function resolveAssetUrl(pathOrUrl: string) {
  if (isExternalOrRuntimeUrl(pathOrUrl) || pathOrUrl.startsWith('/static/')) {
    return pathOrUrl
  }

  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${resolveAssetBaseUrl()}${normalizedPath}`
}

/** API console logging. Keep disabled by default for deployable builds. */
export function resolveApiLoggingEnabled() {
  const envValue = import.meta.env.VITE_API_ENABLE_LOGGING
  if (envValue === 'true') return true
  if (envValue === 'false') return false
  throw new Error('VITE_API_ENABLE_LOGGING must be true or false.')
}

/** Debug pages are available by default outside production only. */
export function resolveDebugEnabled() {
  const envValue = import.meta.env.VITE_ENABLE_DEBUG
  if (envValue === 'true') return true
  if (envValue === 'false') return false
  return resolveAppEnvironment() !== 'production'
}

function trimTrailingSlash(value: string) {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

function isExternalOrRuntimeUrl(value: string) {
  return /^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith('//')
}
