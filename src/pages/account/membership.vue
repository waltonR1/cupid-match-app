<template>
  <AccountShell active-page="membership">
    <view>
      <AccountSubPageHeader
          :description="t('membership.subtitle')"
          :label="t('membership.title')"
          :title="t('membership.title')"
      />

      <view v-if="loading" class="px-5 py-8 text-[13px] text-semantic-text-muted">
        {{ t('membership.loading') }}
      </view>

      <EmptyStatePanel
          v-else-if="error"
          :primary-text="t('common.retry')"
          :subtitle="t('membership.error.description')"
          :title="t('membership.error.title')"
          size="page"
          @primary="refresh"
      />

      <view v-else class="grid gap-6 xl:grid-cols-2">
        <view
            v-if="membership"
            :class="currentPlanCardClass(membership.tier)"
            class="px-7 py-7"
        >
          <view class="flex items-start justify-between gap-4">
            <view>
              <view :class="currentPlanLabelClass(membership.tier)" class="text-[12px] uppercase tracking-[4px]">
                {{ t('membership.currentPlan') }}
              </view>
              <view class="mt-4 text-[34px] font-semibold">{{ membership.name }}</view>
              <view :class="currentPlanDescriptionClass(membership.tier)"
                    class="mt-3 max-w-[340px] text-[14px] leading-7">
                {{ t(`membership.tierPositioning.${membership.tier}`) }}
              </view>
            </view>

            <view :class="currentPlanBadgeClass(membership.tier)"
                  class="rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[2px]">
              {{ optionLabel('membership.status', membership.status) }}
            </view>
          </view>

          <view class="mt-8 grid gap-4 sm:grid-cols-2">
            <view :class="currentPlanFeatureClass(membership.tier)" class="border px-4 py-4">
              <view :class="currentPlanLabelClass(membership.tier)" class="text-[12px] uppercase tracking-[2px]">
                {{ t('membership.startedAt') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ formatLocalizedDate(locale, membership.startedAt) }}
              </view>
            </view>

            <view :class="currentPlanFeatureClass(membership.tier)" class="border px-4 py-4">
              <view :class="currentPlanLabelClass(membership.tier)" class="text-[12px] uppercase tracking-[2px]">
                {{ t('membership.conciergePriority') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ membership.conciergePriority ? t('common.yes') : t('common.no') }}
              </view>
            </view>

            <view
                v-if="membership.expiresAt"
                :class="currentPlanFeatureClass(membership.tier)"
                class="border px-4 py-4"
            >
              <view :class="currentPlanLabelClass(membership.tier)" class="text-[12px] uppercase tracking-[2px]">
                {{ t('membership.expiresAt') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ formatLocalizedDate(locale, membership.expiresAt) }}
              </view>
            </view>

            <view
                v-if="membership.renewalStatus && membership.renewalStatus !== 'none'"
                :class="currentPlanFeatureClass(membership.tier)"
                class="border px-4 py-4"
            >
              <view :class="currentPlanLabelClass(membership.tier)" class="text-[12px] uppercase tracking-[2px]">
                {{ t('membership.renewalStatus') }}
              </view>
              <view class="mt-2 text-[16px] font-medium">
                {{ t(`membership.renewal.${membership.renewalStatus}`) }}
              </view>
            </view>
          </view>

          <view
              v-if="subscriptionNotice"
              :class="subscriptionNoticeClass"
              class="mt-6 border px-4 py-4 text-[14px] leading-7"
          >
            <view class="font-semibold">{{ subscriptionNotice.title }}</view>
            <view class="mt-1">{{ subscriptionNotice.description }}</view>
          </view>

          <view
              v-if="canCancelRenewal"
              class="mt-6 inline-flex cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px] text-semantic-text-secondary"
              @click="requestCancelRenewal"
          >
            {{ t('membership.actions.cancelRenewal') }}
          </view>
        </view>

        <view
            v-for="entitlement in quotaEntitlements"
            :key="entitlement.code"
            class="border border-semantic-border-default bg-semantic-surface-card px-7 py-7 shadow-panel"
        >
          <view class="text-[12px] uppercase tracking-[3px] text-semantic-text-card-label">
            {{ t('membership.coreQuota') }}
          </view>
          <view class="mt-4 text-[20px] font-semibold">{{
              optionLabel('membership.entitlement', entitlement.code)
            }}
          </view>
          <view class="mt-5 text-[42px] font-semibold leading-none">
            {{ entitlement.quotaRemaining }}
            <text class="text-[18px] font-normal text-semantic-text-secondary">/ {{
                entitlement.quotaTotal
              }}
            </text>
          </view>
          <view class="mt-5 max-w-[480px] text-[14px] leading-7 text-semantic-text-secondary">
            {{ t(`membership.entitlementDescription.${entitlement.code}`) }}
          </view>
        </view>

      </view>

      <view class="mt-6 border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="flex flex-wrap items-start justify-between gap-5">
          <view>
            <view class="text-[16px] font-semibold">{{ t('membership.actions.viewSystem') }}</view>
            <view class="mt-2 text-[14px] leading-7 text-semantic-text-secondary">
              {{ t('membership.upgrade.description') }}
            </view>
          </view>

          <view
              class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px] text-semantic-text-link"
              @click="openMembershipSystemPage"
          >
            {{ t('membership.actions.viewSystem') }}
          </view>
        </view>
      </view>
    </view>
    <Toast
        :message="toast.message.value"
        :type="toast.type.value"
        :visible="toast.visible.value"
        @close="toast.hide"
    />
  </AccountShell>
