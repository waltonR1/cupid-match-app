<template>
  <view class="space-y-2">
    <text class="text-[14px] text-semantic-text-card-label">{{ label }}</text>
    <view class="border border-semantic-border-default bg-semantic-surface-soft px-4 py-3 transition-colors duration-200">
      <textarea
        v-if="multiline"
        :value="modelValue"
        class="min-h-[150px] w-full bg-transparent text-[15px] leading-7 text-semantic-text-primary placeholder:text-semantic-text-muted"
        :placeholder="placeholder"
        placeholder-class="text-semantic-text-muted"
        :maxlength="maxlength"
        @input="handleInput"
      />
      <input
        v-else
        :value="modelValue"
        class="h-8 w-full bg-transparent text-[15px] text-semantic-text-primary placeholder:text-semantic-text-muted"
        type="text"
        :placeholder="placeholder"
        placeholder-class="text-semantic-text-muted"
        :maxlength="maxlength"
        confirm-type="next"
        @input="handleInput"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  modelValue: string
  placeholder: string
  maxlength?: number
  multiline?: boolean
}>(), {
  maxlength: 191,
  multiline: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event | { detail?: { value?: string } }) {
  const detailValue = 'detail' in event ? event.detail?.value : undefined
  if (typeof detailValue === 'string') {
    emit('update:modelValue', detailValue)
    return
  }

  if (!('target' in event)) {
    emit('update:modelValue', '')
    return
  }

  const target = event.target as HTMLInputElement | HTMLTextAreaElement | null
  emit('update:modelValue', target?.value ?? '')
}
</script>
