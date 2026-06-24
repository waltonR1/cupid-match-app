import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProfileOptions } from '@/api/profiles/profiles'
import type { ProfileOptionDTO, ProfileOptionsGroup } from '@/api/profiles/profiles.types'
import type { FormatLocale } from '@/utils/locale-format'

interface CachedProfileOptions {
  version: string
  groups: ProfileOptionsGroup
}

type LocaleOptionsCache = Partial<Record<FormatLocale, CachedProfileOptions>>

export const useProfileOptionsStore = defineStore('profileOptions', () => {
  const cache = ref<LocaleOptionsCache>({})
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function ensureOptions(locale: FormatLocale) {
    const current = cache.value[locale]
    loading.value = true
    error.value = null
    try {
      const response = await getProfileOptions(locale, current?.version)
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

  function optionsFor(locale: FormatLocale, group: string): ProfileOptionDTO[] {
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
