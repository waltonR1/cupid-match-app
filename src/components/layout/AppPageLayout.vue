<template>
  <view :class="['min-h-screen text-semantic-text-primary', pageBackgroundClass]">
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

const pageBackgroundClass = computed(() => {
  if (currentPath.value.startsWith('/pages/profiles/') && currentPath.value.endsWith('/detail')) {
    return 'bg-semantic-page-subtle'
  }

  return 'bg-semantic-page-default'
})

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage(registerPlanForPath(currentPath.value))
}

function registerPlanForPath(path: string) {
  if (path.startsWith('/pages/events')) return 'event'
  if (path.startsWith('/pages/profiles/family')) return 'contact'
  if (path.startsWith('/pages/public/contact')) return 'contact'
  if (path.startsWith('/pages/public/membership')) return 'vip'
  return 'free'
}
</script>
