<template>
  <view class="flex h-full flex-col border border-divider bg-card px-5 py-5">
    <view class="flex items-start gap-4">
      <view class="avatar-box">
        {{ profile.avatar }}
      </view>

      <view class="min-w-0 flex-1">
        <view class="flex items-center gap-2">
          <view class="truncate text-[20px] font-semibold text-text-main">
            {{ profile.name }}
          </view>

          <view
              class="inline-flex h-6 min-w-6 items-center justify-center border border-divider px-2 text-[11px] tracking-[1px] text-text-secondary"
          >
            {{ genderText }}
          </view>

          <view
              class="inline-flex h-6 items-center justify-center border px-2 text-[11px] tracking-[1px]"
              :class="statusClassName"
          >
            {{ statusText }}
          </view>
        </view>

        <view class="mt-2 text-[14px] text-text-secondary">
          {{ profile.age }} / {{ profile.height }}cm
        </view>

        <view class="mt-1 text-[14px] text-text-secondary">
          {{ cityText }}
        </view>
      </view>
    </view>

    <view class="mt-5 space-y-2">
      <view class="text-[14px] text-text-main">
        <text class="text-text-secondary">{{ educationLabel }}</text>
        <text> · </text>
        <text>{{ educationText }}</text>
      </view>

      <view class="text-[14px] text-text-main">
        <text class="text-text-secondary">{{ jobLabel }}</text>
        <text> · </text>
        <text>{{ occupationText }}</text>
      </view>

      <view class="text-[14px] text-text-main">
        <text class="text-text-secondary">{{ intentLabel }}</text>
        <text> · </text>
        <text>{{ intentText }}</text>
      </view>

      <view class="flex flex-wrap items-center gap-2 pt-1">
        <view
            v-for="language in visibleLanguages"
            :key="language"
            class="border border-divider bg-background px-2 py-1 text-[12px] text-text-secondary"
        >
          {{ language }}
        </view>

        <view
            v-if="profile.isVerified"
            class="border border-[rgba(184,156,107,0.34)] bg-[rgba(184,156,107,0.08)] px-2 py-1 text-[12px] text-[#7b6241]"
        >
          {{ verifiedText }}
        </view>
      </view>
    </view>

    <view class="mt-5 space-y-2">
      <view
          v-for="(highlight, index) in visibleHighlights"
          :key="`${profile.id}-${index}`"
          class="line-clamp-1 text-[13px] leading-6 text-text-secondary"
      >
        {{ highlight }}
      </view>

      <view
          v-if="!visibleHighlights.length"
          class="line-clamp-2 text-[13px] leading-6 text-text-secondary"
      >
        {{ summaryText }}
      </view>
    </view>

    <view class="mt-auto pt-5">
      <view class="grid grid-cols-3 gap-2">
        <view
            class="cursor-pointer border border-[#b89c6b] bg-[rgba(184,156,107,0.08)] px-3 py-3 text-center text-[13px] text-[#7b6241]"
            @click="$emit('view-detail', profile.id)"
        >
          {{ openText }}
        </view>

        <view
            class="cursor-pointer border border-divider bg-background px-3 py-3 text-center text-[13px] text-text-secondary"
            @click="$emit('toggle-favorite', profile.id)"
        >
          {{ favoriteText }}
        </view>

        <view
            class="cursor-pointer border border-divider bg-background px-3 py-3 text-center text-[13px] text-text-secondary"
            @click="$emit('compare', profile.id)"
        >
          {{ compareText }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pickLocalized } from '@/mock/business'
import type { AppLocale } from '@/i18n/types'
import type { MockProfile } from '@/mock/business'

const props = defineProps<{
  profile: MockProfile
  locale: AppLocale

  maleText: string
  femaleText: string

  educationLabel: string
  jobLabel: string
  intentLabel: string

  verifiedText: string
  statusOpenText: string
  statusReviewText: string
  statusVipText: string

  openText: string
  favoriteText: string
  compareText: string
}>()

defineEmits<{
  (e: 'view-detail', id: string): void
  (e: 'toggle-favorite', id: string): void
  (e: 'compare', id: string): void
}>()

const genderText = computed(() => {
  return props.profile.gender === 'male' ? props.maleText : props.femaleText
})

const cityText = computed(() => pickLocalized(props.locale, props.profile.city))
const educationText = computed(() => pickLocalized(props.locale, props.profile.education))
const occupationText = computed(() => pickLocalized(props.locale, props.profile.occupation))
const intentText = computed(() => pickLocalized(props.locale, props.profile.intent))
const summaryText = computed(() => pickLocalized(props.locale, props.profile.summary))

const visibleHighlights = computed(() => {
  return props.profile.highlights
      .slice(0, 2)
      .map(item => pickLocalized(props.locale, item))
})

const visibleLanguages = computed(() => {
  return props.profile.languages.slice(0, 2)
})

const statusText = computed(() => {
  switch (props.profile.status) {
    case 'vip':
      return props.statusVipText
    case 'review':
      return props.statusReviewText
    case 'open':
    default:
      return props.statusOpenText
  }
})

const statusClassName = computed(() => {
  switch (props.profile.status) {
    case 'vip':
      return 'border-[rgba(184,156,107,0.34)] bg-[rgba(184,156,107,0.08)] text-[#7b6241]'
    case 'review':
      return 'border-divider bg-background text-text-secondary'
    case 'open':
    default:
      return 'border-divider bg-background text-text-secondary'
  }
})
</script>

<style scoped>
.avatar-box {
  display: flex;
  height: 92px;
  width: 76px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd6c8;
  background: #f2ede4;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #2b3a4a;
}
</style>