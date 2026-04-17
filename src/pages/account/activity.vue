<template>
  <AccountShell
    active-page="activity"
    :account-data="accountData"
    :header-eyebrow="t('activity.eyebrow')"
    :header-title="t('activity.title')"
    :header-description="t('activity.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="t('activity.eyebrow')"
          :title="t('activity.sections.list')"
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
            v-for="item in userEvents"
            :key="item.registration.id"
            class="cursor-pointer border px-5 py-5 shadow-panel transition-all duration-200 hover:-translate-y-[2px]"
            :class="statusTone(item.registration.status).card"
            @click="openEventDetail(item.event.id)"
          >
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                  {{ formatDate(item.event.date) }}
                </view>
                <view class="mt-2 text-[15px] text-semantic-text-secondary">
                  {{ localize(item.event.city) }}
                </view>
              </view>

              <view
                class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                :class="statusTone(item.registration.status).badge"
              >
                {{ statusLabel(item.registration.status) }}
              </view>
            </view>

            <view class="mt-5 text-[24px] font-semibold text-semantic-text-primary">
              {{ localize(item.event.title) }}
            </view>

            <view class="mt-4 text-[15px] leading-7 text-semantic-text-primary">
              {{ localize(item.registration.note) }}
            </view>

            <view class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-semantic-border-soft pt-4">
              <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                {{ localize(item.event.venue) }}
              </text>
              <text class="text-[14px] font-medium text-semantic-text-link">
                {{ t('activity.list.action') }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('activity.eyebrow')"
            :title="t('activity.sections.followup')"
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
            :label="t('activity.eyebrow')"
            :title="t('activity.family.title')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in familyPoints"
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
import { openEventDetail } from '@/utils/demo-navigation'
import { formatLocalizedDate } from '@/utils/locale-format'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountData()
const { userEvents } = accountData

const filterItems = computed(() => [
  {
    label: t('activity.filters.confirmed'),
    value: String(userEvents.filter(item => item.registration.status === 'confirmed').length),
  },
  {
    label: t('activity.filters.waitlist'),
    value: String(userEvents.filter(item => item.registration.status === 'waitlist').length),
  },
  {
    label: t('activity.filters.completed'),
    value: String(userEvents.filter(item => item.registration.status === 'completed').length),
  },
])

const supportPoints = computed(() => [
  t('activity.support.point1'),
  t('activity.support.point2'),
  t('activity.support.point3'),
])

const familyPoints = computed(() => [
  t('activity.family.point1'),
  t('activity.family.point2'),
  t('activity.family.point3'),
])

function statusLabel(status: 'confirmed' | 'waitlist' | 'completed') {
  if (status === 'confirmed') return t('activity.filters.confirmed')
  if (status === 'waitlist') return t('activity.filters.waitlist')
  return t('activity.filters.completed')
}

function statusTone(status: 'confirmed' | 'waitlist' | 'completed') {
  if (status === 'confirmed') {
    return {
      card: 'border-component-account-registration-confirmed-card-border bg-component-account-registration-confirmed-card-background',
      badge: 'border-component-account-registration-confirmed-badge-border bg-component-account-registration-confirmed-badge-background text-component-account-registration-confirmed-badge-text',
    }
  }

  if (status === 'waitlist') {
    return {
      card: 'border-component-account-registration-waitlist-card-border bg-component-account-registration-waitlist-card-background',
      badge: 'border-component-account-registration-waitlist-badge-border bg-component-account-registration-waitlist-badge-background text-component-account-registration-waitlist-badge-text',
    }
  }

  return {
    card: 'border-component-account-registration-completed-card-border bg-component-account-registration-completed-card-background',
    badge: 'border-component-account-registration-completed-badge-border bg-component-account-registration-completed-badge-background text-component-account-registration-completed-badge-text',
  }
}

function localize(text: LocalizedText) {
  return pickLocalized(locale.value, text)
}

function formatDate(date: string) {
  return formatLocalizedDate(locale.value, date)
}
</script>
