<template>
  <view
    class="sticky top-0 z-50 border-b border-semantic-border-default bg-component-header-background text-semantic-text-primary backdrop-blur-xl transition-all duration-300"
    @click="closeAllDropdowns"
  >
    <view class="relative mx-auto flex max-w-[1280px] items-center justify-between px-8 py-3">
      <!-- 品牌 -->
      <view class="flex cursor-pointer flex-col pr-8" @click.stop="handleNavIndex">
        <text class="text-[24px] font-semibold tracking-[2px] text-component-header-brand-wordmark">
          {{ t('common.brand.name') }}
        </text>
        <text class="mt-1 text-[13px] italic tracking-[2px] text-component-header-brand-tagline">
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
              :class="activeNav === item.key ? 'text-component-header-nav-current' : 'text-semantic-text-muted group-hover:text-semantic-text-primary'"
            >
              {{ t(item.key) }}
            </text>

            <view
              class="absolute left-1/2 top-[calc(100%+8px)] h-[2px] -translate-x-1/2 rounded-full transition-all duration-200"
              :class="activeNav === item.key ? 'w-full bg-component-header-nav-indicator' : 'w-0 bg-component-header-nav-indicator-hover group-hover:w-full'"
            />
          </view>
        </view>
      </view>

      <!-- 右侧区域 -->
      <view class="flex items-center gap-4">
        <!-- 未登录 -->
        <template v-if="!auth.isLoggedIn">
          <AppButton
            variant="secondary"
            context="header"
            size="sm"
            rounded="xl"
            @click.stop="handleLogin"
          >
            {{ t('common.nav.login') }}
          </AppButton>

          <AppButton
            variant="primary"
            size="sm"
            rounded="xl"
            @click.stop="handleRegister"
          >
            {{ t('common.nav.register') }}
          </AppButton>
        </template>

        <!-- Signed in -->
        <template v-else>
          <view class="relative inline-block" @click.stop>
            <view
              class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-semantic-border-default bg-semantic-surface-panel px-4 py-1.5 text-[14px] font-medium text-semantic-text-secondary transition-all duration-300 hover:border-semantic-border-soft hover:bg-semantic-surface-soft hover:text-semantic-text-primary"
              @click="toggleUserDropdown"
            >
              <view
                class="flex h-8 w-8 items-center justify-center rounded-full border border-semantic-border-default bg-semantic-surface-panel text-[12px] text-semantic-text-primary"
              >
                {{ auth.accountName?.charAt(0) || 'U' }}
              </view>
              <text>{{ auth.accountName }}</text>
              <text class="text-[10px] text-semantic-text-subtle">v</text>
            </view>

            <view
              v-if="showUserDropdown"
              class="absolute left-1/2 top-[calc(100%+12px)] w-full overflow-hidden rounded-[20px] border border-semantic-border-soft bg-semantic-surface-soft text-center shadow-dropdown animate-dropdown"
            >
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-semantic-text-secondary transition-colors duration-200 hover:bg-component-header-menu-hover hover:text-semantic-text-primary"
                @click="handleAccount"
              >
                {{ t('common.nav.account') }}
              </view>
              <view class="h-px bg-semantic-border-divider" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-semantic-text-secondary transition-colors duration-200 hover:bg-component-header-menu-hover hover:text-semantic-text-primary"
                @click="handleMyProfile"
              >
                {{ t('common.nav.myProfile') }}
              </view>
              <view class="h-px bg-semantic-border-divider" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-semantic-text-secondary transition-colors duration-200 hover:bg-component-header-menu-hover hover:text-semantic-text-primary"
                @click="handleMessages"
              >
                {{ t('common.nav.messages') }}
              </view>
              <view class="h-px bg-semantic-border-divider" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-semantic-text-secondary transition-colors duration-200 hover:bg-component-header-menu-hover hover:text-semantic-text-primary"
                @click="handleSettings"
              >
                {{ t('common.nav.settings') }}
              </view>
              <view class="h-px bg-semantic-border-divider" />
              <view
                class="cursor-pointer px-4 py-3.5 text-[14px] text-semantic-text-secondary transition-colors duration-200 hover:bg-component-header-menu-hover hover:text-semantic-text-primary"
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
              class="flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl border border-semantic-border-default bg-semantic-surface-soft px-3 py-1.5 text-[12px] text-semantic-text-secondary transition-all duration-200 hover:border-semantic-border-soft hover:bg-semantic-surface-panel hover:text-semantic-text-primary"
              @click="toggleLocaleDropdown"
            >
              <text>{{ locale.toUpperCase() }}</text>
              <text class="text-[10px] text-semantic-text-subtle">v</text>
            </view>

            <view
              v-if="showLocaleDropdown"
              class="absolute left-1/2 top-[calc(100%+12px)] w-full overflow-hidden rounded-[18px] border border-semantic-border-soft bg-semantic-surface-soft shadow-dropdown animate-dropdown"
            >
              <view
                v-for="item in locales"
                :key="item"
                class="cursor-pointer px-1 py-3.5 text-center text-[13px] transition-colors duration-200"
                :class="locale === item ? 'bg-component-header-menu-selected text-component-header-menu-selected-label' : 'text-semantic-text-secondary hover:bg-component-header-menu-hover hover:text-semantic-text-primary'"
                @click="handleLocaleChange(item)"
              >
                {{ item.toUpperCase() }}
              </view>
            </view>
          </view>

          <!-- 主题切换 -->
          <view
            class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-xl border border-semantic-border-default bg-semantic-surface-soft text-semantic-text-secondary transition-all duration-200 hover:border-semantic-border-soft hover:bg-semantic-surface-panel hover:text-semantic-text-primary"
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
import AppButton from '@/components/common/AppButton.vue'
import { useAppI18n } from '@/i18n/composables/use-app-i18n'
import type { AppLocale } from '@/i18n/types'
import { openAccountPage, openAccountSettingsPage, openHomePage, openLoginPage, openMessagesPage, openMyProfilePage } from '@/utils/navigation'
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
  openHomePage()
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
  openAccountPage()
}

function handleMyProfile() {
  closeAllDropdowns()
  openMyProfilePage()
}

function handleMessages() {
  closeAllDropdowns()
  openMessagesPage()
}

function handleSettings() {
  closeAllDropdowns()
  openAccountSettingsPage()
}

function handleLogout() {
  auth.logout()
  closeAllDropdowns()
  uni.redirectTo({ url: '/pages/auth/login' })
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
