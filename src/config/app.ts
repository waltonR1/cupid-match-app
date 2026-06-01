/**
 * Frontend runtime configuration.
 *
 * Keep environment variables centralized here so deployment behavior is easy
 * to audit before staging or production releases.
 */

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:52173/api'
const DEFAULT_ENABLE_API_LOGGING = false

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
    const baseUrl = envBaseUrl.trim()
    if (resolveAppEnvironment() === 'production' && baseUrl.includes('api.example.com')) {
      throw new Error('Replace VITE_API_BASE_URL before production deployment.')
    }

    return baseUrl
  }

  if (resolveAppEnvironment() === 'production') {
    throw new Error('VITE_API_BASE_URL is required for production builds.')
  }

  return DEFAULT_API_BASE_URL
}

/** API console logging. Keep disabled by default for deployable builds. */
export function resolveApiLoggingEnabled() {
  const envValue = import.meta.env.VITE_API_ENABLE_LOGGING
  if (envValue === 'true') return true
  if (envValue === 'false') return false
  return DEFAULT_ENABLE_API_LOGGING
}

/** Debug pages are available by default outside production only. */
export function resolveDebugEnabled() {
  const envValue = import.meta.env.VITE_ENABLE_DEBUG
  if (envValue === 'true') return true
  if (envValue === 'false') return false
  return resolveAppEnvironment() !== 'production'
}
