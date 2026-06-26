<template>
  <AppPageLayout>
    <view class="mx-auto grid max-w-[1280px] gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:py-8">
      <aside class="border border-semantic-border-default bg-semantic-surface-card px-5 py-6 shadow-panel">
        <view class="flex items-center gap-3">
          <view class="h-px w-8 bg-semantic-border-eyebrow" />
          <text class="text-[11px] uppercase tracking-[4px] text-semantic-text-eyebrow">
            {{ t('topSummary.title') }}
          </text>
        </view>

        <view class="mt-4 text-[26px] font-semibold text-semantic-text-primary">
          {{ auth.accountName || t('topSummary.guestName') }}
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

      <view class="min-w-0">
        <slot />
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useAuthStore } from '@/stores/modules/auth'
import {useOptionsStore} from '@/stores/modules/options'
import {
  openAccountEventsPage,
  openAccountPage,
  openAccountSettingsPage,
  openMembershipPage,
  openMyProfilePage,
  openRelationshipPage,
} from '@/utils/navigation'

type AccountPageKey = 'home' | 'profiles' | 'relationship' | 'events' | 'membership' | 'settings'

defineProps<{
  activePage: AccountPageKey
}>()

const auth = useAuthStore()
const optionsStore = useOptionsStore()
const { t, locale } = usePageI18n('accountCenter')
watch(locale, value => {
  void optionsStore.ensureOptions(value)
}, {immediate: true})
const membershipName = computed(() => {
  const tier = auth.membershipTier
  return tier ? optionLabel('membership.tier', tier) : t('home.functional.noMembership')
})
function optionLabel(group: string, value: string): string {
  return optionsStore.labelFor(locale.value, group, value) ?? value
}

const items = computed<Array<{ key: AccountPageKey; label: string }>>(() => [
  { key: 'home', label: t('nav.home') },
  { key: 'profiles', label: t('nav.profiles') },
  { key: 'relationship', label: t('nav.relationship') },
  { key: 'events', label: t('nav.events') },
  { key: 'membership', label: t('nav.membership') },
  { key: 'settings', label: t('nav.settings') },
])

function openNavigation(key: AccountPageKey) {
  if (key === 'home') { openAccountPage(); return }
  if (key === 'profiles') { openMyProfilePage(); return }
  if (key === 'relationship') { openRelationshipPage(); return }
  if (key === 'events') { openAccountEventsPage(); return }
  if (key === 'membership') { openMembershipPage(); return }
  openAccountSettingsPage()
}
</script>
