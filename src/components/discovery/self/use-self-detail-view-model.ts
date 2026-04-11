import { computed, type Ref } from 'vue'
import type { DetailFactItem, DetailHeroData } from '@/components/discovery/shared/detail/detail.types'
import type { AppLocale } from '@/i18n/types'
import {
  createDetailProfileState,
  type DetailTranslator,
} from '@/utils/detail-view-model'

export function useSelfDetailViewModel(
  profileId: Ref<string>,
  locale: Ref<AppLocale>,
  t: DetailTranslator,
) {
  const state = createDetailProfileState(profileId, locale, t)

  const heroMeta = computed(() => {
    if (!state.profile.value) return ''

    return [
      state.localizeText(state.profile.value.occupation),
      state.formatAgeText(state.profile.value.age),
      state.localizeText(state.profile.value.city),
    ].join(' / ')
  })

  const archiveFacts = computed<DetailFactItem[]>(() => {
    if (!state.profile.value) return []

    return [
      { label: t('fields.recordNumber'), value: state.recordId.value },
      { label: t('fields.status'), value: state.statusText.value },
      { label: t('fields.verification'), value: state.verificationText.value },
      { label: t('fields.visibility'), value: state.visibilityText.value },
      { label: t('fields.lastActive'), value: state.formatDateText(state.profile.value.lastActiveAt) },
      { label: t('fields.joinedAt'), value: state.formatDateText(state.profile.value.joinedAt) },
    ]
  })

  const heroData = computed<DetailHeroData | null>(() => {
    if (!state.profile.value) return null

    return {
      eyebrow: t('hero.eyebrow'),
      recordId: state.recordId.value,
      avatar: state.profile.value.avatar,
      name: state.profile.value.name,
      gender: state.profile.value.gender,
      meta: heroMeta.value,
      summary: state.localizeText(state.profile.value.summary),
      badges: [
        { label: state.statusText.value },
        { label: state.verificationText.value, tone: state.profile.value.isVerified ? 'highlight' : 'muted' },
        { label: state.visibilityText.value, tone: state.profile.value.familyVisible ? 'highlight' : 'muted' },
      ],
      indexTitle: t('sections.archiveIndex'),
      indexFacts: archiveFacts.value,
    }
  })

  const overviewFacts = computed<DetailFactItem[]>(() => {
    if (!state.profile.value) return []

    return [
      { label: t('fields.age'), value: state.formatAgeText(state.profile.value.age) },
      { label: t('fields.height'), value: state.formatHeightText(state.profile.value.height) },
      { label: t('fields.city'), value: state.localizeText(state.profile.value.city) },
      { label: t('fields.country'), value: state.localizeText(state.profile.value.country) },
      { label: t('fields.nationality'), value: state.localizeText(state.profile.value.nationality) },
      { label: t('fields.education'), value: state.localizeText(state.profile.value.education) },
      { label: t('fields.job'), value: state.localizeText(state.profile.value.occupation) },
      { label: t('fields.industry'), value: state.localizeText(state.profile.value.industry) },
      { label: t('fields.employer'), value: state.localizeText(state.profile.value.employer) },
      { label: t('fields.income'), value: state.localizeText(state.profile.value.incomeRange) },
    ]
  })

  const relationshipFacts = computed<DetailFactItem[]>(() => {
    if (!state.profile.value) return []

    return [
      { label: t('fields.maritalStatus'), value: state.maritalStatusText(state.profile.value.maritalStatus) },
      { label: t('fields.children'), value: state.booleanText(state.profile.value.hasChildren) },
      { label: t('fields.wantChildren'), value: state.booleanText(state.profile.value.wantChildren) },
      { label: t('fields.longDistance'), value: state.booleanText(state.profile.value.acceptLongDistance) },
      { label: t('fields.familySupport'), value: state.familyModeText.value },
    ]
  })

  const lifestyleFacts = computed<DetailFactItem[]>(() => {
    if (!state.profile.value) return []

    return [
      { label: t('fields.languages'), value: state.formatLanguagesText(state.profile.value.languages) },
      { label: t('fields.smoke'), value: state.habitText(state.profile.value.smoke) },
      { label: t('fields.drink'), value: state.habitText(state.profile.value.drink) },
      { label: t('fields.exercise'), value: state.localizeText(state.profile.value.exercise) },
      { label: t('fields.residencePlan'), value: state.localizeText(state.profile.value.residencePlan) },
    ]
  })

  const spotlightFacts = computed<DetailFactItem[]>(() => {
    if (!state.profile.value) return []

    return [
      { label: t('fields.education'), value: state.localizeText(state.profile.value.education) },
      { label: t('fields.job'), value: state.localizeText(state.profile.value.occupation) },
      { label: t('fields.languages'), value: state.formatLanguagesText(state.profile.value.languages) },
      { label: t('fields.residencePlan'), value: state.localizeText(state.profile.value.residencePlan) },
    ]
  })

  const intentText = computed(() => {
    if (!state.profile.value) return ''
    return state.localizeText(state.profile.value.intent)
  })

  const maritalPlanText = computed(() => {
    if (!state.profile.value) return ''
    return state.localizeText(state.profile.value.maritalPlan)
  })

  const highlightTexts = computed(() => {
    if (!state.profile.value) return []
    return state.profile.value.highlights.map(item => state.localizeText(item))
  })

  const tagTexts = computed(() => {
    if (!state.profile.value) return []
    return state.profile.value.tags.map(item => state.localizeText(item))
  })

  return {
    heroData,
    overviewFacts,
    relationshipFacts,
    lifestyleFacts,
    spotlightFacts,
    intentText,
    maritalPlanText,
    highlightTexts,
    tagTexts,
  }
}
