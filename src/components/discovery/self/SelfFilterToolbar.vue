<template>
  <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-4 py-4 shadow-next-shadow-panel">
    <view class="flex flex-col gap-3">
      <view class="flex flex-wrap items-center gap-3">
        <view class="min-w-0 flex-1">
          <view class="text-[12.5px] tracking-[2.6px] text-next-semantic-text-muted">
            {{ props.title }}
          </view>
        </view>

        <view class="ml-auto flex items-center gap-2">
          <view
            v-if="secondaryFilters.length"
            class="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 border border-next-semantic-border-default bg-next-semantic-surface-soft px-3.5 text-[12.5px] text-next-semantic-text-muted transition-all duration-200 hover:border-next-semantic-border-card-hover hover:bg-next-semantic-surface-panel hover:text-next-semantic-text-primary"
            @click="toggleExpanded"
          >
            <text>{{ isExpanded ? props.collapseText : props.expandText }}</text>
            <svg
              class="h-2 w-2 shrink-0 transition-transform duration-150"
              :class="isExpanded ? 'rotate-180 text-next-component-directory-control-selected-text' : ''"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 4.25L6 7.75L9.5 4.25"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </view>

          <view
            class="inline-flex min-h-[36px] cursor-pointer items-center justify-center border border-next-semantic-border-default bg-next-semantic-surface-soft px-3.5 text-[12.5px] text-next-semantic-text-muted transition-all duration-200 hover:border-next-semantic-border-card-hover hover:bg-next-semantic-surface-panel hover:text-next-semantic-text-primary"
            @click="$emit('reset')"
          >
            {{ props.resetText }}
          </view>
        </view>
      </view>

      <DirectoryActiveFilterChips
        v-if="props.activeFilters.length"
        :items="props.activeFilters"
        @remove="handleRemoveFilter"
      />

      <view class="flex flex-wrap gap-1.5">
        <view
          v-for="filter in visibleFilters"
          :key="filter.key"
          :class="filter.widthClass"
        >
          <DirectoryFilterSelectCard
            :label="filter.label"
            :options="filter.options"
            :value="filter.value"
            @change="handleSelect(filter.key, $event)"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DirectoryActiveFilterChips from '@/components/discovery/shared/directory/DirectoryActiveFilterChips.vue'
import DirectoryFilterSelectCard from '@/components/discovery/shared/directory/DirectoryFilterSelectCard.vue'
import type {
  ActiveDirectoryFilterChip,
  DirectoryOption,
  SelfDirectoryFilters,
} from './self.types'

const emit = defineEmits<{
  (e: 'update:filters', value: Partial<SelfDirectoryFilters>): void
  (e: 'remove-filter', key: keyof SelfDirectoryFilters): void
  (e: 'reset'): void
}>()

interface SelfFilterItem {
  key: keyof SelfDirectoryFilters
  label: string
  options: DirectoryOption[]
  value: string
  widthClass: string
}

const props = defineProps<{
  title: string
  resetText: string
  expandText: string
  collapseText: string
  genderLabel: string
  ageLabel: string
  cityLabel: string
  heightLabel: string
  educationLabel: string
  intentLabel: string
  industryLabel: string
  occupationLabel: string
  languageLabel: string
  verifiedLabel: string
  maritalStatusLabel: string
  childrenLabel: string
  longDistanceLabel: string
  filters: SelfDirectoryFilters
  genderOptions: DirectoryOption[]
  ageOptions: DirectoryOption[]
  cityOptions: DirectoryOption[]
  heightOptions: DirectoryOption[]
  educationOptions: DirectoryOption[]
  intentOptions: DirectoryOption[]
  industryOptions: DirectoryOption[]
  occupationOptions: DirectoryOption[]
  languageOptions: DirectoryOption[]
  verifiedOptions: DirectoryOption[]
  maritalStatusOptions: DirectoryOption[]
  childrenOptions: DirectoryOption[]
  longDistanceOptions: DirectoryOption[]
  activeFilters: ActiveDirectoryFilterChip[]
}>()

const isExpanded = ref(false)

const compactWidthClass = 'w-[86px] sm:w-[90px] lg:w-[94px] xl:w-[98px]'
const regularWidthClass = 'w-[98px] sm:w-[104px] lg:w-[110px] xl:w-[116px]'
const wideWidthClass = 'w-[114px] sm:w-[122px] lg:w-[130px] xl:w-[136px]'

const primaryFilters = computed<SelfFilterItem[]>(() => [
  {
    key: 'gender',
    label: props.genderLabel,
    options: props.genderOptions,
    value: props.filters.gender,
    widthClass: compactWidthClass,
  },
  {
    key: 'ageRange',
    label: props.ageLabel,
    options: props.ageOptions,
    value: props.filters.ageRange,
    widthClass: compactWidthClass,
  },
  {
    key: 'city',
    label: props.cityLabel,
    options: props.cityOptions,
    value: props.filters.city,
    widthClass: regularWidthClass,
  },
  {
    key: 'heightRange',
    label: props.heightLabel,
    options: props.heightOptions,
    value: props.filters.heightRange,
    widthClass: compactWidthClass,
  },
  {
    key: 'education',
    label: props.educationLabel,
    options: props.educationOptions,
    value: props.filters.education,
    widthClass: regularWidthClass,
  },
  {
    key: 'intentCode',
    label: props.intentLabel,
    options: props.intentOptions,
    value: props.filters.intentCode,
    widthClass: wideWidthClass,
  },
])

const secondaryFilters = computed<SelfFilterItem[]>(() => [
  {
    key: 'industry',
    label: props.industryLabel,
    options: props.industryOptions,
    value: props.filters.industry,
    widthClass: regularWidthClass,
  },
  {
    key: 'occupation',
    label: props.occupationLabel,
    options: props.occupationOptions,
    value: props.filters.occupation,
    widthClass: wideWidthClass,
  },
  {
    key: 'language',
    label: props.languageLabel,
    options: props.languageOptions,
    value: props.filters.language,
    widthClass: regularWidthClass,
  },
  {
    key: 'verified',
    label: props.verifiedLabel,
    options: props.verifiedOptions,
    value: props.filters.verified,
    widthClass: regularWidthClass,
  },
  {
    key: 'maritalStatus',
    label: props.maritalStatusLabel,
    options: props.maritalStatusOptions,
    value: props.filters.maritalStatus,
    widthClass: regularWidthClass,
  },
  {
    key: 'hasChildren',
    label: props.childrenLabel,
    options: props.childrenOptions,
    value: props.filters.hasChildren,
    widthClass: regularWidthClass,
  },
  {
    key: 'acceptLongDistance',
    label: props.longDistanceLabel,
    options: props.longDistanceOptions,
    value: props.filters.acceptLongDistance,
    widthClass: regularWidthClass,
  },
])

const visibleFilters = computed(() => {
  return isExpanded.value
    ? [...primaryFilters.value, ...secondaryFilters.value]
    : primaryFilters.value
})

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function handleSelect(key: keyof SelfDirectoryFilters, value: string) {
  emit('update:filters', { [key]: value })
}

function handleRemoveFilter(key: string) {
  emit('remove-filter', key as keyof SelfDirectoryFilters)
}
</script>
