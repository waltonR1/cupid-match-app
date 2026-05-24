/** API 语言 */
export type ApiLocale = 'zh' | 'fr' | 'en'

/** 单个语言槽位的文本值与翻译状态 */
export interface LocalizedValue {
    value: string
    source: 'manual' | 'machine'
    provider: 'human' | 'translation_api' | null
    status: 'ready' | 'pending' | 'failed' | 'stale'
    updatedAt: string
}

/** 多语言文本 */
export type LocalizedText = Record<ApiLocale, LocalizedValue>

/** 分页信息 */
export interface Pagination {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

/** 查询参数值 */
export type QueryValue = string | string[] | undefined

/** 查询参数对象 */
export type QueryRecord = Record<string, QueryValue>
