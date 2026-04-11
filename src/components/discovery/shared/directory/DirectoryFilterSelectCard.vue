<template>
  <view ref="rootRef" class="relative w-full">
    <view
      class="group flex min-h-[38px] w-full cursor-pointer items-center border border-semantic-border-default bg-semantic-surface-soft px-3 transition-all duration-150 hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
      :class="isOpen ? 'border-component-directory-control-selected-border bg-component-directory-control-selected-background' : ''"
      @click.stop="toggleOpen"
    >
      <view class="min-w-0 flex flex-1 items-center gap-1.5">
        <view class="truncate text-[11px] leading-none tracking-[0.4px] text-semantic-text-muted">
          {{ label }}
        </view>
        <view class="truncate text-[13.5px] leading-none" :class="selectedLabelClassName">
          {{ selectedLabel }}
        </view>
      </view>

      <svg
        class="ml-1 h-[7.5px] w-[7.5px] shrink-0 text-semantic-text-muted transition-transform duration-150 group-hover:text-component-directory-control-selected-text"
        :class="isOpen ? 'rotate-180 text-component-directory-control-selected-text' : ''"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 4.25L6 7.75L9.5 4.25"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </view>

    <view
      v-if="isOpen"
      class="absolute left-0 top-[calc(100%+6px)] z-30 min-w-full w-[220px] max-w-[calc(100vw-32px)] overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
      @click.stop
    >
      <view
        class="max-h-[220px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <view
          v-for="option in options"
          :key="option.value || '__all__'"
          class="border-b border-semantic-border-divider last:border-b-0"
        >
          <view
            class="flex cursor-pointer items-center gap-2.5 px-3 py-2 transition-colors duration-150"
            :class="option.value === value
              ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
              : 'bg-semantic-surface-card text-semantic-text-muted hover:bg-semantic-surface-soft hover:text-semantic-text-secondary'"
            @click.stop="handleSelect(option.value)"
          >
            <view
              class="h-5 w-px shrink-0 transition-colors duration-150"
              :class="option.value === value ? 'bg-semantic-accent-secondary' : 'bg-transparent'"
            />
            <text class="min-w-0 text-[13.5px] leading-[1.35] text-left">{{ option.label }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface DirectoryOption {
  label: string
  value: string
}

const props = defineProps<{
  label: string
  options: DirectoryOption[]
  value: string
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const dropdownId = `directory-filter-${Math.random().toString(36).slice(2)}`

const selectedLabel = computed(() => {
  return props.options.find(item => item.value === props.value)?.label || props.options[0]?.label || ''
})

const selectedLabelClassName = computed(() => {
  return props.value ? 'text-component-directory-control-selected-text' : 'text-semantic-text-muted'
})

function closeOpen() {
  isOpen.value = false
}

function toggleOpen() {
  if (!props.options.length) return

  if (!isOpen.value && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('directory-filter-opened', { detail: dropdownId }))
  }

  isOpen.value = !isOpen.value
}

function handleSelect(value: string) {
  emit('change', value)
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
  window.addEventListener('directory-filter-opened', handleDropdownOpened as EventListener)
})

onUnmounted(() => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('directory-filter-opened', handleDropdownOpened as EventListener)
})
</script>
