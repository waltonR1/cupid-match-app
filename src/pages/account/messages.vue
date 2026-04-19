<template>
  <AccountShell
    active-page="messages"
    :account-data="accountData"
    :header-eyebrow="t('messages.eyebrow')"
    :header-title="t('messages.title')"
    :header-description="t('messages.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="t('messages.eyebrow')"
          :title="t('messages.sections.threads')"
        />

        <view class="mt-6 flex flex-wrap gap-3">
          <view
            v-for="filter in filterItems"
            :key="filter.label"
            class="rounded-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px] text-semantic-text-secondary"
          >
            {{ filter.label }} · {{ filter.value }}
          </view>
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in threads"
            :key="item.thread.id"
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-5 py-5 shadow-panel transition-all duration-200 hover:-translate-y-[2px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft"
            @click="handleProfileOpen(item.profile.id)"
          >
            <view class="flex items-start gap-4">
              <view class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-semantic-border-default bg-semantic-surface-soft text-[18px] font-semibold text-semantic-text-primary">
                {{ item.profile.avatar }}
              </view>

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view class="min-w-0">
                    <view class="text-[24px] font-semibold text-semantic-text-primary">
                      {{ item.profile.name }}
                    </view>
                    <view class="mt-2 text-[15px] text-semantic-text-secondary">
                      {{ localize(item.profile.city) }} · {{ item.profile.age }}
                    </view>
                  </view>

                  <view class="flex flex-wrap items-center justify-end gap-2">
                    <view
                      v-if="item.profile.familyVisible"
                      class="rounded-full border border-component-account-badge-meta-border bg-component-account-badge-meta-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-component-account-badge-meta-text"
                    >
                      {{ t('messages.list.familyBadge') }}
                    </view>
                    <view
                      v-if="item.thread.unread > 0"
                      class="rounded-full border border-component-account-badge-status-border bg-component-account-badge-status-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-component-account-badge-status-text"
                    >
                      {{ t('messages.list.unreadLabel') }} {{ item.thread.unread }}
                    </view>
                  </view>
                </view>

                <view class="mt-4 text-[15px] leading-7 text-semantic-text-primary">
                  {{ localize(item.thread.lastMessage) }}
                </view>

                <view class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-semantic-border-soft pt-4">
                  <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                    {{ formatDateTime(item.thread.updatedAt) }}
                  </text>
                  <text class="text-[14px] font-medium text-semantic-text-link">
                    {{ t('messages.list.open') }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('messages.eyebrow')"
            :title="t('messages.sections.safety')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in supportPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('messages.eyebrow')"
            :title="t('messages.boundary.title')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in boundaryPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-component-account-list-marker-dot" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import { useAccountData } from '@/composables/account'
import { pickLocalized, type LocalizedText } from '@/api/modules/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openSelfDetail } from '@/utils/navigation'
import { formatLocalizedDateTime } from '@/utils/locale-format'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountData()
const {
  threads,
  unreadCount,
  familyVisibleThreads,
} = accountData

const filterItems = computed(() => [
  { label: t('messages.filters.all'), value: String(threads.length) },
  { label: t('messages.filters.unread'), value: String(unreadCount.value) },
  { label: t('messages.filters.family'), value: String(familyVisibleThreads.value.length) },
])

const supportPoints = computed(() => [
  t('messages.support.point1'),
  t('messages.support.point2'),
  t('messages.support.point3'),
])

const boundaryPoints = computed(() => [
  t('messages.boundary.point1'),
  t('messages.boundary.point2'),
  t('messages.boundary.point3'),
])

function handleProfileOpen(id: string) {
  openSelfDetail(id)
}

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function formatDateTime(date: string) {
  return formatLocalizedDateTime(locale.value, date)
}
</script>
