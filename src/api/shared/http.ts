import {resolveApiBaseUrl, resolveApiLoggingEnabled, resolveAppEnvironment} from '@/config/app'
import {useAuthStore} from '@/stores/modules/auth'
import { useLocaleStore } from '@/stores/modules/locale'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD'

export interface ApiRequestError extends Error {
    statusCode?: number
    code?: number
    payload?: unknown
}

interface ApiResponse<T> {
    code: number
    msg: string
    data?: T
}

interface RequestOptions {
    method?: HttpMethod
    query?: object
    data?: string | ArrayBuffer | object
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = buildUrl(path, options.query)
    const method = options.method ?? 'GET'
    const startedAt = Date.now()
    const loggingEnabled = resolveApiLoggingEnabled()

    logApiRequest(loggingEnabled, {
        method,
        url,
        query: options.query ?? null,
        data: options.data,
    })

    return new Promise<T>((resolve, reject) => {
        uni.request({
            url,
            method,
            data: options.data,
            header: {
                'Content-Type': 'application/json',
                ...buildRequestContextHeaders(),
            },
            success(response) {
                const statusCode = response.statusCode ?? 0
                const durationMs = Date.now() - startedAt
                const envelope = resolveApiResponse<T>(response.data)

                if (statusCode >= 200 && statusCode < 300) {
                    logApiResponse(loggingEnabled, {
                        method,
                        url,
                        statusCode,
                        durationMs,
                        data: response.data,
                    })

                    if (!envelope) {
                        resolve(response.data as T)
                        return
                    }

                    if (envelope.code === 200) {
                        resolve(envelope.data as T)
                        return
                    }

                    const requestError = createApiRequestError(
                        envelope.msg || `Request failed with code ${envelope.code}`,
                        statusCode,
                        response.data,
                        envelope.code,
                    )

                    if (envelope.code === 401 && !isAuthPage(path)) {
                        handleSessionExpired()
                    }

                    reject(requestError)
                    return
                }

                logApiError(loggingEnabled, {
                    method,
                    url,
                    statusCode,
                    durationMs,
                    payload: response.data,
                })

                const requestError = createApiRequestError(
                    envelope?.msg || `Request failed with status ${statusCode}`,
                    statusCode,
                    response.data,
                    envelope?.code,
                )

                if (statusCode === 401 && !isAuthPage(path)) {
                    handleSessionExpired()
                    reject(requestError)
                    return
                }

                reject(requestError)
            },
            fail(error) {
                const durationMs = Date.now() - startedAt

                logApiFail(loggingEnabled, {
                    method,
                    url,
                    durationMs,
                    error: error.errMsg || 'Request failed',
                })

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
    const nextQuery = {
        lang: resolveRequestLocale(),
        ...(query ?? {}),
    }

    Object.entries(nextQuery as Record<string, unknown>).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return
        search.set(key, String(value))
    })

    const searchString = search.toString()
    return `${normalizedBase}${normalizedPath}${searchString ? `?${searchString}` : ''}`
}

function resolveRequestLocale(): 'zh' | 'fr' | 'en' {
    try {
        const localeStore = useLocaleStore()
        const locale = localeStore.locale

        if (locale === 'zh' || locale === 'fr' || locale === 'en') {
            return locale
        }
    } catch {
        // ignore pinia not ready
    }

    try {
        const persisted = uni.getStorageSync('pinia:locale')
        const state = typeof persisted === 'string' ? JSON.parse(persisted) : persisted
        const locale = state?.locale

        if (locale === 'zh' || locale === 'fr' || locale === 'en') {
            return locale
        }
    } catch {
        // ignore invalid locale cache
    }

    return 'zh'
}

function resolveApiResponse<T>(payload: unknown): ApiResponse<T> | null {
    if (
        payload === null
        || typeof payload !== 'object'
        || !('code' in payload)
        || !('msg' in payload)
        || typeof payload.code !== 'number'
        || typeof payload.msg !== 'string'
    ) {
        return null
    }

    return payload as ApiResponse<T>
}

function createApiRequestError(message: string, statusCode?: number, payload?: unknown, code?: number): ApiRequestError {
    const error = new Error(message) as ApiRequestError
    error.statusCode = statusCode
    error.code = code
    error.payload = payload
    return error
}

function logApiRequest(
    enabled: boolean,
    payload: {
        method: HttpMethod
        url: string
        query?: object | null
        data?: unknown
    },
) {
    if (!enabled) return

    console.groupCollapsed(`%c[API] ${payload.method} ${payload.url}`, 'color: #2563eb; font-weight: 600;')
    console.info('request', {
        method: payload.method,
        url: payload.url,
        query: payload.query ?? null,
        hasBody: payload.data !== undefined,
        body: payload.data ?? null,
    })
    console.groupEnd()
}

function logApiResponse(
    enabled: boolean,
    payload: {
        method: HttpMethod
        url: string
        statusCode: number
        durationMs: number
        data: unknown
    },
) {
    if (!enabled) return

    console.groupCollapsed(
        `%c[API] ${payload.method} ${payload.url} → ${payload.statusCode} ${payload.durationMs}ms`,
        'color: #16a34a; font-weight: 600;',
    )
    console.info('response', payload)
    console.groupEnd()
}

function logApiError(
    enabled: boolean,
    payload: {
        method: HttpMethod
        url: string
        statusCode: number
        durationMs: number
        payload: unknown
    },
) {
    if (!enabled) return

    console.groupCollapsed(
        `%c[API ERROR] ${payload.method} ${payload.url} → ${payload.statusCode} ${payload.durationMs}ms`,
        'color: #dc2626; font-weight: 600;',
    )
    console.warn('error', payload)
    console.groupEnd()
}

function logApiFail(
    enabled: boolean,
    payload: {
        method: HttpMethod
        url: string
        durationMs: number
        error: string
    },
) {
    if (!enabled) return

    console.groupCollapsed(
        `%c[API FAIL] ${payload.method} ${payload.url} ${payload.durationMs}ms`,
        'color: #ea580c; font-weight: 600;',
    )
    console.warn('fail', payload)
    console.groupEnd()
}

function buildRequestContextHeaders(): Record<string, string> {
    const token = resolveRequestToken()
    if (token) return { Authorization: `Bearer ${token}` }

    if (resolveAppEnvironment() === 'production') return {}

    const userId = resolveRequestUserId()
    return userId ? { 'X-User-Id': userId } : {}
}

function resolveRequestUserId(): string {
    const auth = readAuthStore()
    return auth.user?.id || ''
}

function resolveRequestToken(): string {
    const auth = readAuthStore()
    return auth.token || ''
}

function readAuthStore() {
    try {
        const authStore = useAuthStore()
        if (authStore.user?.id) return { user: authStore.user, token: authStore.token }
    } catch {
        // ignore pinia not ready
    }

    try {
        const persisted = uni.getStorageSync('pinia:auth')
        const state = typeof persisted === 'string' ? JSON.parse(persisted) : persisted
        return { user: state?.user || null, token: state?.token || '' }
    } catch {
        return { user: null, token: '' }
    }
}

function isAuthPage(path: string): boolean {
    return path.startsWith('/auth/')
}

function handleSessionExpired() {
    try {
        const authStore = useAuthStore()
        authStore.logout()
    } catch {
        // ignore
    }
    uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
    uni.redirectTo({ url: '/pages/auth/login' })
}
