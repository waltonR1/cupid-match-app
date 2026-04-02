<template>
  <view class="mt-3 border border-border-base border-t-0 bg-surface-card/95 px-4 py-4 lg:px-5 lg:py-5">
    <view class="mb-4 text-[13px] tracking-[2px] text-text-muted">
      {{ title }}
    </view>

    <view class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ industryLabel }}</view>
        <picker
          mode="selector"
          :range="industryOptions"
          range-key="label"
          :value="getSelectedIndex(industryOptions, filters.industry)"
          @change="handleSelect('industry', industryOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(industryOptions, filters.industry) }}
          </view>
        </picker>
      </view>

      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ occupationLabel }}</view>
        <picker
          mode="selector"
          :range="occupationOptions"
          range-key="label"
          :value="getSelectedIndex(occupationOptions, filters.occupation)"
          @change="handleSelect('occupation', occupationOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(occupationOptions, filters.occupation) }}
          </view>
        </picker>
      </view>

      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ languageLabel }}</view>
        <picker
          mode="selector"
          :range="languageOptions"
          range-key="label"
          :value="getSelectedIndex(languageOptions, filters.language)"
          @change="handleSelect('language', languageOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(languageOptions, filters.language) }}
          </view>
        </picker>
      </view>

      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ verifiedLabel }}</view>
        <picker
          mode="selector"
          :range="verifiedOptions"
          range-key="label"
          :value="getSelectedIndex(verifiedOptions, filters.verified)"
          @change="handleSelect('verified', verifiedOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(verifiedOptions, filters.verified) }}
          </view>
        </picker>
      </view>

      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ maritalStatusLabel }}</view>
        <picker
          mode="selector"
          :range="maritalStatusOptions"
          range-key="label"
          :value="getSelectedIndex(maritalStatusOptions, filters.maritalStatus)"
          @change="handleSelect('maritalStatus', maritalStatusOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(maritalStatusOptions, filters.maritalStatus) }}
          </view>
        </picker>
      </view>

      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ childrenLabel }}</view>
        <picker
          mode="selector"
          :range="childrenOptions"
          range-key="label"
          :value="getSelectedIndex(childrenOptions, filters.hasChildren)"
          @change="handleSelect('hasChildren', childrenOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(childrenOptions, filters.hasChildren) }}
          </view>
        </picker>
      </view>

      <view class="flex min-h-[78rpx] flex-col justify-center border border-border-base bg-surface-base px-[22rpx] py-[18rpx] transition-all duration-200 hover:border-border-highlight/70 hover:bg-surface-card-soft md:col-span-2 xl:col-span-1">
        <view class="text-[12px] tracking-[1.5px] text-text-muted">{{ longDistanceLabel }}</view>
        <picker
          mode="selector"
          :range="longDistanceOptions"
          range-key="label"
          :value="getSelectedIndex(longDistanceOptions, filters.acceptLongDistance)"
          @change="handleSelect('acceptLongDistance', longDistanceOptions, $event)"
        >
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
            {{ getSelectedLabel(longDistanceOptions, filters.acceptLongDistance) }}
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DirectoryOption, ProfilesDirectoryFilters } from './profiles.types'

defineProps<{
  title: string
  industryLabel: string
  occupationLabel: string
  languageLabel: string
  verifiedLabel: string
  maritalStatusLabel: string
  childrenLabel: string
  longDistanceLabel: string

  filters: ProfilesDirectoryFilters
  industryOptions: DirectoryOption[]
  occupationOptions: DirectoryOption[]
  languageOptions: DirectoryOption[]
  verifiedOptions: DirectoryOption[]
  maritalStatusOptions: DirectoryOption[]
  childrenOptions: DirectoryOption[]
  longDistanceOptions: DirectoryOption[]
}>()

const emit = defineEmits<{
  (e: 'update:filters', value: Partial<ProfilesDirectoryFilters>): void
}>()

function getSelectedIndex(options: DirectoryOption[], value: string) {
  const index = options.findIndex(item => item.value === value)
  return index >= 0 ? index : 0
}

function getSelectedLabel(options: DirectoryOption[], value: string) {
  return options.find(item => item.value === value)?.label || options[0]?.label || ''
}

function handleSelect(
  key: keyof ProfilesDirectoryFilters,
  options: DirectoryOption[],
  event: any,
) {
  const index = Number(event?.detail?.value ?? 0)
  const option = options[index]

  emit('update:filters', {
    [key]: option?.value ?? '',
  })
}
</script>
