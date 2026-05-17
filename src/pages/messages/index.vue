<template>
  <AppPageLayout>
    <view class="mx-auto w-full max-w-[1120px] px-6 py-10 lg:px-8 lg:py-14">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-7 shadow-panel md:px-8 md:py-8">
        <view class="flex items-center gap-3">
          <view class="h-px w-10 bg-semantic-border-eyebrow" />
          <text class="text-[11px] uppercase tracking-[4px] text-semantic-text-eyebrow">
            {{ t('eyebrow') }}
          </text>
        </view>
        <view class="mt-4 text-[30px] font-semibold text-semantic-text-primary">
          {{ t('title') }}
        </view>
        <view class="mt-3 max-w-[680px] text-[15px] leading-8 text-semantic-text-secondary">
          {{ t('subtitle') }}
        </view>
      </view>

      <view class="mt-6 grid gap-4 md:grid-cols-2">
        <view
          v-for="item in sections"
          :key="item.key"
          class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ item.label }}
          </view>
          <view class="mt-4 text-[20px] font-semibold text-semantic-text-primary">
            {{ item.title }}
          </view>
          <view class="mt-3 text-[14px] leading-7 text-semantic-text-secondary">
            {{ item.description }}
          </view>
        </view>
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'

const { t } = usePageI18n('messages')

const sections = computed(() => [
  {
    key: 'updates',
    label: t('sections.updates.label'),
    title: t('sections.updates.title'),
    description: t('sections.updates.description'),
  },
  {
    key: 'conversations',
    label: t('sections.conversations.label'),
    title: t('sections.conversations.title'),
    description: t('sections.conversations.description'),
  },
])
</script>
