<template>
  <view class="mt-5">
    <view v-if="items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <ProfileDirectoryCard
        v-for="item in items"
        :key="item.id"
        :profile="item"
        :locale="locale"
        :city-label="cityLabel"
        :education-label="educationLabel"
        :languages-label="languagesLabel"
      />
    </view>

    <view
      v-else
      class="border border-border-base bg-surface-card px-6 py-12 text-center"
    >
      <view class="text-[15px] leading-7 text-text-body-soft">
        {{ emptyText }}
      </view>

      <view
        v-if="showEmptyAction"
        class="mt-5 inline-flex min-h-[42px] cursor-pointer items-center justify-center border border-border-base bg-surface-base px-5 text-[13px] text-text-body-soft transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight hover:bg-surface-panel hover:text-text-heading"
        @click="$emit('reset')"
      >
        {{ emptyActionText }}
      </view>
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
  emptyActionText?: string
  showEmptyAction?: boolean

  cityLabel: string
  educationLabel: string
  languagesLabel: string
}>()

defineEmits<{
  (e: 'reset'): void
}>()
</script>
