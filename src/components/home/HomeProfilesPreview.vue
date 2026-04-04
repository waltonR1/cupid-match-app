<template>
  <view class="bg-page-soft">
    <view class="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-24">
      <!-- 标题区 -->
      <view class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <view>
          <view class="mb-4 inline-flex items-center gap-4">
            <view class="h-px w-14 bg-brand-highlight" />
            <text class="text-[12px] uppercase tracking-[5px] text-brand-brown">
              {{ t('profilesPreview.eyebrow') }}
            </text>
          </view>

          <view class="text-[40px] font-semibold leading-[1.06] text-text-heading lg:text-[56px]">
            <text>{{ t('profilesPreview.title') }}</text>
            <text class="text-brand-highlight-strong"> · {{ t('profilesPreview.titleAccent') }}</text>
          </view>
        </view>

        <view class="max-w-[430px] text-[18px] leading-8 text-text-warm lg:text-[19px]">
          {{ t('profilesPreview.subtitle') }}
        </view>
      </view>

      <!-- 资料卡 -->
      <view class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ProfileDirectoryCard
          v-for="profile in profiles"
          :key="profile.id"
          :profile="profile"
          :locale="locale"
          :city-label="t('profilesPreview.fields.city')"
          :education-label="t('profilesPreview.fields.education')"
          :languages-label="t('profilesPreview.fields.languages')"
          @open="handleProfileOpen"
        />
      </view>

      <!-- CTA -->
      <view class="mt-12 flex justify-center">
        <view
          class="inline-flex min-w-[178px] cursor-pointer items-center justify-center rounded-button border border-brand-highlight/35 bg-brand-highlight/8 px-8 py-3 text-[15px] tracking-[0.6px] text-brand-brown transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-highlight hover:bg-brand-highlight/16 hover:text-text-heading hover:shadow-panel"
          @click="goProfiles"
        >
          {{ t('profilesPreview.cta') }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import ProfileDirectoryCard from '@/components/profiles/ProfileDirectoryCard.vue'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { getHomePreviewProfiles } from '@/mock/business'
import { openProfileDetail } from '@/utils/demo-navigation'

const { t, locale } = usePageI18n('home')
const profiles = getHomePreviewProfiles()

function goProfiles() {
  uni.navigateTo({ url: '/pages/profiles/index' })
}

function handleProfileOpen(id: string) {
  openProfileDetail(id)
}
</script>
