<template>
  <view class="profile-card group">
    <view class="profile-card-top-line" />

    <view class="flex items-start gap-4">
      <view class="avatar-box">
        {{ profile.avatar }}
      </view>

      <view class="min-w-0 flex-1">
        <view class="flex flex-wrap items-center gap-2">
          <view class="truncate text-[22px] font-semibold tracking-[0.2px] text-[#16263a]">
            {{ profile.name }}
          </view>

          <view class="profile-mini-badge">
            {{ genderText }}
          </view>

          <view class="profile-status-badge" :class="statusClassName">
            {{ statusText }}
          </view>
        </view>

        <view class="mt-2 text-[14px] leading-6 text-[#5f6a77]">
          {{ profile.age }} / {{ profile.height }}cm
        </view>

        <view class="mt-1 text-[14px] leading-6 text-[#5f6a77]">
          {{ cityText }}
        </view>
      </view>
    </view>

    <view class="mt-6 space-y-2">
      <view class="text-[14px] leading-7 text-[#1d2a38]">
        <text class="text-[#8a7b67]">{{ educationLabel }}</text>
        <text> · </text>
        <text>{{ educationText }}</text>
      </view>

      <view class="text-[14px] leading-7 text-[#1d2a38]">
        <text class="text-[#8a7b67]">{{ jobLabel }}</text>
        <text> · </text>
        <text>{{ occupationText }}</text>
      </view>

      <view class="text-[14px] leading-7 text-[#1d2a38]">
        <text class="text-[#8a7b67]">{{ intentLabel }}</text>
        <text> · </text>
        <text>{{ intentText }}</text>
      </view>
    </view>

    <view class="mt-5 flex flex-wrap items-center gap-2">
      <view
          v-for="language in visibleLanguages"
          :key="language"
          class="profile-language-chip"
      >
        {{ language }}
      </view>

      <view
          v-if="profile.isVerified"
          class="profile-verified-chip"
      >
        {{ verifiedText }}
      </view>
    </view>

    <view class="mt-5 space-y-2">
      <view
          v-for="(highlight, index) in visibleHighlights"
          :key="`${profile.id}-${index}`"
          class="text-[13px] leading-7 text-[#5f6a77]"
      >
        {{ highlight }}
      </view>

      <view
          v-if="!visibleHighlights.length"
          class="line-clamp-2 text-[13px] leading-7 text-[#5f6a77]"
      >
        {{ summaryText }}
      </view>
    </view>

    <view class="mt-auto pt-6">
      <view class="grid grid-cols-3 gap-2">
        <view
            class="profile-action profile-action-primary interactive-view"
            @click="$emit('view-detail', profile.id)"
        >
          {{ openText }}
        </view>

        <view
            class="profile-action profile-action-secondary interactive-view"
            @click="$emit('toggle-favorite', profile.id)"
        >
          {{ favoriteText }}
        </view>

        <view
            class="profile-action profile-action-service interactive-view"
            @click="$emit('compare', profile.id)"
        >
          {{ advisorText }}
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
  advisorText: string
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
      return 'profile-status-vip'
    case 'review':
      return 'profile-status-review'
    case 'open':
    default:
      return 'profile-status-open'
  }
})
</script>

<style scoped>
.profile-card {
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  border: 1px solid #ddd6c8;
  background: #faf7f1;
  padding: 24rpx 24rpx 26rpx;
  transition: all 0.22s ease;
}

.profile-card:hover {
  transform: translateY(-2px);
  border-color: rgba(184, 156, 107, 0.42);
  box-shadow: 0 18px 36px rgba(20, 33, 48, 0.05);
}

.profile-card-top-line {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  top: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184, 156, 107, 0.95), transparent);
}

.avatar-box {
  display: flex;
  height: 104rpx;
  width: 84rpx;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid #d8cfbf;
  background: linear-gradient(180deg, #ece6dc 0%, #e7dfd2 100%);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #18324d;
}

.profile-mini-badge {
  display: inline-flex;
  height: 24px;
  min-width: 24px;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7d0c4;
  background: #fffdf9;
  padding: 0 8px;
  font-size: 11px;
  letter-spacing: 1px;
  color: #66717c;
}

.profile-status-badge {
  display: inline-flex;
  height: 24px;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7d0c4;
  padding: 0 9px;
  font-size: 11px;
  letter-spacing: 1px;
}

.profile-status-open {
  background: #fffdf9;
  color: #607080;
}

.profile-status-review {
  background: #f8f5ef;
  color: #7a6e60;
}

.profile-status-vip {
  border-color: rgba(184, 156, 107, 0.34);
  background: rgba(184, 156, 107, 0.08);
  color: #7b6241;
}

.profile-language-chip {
  border: 1px solid #ddd6c8;
  background: #fffdf9;
  padding: 6rpx 12rpx;
  font-size: 12px;
  color: #51606f;
  transition: all 0.22s ease;
}

.profile-language-chip:hover {
  border-color: #cbb48a;
  background: #f8f3ea;
  color: #16263a;
}

.profile-verified-chip {
  border: 1px solid rgba(184, 156, 107, 0.34);
  background: rgba(184, 156, 107, 0.08);
  padding: 6rpx 12rpx;
  font-size: 12px;
  color: #7b6241;
}

.profile-action {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd6c8;
  font-size: 13px;
  transition: all 0.22s ease;
}

.profile-action-primary {
  border-color: rgba(184, 156, 107, 0.6);
  background: rgba(184, 156, 107, 0.1);
  color: #7b6241;
}

.profile-action-primary:hover {
  transform: translateY(-1px);
  border-color: rgba(184, 156, 107, 0.78);
  background: rgba(184, 156, 107, 0.16);
  box-shadow: 0 10px 24px rgba(23, 38, 58, 0.07);
}

.profile-action-secondary {
  background: #fffdf9;
  color: #415060;
}

.profile-action-secondary:hover {
  transform: translateY(-1px);
  background: #f8f3ea;
  border-color: #cbb48a;
  color: #16263a;
}

.profile-action-service {
  background: #f5efe5;
  color: #6d5739;
  border-color: rgba(184, 156, 107, 0.28);
}

.profile-action-service:hover {
  transform: translateY(-1px);
  background: rgba(184, 156, 107, 0.12);
  border-color: rgba(184, 156, 107, 0.46);
  color: #7b6241;
}
</style>