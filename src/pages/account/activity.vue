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
            class="cursor-pointer border px-5 py-5 shadow-panel transition-all duration-200 hover:-translate-y-[2px]"
            :class="item.cardClass"
            @click="openEventDetail(item.id)"
          >
            <view class="flex flex-wrap items-start justify-between gap-4">
              <view>
                <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                  {{ item.date }}
                </view>
                <view class="mt-2 text-[15px] text-semantic-text-secondary">
                  {{ item.city }}
                </view>
              </view>

              <view
                class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                :class="item.badgeClass"
              >
                {{ item.statusLabel }}
              </view>
            </view>

            <view class="mt-5 text-[24px] font-semibold text-semantic-text-primary">
              {{ item.title }}
            </view>

            <view class="mt-4 text-[15px] leading-7 text-semantic-text-primary">
              {{ item.note }}
            </view>

            <view class="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-semantic-border-soft pt-4">
              <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                {{ item.venue }}
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
            :label="t('activity.eyebrow')"
            :title="t('activity.family.title')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="point in pageData.familyPoints"
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
import { useAccountOverview } from '@/hooks/account'
import { buildAccountActivityPageViewModel } from '@/mappers/account/account.mapper'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openEventDetail } from '@/utils/navigation'

const { t, locale } = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const pageData = computed(() => buildAccountActivityPageViewModel(accountData, locale.value, t))
</script>
