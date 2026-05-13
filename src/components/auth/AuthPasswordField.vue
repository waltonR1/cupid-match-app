<template>
  <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
    <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
      {{ label }}
    </view>
    <view class="relative mt-1">
      <input
        v-model="inputValue"
        :password="!visible"
        :autocomplete="autocomplete"
        class="h-10 w-full bg-transparent pr-9 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
        :placeholder="placeholder"
        placeholder-class="text-semantic-text-hero-secondary"
      >
      <view
        class="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center"
        @click="toggleVisible"
      >
        <view class="relative h-4 w-6">
          <view class="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-[50%] border border-semantic-text-hero-secondary" />
          <view
            v-if="visible"
            class="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-semantic-text-hero-secondary"
          />
          <view
            v-else
            class="absolute left-1/2 top-1/2 h-[2px] w-[120%] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-semantic-text-hero-secondary"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  placeholder: string
  autocomplete?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const visible = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

function toggleVisible() {
  visible.value = !visible.value
}
</script>
