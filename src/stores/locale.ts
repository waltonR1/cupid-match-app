import { defineStore } from 'pinia'
import { ref } from 'vue'
import { readLocale, writeLocale } from '@/i18n/locale'
import type { AppLocale } from '@/i18n/types'

export const useLocaleStore = defineStore('locale', () => {
  const locale = ref<AppLocale>(readLocale())

  function setLocale(value: AppLocale) {
    locale.value = value
    writeLocale(value)
  }

  return {
    locale,
    setLocale,
  }
})
