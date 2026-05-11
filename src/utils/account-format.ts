import {formatProfileLanguages, localizeProfileText, type LocalizedTextValue} from './profile-format'
import type { FormatLocale } from './locale-format'

/**
 * 本地化账号文本
 *
 * 支持：
 * - 多语言对象
 * - 普通字符串
 * - null / undefined 安全处理
 */
export function localizeAccountText(locale: FormatLocale, text: LocalizedTextValue | string | null | undefined) {
  return localizeProfileText(locale, text)
}

/**
 * 格式化账号语言列表
 *
 * 示例：
 * - zh: 中文 / 法语 / 英语
 * - fr: Chinois / Français / Anglais
 * - en: Chinese / French / English
 */
export function formatAccountLanguages(locale: FormatLocale, languages: string[]) {
  return formatProfileLanguages(locale, languages)
}