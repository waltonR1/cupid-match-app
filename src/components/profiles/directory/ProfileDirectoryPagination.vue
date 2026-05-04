<template>
  <!-- 目录分页器 -->
  <view
      v-if="totalPages > 1"
      class="mt-6 flex flex-wrap items-center justify-center gap-2 border border-semantic-border-default bg-semantic-surface-card px-5 py-4 shadow-panel"
  >
    <!-- 上一页按钮 -->
    <view
        class="inline-flex min-h-[40px] min-w-[44px] items-center justify-center border px-4 text-[13px] transition-all duration-200"
        :class="page <= 1
        ? 'border-semantic-border-default bg-semantic-surface-panel text-semantic-text-subtle'
        : 'cursor-pointer border-semantic-border-default bg-semantic-surface-panel text-semantic-text-muted hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
        @click="handlePrev"
    >
      {{ prevText }}
    </view>

    <!-- 页码列表 -->
    <view
        v-for="item in pageItems"
        :key="item.key"
        class="inline-flex min-h-[40px] min-w-[44px] items-center justify-center border px-4 text-[13px] transition-all duration-200"
        :class="item.type === 'ellipsis'
        ? 'border-semantic-border-divider bg-semantic-surface-card text-semantic-text-subtle'
        : item.value === page
          ? 'border-component-directory-control-selected-border bg-component-directory-control-selected-background text-component-directory-control-selected-text hover:-translate-y-[1px] hover:border-component-directory-control-selected-border-hover hover:bg-component-directory-control-selected-background-hover'
          : 'cursor-pointer border-semantic-border-default bg-semantic-surface-panel text-semantic-text-muted hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
        @click="handleTokenClick(item)"
    >
      {{ item.label }}
    </view>

    <!-- 下一页按钮 -->
    <view
        class="inline-flex min-h-[40px] min-w-[44px] items-center justify-center border px-4 text-[13px] transition-all duration-200"
        :class="page >= totalPages
        ? 'border-semantic-border-default bg-semantic-surface-panel text-semantic-text-subtle'
        : 'cursor-pointer border-semantic-border-default bg-semantic-surface-panel text-semantic-text-muted hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
        @click="handleNext"
    >
      {{ nextText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'

/** 分页项结构 */
interface PaginationItem {
  key: string
  type: 'page' | 'ellipsis'
  label: string
  value?: number
}

/** 分页器组件参数 */
const props = defineProps<{
  page: number
  pageSize: number
  total: number
  prevText: string
  nextText: string
}>()

/** 分页切换事件 */
const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

/** 总页数 */
const totalPages = computed(() => {
  if (!props.total) return 1

  return Math.ceil(props.total / props.pageSize)
})

/** 页码展示列表 */
const pageItems = computed<PaginationItem[]>(() => {
  const total = totalPages.value
  const current = props.page

  if (total <= 7) {
    return Array.from({length: total}, (_, index) => {
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

/** 切换到指定页 */
function handleChange(nextPage: number) {
  if (nextPage < 1 || nextPage > totalPages.value) return

  emit('change', nextPage)
}

/** 点击页码或省略号 */
function handleTokenClick(item: PaginationItem) {
  if (item.type !== 'page' || typeof item.value !== 'number') return

  handleChange(item.value)
}

/** 上一页 */
function handlePrev() {
  handleChange(props.page - 1)
}

/** 下一页 */
function handleNext() {
  handleChange(props.page + 1)
}
</script>