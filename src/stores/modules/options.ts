import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCommonOptions } from '@/api/common/options'
import type { CommonOptionDTO, CommonOptionsGroup } from '@/api/common/options.types'
import type { FormatLocale } from '@/utils/locale-format'

interface CachedProfileOptions {
  version: string
  groups: CommonOptionsGroup
}

type LocaleOptionsCache = Partial<Record<FormatLocale, CachedProfileOptions>>

export const useOptionsStore = defineStore('options', () => {
  const cache = ref<LocaleOptionsCache>({})
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function ensureOptions(locale: FormatLocale) {
    const current = cache.value[locale]
    loading.value = true
    error.value = null
    try {
      const response = await getCommonOptions(current?.version)
      if (!response.unchanged && response.groups) {
        cache.value = {
          ...cache.value,
          [locale]: {
            version: response.version,
            groups: response.groups,
          },
        }
      }
      return cache.value[locale]?.groups ?? {}
    } catch (err) {
      error.value = err
      return current?.groups ?? {}
    } finally {
      loading.value = false
    }
  }

  function optionsFor(locale: FormatLocale, group: string): CommonOptionDTO[] {
    return cache.value[locale]?.groups[group] ?? []
  }

  return {
    cache,
    loading,
    error,
    ensureOptions,
    optionsFor,
  }
}, {
  persist: {
    paths: ['cache'],
  },
})
