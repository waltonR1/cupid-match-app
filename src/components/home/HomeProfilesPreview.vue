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
        <DirectoryCardFrame
          v-for="profile in profiles"
          :key="profile.id"
          :data="profile.card"
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
import DirectoryCardFrame from '@/components/discovery/shared/directory/DirectoryCardFrame.vue'
import type { HomeProfilesPreviewItem } from '@/types/home'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openSelfDetail } from '@/utils/demo-navigation'

defineProps<{
  profiles: HomeProfilesPreviewItem[]
}>()

const { t } = usePageI18n('home')

function goProfiles() {
  uni.navigateTo({ url: '/pages/discovery/self/index' })
}

function handleProfileOpen(id: string) {
  openSelfDetail(id)
}
</script>
