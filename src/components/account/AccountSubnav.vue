<template>
  <view class="flex flex-wrap gap-3">
    <view
      v-for="item in items"
      :key="item.key"
      class="cursor-pointer rounded-button border px-4 py-3 text-[13px] font-medium tracking-[0.2px] transition-all duration-200"
      :class="item.key === activePage
        ? 'border-button-accent bg-button-accent text-button-neutral-ink shadow-panel'
        : 'border-border-base bg-surface-card-soft text-text-body hover:-translate-y-[1px] hover:border-border-accent hover:bg-surface-panel hover:text-text-heading'"
      @click="handleClick(item.key)"
    >
      {{ item.label }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocaleBridge } from '@/i18n/use-locale-bridge'
import {
  openAccountPage,
  openFavoritesPage,
  openMessagesPage,
  openMyEventsPage,
  openMyProfilePage,
  openPrivacyPage,
} from '@/utils/demo-navigation'

type AccountPageKey = 'overview' | 'profile' | 'events' | 'favorites' | 'messages' | 'privacy'

const props = defineProps<{
  activePage: AccountPageKey
}>()

const { t } = useLocaleBridge()

const items = computed(() => [
  { key: 'overview', label: t('account.nav.overview') },
  { key: 'profile', label: t('account.nav.profile') },
  { key: 'events', label: t('account.nav.events') },
  { key: 'favorites', label: t('account.nav.favorites') },
  { key: 'messages', label: t('account.nav.messages') },
  { key: 'privacy', label: t('account.nav.privacy') },
])

function handleClick(key: AccountPageKey) {
  if (key === props.activePage) return

  if (key === 'overview') {
    openAccountPage()
    return
  }
  if (key === 'profile') {
    openMyProfilePage()
    return
  }
  if (key === 'events') {
    openMyEventsPage()
    return
  }
  if (key === 'favorites') {
    openFavoritesPage()
    return
  }
  if (key === 'messages') {
    openMessagesPage()
    return
  }

  openPrivacyPage()
}
</script>
