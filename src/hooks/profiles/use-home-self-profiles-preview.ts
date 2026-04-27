import { computed, ref, watch, type Ref } from 'vue'
import { getSelfProfileDirectory, type FormatLocale, type ProfileDTO } from '@/api/profiles/profiles'
import type { HomeProfilesPreviewItem } from '@/types/home/view'
import { formatProfileAge, formatProfileLanguages, localizeProfileText } from '@/utils/profile-format'

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
        card: toSelfProfileCard(profile, locale.value, t),
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

function toSelfProfileCard(profile: ProfileDTO, locale: FormatLocale, t: Translate) {
  return {
    avatarUrl: profile.avatarUrl,
    avatarFallback: profile.displayName,
    displayName: profile.displayName,
    gender: profile.gender,
    meta: `${formatProfileAge(locale, profile.age)} / ${localizeProfileText(locale, profile.occupation)}`,
    badge: t(intentBadgeKey(profile.intentCode)),
    summary: localizeProfileText(locale, profile.summary),
    facts: [
      { label: t('fields.city'), value: localizeProfileText(locale, profile.city) },
      { label: t('fields.education'), value: localizeProfileText(locale, profile.education) },
      { label: t('fields.languages'), value: formatProfileLanguages(locale, profile.languages) },
    ],
    tags: profile.tags.slice(0, 3).map(item => localizeProfileText(locale, item)),
    footer: t(statusFooterKey(profile.status)),
  }
}

function intentBadgeKey(intentCode: ProfileDTO['intentCode']) {
  switch (intentCode) {
    case 'marriage':
      return 'card.goalMarriage'
    case 'exclusive':
      return 'card.goalExclusive'
    case 'cross_border':
      return 'card.goalCrossBorder'
    case 'serious':
    default:
      return 'card.goalSerious'
  }
}

function statusFooterKey(status: ProfileDTO['status']) {
  switch (status) {
    case 'review':
      return 'card.labelReview'
    case 'vip':
      return 'card.labelPriority'
    case 'open':
    default:
      return 'card.labelSelected'
  }
}
