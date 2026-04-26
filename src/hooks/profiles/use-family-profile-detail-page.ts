import { computed, ref, watch, type Ref } from 'vue'
import { mapFamilyProfileDetailPage } from '@/mappers/profiles/profile-detail.mapper'
import { getProfileDetail, type FormatLocale } from '@/api/profiles/profiles.client'

type Translate = (key: string) => string

export function useFamilyProfileDetailPage(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>) {
  const profile = ref<Awaited<ReturnType<typeof getProfileDetail>>>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)
  let requestToken = 0

  watch(profileId, () => {
    void load()
  }, { immediate: true })

  const pageData = computed(() => mapFamilyProfileDetailPage(profile.value, locale.value, t))

  async function load() {
    const id = profileId.value
    const currentToken = ++requestToken

    if (!id) {
      profile.value = null
      return
    }

    loading.value = true
    error.value = null

    try {
      const nextProfile = await getProfileDetail(id)
      if (currentToken !== requestToken) return
      profile.value = nextProfile
    } catch (requestError) {
      if (currentToken !== requestToken) return
      profile.value = null
      error.value = requestError
    } finally {
      if (currentToken === requestToken) {
        loading.value = false
      }
    }
  }

  return {
    loading,
    error,
    heroData: computed(() => pageData.value.heroData),
    overviewFacts: computed(() => pageData.value.overviewFacts),
    relationshipFacts: computed(() => pageData.value.relationshipFacts),
    lifestyleFacts: computed(() => pageData.value.lifestyleFacts),
    spotlightFacts: computed(() => pageData.value.spotlightFacts),
    intentText: computed(() => pageData.value.intentText),
    maritalPlanText: computed(() => pageData.value.maritalPlanText),
    highlightTexts: computed(() => pageData.value.highlightTexts),
    tagTexts: computed(() => pageData.value.tagTexts),
    refresh: load,
  }
}
