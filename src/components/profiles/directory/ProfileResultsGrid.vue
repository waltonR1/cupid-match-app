<template>
  <view class="mt-5">
    <view v-if="items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <slot
        v-for="(item, index) in items"
        :key="item.id ?? index"
        :item="item"
      />
    </view>

    <EmptyStatePanel
      v-else
      :title="emptyText"
      :primary-text="showEmptyAction ? emptyActionText : ''"
      primary-variant="outline"
      variant="compact"
      @primary="$emit('reset')"
    />
  </view>
</template>

<script setup lang="ts" generic="T extends { id?: string | number }">
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'

const props = withDefaults(defineProps<{
  items: T[]
  emptyText: string
  emptyActionText?: string
  showEmptyAction?: boolean
}>(), {
  emptyActionText: '',
  showEmptyAction: false,
})

defineSlots<{
  default(props: { item: T }): unknown
}>()

defineEmits<{
  (e: 'reset'): void
}>()
</script>
