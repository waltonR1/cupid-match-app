<template>
  <view class="min-h-screen bg-next-semantic-page-default text-next-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto max-w-[1280px] px-5 py-6 sm:px-8 lg:py-8">
      <AccountTopSummary />

      <view class="mt-5">
        <AccountPrimaryNav :active-page="activePage" />
      </view>

      <view class="mt-6">
        <slot name="header" />
      </view>

      <view class="mt-6">
        <slot />
      </view>
    </view>

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AccountPrimaryNav from '@/components/account/AccountPrimaryNav.vue'
import AccountTopSummary from '@/components/account/AccountTopSummary.vue'
import type { AccountPrimaryPageKey } from '@/components/account/account-shell.types'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

defineProps<{
  activePage: AccountPrimaryPageKey
}>()

const navList = NAV_LIST

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
