<template>
  <view class="relative overflow-hidden border border-semantic-border-default bg-gradient-profile-hero px-6 py-6 text-semantic-text-primary shadow-profile-hero lg:px-8 lg:py-7">
    <view class="absolute inset-x-0 top-0 h-px bg-semantic-border-divider" />
    <view class="absolute right-[-80px] top-[-70px] hidden h-[220px] w-[220px] rounded-full border border-semantic-border-default xl:block" />

    <view class="relative z-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
      <view class="min-w-0">
        <view class="flex flex-wrap items-center gap-3">
          <view class="inline-flex items-center gap-3">
            <view class="h-px w-12 bg-semantic-accent-secondary" />
            <text class="text-[12px] uppercase tracking-[5px] text-semantic-text-eyebrow">
              {{ data.eyebrow }}
            </text>
          </view>

          <view class="inline-flex items-center border border-semantic-accent-secondary bg-semantic-surface-soft px-3 py-1 text-[11px] tracking-[2px] text-semantic-text-eyebrow">
            {{ data.recordId }}
          </view>
        </view>

        <view class="mt-5 flex flex-wrap items-start gap-5">
          <AppAvatar :value="data.avatarUrl" :fallback="data.avatarFallback" size="lg" tone="accent" />

          <view class="min-w-0 flex-1">
            <view class="flex flex-wrap items-center gap-2.5">
              <view class="text-[36px] font-semibold leading-[1.02] text-semantic-text-primary lg:text-[48px]">
                {{ data.displayName }}
              </view>

              <AppGenderBadge :gender="data.gender" size="md" />
            </view>

            <view class="mt-3 text-[17px] leading-7 text-semantic-text-muted">
              {{ data.meta }}
            </view>

            <view class="mt-5 flex flex-wrap gap-2.5">
              <view
                v-for="badge in data.badges"
                :key="badge.label"
                class="rounded-full border px-3 py-1 text-[12px]"
                :class="badgeClassName(badge.tone)"
              >
                {{ badge.label }}
              </view>
            </view>
          </view>
        </view>

        <view class="mt-6 max-w-[720px] text-[16px] leading-8 text-semantic-text-secondary lg:text-[17px]">
          {{ data.summary }}
        </view>
      </view>

      <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5">
        <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-eyebrow">
          {{ data.indexTitle }}
        </view>

        <view class="mt-4 space-y-3">
          <view
            v-for="item in data.indexFacts"
            :key="item.label"
            class="flex items-start justify-between gap-4 border-b border-semantic-border-divider pb-3 last:border-b-0 last:pb-0"
          >
            <text class="text-[12px] tracking-[1px] text-semantic-text-muted">
              {{ item.label }}
            </text>
            <text class="max-w-[180px] text-right text-[15px] leading-6 text-semantic-text-primary">
              {{ item.value }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppAvatar from '@/components/common/AppAvatar.vue'
import AppGenderBadge from '@/components/common/AppGenderBadge.vue'
import type { ProfileDetailBadgeItem, ProfileDetailHeroData } from '@/types/profiles/detail'

defineProps<{
  data: ProfileDetailHeroData
}>()

function badgeClassName(tone?: ProfileDetailBadgeItem['tone']) {
  if (tone === 'muted') {
    return 'border-semantic-border-default bg-semantic-surface-card text-semantic-text-muted'
  }

  return 'border-semantic-accent-secondary bg-semantic-surface-soft text-semantic-text-eyebrow'
}
</script>
