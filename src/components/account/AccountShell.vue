<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
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

      <view class="mt-6 border border-semantic-border-default bg-semantic-surface-panel px-6 py-6 shadow-panel lg:px-8 lg:py-8">
        <AccountSectionHeader
          :label="headerEyebrow"
          :title="headerTitle"
          :description="headerDescription"
        />
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
import AccountSectionHeader from '@/components/account/AccountSectionHeader.vue'
import AccountTopSummary from '@/components/account/AccountTopSummary.vue'
import type { AccountPrimaryPageKey } from '@/components/account/account-shell.types'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

defineProps<{
  activePage: AccountPrimaryPageKey
  headerEyebrow: string
  headerTitle: string
  headerDescription?: string
}>()

const navList = NAV_LIST

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
