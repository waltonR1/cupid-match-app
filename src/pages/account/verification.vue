<template>
  <AccountShell
    active-page="verification"
    :account-data="accountData"
    :header-eyebrow="t('verification.eyebrow')"
    :header-title="t('verification.title')"
    :header-description="t('verification.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.overview')"
          />

          <view class="mt-6 grid gap-4 sm:grid-cols-3">
            <view
              v-for="item in pageData.overviewItems"
              :key="item.label"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-5 py-5"
            >
              <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[24px] font-semibold text-semantic-text-primary">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>

        <view class="border border-semantic-border-default bg-semantic-surface-panel px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.grid')"
          />

          <view class="mt-6 grid gap-4 md:grid-cols-2">
            <view
              v-for="item in pageData.verificationItems"
              :key="item.label"
              class="border border-semantic-border-soft bg-semantic-surface-card px-5 py-5"
            >
              <view class="flex items-start justify-between gap-4">
                <view class="text-[17px] font-semibold leading-7 text-semantic-text-primary">
                  {{ item.label }}
                </view>
                <view
                  class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                  :class="item.done
                    ? 'border-component-account-badge-status-border bg-component-account-badge-status-background text-component-account-badge-status-text'
                    : 'border-semantic-border-soft bg-semantic-surface-soft text-semantic-text-secondary'"
                >
                  {{ item.done ? t('verification.status.done') : t('verification.status.pending') }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-semantic-border-soft bg-semantic-surface-soft px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.risk')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="row in pageData.controlRows"
              :key="row.label"
              class="flex items-start justify-between gap-6 border-t border-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <text class="text-[12px] uppercase tracking-[3px] text-semantic-text-muted">
                {{ row.label }}
              </text>
              <text class="max-w-[280px] text-right text-[15px] leading-7 text-semantic-text-primary">
                {{ row.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="relative overflow-hidden border border-semantic-border-emphasis bg-semantic-surface-emphasis px-6 py-6 shadow-emphasis lg:px-8 lg:py-8">
          <view class="absolute inset-x-0 top-0 h-px bg-semantic-border-emphasis-divider" />

          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.invite')"
            :description="pageData.inviteDescription"
          />

          <view class="mt-6 flex flex-wrap gap-3">
            <AppButton
              variant="secondary"
              context="section"
              size="sm"
              @click="openMyProfilePage"
            >
              {{ t('common.review') }}
            </AppButton>
            <AppButton
              variant="primary"
              size="sm"
              @click="openConnectionsPage"
            >
              {{ t('common.open') }}
            </AppButton>
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
import { buildAccountVerificationPageViewModel } from '@/mappers/account/account.mapper'
import AppButton from '@/components/common/AppButton.vue'
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openConnectionsPage, openMyProfilePage } from '@/utils/navigation'

const { t, locale } = usePageI18n('accountCenter')
const { t: globalT } = useLocaleBridge()
const accountData = useAccountOverview()
const pageData = computed(() => buildAccountVerificationPageViewModel(accountData, locale.value, t, globalT))
</script>
