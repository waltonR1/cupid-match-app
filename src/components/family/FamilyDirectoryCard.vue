<template>
  <DirectoryCardFrame
    :data="cardViewModel"
    clickable
    summary-class="line-clamp-3"
    @select="$emit('open', profile.id)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DirectoryCardFrame from '@/components/common/DirectoryCardFrame.vue'
import type { DirectoryCardViewModel } from '@/components/common/directory-card.types'
import { usePageI18n } from '@/i18n/use-page-i18n'
import type { AppLocale } from '@/i18n/types'
import { pickLocalized } from '@/mock/business'
import type { MockProfile } from '@/mock/business'

const props = defineProps<{
  profile: MockProfile
  locale: AppLocale
  cityLabel: string
  educationLabel: string
  residenceLabel: string
}>()

const { t } = usePageI18n('family')

defineEmits<{
  (e: 'open', id: string): void
}>()

const metaText = computed(() => {
  const occupation = pickLocalized(props.locale, props.profile.occupation)

  if (props.locale === 'zh') return `${props.profile.age}\u5c81 / ${occupation}`
  if (props.locale === 'fr') return `${props.profile.age} ans / ${occupation}`
  return `${props.profile.age} / ${occupation}`
})

const cityText = computed(() => pickLocalized(props.locale, props.profile.city))
const educationText = computed(() => pickLocalized(props.locale, props.profile.education))
const residencePlanText = computed(() => pickLocalized(props.locale, props.profile.residencePlan))
const summaryText = computed(() => pickLocalized(props.locale, props.profile.maritalPlan))
const intentText = computed(() => pickLocalized(props.locale, props.profile.intent))

const familyModeText = computed(() => {
  if (props.profile.familyPriority) return t('modes.priority')
  if (props.profile.allowFamilyContact) return t('modes.contactReady')
  return t('modes.contextOnly')
})

const maritalStatusText = computed(() => {
  switch (props.profile.maritalStatus) {
    case 'divorced':
      return t('tags.maritalDivorced')
    case 'widowed':
      return t('tags.maritalWidowed')
    case 'single':
    default:
      return t('tags.maritalSingle')
  }
})

const familyContextText = computed(() => {
  if (props.profile.acceptLongDistance) return t('tags.longDistanceYes')
  if (props.profile.hasChildren) return t('tags.childrenYes')
  return t('tags.childrenNo')
})

const visibleTags = computed(() => [
  intentText.value,
  maritalStatusText.value,
  familyContextText.value,
])

const decisionLabelText = computed(() => {
  if (props.profile.status === 'review') return t('card.labelReview')
  if (props.profile.familyPriority) return t('card.labelPriority')
  if (props.profile.allowFamilyContact) return t('card.labelContactReady')
  return t('card.labelObserve')
})

const cardViewModel = computed<DirectoryCardViewModel>(() => ({
  avatar: props.profile.avatar,
  name: props.profile.name,
  meta: metaText.value,
  badge: familyModeText.value,
  summary: summaryText.value,
  facts: [
    { label: props.cityLabel, value: cityText.value },
    { label: props.educationLabel, value: educationText.value },
    { label: props.residenceLabel, value: residencePlanText.value },
  ],
  tags: visibleTags.value,
  footer: decisionLabelText.value,
}))
</script>
