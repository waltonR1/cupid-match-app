<template>
  <view class="overflow-hidden border border-semantic-border-default bg-semantic-surface-card shadow-profile-hero">
    <view class="grid lg:grid-cols-[360px_minmax(0,1fr)]">
      <view class="relative min-h-[360px] bg-gradient-profile-hero">
        <image
            v-if="primaryPhoto"
            :src="primaryPhoto"
            class="absolute inset-0 h-full w-full cursor-pointer"
            mode="aspectFill"
            @click="openPreview(primaryPhoto)"
        />
        <view class="absolute inset-0 bg-component-hero-overlay-background-soft"/>
        <view class="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
          <view
              v-for="badge in data.badges"
              :key="badge.label"
              :class="badgeClassName(badge.tone)"
              class="border px-3 py-1.5 text-[12px]"
          >
            {{ badge.label }}
          </view>
        </view>
      </view>

      <view class="px-6 py-7 lg:px-8 lg:py-8">
        <view class="flex flex-wrap items-start justify-between gap-5">
          <view class="min-w-0">
            <view class="flex flex-wrap items-center gap-3">
              <view class="text-[36px] font-semibold leading-tight text-semantic-text-primary lg:text-[44px]">
                {{ data.displayName }}
              </view>
              <AppGenderBadge :gender="data.gender" size="md"/>
            </view>

            <view class="mt-2 text-[17px] leading-7 text-semantic-text-secondary">
              {{ data.meta }}
            </view>
            <view class="mt-1 flex flex-wrap gap-2 text-[14px] text-semantic-text-muted">
              <text>{{ data.location }}</text>
            </view>
          </view>

          <view
              :class="data.hasMemberAccess ? 'border-semantic-accent-secondary text-semantic-text-eyebrow' : 'border-semantic-border-default text-semantic-text-muted'"
              class="border px-3 py-2 text-[12px] tracking-[1px]"
          >
            {{ data.accessLabel }}
          </view>
        </view>

        <view class="mt-7 text-[18px] leading-9 text-semantic-text-primary">
          {{ data.summary }}
        </view>

        <view class="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <view
              v-for="item in visibleQuickFacts"
              :key="item.label"
              class="border border-semantic-border-divider bg-semantic-surface-soft px-4 py-4"
          >
            <view class="text-[12px] text-semantic-text-muted">{{ item.label }}</view>
            <view class="mt-2 text-[16px] leading-7 text-semantic-text-primary">{{ displayValue(item) }}</view>
          </view>
        </view>

        <view class="mt-6 flex flex-wrap gap-2">
          <view
              v-for="item in data.tags"
              :key="item"
              class="rounded-full border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1.5 text-[12px] text-semantic-text-secondary"
          >
            {{ item }}
          </view>
        </view>

        <view v-if="secondaryPhotos.length || data.galleryLockedText" class="mt-6 grid grid-cols-3 gap-2">
          <image
              v-for="photo in secondaryPhotos"
              :key="photo"
              :src="photo"
              class="h-[86px] w-full cursor-pointer border border-semantic-border-divider bg-semantic-surface-soft"
              mode="aspectFill"
              @click="openPreview(photo)"
          />
          <view
              v-if="data.galleryLockedText"
              class="flex h-[86px] items-center justify-center border border-semantic-border-divider bg-semantic-surface-soft px-3 text-center text-[12px] leading-5 text-semantic-text-muted"
          >
            {{ data.galleryLockedText }}
          </view>
        </view>
      </view>
    </view>

    <view
        v-if="previewPhoto"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
        @click="closePreview"
    >
      <image
          :src="previewPhoto"
          class="h-full w-full"
          mode="aspectFit"
          @click.stop
      />
      <view
          class="fixed right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center text-[28px] leading-none text-white/30 transition-opacity duration-200 hover:text-white/60"
          @click.stop="closePreview"
      >
        ×
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import AppGenderBadge from '@/components/common/AppGenderBadge.vue'
import type {ProfileDetailBadgeItem, ProfileDetailGalleryHeroData} from '@/types/profiles/detail'

const props = defineProps<{
  data: ProfileDetailGalleryHeroData
  loginLockedText?: string
  memberLockedText?: string
}>()

const primaryPhoto = computed(() => props.data.photos[0] || props.data.avatarUrl)
const secondaryPhotos = computed(() => props.data.photos.slice(1, 4))
const visibleQuickFacts = computed(() => props.data.quickFacts.filter(item => item.access !== 'hidden'))
const previewPhoto = ref('')

/** 打开图片预览 */
function openPreview(photo: string) {
  previewPhoto.value = photo
}

/** 关闭图片预览 */
function closePreview() {
  previewPhoto.value = ''
}

/** 徽章样式 */
function badgeClassName(tone?: ProfileDetailBadgeItem['tone']) {
  if (tone === 'muted') {
    return 'border-semantic-border-default bg-semantic-surface-card text-semantic-text-muted'
  }

  return 'border-semantic-accent-secondary bg-semantic-surface-soft text-semantic-text-eyebrow'
}

/** 展示字段值 */
function displayValue(item: { value: string, maskText?: string, access?: string, lockReason?: string }) {
  if (item.access === 'masked') {
    if (item.lockReason === 'login') return props.loginLockedText || '****'
    if (item.lockReason === 'member') return props.memberLockedText || '****'
    return item.maskText || '****'
  }

  return item.value
}
</script>
