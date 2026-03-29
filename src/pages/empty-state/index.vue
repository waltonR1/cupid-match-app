<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader :nav-list="navList" active-nav="" @nav-click="handleNavClick" @register-click="handleRegisterClick" />

    <view class="mx-auto flex min-h-[70vh] max-w-[960px] items-center justify-center px-8 py-24">
      <view class="w-full border border-[#e2d7c9] bg-white px-10 py-14 text-center shadow-[0_18px_45px_rgba(20,32,44,0.05)]">
        <view class="text-[72px] leading-none text-[#203854]">404</view>
        <view class="mt-6 text-[34px] font-semibold text-[#1f1f1f]">{{ labels.title }}</view>
        <view class="mx-auto mt-5 max-w-[520px] text-[17px] leading-8 text-[#6b5c4d]">
          {{ labels.subtitle }}
        </view>

        <view class="mt-10 flex flex-wrap justify-center gap-4">
          <button class="bg-[#203854] px-6 py-4 text-[16px] text-white" @click="goHome">{{ labels.home }}</button>
          <button class="border border-[#203854] px-6 py-4 text-[16px] text-[#203854]" @click="goAccount">{{ labels.account }}</button>
        </view>
      </view>
    </view>

    <AppFooter :nav-list="navList" @nav-click="handleNavClick" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openAccountPage, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t } = usePageI18n('emptyState')

const labels = computed(() => ({
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  home: t('actions.home'),
  account: t('actions.account'),
}))

function goHome() {
  uni.navigateTo({
    url: '/pages/index/index',
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


