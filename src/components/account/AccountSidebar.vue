<template>
  <aside class="border border-semantic-border-default bg-semantic-surface-card px-5 py-6 shadow-panel">
    <view class="flex items-center gap-3">
      <view class="h-px w-8 bg-semantic-border-eyebrow" />
      <text class="text-[11px] uppercase tracking-[4px] text-semantic-text-eyebrow">
        {{ t('topSummary.title') }}
      </text>
    </view>

    <view class="mt-4 text-[26px] font-semibold text-semantic-text-primary">
      {{ accountName }}
    </view>
    <view class="mt-2 text-[14px] leading-6 text-semantic-text-secondary">
      {{ membershipName }}
    </view>

    <view class="mt-6 grid gap-1">
      <view
        v-for="item in items"
        :key="item.key"
        class="cursor-pointer border-l-2 px-3 py-3 text-[14px] transition-colors"
        :class="item.key === activePage
          ? 'border-semantic-border-emphasis bg-semantic-surface-panel text-semantic-text-primary'
          : 'border-transparent text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
        @click="openNavigation(item.key)"
      >
        {{ item.label }}
      </view>
    </view>
  </aside>
</template>

<script setup lang="ts">
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import {
  openAccountEventsPage,
  openAccountPage,
  openAccountSettingsPage,
  openMembershipPage,
  openMyProfilePage,
  openRelationshipPage,
} from '@/utils/navigation'

type AccountPageKey = 'home' | 'profiles' | 'relationship' | 'events' | 'membership' | 'settings'

const props = defineProps<{
  accountName: string
  membership: string
  activePage: AccountPageKey
}>()

const { t } = usePageI18n('accountCenter')
const { t: globalT } = useLocaleBridge()
const membershipName = globalT(`membership.${props.membership}.title`)
const items: Array<{ key: AccountPageKey; label: string }> = [
  { key: 'home', label: t('nav.home') },
  { key: 'profiles', label: t('nav.profiles') },
  { key: 'relationship', label: t('nav.relationship') },
  { key: 'events', label: t('nav.events') },
  { key: 'membership', label: t('nav.membership') },
  { key: 'settings', label: t('nav.settings') },
]

function openNavigation(key: AccountPageKey) {
  if (key === 'home') { openAccountPage(); return }
  if (key === 'profiles') { openMyProfilePage(); return }
  if (key === 'relationship') { openRelationshipPage(); return }
  if (key === 'events') { openAccountEventsPage(); return }
  if (key === 'membership') { openMembershipPage(); return }
  openAccountSettingsPage()
}
</script>
