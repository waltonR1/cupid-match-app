<template>
  <view class="mt-5">
    <view v-if="items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <ProfileDirectoryCard
          v-for="item in items"
          :key="item.id"
          :profile="item"
          :locale="locale"
          :male-text="maleText"
          :female-text="femaleText"
          :education-label="educationLabel"
          :job-label="jobLabel"
          :intent-label="intentLabel"
          :verified-text="verifiedText"
          :status-open-text="statusOpenText"
          :status-review-text="statusReviewText"
          :status-vip-text="statusVipText"
          :open-text="openText"
          :favorite-text="favoriteText"
          :advisor-text="advisorText"
          @view-detail="$emit('view-detail', $event)"
          @toggle-favorite="$emit('toggle-favorite', $event)"
          @compare="$emit('compare', $event)"
      />
    </view>

    <view
        v-else
        class="border border-divider bg-card px-6 py-12 text-center text-[15px] leading-7 text-text-secondary"
    >
      {{ emptyText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import type { AppLocale } from '@/i18n/types'
import type { MockProfile } from '@/mock/business'
import ProfileDirectoryCard from './ProfileDirectoryCard.vue'

defineProps<{
  items: MockProfile[]
  locale: AppLocale
  emptyText: string

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
</script>