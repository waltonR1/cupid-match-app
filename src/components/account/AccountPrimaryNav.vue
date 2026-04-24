<template>
  <view class="flex flex-wrap gap-3">
    <view
      v-for="item in items"
      :key="item.key"
      class="cursor-pointer rounded-button border px-4 py-3 text-[13px] font-medium tracking-[0.2px] transition-all duration-200"
      :class="item.key === activePage
        ? 'border-component-account-nav-current-border bg-semantic-surface-panel text-semantic-text-primary shadow-panel'
        : 'border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary hover:-translate-y-[1px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-panel hover:text-semantic-text-primary'"
      @click="openPage(item.key)"
    >
      {{ item.label }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AccountPrimaryPageKey } from '@/types/account/navigation'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import {
  openConnectionsPage,
  openMembershipPage,
  openMessagesPage,
  openMyProfilePage,
  openSafetyPage,
  openVerificationPage,
} from '@/utils/navigation'

const props = defineProps<{
  activePage: AccountPrimaryPageKey
}>()

const { t } = usePageI18n('accountCenter')

const items = computed<Array<{ key: AccountPrimaryPageKey; label: string }>>(() => [
  { key: 'profile', label: t('nav.profile') },
  { key: 'verification', label: t('nav.verification') },
  { key: 'connections', label: t('nav.connections') },
  { key: 'messages', label: t('nav.messages') },
  { key: 'safety', label: t('nav.safety') },
  { key: 'membership', label: t('nav.membership') },
])

function openPage(key: AccountPrimaryPageKey) {
  if (key === props.activePage) return

  if (key === 'profile') {
    openMyProfilePage()
    return
  }

  if (key === 'verification') {
    openVerificationPage()
    return
  }

  if (key === 'connections') {
    openConnectionsPage()
    return
  }

  if (key === 'messages') {
    openMessagesPage()
    return
  }

  if (key === 'safety') {
    openSafetyPage()
    return
  }

  openMembershipPage()
}
</script>
