<template>
  <AccountShell active-page="events">
    <view>
      <AccountSubPageHeader
        :label="t('events.title')"
        :title="t('events.title')"
        :description="t('events.subtitle')"
      />

      <view class="grid gap-4">
        <view
          v-if="grouped.attention.length > 0"
          class="border border-semantic-border-default bg-semantic-surface-card shadow-panel"
        >
          <view class="border-b border-semantic-border-soft px-5 py-4">
            <view class="text-[15px] font-semibold">{{ t('events.attention.title') }}</view>
            <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('events.attention.description') }}
            </view>
          </view>

          <view
            v-for="item in grouped.attention"
            :key="item.registrationId"
            class="grid cursor-pointer gap-4 border-b border-semantic-border-soft px-5 py-5 transition-colors hover:bg-semantic-surface-soft last:border-b-0 md:grid-cols-[120px_minmax(0,1fr)_160px]"
            @click="openEventDetail(item.eventId)"
          >
            <image :src="item.coverImageUrl" class="h-24 w-full object-cover" />
            <view>
              <view class="text-[18px] font-semibold">{{ item.title }}</view>
              <view class="mt-3 text-[14px] text-semantic-text-secondary">{{ item.city }} / {{ item.venue }}</view>
              <view class="mt-1 text-[13px] text-semantic-text-muted">
                {{ formatLocalizedDate(locale, item.date) }} / {{ item.startTime }}-{{ item.endTime }}
              </view>
            </view>
            <view class="flex items-start md:justify-end">
              <EventStatusBadge
                :status="toBadgeStatus(item.status)"
                :label="t(`events.registrationStatus.${item.status}`)"
              />
            </view>
          </view>
        </view>

        <view
          v-if="grouped.attention.length === 0 && grouped.history.length > 0"
          class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 text-[14px] leading-7 text-semantic-text-secondary shadow-panel"
        >
          {{ t('events.noUpcoming') }}
        </view>

        <view
          v-if="grouped.history.length > 0"
          class="border border-semantic-border-default bg-semantic-surface-card shadow-panel"
        >
          <view class="border-b border-semantic-border-soft px-5 py-4">
            <view class="text-[15px] font-semibold">{{ t('events.history.title') }}</view>
            <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('events.history.description') }}
            </view>
          </view>

          <view
            v-for="item in grouped.history"
            :key="item.registrationId"
            class="grid cursor-pointer gap-4 border-b border-semantic-border-soft px-5 py-5 transition-colors hover:bg-semantic-surface-soft last:border-b-0 md:grid-cols-[120px_minmax(0,1fr)_160px]"
            @click="openEventDetail(item.eventId)"
          >
            <image :src="item.coverImageUrl" class="h-24 w-full object-cover" />
            <view>
              <view class="text-[18px] font-semibold">{{ item.title }}</view>
              <view class="mt-3 text-[14px] text-semantic-text-secondary">{{ item.city }} / {{ item.venue }}</view>
              <view class="mt-1 text-[13px] text-semantic-text-muted">
                {{ formatLocalizedDate(locale, item.date) }} / {{ item.startTime }}-{{ item.endTime }}
              </view>
            </view>
            <view class="flex items-start md:justify-end">
              <EventStatusBadge
                :status="toBadgeStatus(item.status)"
                :label="t(`events.registrationStatus.${item.status}`)"
              />
            </view>
          </view>
        </view>

        <view class="grid gap-4">
          <EmptyStatePanel
            v-if="grouped.attention.length === 0 && grouped.history.length === 0"
            size="page"
            :title="t('events.empty.title')"
            :description="t('events.empty.description')"
          />
        </view>

      </view>
    </view>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import EventStatusBadge from '@/components/events/EventStatusBadge.vue'
import { useAccountEvents } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openEventDetail } from '@/utils/navigation'
import { formatLocalizedDate } from '@/utils/locale-format'
import { toBadgeStatus, groupRegistrations } from '@/mappers/account-events'

const { t, locale } = usePageI18n('accountCenter')
const { registrations } = useAccountEvents()

const grouped = computed(() => groupRegistrations(registrations.value))
</script>
