/** 多语言文本 */
export interface LocalizedText {
    zh: string
    fr: string
    en: string
}

/** API 语言 */
export type ApiLocale = 'zh' | 'fr' | 'en'

/** 可展示名称对象 */
export interface DisplayNameCapable {
    id?: string
    displayName?: string
    nickname?: string
    legalName?: string
    nickName?: string
    realName?: string
}

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