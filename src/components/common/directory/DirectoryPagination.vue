<template>
  <view
    v-if="totalPages > 1"
    class="mt-6 flex flex-wrap items-center justify-center gap-2 border border-border-base bg-surface-card px-5 py-4 shadow-panel"
  >
    <view
      class="inline-flex min-h-[40px] min-w-[44px] items-center justify-center border px-4 text-[13px] transition-all duration-200"
      :class="page <= 1
        ? 'border-border-base bg-surface-panel text-text-subtle'
        : 'cursor-pointer border-border-base bg-surface-base text-text-body-soft hover:-translate-y-[1px] hover:border-border-accent hover:bg-surface-panel hover:text-text-heading'"
      @click="handlePrev"
    >
      {{ prevText }}
    </view>

    <view
      v-for="item in pageItems"
      :key="item.key"
      class="inline-flex min-h-[40px] min-w-[44px] items-center justify-center border px-4 text-[13px] transition-all duration-200"
      :class="item.type === 'ellipsis'
        ? 'border-border-light bg-surface-card text-text-subtle'
        : item.value === page
          ? 'border-brand-accent/60 bg-brand-accent/10 text-brand-support hover:-translate-y-[1px] hover:border-brand-accent/80 hover:bg-brand-accent/20'
          : 'cursor-pointer border-border-base bg-surface-base text-text-body-soft hover:-translate-y-[1px] hover:border-border-accent hover:bg-surface-panel hover:text-text-heading'"
      @click="handleTokenClick(item)"
    >
      {{ item.label }}
    </view>

    <view
      class="inline-flex min-h-[40px] min-w-[44px] items-center justify-center border px-4 text-[13px] transition-all duration-200"
      :class="page >= totalPages
        ? 'border-border-base bg-surface-panel text-text-subtle'
        : 'cursor-pointer border-border-base bg-surface-base text-text-body-soft hover:-translate-y-[1px] hover:border-border-accent hover:bg-surface-panel hover:text-text-heading'"
      @click="handleNext"
    >
      {{ nextText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PaginationItem {
  key: string
  type: 'page' | 'ellipsis'
  label: string
  value?: number
}

const props = defineProps<{
  page: number
  pageSize: number
  total: number
  prevText: string
  nextText: string
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const totalPages = computed(() => {
  if (!props.total) return 1
  return Math.ceil(props.total / props.pageSize)
})

const pageItems = computed<PaginationItem[]>(() => {
  const total = totalPages.value
  const current = props.page

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => {
      const value = index + 1
      return {
        key: `page-${value}`,
        type: 'page',
        label: String(value),
        value,
      }
    })
  }

  const visiblePages = new Set<number>([1, total, current])

  if (current <= 3) {
    visiblePages.add(2)
    visiblePages.add(3)
    visiblePages.add(4)
  } else if (current >= total - 2) {
    visiblePages.add(total - 1)
    visiblePages.add(total - 2)
    visiblePages.add(total - 3)
  } else {
    visiblePages.add(current - 1)
    visiblePages.add(current + 1)
  }

  const sortedPages = Array.from(visiblePages)
    .filter(value => value >= 1 && value <= total)
    .sort((a, b) => a - b)

  const items: PaginationItem[] = []

  sortedPages.forEach((value, index) => {
    if (index > 0) {
      const previous = sortedPages[index - 1]
      if (value - previous > 1) {
        items.push({
          key: `ellipsis-${previous}-${value}`,
          type: 'ellipsis',
          label: '...',
        })
      }
    }

    items.push({
      key: `page-${value}`,
      type: 'page',
      label: String(value),
      value,
    })
  })

  return items
})

function handleChange(nextPage: number) {
  if (nextPage < 1 || nextPage > totalPages.value) return
  emit('change', nextPage)
}

function handleTokenClick(item: PaginationItem) {
  if (item.type !== 'page' || typeof item.value !== 'number') return
  handleChange(item.value)
}

function handlePrev() {
  handleChange(props.page - 1)
}

function handleNext() {
  handleChange(props.page + 1)
}
</script>
