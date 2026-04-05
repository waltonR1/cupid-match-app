<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-brand-accent" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-support">
              {{ t('profilesPreview.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-text-heading lg:text-[56px]">
            <text>{{ t('profilesPreview.title') }}</text>
            <text class="text-brand-accent-strong"> 路 {{ t('profilesPreview.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-text-lead lg:text-[19px]">
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
        <view
          class="inline-flex min-w-[178px] cursor-pointer items-center justify-center rounded-button border border-brand-accent/35 bg-brand-accent/8 px-8 py-3 text-[15px] tracking-[0.6px] text-brand-support transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-accent hover:bg-brand-accent/16 hover:text-text-heading hover:shadow-panel"
          @click="goProfiles"
        >
          {{ t('profilesPreview.cta') }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import DirectoryCardFrame from '@/components/common/directory/DirectoryCardFrame.vue'
import type { DirectoryCardViewModel } from '@/components/common/directory/directory-card.types'
import { usePageI18n } from '@/i18n/use-page-i18n'
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
