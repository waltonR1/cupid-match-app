<template>
  <view class="mt-5">
    <view v-if="items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <slot
        v-for="(item, index) in items"
        :key="resolveItemKey(item, index)"
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

<script setup lang="ts">
import EmptyStatePanel from '@/components/common/EmptyStatePanel.vue'

const props = withDefaults(defineProps<{
  items: any[]
  emptyText: string
  emptyActionText?: string
  showEmptyAction?: boolean
  itemKeyField?: string
}>(), {
  emptyActionText: '',
  showEmptyAction: false,
  itemKeyField: 'id',
})

defineEmits<{
  (e: 'reset'): void
}>()

function resolveItemKey(item: any, index: number) {
  const field = props.itemKeyField
  const key = item?.[field]
  return key ?? index
}
</script>
