<template>
  <view class="bg-next-semantic-page-subtle">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-next-semantic-accent-primary" />
            <text class="text-[12px] uppercase tracking-[5px] text-next-semantic-accent-secondary">
              {{ t('profilesPreview.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-next-semantic-text-primary lg:text-[56px]">
            <text>{{ t('profilesPreview.title') }}</text>
            <text class="text-next-semantic-accent-primary"> · {{ t('profilesPreview.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-next-semantic-text-lead lg:text-[19px]">
          {{ t('profilesPreview.subtitle') }}
        </view>
      </view>

      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DirectoryCardFrame
          v-for="profile in profiles"
          :key="profile.id"
          :data="createProfileCardViewModel(profile)"
          clickable
          @select="handleProfileOpen(profile.id)"
        />
      </view>

      <view class="mt-12 flex justify-center">
        <AppButton
          variant="secondary"
          context="section"
          class="min-w-[178px] px-8 tracking-[0.6px]"
          @click="goProfiles"
        >
          {{ t('profilesPreview.cta') }}
        </AppButton>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import DirectoryCardFrame from '@/components/common/directory/DirectoryCardFrame.vue'
import type { DirectoryCardViewModel } from '@/components/common/directory/directory-card.types'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import {
  getHomePreviewProfiles,
  getLocalizedProfileCardData,
  type MockProfile,
} from '@/mock/business'
import { openProfileDetail } from '@/utils/demo-navigation'

const { t, locale } = usePageI18n('home')
const { t: profileT } = usePageI18n('profiles')
const profiles = getHomePreviewProfiles()

function createProfileCardViewModel(profile: MockProfile): DirectoryCardViewModel {
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

function goProfiles() {
  uni.navigateTo({ url: '/pages/discovery/self/index' })
}

function handleProfileOpen(id: string) {
  openProfileDetail(id)
}
</script>
