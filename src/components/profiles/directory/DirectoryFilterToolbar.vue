<template>
  <view class="border border-semantic-border-default bg-semantic-surface-card px-4 py-4 shadow-panel">
    <view class="flex flex-col gap-3">
      <view class="flex flex-wrap items-center gap-3">
        <view class="min-w-0 flex-1">
          <view class="text-[12.5px] tracking-[2.6px] text-semantic-text-muted">
            {{ props.title }}
          </view>
        </view>

        <view class="ml-auto flex items-center gap-2">
          <view
            v-if="secondaryFilters.length"
            class="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 border border-semantic-border-default bg-semantic-surface-soft px-3.5 text-[12.5px] text-semantic-text-muted transition-all duration-200 hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel hover:text-semantic-text-primary"
            @click="toggleExpanded"
          >
            <text>{{ isExpanded ? props.collapseText : props.expandText }}</text>
            <svg
              class="h-2 w-2 shrink-0 transition-transform duration-150"
              :class="isExpanded ? 'rotate-180 text-component-directory-control-selected-text' : ''"
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
            class="inline-flex min-h-[36px] cursor-pointer items-center justify-center border border-semantic-border-default bg-semantic-surface-soft px-3.5 text-[12.5px] text-semantic-text-muted transition-all duration-200 hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel hover:text-semantic-text-primary"
            @click="emit('reset')"
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
import DirectoryActiveFilterChips from '@/components/profiles/directory/DirectoryActiveFilterChips.vue'
import DirectoryFilterSelectCard from '@/components/profiles/directory/DirectoryFilterSelectCard.vue'

interface FilterOption {
  label: string
  value: string
}

interface ActiveFilterChip {
  key: string
  label: string
  value: string
}

export interface DirectoryFilterToolbarItem {
  key: string
  label: string
  options: FilterOption[]
  value: string
  widthClass: string
  group?: 'primary' | 'secondary'
}

const props = defineProps<{
  title: string
  resetText: string
  expandText: string
  collapseText: string
  items: DirectoryFilterToolbarItem[]
  activeFilters: ActiveFilterChip[]
}>()

const emit = defineEmits<{
  (e: 'update:filter', value: { key: string, value: string }): void
  (e: 'remove-filter', key: string): void
  (e: 'reset'): void
}>()

const isExpanded = ref(false)

const primaryFilters = computed<DirectoryFilterToolbarItem[]>(() => {
  return props.items.filter(item => item.group !== 'secondary')
})

const secondaryFilters = computed<DirectoryFilterToolbarItem[]>(() => {
  return props.items.filter(item => item.group === 'secondary')
})

const visibleFilters = computed(() => {
  return isExpanded.value
    ? [...primaryFilters.value, ...secondaryFilters.value]
    : primaryFilters.value
})

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}

function handleSelect(key: string, value: string) {
  emit('update:filter', { key, value })
}

function handleRemoveFilter(key: string) {
  emit('remove-filter', key)
}
</script>
