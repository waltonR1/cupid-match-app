<template>
  <view
      v-if="total > 0"
      class="profile-pagination-wrap"
  >
    <view
        class="profile-page-btn interactive-view"
        :class="page <= 1 ? 'profile-page-btn-disabled' : 'profile-page-btn-default'"
        @click="handlePrev"
    >
      {{ prevText }}
    </view>

    <view
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        class="profile-page-number interactive-view"
        :class="pageNumber === page ? 'profile-page-number-active' : 'profile-page-number-default'"
        @click="handleChange(pageNumber)"
    >
      {{ pageNumber }}
    </view>

    <view
        class="profile-page-btn interactive-view"
        :class="page >= totalPages ? 'profile-page-btn-disabled' : 'profile-page-btn-default'"
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

<style scoped>
.profile-pagination-wrap {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #ddd6c8;
  background: #faf7f1;
  padding: 16px 18px;
}

.profile-page-btn,
.profile-page-number {
  display: flex;
  min-width: 44px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd6c8;
  padding: 0 14px;
  font-size: 13px;
  transition: all 0.22s ease;
}

.profile-page-btn-default,
.profile-page-number-default {
  background: #fffdf9;
  color: #506071;
}

.profile-page-btn-default:hover,
.profile-page-number-default:hover {
  transform: translateY(-1px);
  border-color: #cbb48a;
  background: #f8f3ea;
  color: #16263a;
}

.profile-page-number-active {
  border-color: rgba(184, 156, 107, 0.62);
  background: rgba(184, 156, 107, 0.1);
  color: #7b6241;
}

.profile-page-number-active:hover {
  transform: translateY(-1px);
  border-color: rgba(184, 156, 107, 0.78);
  background: rgba(184, 156, 107, 0.14);
}

.profile-page-btn-disabled {
  background: #f7f3ec;
  color: #b6ab9a;
}
</style>