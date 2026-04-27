const DEFAULT_API_BASE_URL = 'http://127.0.0.1:52173/api'
const DEFAULT_ENABLE_API_LOGGING = true

export function resolveApiBaseUrl() {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL
  return typeof envBaseUrl === 'string' && envBaseUrl.trim()
    ? envBaseUrl.trim()
    : DEFAULT_API_BASE_URL
}

export function resolveApiLoggingEnabled() {
  const envValue = import.meta.env.VITE_API_ENABLE_LOGGING
  if (envValue === 'true') return true
  if (envValue === 'false') return false
  return DEFAULT_ENABLE_API_LOGGING
}
