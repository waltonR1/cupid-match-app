export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD'

export interface ApiRequestError extends Error {
  statusCode?: number
  payload?: unknown
}

interface RequestOptions {
  method?: HttpMethod
  query?: object
  data?: Record<string, unknown> | object
}
import { resolveApiBaseUrl, resolveApiLoggingEnabled } from './config'

export async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path, options.query)
  const method = options.method ?? 'GET'
  const startedAt = Date.now()
  const loggingEnabled = resolveApiLoggingEnabled()

  if (loggingEnabled) {
    console.info('[api:request]', {
      method,
      url,
      query: options.query ?? null,
      hasBody: Boolean(options.data),
    })
  }

  return new Promise<T>((resolve, reject) => {
    uni.request({
      url,
      method,
      data: options.data,
      header: {
        'Content-Type': 'application/json',
      },
      success(response) {
        const statusCode = response.statusCode ?? 0
        if (statusCode >= 200 && statusCode < 300) {
          if (loggingEnabled) {
            console.info('[api:response]', {
              method,
              url,
              statusCode,
              durationMs: Date.now() - startedAt,
            })
          }
          resolve(response.data as T)
          return
        }

        if (loggingEnabled) {
          console.warn('[api:error]', {
            method,
            url,
            statusCode,
            durationMs: Date.now() - startedAt,
            payload: response.data,
          })
        }

        reject(createApiRequestError(`Request failed with status ${statusCode}`, statusCode, response.data))
      },
      fail(error) {
        if (loggingEnabled) {
          console.warn('[api:fail]', {
            method,
            url,
            durationMs: Date.now() - startedAt,
            error: error.errMsg || 'Request failed',
          })
        }
        reject(createApiRequestError(error.errMsg || 'Request failed'))
      },
    })
  })
}

export function isApiStatusError(error: unknown, statusCode: number) {
  return (
    error !== null
    && typeof error === 'object'
    && 'statusCode' in error
    && error.statusCode === statusCode
  )
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const baseUrl = resolveApiBaseUrl()
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const search = new URLSearchParams()

  Object.entries((query || {}) as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    search.set(key, String(value))
  })

  const searchString = search.toString()
  return `${normalizedBase}${normalizedPath}${searchString ? `?${searchString}` : ''}`
}

function createApiRequestError(message: string, statusCode?: number, payload?: unknown): ApiRequestError {
  const error = new Error(message) as ApiRequestError
  error.statusCode = statusCode
  error.payload = payload
  return error
}
