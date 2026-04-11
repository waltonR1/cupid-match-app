<template>
  <AccountShell
    active-page="verification"
    :header-eyebrow="t('verification.eyebrow')"
    :header-title="t('verification.title')"
    :header-description="t('verification.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <view class="grid gap-6">
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.overview')"
          />

          <view class="mt-6 grid gap-4 sm:grid-cols-3">
            <view
              v-for="item in overviewItems"
              :key="item.label"
              class="border border-next-semantic-border-soft bg-next-semantic-surface-panel px-5 py-5"
            >
              <view class="text-[11px] uppercase tracking-[3px] text-next-semantic-text-card-label">
                {{ item.label }}
              </view>
              <view class="mt-3 text-[24px] font-semibold text-next-semantic-text-primary">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>

        <view class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.grid')"
          />

          <view class="mt-6 grid gap-4 md:grid-cols-2">
            <view
              v-for="item in verificationItems"
              :key="item.label"
              class="border border-next-semantic-border-soft bg-next-semantic-surface-card px-5 py-5"
            >
              <view class="flex items-start justify-between gap-4">
                <view class="text-[17px] font-semibold leading-7 text-next-semantic-text-primary">
                  {{ item.label }}
                </view>
                <view
                  class="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[2px]"
                  :class="item.done
                    ? 'border-next-component-account-badge-status-border bg-next-component-account-badge-status-background text-next-component-account-badge-status-text'
                    : 'border-next-semantic-border-soft bg-next-semantic-surface-soft text-next-semantic-text-secondary'"
                >
                  {{ item.done ? t('verification.status.done') : t('verification.status.pending') }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6">
        <view class="border border-next-semantic-border-soft bg-next-semantic-surface-soft px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.risk')"
          />

          <view class="mt-6 grid gap-4">
            <view
              v-for="row in controlRows"
              :key="row.label"
              class="flex items-start justify-between gap-6 border-t border-next-semantic-border-soft pt-4 first:border-t-0 first:pt-0"
            >
              <text class="text-[12px] uppercase tracking-[3px] text-next-semantic-text-muted">
                {{ row.label }}
              </text>
              <text class="max-w-[280px] text-right text-[15px] leading-7 text-next-semantic-text-primary">
                {{ row.value }}
              </text>
            </view>
          </view>
        </view>

        <view class="relative overflow-hidden border border-next-semantic-border-emphasis bg-next-semantic-surface-emphasis px-6 py-6 shadow-next-shadow-emphasis lg:px-8 lg:py-8">
          <view class="absolute inset-x-0 top-0 h-px bg-next-semantic-border-emphasis-divider" />

          <AccountSectionHeader
            :label="t('verification.eyebrow')"
            :title="t('verification.sections.invite')"
            :description="profile ? localize(profile.summary) : ''"
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
import { useAccountData } from '@/components/account/use-account-data'
import AppButton from '@/components/common/AppButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openConnectionsPage, openMyProfilePage } from '@/utils/demo-navigation'

const { t } = usePageI18n('accountCenter')
const {
  account,
  profile,
  familyAssistSetting,
  visibleFieldsSetting,
  localize,
  membershipLabel,
} = useAccountData()

const verificationItems = computed(() => [
  { label: t('verification.items.realName'), done: true },
  { label: t('verification.items.education'), done: Boolean(profile?.education) },
  { label: t('verification.items.marital'), done: Boolean(profile?.maritalStatus) },
  { label: t('verification.items.career'), done: Boolean(profile?.occupation) },
  { label: t('verification.items.video'), done: false },
  { label: t('verification.items.assets'), done: account.membership !== 'free' },
])

const verifiedCount = computed(() => verificationItems.value.filter(item => item.done).length)

const overviewItems = computed(() => [
  {
    label: t('verification.summary.progress'),
    value: `${verifiedCount.value}/${verificationItems.value.length}`,
  },
  {
    label: t('common.currentTier'),
    value: membershipLabel(account.membership),
  },
  {
    label: t('common.familyVisible'),
    value: profile?.familyVisible ? t('common.enabled') : t('common.disabled'),
  },
])

const controlRows = computed(() => [
  {
    label: t('common.familyVisible'),
    value: profile?.familyVisible ? t('common.enabled') : t('common.disabled'),
  },
  {
    label: t('common.familyAssist'),
    value: familyAssistSetting.value?.enabled ? t('common.enabled') : t('common.disabled'),
  },
  {
    label: t('common.visibleFields'),
    value: visibleFieldsSetting.value?.enabled ? t('common.enabled') : t('common.disabled'),
  },
])
</script>
