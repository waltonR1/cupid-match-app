import { computed, ref, watch, type Ref } from 'vue'
import { getFamilyProfileDetail, type FamilyProfileDetail, type FormatLocale } from '@/api/profiles/profiles'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { formatLocalizedDate } from '@/utils/locale-format'
import { formatLocalizedAge, formatProfileLanguages } from '@/utils/profile-format'
import type { ProfileDetailBadgeItem } from '@/types/profiles/detail'

type Translate = (key: string) => string

export function useFamilyProfileDetail(profileId: Ref<string>, t: Translate, locale: Ref<FormatLocale>) {
  const latest = useLatestRequest()
  const profile = ref<Awaited<ReturnType<typeof getFamilyProfileDetail>>>(null)

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
    const verificationText = profile.value.isVerified ? t('badges.verified') : t('badges.unverified')
    const visibilityText = profile.value.familyVisible ? t('visibility.familyVisible') : t('visibility.userVisible')
    const familyModeText = resolveFamilyModeText(profile.value, t)
    const badges: ProfileDetailBadgeItem[] = [
      { label: familyModeText },
      { label: visibilityText, tone: profile.value.familyVisible ? 'highlight' : 'muted' },
      { label: verificationText, tone: profile.value.isVerified ? 'highlight' : 'muted' },
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
          profile.value.city,
          profile.value.education,
        ].join(' / '),
        summary: profile.value.maritalPlan,
        badges,
        indexTitle: t('sections.archiveIndex'),
        indexFacts: [
          fact(t('fields.recordNumber'), recordId),
          fact(t('fields.city'), profile.value.city),
          fact(t('fields.education'), profile.value.education),
          fact(t('fields.residencePlan'), profile.value.residencePlan),
          fact(t('fields.lastActive'), formatLocalizedDate(locale.value, profile.value.lastActiveAt)),
          fact(t('fields.joinedAt'), formatLocalizedDate(locale.value, profile.value.joinedAt)),
        ],
      },
      overviewFacts: [
        fact(t('fields.age'), formatLocalizedAge(locale.value, profile.value.age)),
        fact(t('fields.city'), profile.value.city),
        fact(t('fields.country'), profile.value.country),
        fact(t('fields.nationality'), profile.value.nationality),
        fact(t('fields.education'), profile.value.education),
        fact(t('fields.job'), profile.value.occupation),
        fact(t('fields.industry'), profile.value.industry),
        fact(t('fields.income'), profile.value.incomeRange),
        fact(t('fields.residencePlan'), profile.value.residencePlan),
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
        fact(t('fields.exercise'), profile.value.exercise),
        fact(t('fields.smoke'), t(`habits.${profile.value.smoke}`)),
        fact(t('fields.drink'), t(`habits.${profile.value.drink}`)),
      ],
      spotlightFacts: [
        fact(t('fields.intent'), profile.value.intent),
        fact(t('fields.maritalPlan'), profile.value.maritalPlan),
        fact(t('fields.longDistance'), booleanText(profile.value.acceptLongDistance, t)),
        fact(t('fields.familySupport'), familyModeText),
      ],
      intentText: profile.value.intent,
      maritalPlanText: profile.value.maritalPlan,
      highlightTexts: [
        profile.value.summary,
        `${t('fields.residencePlan')}: ${profile.value.residencePlan}`,
        `${t('fields.longDistance')}: ${booleanText(profile.value.acceptLongDistance, t)}`,
      ],
      tagTexts: profile.value.tags.slice(0, 3),
    }
  })

  async function load() {
    const id = profileId.value
    if (!id) {
      profile.value = null
      return
    }

    const nextProfile = await latest.run(() => getFamilyProfileDetail(id))
    if (nextProfile === undefined) {
      if (latest.error.value !== null) {
        profile.value = null
      }
      return
    }
    profile.value = nextProfile
  }

  return {
    loading: latest.loading,
    error: latest.error,
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

function resolveFamilyModeText(profile: FamilyProfileDetail, t: Translate) {
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
