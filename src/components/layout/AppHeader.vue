<template>
  <view
    class="sticky top-0 z-50 border-b border-border-base bg-page-base/92 text-text-heading backdrop-blur-xl transition-all duration-300"
    @click="closeAllDropdowns"
  >
    <view class="relative mx-auto flex max-w-[1280px] items-center justify-between px-8 py-3">
      <!-- 品牌 -->
      <view class="flex cursor-pointer flex-col pr-8" @click.stop="handleNavIndex">
        <text class="text-[24px] font-semibold tracking-[2px] text-brand-highlight-strong">
          {{ t('common.brand.name') }}
        </text>
        <text class="mt-1 text-[13px] italic tracking-[2px] text-brand-warm">
          {{ t('common.brand.tagline') }}
        </text>
      </view>

      <!-- 中间导航 -->
      <view class="pointer-events-none absolute left-1/2 hidden -translate-x-2/3 lg:block">
        <view class="pointer-events-auto flex items-center gap-10 xl:gap-12">
          <view
            v-for="item in navList"
            :key="item.key"
            class="group relative cursor-pointer"
            @click.stop="handleNavClick(item.key)"
          >
            <text
              class="whitespace-nowrap text-[16px] transition-colors duration-200"
              :class="activeNav === item.key ? 'text-brand-highlight-strong' : 'text-text-body-soft group-hover:text-text-heading'"
            >
              {{ t(item.key) }}
            </text>

            <view
              class="absolute left-1/2 top-[calc(100%+8px)] h-[2px] -translate-x-1/2 rounded-full transition-all duration-200"
              :class="activeNav === item.key ? 'w-full bg-brand-highlight-strong' : 'w-0 bg-brand-brown group-hover:w-full'"
            />
          </view>
        </view>
      </view>

      <!-- 右侧区域 -->
      <view class="flex items-center gap-4">
        <!-- 未登录 -->
        <template v-if="!auth.isLoggedIn">
          <view
            class="inline-flex cursor-pointer items-center justify-center rounded-xl border border-brand-highlight/35 bg-brand-highlight/8 px-5 py-2.5 text-[14px] font-medium tracking-[0.3px] text-brand-brown transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-highlight/80 hover:bg-brand-highlight/16 hover:text-brand-highlight-strong hover:shadow-panel"
            @click.stop="handleLogin"
          >
            {{ t('common.nav.login') }}
          </view>

          <view
            class="inline-flex cursor-pointer items-center justify-center rounded-xl border border-button-highlight bg-button-highlight px-5 py-2 text-[14px] font-medium tracking-[0.3px] text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:border-button-highlight-hover hover:bg-button-highlight-hover hover:shadow-emphasis"
            @click.stop="handleRegister"
          >
            {{ t('common.nav.register') }}
          </view>
        </template>

        <!-- 已登录 -->
        <template v-else>
          <view class="relative inline-block" @click.stop>
            <view
              class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border-base bg-surface-panel px-4 py-1.5 text-[14px] font-medium text-text-body transition-all duration-300 hover:border-border-subtle hover:bg-surface-card-soft hover:text-text-heading"
              @click="toggleUserDropdown"
            >
              <view
                class="flex h-8 w-8 items-center justify-center rounded-full border border-border-base bg-surface-panel text-[12px] text-text-heading"
              >
                {{ auth.displayName?.charAt(0) || 'U' }}
              </view>
              <text>{{ auth.displayName }}</text>
              <text class="text-[10px] text-text-subtle">v</text>
            </view>

            <view
              v-if="showUserDropdown"
              class="absolute left-1/2 top-[calc(100%+12px)] w-full overflow-hidden rounded-[20px] border border-border-soft bg-surface-card-soft text-center shadow-dropdown animate-dropdown"
            >
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-text-body transition-colors duration-200 hover:bg-brand-highlight/10 hover:text-text-heading"
                @click="handleAccount"
              >
                {{ t('common.nav.account') }}
              </view>
              <view class="h-px bg-border-light" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-text-body transition-colors duration-200 hover:bg-brand-highlight/10 hover:text-text-heading"
                @click="handleMyProfile"
              >
                {{ t('common.nav.myProfile') }}
              </view>
              <view class="h-px bg-border-light" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-text-body transition-colors duration-200 hover:bg-brand-highlight/10 hover:text-text-heading"
                @click="handleMessages"
              >
                {{ t('common.nav.messages') }}
              </view>
              <view class="h-px bg-border-light" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-text-body transition-colors duration-200 hover:bg-brand-highlight/10 hover:text-text-heading"
                @click="handleLogout"
              >
                {{ t('common.nav.logout') }}
              </view>
            </view>
          </view>
        </template>

        <view class="flex items-center gap-2">
          <!-- 语言切换 -->
          <view class="relative inline-block" @click.stop>
            <view
              class="flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl border border-border-base bg-surface-card-soft px-3 py-1.5 text-[12px] text-text-body transition-all duration-200 hover:border-border-subtle hover:bg-surface-panel hover:text-text-heading"
              @click="toggleLocaleDropdown"
            >
              <text>{{ locale.toUpperCase() }}</text>
              <text class="text-[10px] text-text-subtle">v</text>
            </view>

            <view
              v-if="showLocaleDropdown"
              class="absolute left-1/2 top-[calc(100%+12px)] w-full overflow-hidden rounded-[18px] border border-border-soft bg-surface-card-soft shadow-dropdown animate-dropdown"
            >
              <view
                v-for="item in locales"
                :key="item"
                class="cursor-pointer px-1 py-3.5 text-center text-[13px] transition-colors duration-200"
                :class="locale === item ? 'bg-brand-highlight/12 text-brand-highlight-strong' : 'text-text-body hover:bg-brand-highlight/10 hover:text-text-heading'"
                @click="handleLocaleChange(item)"
              >
                {{ item.toUpperCase() }}
              </view>
            </view>
          </view>

          <!-- 主题切换 -->
          <view
            class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-xl border border-border-base bg-surface-card-soft text-text-body transition-all duration-200 hover:border-border-subtle hover:bg-surface-panel hover:text-text-heading"
            @click.stop="handleToggleTheme"
          >
            <view v-if="themeStore.theme === 'light'" class="h-[16px] w-[16px]">
              <svg viewBox="0 0 16 16" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
                <circle cx="8" cy="8" r="2.6" />
                <path d="M8 1.5v1.7M8 12.8v1.7M1.5 8h1.7M12.8 8h1.7M3.3 3.3l1.2 1.2M11.5 11.5l1.2 1.2M12.7 3.3l-1.2 1.2M4.5 11.5l-1.2 1.2" />
              </svg>
            </view>
            <view v-else class="h-[16px] w-[16px]">
              <svg viewBox="0 0 16 16" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.9 2.2a5.7 5.7 0 1 0 2.9 10.4A6.2 6.2 0 0 1 10.9 2.2Z" />
              </svg>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppI18n } from '@/i18n/use-app-i18n'