</template>

<script lang="ts" setup>
import {useRequireAuth} from '@/hooks/common/use-require-auth'
import {computed, watch} from 'vue'
import AccountShell from '@/components/account/AccountShell.vue'
import Toast from '@/components/common/Toast.vue'
import {useToast} from '@/hooks/common/use-toast'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import {useAccountMembership} from '@/hooks/account'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {openPage} from '@/utils/navigation'
import {formatLocalizedDate} from '@/utils/locale-format'
import {useOptionsStore} from '@/stores/modules/options'

useRequireAuth()
const toast = useToast()
const {t, locale} = usePageI18n('accountCenter')
const optionsStore = useOptionsStore()
const {loading, error, membership, entitlements, refresh, cancelRenewal} = useAccountMembership()
watch(locale, value => {
  void optionsStore.ensureOptions(value)
  void refresh()
}, {immediate: true})

const quotaEntitlements = computed(() => entitlements.value.filter(
    (item) => item.code === 'private_introduction' || item.code === 'event_registration',
))
const subscriptionNotice = computed(() => {
  if (!membership.value?.subscriptionProvider) return null

  if (membership.value.renewalStatus === 'cancel_at_period_end') {
    return {
      tone: 'warning',
      title: t('membership.subscriptionNotice.cancelAtPeriodEnd.title'),
      description: t('membership.subscriptionNotice.cancelAtPeriodEnd.description'),
    }
  }

  if (membership.value.subscriptionStatus === 'past_due' || membership.value.subscriptionStatus === 'unpaid') {
    return {
      tone: 'danger',
      title: t('membership.subscriptionNotice.paymentIssue.title'),
      description: t('membership.subscriptionNotice.paymentIssue.description'),
    }
  }

  if (membership.value.status === 'paused') {
    return {
      tone: 'warning',
      title: t('membership.subscriptionNotice.paused.title'),
      description: t('membership.subscriptionNotice.paused.description'),
    }
  }

  if (membership.value.renewalStatus === 'renewing') {
    return {
      tone: 'normal',
      title: t('membership.subscriptionNotice.renewing.title'),
      description: t('membership.subscriptionNotice.renewing.description'),
    }
  }

  return null
})
const subscriptionNoticeClass = computed(() => {
  if (subscriptionNotice.value?.tone === 'danger') {
    return 'border-semantic-state-danger bg-semantic-surface-card text-semantic-state-danger'
  }
  if (subscriptionNotice.value?.tone === 'warning') {
    return 'border-semantic-border-emphasis bg-semantic-state-warning text-semantic-text-primary'
  }
  if (!membership.value) return 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'
  return `${currentPlanFeatureClass(membership.value.tier)} ${currentPlanDescriptionClass(membership.value.tier)}`
})
const canCancelRenewal = computed(() => Boolean(
    membership.value
    && membership.value.tier !== 'free'
    && membership.value.subscriptionProvider
    && membership.value.renewalStatus === 'renewing',
))

