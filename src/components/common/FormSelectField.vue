<template>
  <view ref="rootRef" class="relative space-y-2">
    <text class="text-[14px] text-semantic-text-card-label">{{ label }}</text>
    <view
      class="flex min-h-[58px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-4 text-[15px] transition-colors duration-200 hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
      @click.stop="toggleOpen"
    >
      <text class="text-semantic-text-primary">{{ selectedLabel }}</text>
      <text class="text-semantic-text-muted">{{ isOpen ? '^' : 'v' }}</text>
    </view>

    <view
      v-if="isOpen"
      class="absolute left-0 top-[calc(100%+6px)] z-30 max-h-[280px] w-full overflow-y-auto border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
      @click.stop
    >
      <view
        v-for="option in options"
        :key="option.value"
        class="cursor-pointer border-b border-semantic-border-divider px-4 py-3 text-[15px] last:border-b-0"
        :class="option.value === modelValue
          ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
          : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { DirectoryOption } from '@/types/profiles/directory'

const props = defineProps<{
  label: string
  modelValue: string
  options: DirectoryOption[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const dropdownId = `form-select-${Math.random().toString(36).slice(2)}`

const selectedLabel = computed(() => {
  return props.options.find(option => option.value === props.modelValue)?.label || props.options[0]?.label || ''
})

function closeOpen() {
  isOpen.value = false
}

function toggleOpen() {
  if (!props.options.length) return

  if (!isOpen.value && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('form-select-opened', { detail: dropdownId }))
  }

  isOpen.value = !isOpen.value
}

function selectOption(value: string) {
  emit('update:modelValue', value)
  closeOpen()
}

function handleOutsideClick(event: Event) {
  if (!isOpen.value || !rootRef.value) return

  const target = event.target as Node | null
  if (target && rootRef.value.contains(target)) return

  closeOpen()
}

function handleDropdownOpened(event: Event) {
  const currentId = (event as CustomEvent<string>).detail
  if (currentId === dropdownId) return

  closeOpen()
}

onMounted(() => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('form-select-opened', handleDropdownOpened as EventListener)
})

onUnmounted(() => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('form-select-opened', handleDropdownOpened as EventListener)
})
</script>
