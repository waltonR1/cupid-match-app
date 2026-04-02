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

      <ActiveFilterChips
        :items="activeFilters"
        @remove="handleRemoveFilter"
      />

      <view class="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
        <DirectoryFilterSelectCard
          :label="genderLabel"
          :options="genderOptions"
          :value="filters.gender"
          @change="handleSelect('gender', $event)"
        />

        <DirectoryFilterSelectCard
          :label="ageLabel"
          :options="ageOptions"
          :value="filters.ageRange"
          @change="handleSelect('ageRange', $event)"
        />

        <DirectoryFilterSelectCard
          :label="cityLabel"
          :options="cityOptions"
          :value="filters.city"
          @change="handleSelect('city', $event)"
        />

        <DirectoryFilterSelectCard
          :label="heightLabel"
          :options="heightOptions"
          :value="filters.heightRange"
          @change="handleSelect('heightRange', $event)"
        />

        <DirectoryFilterSelectCard
          :label="educationLabel"
          :options="educationOptions"
          :value="filters.education"
          @change="handleSelect('education', $event)"
        />

        <DirectoryFilterSelectCard
          :label="intentLabel"
          :options="intentOptions"
          :value="filters.intentCode"
          @change="handleSelect('intentCode', $event)"
        />

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
import ActiveFilterChips from '@/components/common/ActiveFilterChips.vue'
import DirectoryFilterSelectCard from '@/components/common/DirectoryFilterSelectCard.vue'
import type {
  ActiveDirectoryFilterChip,
  DirectoryOption,
  ProfilesDirectoryFilters,
} from './profiles.types'

defineProps<{
  title: string
  resetText: string
  genderLabel: string
  ageLabel: string
  cityLabel: string
  heightLabel: string
  educationLabel: string
  intentLabel: string
  moreFiltersLabel: string
  expandText: string
  collapseText: string
  filters: ProfilesDirectoryFilters
  genderOptions: DirectoryOption[]
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

function handleSelect(key: keyof ProfilesDirectoryFilters, value: string) {
  emit('update:filters', { [key]: value })
}

function handleRemoveFilter(key: string) {
  emit('remove-filter', key as keyof ProfilesDirectoryFilters)
}
</script>