import type { AppLocale } from '@/i18n/types'
import { openLoginPage } from '@/utils/demo-navigation'
import { useAuthStore } from '@/stores/modules/auth'
import { useThemeStore } from '@/stores/modules/theme'

interface NavItem {
  key: string
}

defineProps<{
  navList: NavItem[]
  activeNav: string
}>()

const emit = defineEmits<{
  (e: 'nav-click', key: string): void
  (e: 'register-click'): void
  (e: 'login-click'): void
  (e: 'account-click'): void
}>()

const auth = useAuthStore()
const themeStore = useThemeStore()
const { t, locale, locales, setLocale } = useAppI18n()

const showLocaleDropdown = ref(false)
const showUserDropdown = ref(false)

function handleNavIndex(): void {
  closeAllDropdowns()
  uni.navigateTo({
    url: '/pages/index',
  })
}

function handleLocaleChange(value: AppLocale) {
  setLocale(value)
  showLocaleDropdown.value = false
}

function handleNavClick(key: string) {
  closeAllDropdowns()
  emit('nav-click', key)
}

function handleRegister() {
  closeAllDropdowns()
  emit('register-click')
}

function handleLogin() {
  closeAllDropdowns()
  emit('login-click')

  const pageStack = getCurrentPages()
  const currentRoute = pageStack.length ? pageStack[pageStack.length - 1].route : ''

  if (currentRoute === 'pages/auth/login') {
    return
  }

  openLoginPage()
}

function handleAccount() {
  closeAllDropdowns()
  emit('account-click')
  uni.navigateTo({
    url: '/pages/user/index',
  })
}

function handleMyProfile() {
  closeAllDropdowns()
  uni.navigateTo({
    url: '/pages/user/profile',
  })
}

function handleMessages() {
  closeAllDropdowns()
  uni.navigateTo({
    url: '/pages/user/messages',
  })
}

function handleLogout() {
  auth.logout()
  closeAllDropdowns()
}

function toggleLocaleDropdown() {
  showUserDropdown.value = false
  showLocaleDropdown.value = !showLocaleDropdown.value
}

function handleToggleTheme() {
  closeAllDropdowns()
  themeStore.toggleTheme()
}

function toggleUserDropdown() {
  showLocaleDropdown.value = false
  showUserDropdown.value = !showUserDropdown.value
}

function closeAllDropdowns() {
  showLocaleDropdown.value = false
  showUserDropdown.value = false
}
</script>
