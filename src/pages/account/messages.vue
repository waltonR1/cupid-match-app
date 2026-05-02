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
            v-for="filter in pageData.filterItems"
            :key="filter.label"
            class="rounded-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px] text-semantic-text-secondary"
          >
            {{ filter.label }} 路 {{ filter.value }}
          </view>
        </view>

        <view class="mt-6 grid gap-4">
          <view
            v-for="item in pageData.items"
            :key="item.id"
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-5 py-5 shadow-panel transition-all duration-200 hover:-translate-y-[2px] hover:border-semantic-border-card-hover hover:bg-semantic-surface-soft"
            @click="openSelfDetail(item.profileId)"
          >
            <view class="flex items-start gap-4">
              <AppAvatar :value="''" :fallback="item.displayName" />

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-start justify-between gap-3">
                  <view class="min-w-0">
                    <view class="text-[24px] font-semibold text-semantic-text-primary">
                      {{ item.displayName }}
                    </view>
                    <view class="mt-2 text-[15px] text-semantic-text-secondary">
                      {{ item.city }} 路 {{ item.ageText }}
                    </view>
                  </view>

                  <view class="flex flex-wrap items-center justify-end gap-2">
                    <view
                      v-if="item.familyVisible"
                      class="rounded-full border border-component-account-badge-meta-border bg-component-account-badge-meta-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-component-account-badge-meta-text"
                    >
                      {{ t('messages.list.familyBadge') }}
                    </view>
                    <view
                      v-if="item.unread > 0"
                      class="rounded-full border border-component-account-badge-status-border bg-component-account-badge-status-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-component-account-badge-status-text"
                    >
                      {{ t('messages.list.unreadLabel') }} {{ item.unread }}
                    </view>
                  </view>
                </view>

                <view class="mt-4 text-[15px] leading-7 text-semantic-text-primary">
                  {{ item.lastMessage }}
                </view>

                <view class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-semantic-border-soft pt-4">
                  <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                    {{ item.updatedAt }}
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
              v-for="point in pageData.supportPoints"
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
              v-for="point in pageData.boundaryPoints"
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
import AppAvatar from '@/components/common/AppAvatar.vue'
import { useAccountOverview } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openSelfDetail } from '@/utils/navigation'
import { localizeAccountText } from '@/utils/account-format'
import { formatLocalizedDateTime } from '@/utils/locale-format'
import { formatLocalizedAge } from '@/utils/profile-format'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const pageData = computed(() => ({
  filterItems: [
    { label: t('messages.filters.all'), value: String(accountData.threads.length) },
    { label: t('messages.filters.unread'), value: String(accountData.unreadCount.value) },
    { label: t('messages.filters.family'), value: String(accountData.familyVisibleThreads.value.length) },
  ],
  supportPoints: [
    t('messages.support.point1'),
    t('messages.support.point2'),
    t('messages.support.point3'),
  ],
  boundaryPoints: [
    t('messages.boundary.point1'),
    t('messages.boundary.point2'),
    t('messages.boundary.point3'),
  ],
  items: accountData.threads.map(item => ({
    id: item.profile.id,
    profileId: item.profile.id,
    displayName: item.profile.displayName,
    city: localizeAccountText(locale.value, item.profile.city),
    ageText: formatLocalizedAge(locale.value, item.profile.age),
    familyVisible: item.profile.familyVisible,
    unread: item.thread.unread,
    lastMessage: localizeAccountText(locale.value, item.thread.lastMessage),
    updatedAt: formatLocalizedDateTime(locale.value, item.thread.updatedAt),
  })),
}))
</script>
