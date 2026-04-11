<template>
  <AccountShell
    active-page="membership"
    :header-eyebrow="t('membership.eyebrow')"
    :header-title="t('membership.title')"
    :header-description="t('membership.subtitle')"
  >
    <view class="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
      <view class="grid gap-6">
        <view class="border border-next-semantic-border-default bg-next-semantic-surface-card px-6 py-6 shadow-next-shadow-panel lg:px-8 lg:py-8">
          <AccountSectionHeader
            :label="t('membership.eyebrow')"
            :title="t('membership.sections.current')"
          />

          <view class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <view>
              <view class="text-[30px] font-semibold text-next-semantic-text-primary">
                {{ membershipLabel(account.membership) }}
              </view>
              <view class="mt-3 text-[15px] leading-7 text-next-semantic-text-secondary">
                {{ membershipT('rules.description') }}
              </view>
            </view>

            <view class="rounded-full border border-next-component-account-badge-meta-border bg-next-component-account-badge-meta-background px-4 py-2 text-[12px] font-medium text-next-component-account-badge-meta-text">
              {{ membershipLabel(account.membership) }}
            </view>
          </view>

          <view class="mt-6 grid gap-4 sm:grid-cols-3">
            <view
              v-for="item in currentItems"
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
            :label="t('membership.eyebrow')"
            :title="t('membership.sections.service')"
          />

          <view class="mt-6 flex flex-wrap gap-3">
            <AppButton
              variant="secondary"
              context="section"
              size="sm"
              @click="openVerificationPage"
            >
              {{ t('nav.verification') }}
            </AppButton>
            <AppButton
              variant="secondary"
              context="section"
              size="sm"
              @click="openConnectionsPage"
            >
              {{ t('nav.connections') }}
            </AppButton>
            <AppButton
              variant="secondary"
              context="section"
              size="sm"
              @click="openMessagesPage"
            >
              {{ t('nav.messages') }}
            </AppButton>
            <AppButton
              variant="secondary"
              context="section"
              size="sm"
              @click="openActivityPage"
            >
              {{ t('activity.title') }}
            </AppButton>
          </view>
        </view>
      </view>

      <view class="grid gap-6 md:grid-cols-2">
        <view
          v-for="plan in planCards"
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
              v-if="plan.key === account.membership"
              class="rounded-full border border-next-component-account-badge-status-border bg-next-component-account-badge-status-background px-3 py-1 text-[11px] uppercase tracking-[2px] text-next-component-account-badge-status-text"
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
            <AppButton
              :variant="plan.variant"
              :context="plan.context"
              size="sm"
              :disabled="plan.key === account.membership"
              @click="openRegisterPage(plan.key)"
            >
              {{ plan.key === account.membership ? t('common.enabled') : t('common.upgrade') }}
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
import {
  openActivityPage,
  openConnectionsPage,
  openMessagesPage,
  openRegisterPage,
  openVerificationPage,
} from '@/utils/demo-navigation'

const { t } = usePageI18n('accountCenter')
const { t: membershipT } = usePageI18n('membership')
const { account, formatDate, membershipLabel } = useAccountData()

const currentItems = computed(() => [
  {
    label: t('common.currentTier'),
    value: membershipLabel(account.membership),
  },
  {
    label: t('topSummary.metrics.completion'),
    value: `${account.completion}%`,
  },
  {
    label: t('common.joinedAt'),
    value: formatDate(account.joinedAt),
  },
])

const planCards = computed(() => [
  {
    key: 'free',
    badge: membershipT('free.badge'),
    title: membershipLabel('free'),
    period: membershipT('free.priceNote'),
    features: [
      membershipT('free.f1'),
      membershipT('free.f2'),
      membershipT('free.f3'),
    ],
    cardClass: 'border border-next-component-membership-tier-free-card-border bg-next-component-membership-tier-free-card-background shadow-next-shadow-panel',
    eyebrowClass: 'text-next-semantic-text-secondary',
    titleClass: 'text-next-semantic-text-primary',
    metaClass: 'text-next-semantic-text-secondary',
    featureClass: 'border-next-component-membership-tier-free-feature-border bg-next-component-membership-tier-free-feature-background text-next-semantic-text-secondary',
    variant: 'secondary' as const,
    context: 'membership-free' as const,
  },
  {
    key: 'silver',
    badge: membershipT('silver.badge'),
    title: membershipLabel('silver'),
    period: membershipT('silver.period'),
    features: [
      membershipT('silver.f1'),
      membershipT('silver.f2'),
      membershipT('silver.f3'),
    ],
      cardClass: 'border border-next-component-membership-tier-silver-border bg-next-gradient-membership-tier-silver-card text-next-semantic-text-primary shadow-next-shadow-panel',
    eyebrowClass: 'text-next-semantic-text-secondary',
    titleClass: 'text-next-semantic-text-primary',
    metaClass: 'text-next-semantic-text-secondary',
    featureClass: 'border-next-component-membership-tier-silver-feature-border bg-next-component-membership-tier-silver-feature-background text-next-semantic-text-secondary',
    variant: 'secondary' as const,
    context: 'membership-silver' as const,
  },
  {
    key: 'gold',
    badge: membershipT('gold.badge'),
    title: membershipLabel('gold'),
    period: membershipT('gold.period'),
    features: [
      membershipT('gold.f1'),
      membershipT('gold.f2'),
      membershipT('gold.f3'),
    ],
      cardClass: 'border border-next-component-membership-tier-gold-border bg-next-gradient-membership-tier-gold-card text-next-semantic-text-inverse shadow-next-shadow-emphasis',
    eyebrowClass: 'text-next-semantic-text-inverse-muted',
    titleClass: 'text-next-semantic-text-inverse',
    metaClass: 'text-next-semantic-text-inverse-muted',
    featureClass: 'border-next-component-membership-tier-gold-feature-border bg-next-component-membership-tier-gold-feature-background text-next-semantic-text-inverse-muted',
    variant: 'primary' as const,
    context: 'membership-gold' as const,
  },
  {
    key: 'diamond',
    badge: membershipT('diamond.badge'),
    title: membershipLabel('diamond'),
    period: membershipT('diamond.period'),
    features: [
      membershipT('diamond.f1'),
      membershipT('diamond.f2'),
      membershipT('diamond.f3'),
    ],
      cardClass: 'border border-next-component-membership-tier-diamond-border bg-next-gradient-membership-tier-diamond-card text-next-semantic-text-inverse shadow-next-shadow-luxe ring-1 ring-next-component-membership-tier-diamond-ring',
    eyebrowClass: 'text-next-semantic-text-inverse-muted',
    titleClass: 'text-next-semantic-text-inverse',
    metaClass: 'text-next-semantic-text-inverse-muted',
    featureClass: 'border-next-component-membership-tier-diamond-feature-border bg-next-component-membership-tier-diamond-feature-background text-next-semantic-text-inverse-muted',
    variant: 'primary' as const,
    context: 'membership-diamond' as const,
  },
])
</script>