function optionLabel(group: string, value: string): string {
  return optionsStore.labelFor(locale.value, group, value) ?? value
}

function openMembershipSystemPage() {
  openPage('/pages/public/membership')
}

async function requestCancelRenewal() {
  const confirmed = await confirmCancelRenewal()
  if (!confirmed) return

  const result = await cancelRenewal()
  if (result?.status === 'renewal_cancelled') {
    toast.show(t('membership.cancelRenewal.success'), 'success')
  }
}

function confirmCancelRenewal(): Promise<boolean> {
  return new Promise(resolve => {
    uni.showModal({
      title: t('membership.cancelRenewal.title'),
      content: t('membership.cancelRenewal.description'),
      confirmText: t('membership.actions.cancelRenewal'),
      cancelText: t('common.cancel'),
      success: result => resolve(result.confirm),
      fail: () => resolve(false),
    })
  })
}

function currentPlanCardClass(tier: string) {
  if (tier === 'gold') {
    return 'border border-component-membership-tier-gold-border bg-gradient-membership-tier-gold-card text-semantic-text-inverse shadow-emphasis'
  }

  if (tier === 'diamond') {
    return 'border border-component-membership-tier-diamond-border bg-gradient-membership-tier-diamond-card text-semantic-text-inverse shadow-luxe'
  }

  if (tier === 'silver') {
    return 'border border-component-membership-tier-silver-border bg-gradient-membership-tier-silver-card text-semantic-text-primary shadow-panel'
  }

  return 'border border-component-membership-tier-free-card-border bg-component-membership-tier-free-card-background text-semantic-text-primary shadow-panel'
}

function currentPlanLabelClass(tier: string) {
  return tier === 'silver' || tier === 'free'
      ? 'text-semantic-text-muted'
      : 'text-semantic-text-inverse-subtle'
}

function currentPlanBadgeClass(tier: string) {
  if (tier === 'gold') {
    return 'border-component-membership-tier-gold-border text-component-membership-tier-gold-badge-label'
  }

  if (tier === 'diamond') {
    return 'border-component-membership-tier-diamond-border text-component-membership-tier-diamond-badge-label'
  }

  if (tier === 'silver') {
    return 'border-component-membership-tier-silver-border text-component-membership-tier-silver-badge-label'
  }

  return 'border-component-membership-tier-free-card-border text-semantic-text-secondary'
}

function currentPlanFeatureClass(tier: string) {
  if (tier === 'gold') {
    return 'border-component-membership-tier-gold-feature-border bg-component-membership-tier-gold-feature-background'
  }

  if (tier === 'diamond') {
    return 'border-component-membership-tier-diamond-feature-border bg-component-membership-tier-diamond-feature-background'
  }

  if (tier === 'silver') {
    return 'border-component-membership-tier-silver-feature-border bg-component-membership-tier-silver-feature-background'
  }

  return 'border-component-membership-tier-free-feature-border bg-component-membership-tier-free-feature-background'
}

function currentPlanDescriptionClass(tier: string) {
  return tier === 'silver' || tier === 'free'
      ? 'text-semantic-text-secondary'
      : 'text-semantic-text-inverse-muted'
}
</script>
