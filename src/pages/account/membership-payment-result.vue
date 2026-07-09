<template>
  <AccountShell active-page="membership">
    <view>
      <AccountSubPageHeader
          :description="paymentText('membership.paymentResult.subtitle', 'Checkout 返回后查看最新订阅订单状态。')"
          :label="paymentText('membership.paymentResult.label', '会员支付')"
          :title="paymentText('membership.paymentResult.title', '支付结果')"
      />

      <view class="max-w-[760px] border border-semantic-border-default bg-semantic-surface-card px-7 py-7 shadow-panel">
        <view v-if="loading" class="text-[14px] text-semantic-text-secondary">
          {{ paymentText('membership.paymentResult.loading', '正在加载支付状态...') }}
        </view>

        <view v-else-if="error" class="grid gap-4">
          <view class="text-[20px] font-semibold text-semantic-text-primary">
            {{ paymentText('membership.paymentResult.unknownTitle', '暂时无法确认支付') }}
          </view>
          <view class="text-[14px] leading-6 text-semantic-text-secondary">
            {{ paymentText('membership.paymentResult.unknownDescription', '当前还不能确认支付结果，请稍后刷新；若长时间未更新请联系管理员。') }}
          </view>
          <view class="flex flex-wrap gap-3">
            <view class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2 text-[13px]" @click="refresh">
              {{ paymentText('common.retry', '重试') }}
            </view>
            <view class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px]" @click="openMembershipPage">
              {{ paymentText('membership.actions.backToMembership', '返回会员页') }}
            </view>
          </view>
        </view>

        <view v-else class="grid gap-5">
          <view>
            <view class="text-[20px] font-semibold text-semantic-text-primary">
              {{ resultTitle }}
            </view>
            <view class="mt-2 text-[14px] leading-6 text-semantic-text-secondary">
              {{ resultDescription }}
            </view>
          </view>

          <view class="grid gap-3 border-t border-semantic-border-soft pt-5 text-[13px] text-semantic-text-secondary">
            <view class="flex justify-between gap-4">
              <text>{{ paymentText('membership.paymentResult.fields.orderId', '订单ID') }}</text>
              <text class="text-right text-semantic-text-primary">{{ order?.orderId || orderId || '-' }}</text>
            </view>
            <view class="flex justify-between gap-4">
              <text>{{ paymentText('membership.paymentResult.fields.orderStatus', '订单状态') }}</text>
              <text class="text-right text-semantic-text-primary">{{ order?.status || '-' }}</text>
            </view>
            <view class="flex justify-between gap-4">
              <text>{{ paymentText('membership.paymentResult.fields.membershipStatus', '会员状态') }}</text>
              <text class="text-right text-semantic-text-primary">{{ order?.membershipStatus || '-' }}</text>
            </view>
          </view>

          <view class="flex flex-wrap gap-3">
            <view class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2 text-[13px]" @click="refresh">
              {{ paymentText('membership.paymentResult.actions.refresh', '刷新状态') }}
            </view>
            <view class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px]" @click="openMembershipPage">
              {{ paymentText('membership.actions.backToMembership', '返回会员页') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </AccountShell>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import {getAccountMembership, getAccountMembershipOrder} from '@/api/account/account'
import type {AccountMembershipOrderDTO} from '@/api/account/account.types'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import {openMembershipPage} from '@/utils/navigation'
import {useRequireAuth} from '@/hooks/common/use-require-auth'
import {useAuthStore} from '@/stores/modules/auth'

useRequireAuth()

const {t} = usePageI18n('accountCenter')
const orderId = ref('')
const order = ref<AccountMembershipOrderDTO>()
const loading = ref(false)
const error = ref(false)
const authStore = useAuthStore()

const resultTitle = computed(() => {
  if (order.value?.membershipStatus === 'active' || order.value?.status === 'paid') {
    return paymentText('membership.paymentResult.successTitle', '会员已生效')
  }
  if (order.value?.status === 'checkout_created' || order.value?.status === 'pending') {
    return paymentText('membership.paymentResult.processingTitle', '支付确认中')
  }
  if (order.value?.status === 'failed' || order.value?.status === 'cancelled' || order.value?.status === 'expired') {
    return paymentText('membership.paymentResult.failedTitle', '支付未完成')
  }
  return paymentText('membership.paymentResult.unknownTitle', '暂时无法确认支付')
})

const resultDescription = computed(() => {
  if (order.value?.membershipStatus === 'active' || order.value?.status === 'paid') {
    return paymentText('membership.paymentResult.successDescription', '支付已确认，会员权益已经生效。')
  }
  if (order.value?.status === 'checkout_created' || order.value?.status === 'pending') {
    return paymentText('membership.paymentResult.processingDescription', 'Stripe 仍在确认支付结果，稍后刷新即可。')
  }
  if (order.value?.status === 'failed' || order.value?.status === 'cancelled' || order.value?.status === 'expired') {
    return paymentText('membership.paymentResult.failedDescription', '本次 Checkout 已取消、过期或失败，可返回会员页重新发起。')
  }
  return paymentText('membership.paymentResult.unknownDescription', '当前还不能确认支付结果，请稍后刷新；若长时间未更新请联系管理员。')
})

function paymentText(key: string, fallback: string): string {
  const value = t(key)
  return value === key ? fallback : value
}

onLoad((query) => {
  orderId.value = String(query?.orderId || '')
  void refresh()
})

async function refresh() {
  if (!orderId.value) {
    error.value = true
    return
  }
  loading.value = true
  error.value = false
  try {
    order.value = await getAccountMembershipOrder(orderId.value)
    if (order.value?.membershipStatus === 'active' || order.value?.status === 'paid') {
      const accountMembership = await getAccountMembership()
      if (accountMembership.membership) {
        authStore.updateMembership({
          tier: accountMembership.membership.tier,
          status: accountMembership.membership.status,
        })
      }
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>
