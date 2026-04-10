<template>
  <AccountShell active-page="messages">
    <template #header>
      <AccountPageHeader
        :eyebrow="t('messages.eyebrow')"
        :title="t('messages.title')"
        :description="t('messages.subtitle')"
      />
    </template>

    <view class="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="t('messages.eyebrow')"
          :title="t('messages.sections.threads')"
        />

        <view class="mt-6 flex flex-wrap gap-3">
          <view
            v-for="filter in filterItems"
            :key="filter.label"
            class="rounded-full border border-next-semantic-border-soft bg-next-semantic-surface-panel px-4 py-2 text-[13px] text-next-semantic-text-secondary"
          >
            {{ filter.label }} · {{ filter.value }}
          </view>
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in threads"
            :key="item.thread.id"
            class="cursor-pointer border border-next-semantic-border-soft bg-next-semantic-surface-panel px-5 py-5 shadow-next-shadow-panel transition-all duration-200 hover:-translate-y-[2px] hover:border-next-component-section-card-hover-border hover:bg-next-semantic-surface-soft"
            @click="handleProfileOpen(item.profile.id)"
          >
            <view class="flex items-start gap-4">
              <view class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-next-semantic-border-default bg-next-semantic-surface-soft text-[18px] font-semibold text-next-semantic-text-primary">
                {{ item.profile.avatar }}
              </view>

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view class="min-w-0">
                    <view class="text-[24px] font-semibold text-next-semantic-text-primary">
                      {{ item.profile.name }}
                    </view>
                    <view class="mt-2 text-[15px] text-next-semantic-text-secondary">
                      {{ localize(item.profile.city) }} · {{ item.profile.age }}
                    </view>
                  </view>

                  <view class="flex flex-wrap items-center justify-end gap-2">
                    <view
                      v-if="item.profile.familyVisible"
                      class="rounded-full border border-next-semantic-accent-secondary bg-next-semantic-surface-soft px-3 py-1 text-[11px] uppercase tracking-[2px] text-next-semantic-accent-secondary"
                    >
                      {{ t('messages.list.familyBadge') }}
                    </view>
                    <view
                      v-if="item.thread.unread > 0"
                      class="rounded-full border border-next-semantic-action-primary bg-next-semantic-action-primary px-3 py-1 text-[11px] uppercase tracking-[2px] text-next-semantic-action-primary-contrast"
                    >
                      {{ t('messages.list.unreadLabel') }} {{ item.thread.unread }}
                    </view>
                  </view>
                </view>

                <view class="mt-4 text-[15px] leading-7 text-next-semantic-text-primary">
                  {{ localize(item.thread.lastMessage) }}
                </view>

                <view class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-next-semantic-border-soft pt-4">
                  <text class="text-[12px] uppercase tracking-[3px] text-next-semantic-text-muted">
                    {{ formatDateTime(item.thread.updatedAt) }}
                  </text>
                  <text class="text-[14px] font-medium text-next-semantic-accent-secondary">
                    {{ t('messages.list.open') }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('messages.eyebrow')"
            :title="t('messages.sections.safety')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in supportPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-secondary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-semantic-accent-secondary" />
              <text>{{ point }}</text>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-default bg-next-semantic-surface-info-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('messages.eyebrow')"
            :title="t('messages.boundary.title')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in boundaryPoints"
              :key="point"
              class="flex items-start gap-3 text-[15px] leading-7 text-next-semantic-text-primary"
            >
              <view class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-next-semantic-action-primary" />
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
import AccountPageHeader from '@/components/account/AccountPageHeader.vue'
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountShell from '@/components/account/AccountShell.vue'
import { useAccountData } from '@/components/account/use-account-data'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openSelfDetail } from '@/utils/demo-navigation'

const { t } = usePageI18n('accountCenter')
const { threads, unreadCount, familyVisibleThreads, localize, formatDateTime } = useAccountData()

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
</script>
