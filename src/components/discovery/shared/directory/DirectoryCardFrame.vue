<template>
  <view
    class="flex h-full min-h-[460px] flex-col border border-semantic-border-default bg-semantic-surface-card p-6 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-panel"
    :class="rootClassName"
    @click="handleSelect"
  >
    <view class="flex items-start justify-between gap-4">
      <view class="flex min-w-0 items-center gap-4">
        <view class="flex h-14 w-14 items-center justify-center rounded-full border border-semantic-border-soft bg-semantic-surface-panel text-[20px] font-semibold text-semantic-accent-primary">
          {{ data.avatar }}
        </view>

        <view class="min-w-0">
          <view class="flex items-center gap-2">
            <view class="min-w-0 truncate text-[22px] font-semibold text-semantic-text-primary">
              {{ data.name }}
            </view>
            <view
              v-if="data.gender"
              class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-muted"
            >
              <svg
                v-if="data.gender === 'female'"
                class="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6" cy="3.75" r="2.75" stroke="currentColor" stroke-width="1.25" />
                <path d="M6 6.75V11" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
                <path d="M4.25 9.25H7.75" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
              </svg>
              <svg
                v-else
                class="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4.5" cy="7.5" r="2.75" stroke="currentColor" stroke-width="1.25" />
                <path d="M6.75 5.25L11 1" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
                <path d="M8.25 1H11V3.75" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </view>
          </view>
          <view class="mt-1 text-[14px] text-semantic-text-muted">
            {{ data.meta }}
          </view>
        </view>
      </view>

      <view class="rounded-full border border-component-directory-card-badge-border bg-component-directory-card-badge-background px-3 py-1 text-[12px] text-component-directory-card-badge-text">
        {{ data.badge }}
      </view>
    </view>

    <view class="mt-6 text-[15px] leading-7 text-semantic-text-secondary" :class="summaryClass">
      {{ data.summary }}
    </view>

    <view class="mt-6 grid gap-3">
      <view
        v-for="fact in data.facts"
        :key="fact.label"
        class="flex items-start justify-between gap-4 border-b border-semantic-border-divider pb-3 text-[14px]"
      >
        <text class="text-semantic-text-subtle">{{ fact.label }}</text>
        <text class="text-right text-semantic-text-primary">{{ fact.value }}</text>
      </view>
    </view>

    <view class="mt-6 flex flex-wrap gap-2">
      <view
        v-for="tag in data.tags"
        :key="tag"
        class="rounded-full border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1 text-[12px] text-semantic-text-muted"
      >
        {{ tag }}
      </view>
    </view>

    <view class="mt-auto pt-8 text-[13px] italic tracking-[2px] text-semantic-text-eyebrow">
      {{ data.footer }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DirectoryCardViewModel } from '@/types/directory-card'

const props = withDefaults(defineProps<{
  data: DirectoryCardViewModel
  clickable?: boolean
  summaryClass?: string
}>(), {
  clickable: false,
  summaryClass: '',
})

const emit = defineEmits<{
  (e: 'select'): void
}>()

const rootClassName = computed(() => {
  return props.clickable ? 'cursor-pointer hover:border-component-directory-card-hover-border hover:bg-semantic-surface-soft' : ''
})

function handleSelect() {
  if (!props.clickable) return
  emit('select')
}
</script>
