import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/locale'
import type { AppLocale } from '@/i18n/types'

function restoreLocaleState(state: unknown): void {
  if (!state || typeof state !== 'object') {
    return
  }

  ;(state as { locale?: AppLocale }).locale = normalizeLocale((state as { locale?: unknown }).locale)
}

export const useLocaleStore = defineStore('locale', () => {
  console.log('[locale-store] defineStore evaluated')
  const locale = ref<AppLocale>(DEFAULT_LOCALE)

  function setLocale(value: AppLocale) {
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
    paths: ['locale'],
    beforeHydrate: restoreLocaleState,
  },
})
