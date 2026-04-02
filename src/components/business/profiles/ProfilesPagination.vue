<template>
  <view
      v-if="total > 0"
      class="mt-6 flex flex-wrap items-center justify-center gap-2 border border-divider bg-card px-4 py-4"
  >
    <view
        class="cursor-pointer border px-4 py-2 text-[13px]"
        :class="page <= 1 ? 'border-divider bg-[#f7f3ec] text-[#b6ab9a]' : 'border-divider bg-background text-text-secondary'"
        @click="handlePrev"
    >
      {{ prevText }}
    </view>

    <view
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        class="min-w-[42px] cursor-pointer border px-4 py-2 text-center text-[13px]"
        :class="pageNumber === page
        ? 'border-[#b89c6b] bg-[rgba(184,156,107,0.08)] text-[#7b6241]'
        : 'border-divider bg-background text-text-secondary'"
        @click="handleChange(pageNumber)"
    >
      {{ pageNumber }}
    </view>

    <view
        class="cursor-pointer border px-4 py-2 text-[13px]"
        :class="page >= totalPages ? 'border-divider bg-[#f7f3ec] text-[#b6ab9a]' : 'border-divider bg-background text-text-secondary'"
        @click="handleNext"
    >
      {{ nextText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

const pageNumbers = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= totalPages.value; i += 1) {
    pages.push(i)
  }
  return pages
})

function handleChange(nextPage: number) {
  if (nextPage < 1 || nextPage > totalPages.value) return
  emit('change', nextPage)
}

function handlePrev() {
  handleChange(props.page - 1)
}

function handleNext() {
  handleChange(props.page + 1)
}
</script>