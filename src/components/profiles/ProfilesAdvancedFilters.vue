<template>
  <view class="mt-3 border border-border-base border-t-0 bg-surface-card/95 px-4 py-4 lg:px-5 lg:py-5">
    <view class="mb-4 text-[13px] tracking-[2px] text-text-muted">
      {{ title }}
    </view>

    <view class="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
      <DirectoryFilterSelectCard
        :label="industryLabel"
        :options="industryOptions"
        :value="filters.industry"
        variant="secondary"
        @change="handleSelect('industry', $event)"
      />

      <DirectoryFilterSelectCard
        :label="occupationLabel"
        :options="occupationOptions"
        :value="filters.occupation"
        variant="secondary"
        @change="handleSelect('occupation', $event)"
      />

      <DirectoryFilterSelectCard
        :label="languageLabel"
        :options="languageOptions"
        :value="filters.language"
        variant="secondary"
        @change="handleSelect('language', $event)"
      />

      <DirectoryFilterSelectCard
        :label="verifiedLabel"
        :options="verifiedOptions"
        :value="filters.verified"
        variant="secondary"
        @change="handleSelect('verified', $event)"
      />

      <DirectoryFilterSelectCard
        :label="maritalStatusLabel"
        :options="maritalStatusOptions"
        :value="filters.maritalStatus"
        variant="secondary"
        @change="handleSelect('maritalStatus', $event)"
      />

      <DirectoryFilterSelectCard
        :label="childrenLabel"
        :options="childrenOptions"
        :value="filters.hasChildren"
        variant="secondary"
        @change="handleSelect('hasChildren', $event)"
      />

      <DirectoryFilterSelectCard
        :label="longDistanceLabel"
        :options="longDistanceOptions"
        :value="filters.acceptLongDistance"
        variant="secondary"
        span-class="md:col-span-2 xl:col-span-1"
        @change="handleSelect('acceptLongDistance', $event)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import DirectoryFilterSelectCard from '@/components/common/DirectoryFilterSelectCard.vue'
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

function handleSelect(key: keyof ProfilesDirectoryFilters, value: string) {
  emit('update:filters', { [key]: value })
}
</script>
