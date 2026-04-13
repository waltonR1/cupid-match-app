import { computed, onMounted, ref } from 'vue'
import {
  getLocalizedProfileCardData,
  listHomePreviewProfiles,
  type Profile,
} from '@/api/modules/profiles'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import type { DirectoryCardViewModel } from '@/types/directory-card'
import type { HomeProfilesPreviewItem } from '@/types/home'

export function useHomePreviewProfiles() {
  const { locale, t } = usePageI18n('home')
  const { t: profileT } = usePageI18n('self')
  const profiles = ref<Profile[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  onMounted(() => {
    void loadProfiles()
  })

  const profileCards = computed<HomeProfilesPreviewItem[]>(() =>
    profiles.value.map(profile => ({
      id: profile.id,
      card: createProfileCardViewModel(profile),
    })),
  )

  async function loadProfiles() {
    loading.value = true
    error.value = null

    try {
      const response = await listHomePreviewProfiles()
      profiles.value = response.data
    } catch (requestError) {
      profiles.value = []
      error.value = requestError
      console.warn('Failed to load home preview profiles.', requestError)
    } finally {
      loading.value = false
    }
  }

  function createProfileCardViewModel(profile: Profile): DirectoryCardViewModel {
    const cardData = getLocalizedProfileCardData(locale.value, profile)
    const goalText = cardData.goalCode === 'marriage'
      ? profileT('card.goalMarriage')
      : cardData.goalCode === 'exclusive'
        ? profileT('card.goalExclusive')
        : cardData.goalCode === 'cross_border'
          ? profileT('card.goalCrossBorder')
          : profileT('card.goalSerious')

    const labelText = cardData.status === 'review'
      ? profileT('card.labelReview')
      : cardData.status === 'vip'
        ? profileT('card.labelPriority')
        : profileT('card.labelSelected')

    return {
      avatar: cardData.avatar,
      name: cardData.name,
      gender: profile.gender,
      meta: cardData.meta,
      badge: goalText,
      summary: cardData.summary,
      facts: [
        { label: t('profilesPreview.fields.city'), value: cardData.facts.city },
        { label: t('profilesPreview.fields.education'), value: cardData.facts.education },
        { label: t('profilesPreview.fields.languages'), value: cardData.facts.languages },
      ],
      tags: cardData.tags,
      footer: labelText,
    }
  }

  return {
    profiles,
    profileCards,
    loading,
    error,
    refresh: loadProfiles,
  }
}
