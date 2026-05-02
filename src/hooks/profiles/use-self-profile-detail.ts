import { computed, ref, watch, type Ref } from 'vue'
import { getSelfProfileDetail, type FormatLocale, type SelfProfileDetail } from '@/api/profiles/profiles'
import { formatLocalizedDate } from '@/utils/locale-format'
import { formatLocalizedAge, formatProfileHeight, formatProfileLanguages } from '@/utils/profile-format'
import type { ProfileDetailBadgeItem } from '@/types/profiles/detail'

type Translate = (key: string) => string

export function useSelfProfileDetail(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>) {
  const profile = ref<Awaited<ReturnType<typeof getSelfProfileDetail>>>(null)
  const loading = ref(false)
  const error = ref<unknown>(null)
  let requestToken = 0

  watch([profileId, locale], () => {
    void load()
  }, { immediate: true })

  const pageData = computed(() => {
    if (!profile.value) {
      return {
        heroData: null,
        overviewFacts: [],
        relationshipFacts: [],
        lifestyleFacts: [],
        spotlightFacts: [],
        intentText: '',
        maritalPlanText: '',
        highlightTexts: [],
        tagTexts: [],
      }
    }

    const recordId = profile.value.id.toUpperCase()
    const statusText = t(`status.${profile.value.status}`)
    const verificationText = profile.value.isVerified ? t('badges.verified') : t('badges.unverified')
    const visibilityText = profile.value.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
    const familyModeText = resolveFamilyModeText(profile.value, t)
    const badges: ProfileDetailBadgeItem[] = [
      { label: statusText },
      { label: verificationText, tone: profile.value.isVerified ? 'highlight' : 'muted' },
      { label: visibilityText, tone: profile.value.familyVisible ? 'highlight' : 'muted' },
    ]

    return {
      heroData: {
        eyebrow: t('hero.eyebrow'),
        recordId,
        avatarUrl: profile.value.avatarUrl,
        avatarFallback: profile.value.displayName,
        displayName: profile.value.displayName,
        gender: profile.value.gender,
        meta: [
          formatLocalizedAge(locale.value, profile.value.age),
          profile.value.occupation,
          profile.value.city,
        ].join(' / '),
        summary: profile.value.summary,
        badges,
        indexTitle: t('sections.archiveIndex'),
        indexFacts: [
          { label: t('fields.recordNumber'), value: recordId },
          { label: t('fields.status'), value: statusText },
          { label: t('fields.verification'), value: verificationText },
          { label: t('fields.visibility'), value: visibilityText },
          { label: t('fields.lastActive'), value: formatLocalizedDate(locale.value, profile.value.lastActiveAt) },
          { label: t('fields.joinedAt'), value: formatLocalizedDate(locale.value, profile.value.joinedAt) },
        ],
      },
      overviewFacts: [
        fact(t('fields.age'), formatLocalizedAge(locale.value, profile.value.age)),
        fact(t('fields.height'), formatProfileHeight(profile.value.height)),
        fact(t('fields.city'), profile.value.city),
        fact(t('fields.country'), profile.value.country),
        fact(t('fields.nationality'), profile.value.nationality),
        fact(t('fields.education'), profile.value.education),
        fact(t('fields.job'), profile.value.occupation),
        fact(t('fields.industry'), profile.value.industry),
        fact(t('fields.employer'), profile.value.employer),
        fact(t('fields.income'), profile.value.incomeRange),
      ],
      relationshipFacts: [
        fact(t('fields.maritalStatus'), t(`maritalStatus.${profile.value.maritalStatus}`)),
        fact(t('fields.children'), booleanText(profile.value.hasChildren, t)),
        fact(t('fields.wantChildren'), booleanText(profile.value.wantChildren, t)),
        fact(t('fields.longDistance'), booleanText(profile.value.acceptLongDistance, t)),
        fact(t('fields.familySupport'), familyModeText),
      ],
      lifestyleFacts: [
        fact(t('fields.languages'), formatProfileLanguages(locale.value, profile.value.languages)),
        fact(t('fields.smoke'), t(`habits.${profile.value.smoke}`)),
        fact(t('fields.drink'), t(`habits.${profile.value.drink}`)),
        fact(t('fields.exercise'), profile.value.exercise),
        fact(t('fields.residencePlan'), profile.value.residencePlan),
      ],
      spotlightFacts: [
        fact(t('fields.education'), profile.value.education),
        fact(t('fields.job'), profile.value.occupation),
        fact(t('fields.languages'), formatProfileLanguages(locale.value, profile.value.languages)),
        fact(t('fields.residencePlan'), profile.value.residencePlan),
      ],
      intentText: profile.value.intent,
      maritalPlanText: profile.value.maritalPlan,
      highlightTexts: profile.value.highlights,
      tagTexts: profile.value.tags,
    }
  })

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
      const nextProfile = await getSelfProfileDetail(id)
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

function resolveFamilyModeText(profile: SelfProfileDetail, t: Translate) {
  if (profile.familyPriority) return t('familySupport.priority')
  if (profile.allowFamilyContact) return t('familySupport.contactReady')
  return t('familySupport.contextOnly')
}

function booleanText(value: boolean, t: Translate) {
  return value ? t('values.yes') : t('values.no')
}

function fact(label: string, value: string) {
  return { label, value }
}
