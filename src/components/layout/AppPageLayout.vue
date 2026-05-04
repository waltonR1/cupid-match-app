<template>
  <view class="min-h-screen bg-semantic-page-default text-semantic-text-primary">
    <!-- 页面头部导航 -->
    <AppHeader
        :nav-list="navList"
        :active-nav="activeNav"
        @nav-click="navigateByNavKey($event, navList)"
        @register-click="openRegisterPage"
    />

    <!-- 页面主体内容 -->
    <slot/>

    <!-- 页面底部导航 -->
    <AppFooter
        :nav-list="navList"
        @nav-click="navigateByNavKey($event, navList)"
    />
  </view>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import {NAV_LIST} from '@/constants/nav'
import {navigateByNavKey, openRegisterPage} from '@/utils/navigation'

/** 全局导航列表 */
const navList = NAV_LIST

/** 当前页面路径 */
const currentPath = computed(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return currentPage?.route ? `/${currentPage.route}` : ''
})

/** 当前激活的导航项 */
const activeNav = computed(() => {
  const path = currentPath.value

  const matched = navList.find(item => {
    if (!item.path) return false

    const navBasePath = item.path.replace(/\/index$/, '')
    return path === item.path || path.startsWith(`${navBasePath}/`)
  })

  return matched?.key ?? ''
})
</script>