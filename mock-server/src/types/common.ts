export interface LocalizedText {
  zh: string
  fr: string
  en: string
}

export type ApiLocale = 'zh' | 'fr' | 'en'

export interface DisplayNameCapable {
  id?: string
  displayName?: string
  nickName?: string
  realName?: string
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type QueryValue = string | string[] | undefined
export type QueryRecord = Record<string, QueryValue>
