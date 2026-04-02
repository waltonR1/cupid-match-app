<template>
  <view class="mt-5">
    <view v-if="items.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <slot
        v-for="(item, index) in items"
        :key="resolveItemKey(item, index)"
        :item="item"
      />
    </view>

    <view
      v-else
      class="border border-border-base bg-surface-card px-6 py-12 text-center"
    >
      <view class="text-[15px] leading-7 text-text-body-soft">
        {{ emptyText }}
      </view>

      <view
        v-if="showEmptyAction"
        class="mt-5 inline-flex min-h-[42px] cursor-pointer items-center justify-center border border-border-base bg-surface-base px-5 text-[13px] text-text-body-soft transition-all duration-200 hover:-translate-y-[1px] hover:border-border-highlight hover:bg-surface-panel hover:text-text-heading"
        @click="$emit('reset')"
      >
        {{ emptyActionText }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
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
