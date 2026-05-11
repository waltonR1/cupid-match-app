import { defineStore } from 'pinia'
import { ref } from 'vue'

import {DEFAULT_LOCALE, normalizeLocale} from '@/i18n/locale'

import type { AppLocale } from '@/i18n/types'

/**
 * 持久化恢复前修正 locale 数据
 *
 * 防止：
 * - 非法 locale
 * - 旧版本缓存
 * - undefined / null
 */
function restoreLocaleState(state: unknown): void {
  // 非对象直接忽略
  if (!state || typeof state !== 'object') {
    return
  }

  // 强制标准化 locale
  ;(state as { locale?: AppLocale }).locale = normalizeLocale((state as { locale?: unknown }).locale)
}

/** 多语言状态 Store */
export const useLocaleStore = defineStore('locale', () => {
  console.log('[locale-store] defineStore evaluated')

  /** 当前语言 */
  const locale = ref<AppLocale>(DEFAULT_LOCALE)

  /**
   * 设置当前语言
   */
  function setLocale(value: AppLocale) {
    // 相同语言不重复更新
    if (locale.value === value) {
      return
    }

    locale.value = value
  }

  return {
    locale,
    setLocale,
  }
}, {
  persist: {
    // 仅持久化 locale 字段
    paths: ['locale'],

    // 恢复前修正缓存数据
    beforeHydrate: restoreLocaleState,
  },
})