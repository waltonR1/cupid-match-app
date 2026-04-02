<template>
  <view class="border border-border-base bg-surface-card px-5 py-5 shadow-[0_16px_40px_rgba(30,24,18,0.04)]">
    <view class="flex flex-col gap-4">
      <view class="flex flex-wrap items-center gap-3">
        <view class="text-[13px] tracking-[3px] text-text-muted">
          {{ title }}
        </view>

        <view
          class="ml-auto inline-flex cursor-pointer items-center justify-center border border-border-base bg-surface-base px-4 py-2 text-[13px] text-text-body-soft transition-all duration-200 hover:border-border-highlight hover:bg-surface-panel hover:text-text-heading"
          @click="$emit('reset')"
        >
          {{ resetText }}
        </view>
      </view>

      <view
        v-if="activeFilters.length"
        class="flex flex-wrap gap-2 border border-border-light bg-surface-base px-3 py-3"
      >
        <view
          v-for="item in activeFilters"
          :key="item.key"
          class="inline-flex min-h-[36px] items-center gap-2 border border-brand-highlight/40 bg-brand-highlight/10 px-3 text-[12px] text-brand-brown"
        >
          <text class="text-text-body-soft">{{ item.label }}</text>
          <text class="font-medium">{{ item.value }}</text>
          <text
            class="cursor-pointer text-[13px] leading-none transition-opacity duration-200 hover:opacity-70"
            @click="$emit('remove-filter', item.key)"
          >
            ×
          </text>
        </view>
      </view>

      <view class="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <view class="flex min-h-[82rpx] cursor-pointer flex-col justify-center border border-border-base bg-surface-card-soft px-[22rpx] py-[18rpx] transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]">
          <view class="text-[12px] tracking-[1.8px] text-text-muted">{{ ageLabel }}</view>
          <picker
            mode="selector"
            :range="ageOptions"
            range-key="label"
            :value="getSelectedIndex(ageOptions, filters.ageRange)"
            @change="handleSelect('ageRange', ageOptions, $event)"
          >
            <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
              {{ getSelectedLabel(ageOptions, filters.ageRange) }}
            </view>
          </picker>
        </view>

        <view class="flex min-h-[82rpx] cursor-pointer flex-col justify-center border border-border-base bg-surface-card-soft px-[22rpx] py-[18rpx] transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]">
          <view class="text-[12px] tracking-[1.8px] text-text-muted">{{ cityLabel }}</view>
          <picker
            mode="selector"
            :range="cityOptions"
            range-key="label"
            :value="getSelectedIndex(cityOptions, filters.city)"
            @change="handleSelect('city', cityOptions, $event)"
          >
            <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
              {{ getSelectedLabel(cityOptions, filters.city) }}
            </view>
          </picker>
        </view>

        <view class="flex min-h-[82rpx] cursor-pointer flex-col justify-center border border-border-base bg-surface-card-soft px-[22rpx] py-[18rpx] transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]">
          <view class="text-[12px] tracking-[1.8px] text-text-muted">{{ heightLabel }}</view>
          <picker
            mode="selector"
            :range="heightOptions"
            range-key="label"
            :value="getSelectedIndex(heightOptions, filters.heightRange)"
            @change="handleSelect('heightRange', heightOptions, $event)"
          >
            <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
              {{ getSelectedLabel(heightOptions, filters.heightRange) }}
            </view>
          </picker>
        </view>

        <view class="flex min-h-[82rpx] cursor-pointer flex-col justify-center border border-border-base bg-surface-card-soft px-[22rpx] py-[18rpx] transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]">
          <view class="text-[12px] tracking-[1.8px] text-text-muted">{{ educationLabel }}</view>
          <picker
            mode="selector"
            :range="educationOptions"
            range-key="label"
            :value="getSelectedIndex(educationOptions, filters.education)"
            @change="handleSelect('education', educationOptions, $event)"
          >
            <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
              {{ getSelectedLabel(educationOptions, filters.education) }}
            </view>
          </picker>
        </view>

        <view class="flex min-h-[82rpx] cursor-pointer flex-col justify-center border border-border-base bg-surface-card-soft px-[22rpx] py-[18rpx] transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]">
          <view class="text-[12px] tracking-[1.8px] text-text-muted">{{ intentLabel }}</view>
          <picker
            mode="selector"
            :range="intentOptions"
            range-key="label"
            :value="getSelectedIndex(intentOptions, filters.intentCode)"
            @change="handleSelect('intentCode', intentOptions, $event)"
          >
            <view class="mt-[10rpx] text-[15px] leading-[1.5] text-text-heading">
              {{ getSelectedLabel(intentOptions, filters.intentCode) }}
            </view>
          </picker>
        </view>

        <view
          class="flex min-h-[82rpx] cursor-pointer flex-col justify-center border border-border-base bg-surface-card-soft px-[22rpx] py-[18rpx] transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight/70 hover:bg-surface-base hover:shadow-[0_10px_18px_rgba(24,38,58,0.03)]"
          @click="$emit('toggle-advanced')"
        >
          <view class="text-[12px] tracking-[1.8px] text-text-muted">{{ moreFiltersLabel }}</view>
          <view class="mt-[10rpx] text-[15px] leading-[1.5] text-brand-brown">
            {{ advancedOpen ? collapseText : expandText }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type {
  ActiveDirectoryFilterChip,
  DirectoryOption,
  ProfilesDirectoryFilters,
} from './profiles.types'

defineProps<{
  title: string
  resetText: string
  ageLabel: string
  cityLabel: string
  heightLabel: string
  educationLabel: string
  intentLabel: string
  moreFiltersLabel: string
  expandText: string
  collapseText: string
  filters: ProfilesDirectoryFilters
  ageOptions: DirectoryOption[]
  cityOptions: DirectoryOption[]
  heightOptions: DirectoryOption[]
  educationOptions: DirectoryOption[]
  intentOptions: DirectoryOption[]
  activeFilters: ActiveDirectoryFilterChip[]
  advancedOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:filters', value: Partial<ProfilesDirectoryFilters>): void
  (e: 'remove-filter', key: keyof ProfilesDirectoryFilters): void
  (e: 'toggle-advanced'): void
  (e: 'reset'): void
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
