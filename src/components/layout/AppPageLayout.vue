<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      :active-nav="activeNav"
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <slot />

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { NAV_LIST } from '@/constants/nav'
import { navigateByNavKey, openRegisterPage } from '@/utils/navigation'

const navList = NAV_LIST

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage?.route ? `/${currentPage.route}` : ''
})

const activeNav = computed(() => {
  const path = currentPath.value

  const matched = navList.find(item => {
    if (!item.path) return false

    const navBasePath = item.path.replace(/\/index$/, '')
    return path === item.path || path.startsWith(`${navBasePath}/`)
  })

  return matched?.key ?? ''
})

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage()
}
</script>
