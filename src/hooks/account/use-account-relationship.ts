import { ref } from 'vue'
import {
  getAccountFavorites,
  getAccountIntroductions,
  type AccountIntroductionSummaryDTO,
  type FavoriteProfileSummaryDTO,
} from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'

export function useAccountRelationship() {
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

  return { favorites, introductions, refresh: load }
}
