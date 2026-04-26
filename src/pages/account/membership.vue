<template>
  <AccountShell
    active-page="membership"
    :account-data="accountData"
    :header-eyebrow="t('membership.eyebrow')"
    :header-title="t('membership.title')"
    :header-description="t('membership.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
      <view class="grid gap-6">
        <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('membership.eyebrow')"
            :title="t('membership.sections.current')"
          />

          <view class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <view>
              <view class="text-[30px] font-semibold text-semantic-text-primary">
                {{ pageData.membershipLabel }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-semantic-text-secondary">
                {{ membershipT('rules.description') }}
              </view>
            </view>

            <view class="rounded-full border border-component-account-badge-meta-border bg-component-account-badge-meta-background px-4 py-2 text-[12px] font-medium text-component-account-badge-meta-text">
              {{ pageData.membershipLabel }}
            </view>
          </view>

          <view class="mt-6 grid gap-4 sm:grid-cols-3">
            <view
              v-for="item in pageData.currentItems"
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
            :label="t('membership.eyebrow')"
            :title="t('membership.sections.service')"
          />

          <view class="mt-6 flex flex-wrap gap-3">
            <AppButton variant="secondary" context="section" size="sm" @click="openVerificationPage">
              {{ t('nav.verification') }}
            </AppButton>
            <AppButton variant="secondary" context="section" size="sm" @click="openConnectionsPage">
              {{ t('nav.connections') }}
            </AppButton>
            <AppButton variant="secondary" context="section" size="sm" @click="openMessagesPage">
              {{ t('nav.messages') }}
            </AppButton>
            <AppButton variant="secondary" context="section" size="sm" @click="openActivityPage">
              {{ t('activity.title') }}
            </AppButton>
          </view>
        </view>
      </view>

      <view class="grid gap-6 md:grid-cols-2">
        <view
          v-for="plan in pageData.planCards"
          :key="plan.key"
          class="overflow-hidden px-6 py-6 lg:px-7 lg:py-7"
          :class="plan.cardClass"
        >
          <view class="flex flex-wrap items-start justify-between gap-4">
            <view class="min-w-0">
              <view class="text-[11px] uppercase tracking-[3px]" :class="plan.eyebrowClass">
                {{ plan.badge }}
              </view>
              <view class="mt-3 text-[28px] font-semibold" :class="plan.titleClass">
                {{ plan.title }}
              </view>
            </view>

            <view
              v-if="plan.key === accountData.account.membership"
              class="rounded-full border border-component-account-badge-status-border bg-component-account-badge-status-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-component-account-badge-status-text"
            >
              {{ t('common.enabled') }}
            </view>
          </view>

          <view
            v-if="plan.period"
            class="mt-3 text-[14px]"
            :class="plan.metaClass"
          >
            {{ plan.period }}
          </view>

          <view class="mt-6 grid gap-3">
            <view
              v-for="feature in plan.features"
              :key="feature"
              class="border px-4 py-4 text-[14px] leading-6"
              :class="plan.featureClass"
            >
              {{ feature }}
            </view>
          </view>

          <view class="mt-6">
            <MembershipPlanButton
              :tier="plan.key"
              :disabled="plan.key === accountData.account.membership"
              @click="openRegisterPage"
            >
              {{ plan.key === accountData.account.membership ? t('common.enabled') : t('common.upgrade') }}
            </MembershipPlanButton>
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
import { buildAccountMembershipPageViewModel } from '@/mappers/account/account.mapper'
import AppButton from '@/components/common/AppButton.vue'
import MembershipPlanButton from '@/components/membership/MembershipPlanButton.vue'
import { useLocaleBridge } from '@/i18n/composables/use-locale-bridge'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import {
  openActivityPage,
  openConnectionsPage,
  openMessagesPage,
  openRegisterPage,
  openVerificationPage,
} from '@/utils/navigation'

const { t, locale } = usePageI18n('accountCenter')
const { t: globalT } = useLocaleBridge()
const { t: membershipT } = usePageI18n('membership')
const accountData = useAccountOverview()
const pageData = computed(() => buildAccountMembershipPageViewModel(accountData, locale.value, t, membershipT, globalT))
</script>
