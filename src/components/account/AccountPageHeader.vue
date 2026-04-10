<template>
  <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
    <AccountSectionHeader
      :label="eyebrow"
      :title="title"
      :description="description"
    />
    <slot />
  </view>
</template>

<script setup lang="ts">
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'

defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>
