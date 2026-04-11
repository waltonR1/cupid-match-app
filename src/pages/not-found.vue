<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="mx-auto flex min-h-[70vh] max-w-[960px] items-center justify-center px-8 py-24">
      <EmptyStatePanel
        code="404"
        :title="t('hero.title')"
        :subtitle="t('hero.subtitle')"
        :primary-text="t('actions.home')"
        :secondary-text="t('actions.account')"
        @primary="goHome"
        @secondary="goAccount"
      />
    </view>

    <AppFooter :nav-list="navList" @nav-click="handleNavClick" />
  </view>
</template>

<script setup lang="ts">
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openAccountPage, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t } = usePageI18n('notFound')

function goHome() {
  uni.reLaunch({
    url: '/pages/index',
  })
}

function goAccount() {
  openAccountPage()
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
