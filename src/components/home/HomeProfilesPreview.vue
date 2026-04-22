<template>
  <view class="bg-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-semantic-border-eyebrow" />
            <text class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">
              {{ t('profilesPreview.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-semantic-text-primary lg:text-[56px]">
            <text>{{ t('profilesPreview.title') }}</text>
            <text class="text-semantic-text-section-highlight"> {{ t('profilesPreview.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-semantic-text-lead lg:text-[19px]">
          {{ t('profilesPreview.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProfileCardFrame
          v-for="profile in profileCards"
          :key="profile.id"
          :data="profile.card"
          clickable
          @select="openSelfDetail(profile.id)"
        />
      </view>

      <view class="mt-12 flex justify-center">
        <AppButton
          variant="secondary"
          context="section"
          class="min-w-[178px] px-8 tracking-[0.6px]"
          @click="openSelfDirectoryPage"
        >
          {{ t('profilesPreview.cta') }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import ProfileCardFrame from '@/components/profiles/directory/ProfileCardFrame.vue'
import { getLocalizedProfileCardData, type Profile } from '@/api/modules/profiles'
import type { HomeProfilesPreviewItem } from '@/types/view-models/home'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openSelfDetail, openSelfDirectoryPage } from '@/utils/navigation'

const props = defineProps<{
  profiles: Profile[]
}>()

const { t, locale } = usePageI18n('home')
const { t: profileT } = usePageI18n('self')
const profileCards = computed<HomeProfilesPreviewItem[]>(() =>
  props.profiles.map(profile => ({
    id: profile.id,
    card: createProfileCardViewModel(profile),
  })),
)

function createProfileCardViewModel(profile: Profile): HomeProfilesPreviewItem['card'] {
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
</script>
