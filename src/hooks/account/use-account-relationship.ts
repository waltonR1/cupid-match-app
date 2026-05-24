import { computed, ref } from 'vue'
import {
  getAccountFavorites,
  getAccountIntroductions,
  type AccountIntroductionSummaryDTO,
  type FavoriteProfileSummaryDTO,
} from '@/api/account'
import { useLocaleStore } from '@/stores/modules/locale'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountRelationshipPageData } from '@/mappers/account-relationship'
import type { Translate } from '@/i18n/types'

export function useAccountRelationship(t: Translate) {
  const localeStore = useLocaleStore()
  const fav = useLatestRequest()
  const intro = useLatestRequest()
  const favorites = ref<FavoriteProfileSummaryDTO[]>([])
  const introductions = ref<AccountIntroductionSummaryDTO[]>([])

  void load()

  async function load() {
    const [f, i] = await Promise.all([
      fav.run(() => getAccountFavorites()),
      intro.run(() => getAccountIntroductions()),
    ])
    if (f) favorites.value = f
    if (i) introductions.value = i
  }

  const pageData = computed(() => toAccountRelationshipPageData({
    favorites: favorites.value,
    introductions: introductions.value,
    t,
    locale: localeStore.locale,
  }))

  return {
    loading: computed(() => fav.loading.value || intro.loading.value),
    error: computed(() => fav.error.value || intro.error.value),
    pageData, refresh: load,
  }
}
