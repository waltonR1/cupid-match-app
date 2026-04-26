import { computed, ref, watch, type Ref } from 'vue'
import { buildSelfProfileCardViewModel } from '@/mappers/profiles/profile-directory.mapper'
import { getSelfProfileDirectory, type FormatLocale } from '@/api/profiles/profiles.client'
import type { HomeProfilesPreviewItem } from '@/types/home/view'

type Translate = (key: string) => string

const EMPTY_FILTERS = {
  gender: '',
  ageRange: '',
  city: '',
  heightRange: '',
  education: '',
  intentCode: '',
  industry: '',
  occupation: '',
  language: '',
  verified: '',
  maritalStatus: '',
  hasChildren: '',
  acceptLongDistance: '',
} as const

export function useHomeSelfProfilesPreview(t: Translate, locale: Ref<FormatLocale>) {
  const loading = ref(false)
  const error = ref<unknown>(null)
  const items = ref<HomeProfilesPreviewItem[]>([])
  let requestToken = 0

  watch(locale, () => {
    void load()
  }, { immediate: true })

  async function load() {
    const currentToken = ++requestToken
    loading.value = true
    error.value = null

    try {
      const response = await getSelfProfileDirectory({
        page: 1,
        pageSize: 3,
        sort: 'recentActive',
        ...EMPTY_FILTERS,
      })

      if (currentToken !== requestToken) return

      items.value = response.items.map(profile => ({
        id: profile.id,
        card: buildSelfProfileCardViewModel(profile, locale.value, t),
      }))
    } catch (requestError) {
      if (currentToken !== requestToken) return
      error.value = requestError
      items.value = []
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  return {
    loading,
    error,
    featuredProfiles: computed(() => items.value),
    refresh: load,
  }
}
