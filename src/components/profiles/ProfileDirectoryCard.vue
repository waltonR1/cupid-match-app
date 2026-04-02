<template>
  <DirectoryCardFrame
    :data="cardViewModel"
    :clickable="clickable"
    @select="handleOpen"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DirectoryCardFrame from '@/components/common/DirectoryCardFrame.vue'
import type { DirectoryCardViewModel } from '@/components/common/directory-card.types'
import { usePageI18n } from '@/i18n/use-page-i18n'
import type { AppLocale } from '@/i18n/types'
import { getLocalizedProfileCardData } from '@/mock/business'
import type { MockProfile } from '@/mock/business'

const props = withDefaults(defineProps<{
  profile: MockProfile
  locale: AppLocale
  cityLabel: string
  educationLabel: string
  languagesLabel: string
  clickable?: boolean
}>(), {
  clickable: true,
})

const { t } = usePageI18n('profiles')

const emit = defineEmits<{
  (e: 'open', id: string): void
}>()

const cardData = computed(() => getLocalizedProfileCardData(props.locale, props.profile))

const goalText = computed(() => {
  switch (cardData.value.goalCode) {
    case 'marriage':
      return t('card.goalMarriage')
    case 'exclusive':
      return t('card.goalExclusive')
    case 'cross_border':
      return t('card.goalCrossBorder')
    case 'serious':
    default:
      return t('card.goalSerious')
  }
})

const labelText = computed(() => {
  switch (cardData.value.status) {
    case 'review':
      return t('card.labelReview')
    case 'vip':
      return t('card.labelPriority')
    case 'open':
    default:
      return t('card.labelSelected')
  }
})

const cardViewModel = computed<DirectoryCardViewModel>(() => ({
  avatar: cardData.value.avatar,
  name: cardData.value.name,
  gender: props.profile.gender,
  meta: cardData.value.meta,
  badge: goalText.value,
  summary: cardData.value.summary,
  facts: [
    { label: props.cityLabel, value: cardData.value.facts.city },
    { label: props.educationLabel, value: cardData.value.facts.education },
    { label: props.languagesLabel, value: cardData.value.facts.languages },
  ],
  tags: cardData.value.tags,
  footer: labelText.value,
}))

function handleOpen() {
  if (!props.clickable) return
  emit('open', props.profile.id)
}
</script>
