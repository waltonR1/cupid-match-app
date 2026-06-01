<template>
  <view
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    @click="$emit('close'); $emit('cancel')"
  >
    <view
      class="w-full max-w-[420px] border border-semantic-border-default bg-semantic-surface-card px-7 py-8 shadow-panel"
      @click.stop
    >
      <view class="text-[18px] font-semibold text-semantic-text-primary">
        {{ title }}
      </view>
      <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
        {{ description }}
      </view>

      <view class="mt-7 flex justify-end gap-3 border-t border-semantic-border-soft pt-5">
        <view
          class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px] transition-colors hover:bg-semantic-surface-soft"
          :class="loading ? 'pointer-events-none opacity-50' : ''"
          @click="$emit('cancel'); $emit('close')"
        >
          {{ cancelLabel }}
        </view>
        <view
          class="cursor-pointer border px-5 py-2 text-[13px] font-medium transition-opacity"
          :class="[
            loading ? 'pointer-events-none opacity-50' : '',
            destructive
              ? 'border-semantic-state-danger bg-semantic-state-danger text-white'
              : 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-inverse',
          ]"
          @click="$emit('confirm')"
        >
          {{ confirmLabel }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  destructive?: boolean
  loading?: boolean
}>()

defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()
</script>
