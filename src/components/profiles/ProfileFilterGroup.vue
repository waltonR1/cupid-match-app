<template>
  <view class="relative overflow-hidden border border-[#e2d7c9] bg-[#faf7f1] px-7 py-7 shadow-[0_14px_30px_rgba(30,24,18,0.04)]">
    <view class="absolute inset-x-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(215,184,110,0.9),transparent)]" />
    <view class="flex items-start justify-between gap-4">
      <view>
        <view class="text-[12px] uppercase tracking-[5px] text-[#cf9aa0]">{{ label }}</view>
        <view v-if="hint" class="mt-3 max-w-[280px] text-[13px] leading-6 text-[#8a7766]">{{ hint }}</view>
      </view>
      <button
        v-if="activeValue"
        class="border border-[#ddd0c0] bg-white px-3 py-2 text-[12px] tracking-[2px] text-[#6d5a48]"
        @click="emit('clear')"
      >
        {{ clearLabel }}
      </button>
    </view>
    <view class="mt-5 flex flex-wrap gap-3">
      <button
        v-for="item in options"
        :key="item"
        class="border px-4 py-2 text-[14px] transition-all duration-200"
        :class="item === activeValue
          ? 'border-[#203854] bg-[#203854] text-[#f6e8c7] shadow-[0_12px_24px_rgba(32,56,84,0.18)]'
          : 'border-[#e3d8cb] bg-white text-[#5d5045]'"
        @click="emit('toggle', item)"
      >
        {{ item }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  hint?: string
  options: string[]
  activeValue: string
  clearLabel: string
}>()

const emit = defineEmits<{
  toggle: [value: string]
  clear: []
}>()
</script>
