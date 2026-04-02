<template>
  <view
    class="sticky top-0 z-50 border-b border-border-inverse bg-page-inverse/95 backdrop-blur transition-all duration-300"
    @click="closeAllDropdowns"
  >
    <view class="relative mx-auto flex max-w-[1280px] items-center justify-between px-8 py-3">
      <!-- 品牌 -->
      <view class="flex cursor-pointer flex-col pr-8" @click.stop="handleNavIndex">
        <text class="text-[24px] font-semibold tracking-[2px] text-brand-highlight-strong">
          {{ t('common.brand.name') }}
        </text>
        <text class="mt-1 text-[13px] italic tracking-[2px] text-brand-highlight-soft">
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
              :class="activeNav === item.key ? 'text-brand-highlight-strong' : 'text-white/85 group-hover:text-brand-highlight-warm'"
            >
              {{ t(item.key) }}
            </text>

            <view
              class="absolute left-1/2 top-[calc(100%+8px)] h-[2px] -translate-x-1/2 rounded-full transition-all duration-200"
              :class="activeNav === item.key ? 'w-full bg-brand-highlight-strong' : 'w-0 bg-brand-highlight-strong group-hover:w-full'"
            />
          </view>
        </view>
      </view>

      <!-- 右侧区域 -->
      <view class="flex items-center gap-4">
        <!-- 未登录 -->
        <template v-if="!auth.isLoggedIn">
          <view
            class="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border-highlight-soft bg-transparent px-5 py-2 text-[14px] font-medium text-text-inverse-faint transition-all duration-300 hover:border-border-highlight-hover hover:bg-border-highlight-soft/10 hover:text-text-inverse"
            @click.stop="handleLogin"
          >
            {{ t('common.nav.login') }}
          </view>

          <view
            class="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border-accent-strong bg-button-primary px-5 py-2 text-[14px] font-medium text-white transition-all duration-300 hover:border-button-primary-hover hover:bg-button-primary-hover"
            @click.stop="handleRegister"
          >
            {{ t('common.nav.register') }}
          </view>
        </template>

        <!-- 已登录 -->
        <template v-else>
          <view class="relative inline-block" @click.stop>
            <view
              class="flex cursor-pointer items-center justify-center gap-2 border border-border-highlight-soft bg-transparent px-4 py-1 text-[14px] font-medium text-text-inverse-faint transition-colors duration-300 hover:bg-white/5"
              @click="toggleUserDropdown"
            >
              <view
                class="flex h-8 w-8 items-center justify-center rounded-full border border-border-highlight-soft text-[12px]"
              >
                {{ auth.displayName?.charAt(0) || 'U' }}
              </view>
              <text>{{ auth.displayName }}</text>
              <text class="text-[10px] text-border-highlight-soft">▼</text>
            </view>

            <view
              v-if="showUserDropdown"
              class="absolute left-1/2 top-[calc(100%+12px)] w-full border border-border-inverse bg-page-inverse text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] animate-dropdown"
            >
              <view
                class="cursor-pointer px-4 py-3 text-[14px] text-text-inverse-faint transition-colors duration-200 hover:bg-white/5"
                @click="handleAccount"
              >
                {{ t('common.nav.account') }}
              </view>
              <view class="h-px bg-white/20" />
              <view
                class="cursor-pointer px-4 py-3 text-[14px] text-text-inverse-faint transition-colors duration-200 hover:bg-white/5"
                @click="handleMyProfile"
              >
                {{ t('common.nav.myProfile') }}
              </view>
              <view class="h-px bg-white/20" />
              <view
                class="cursor-pointer px-4 py-3 text-[14px] text-text-inverse-faint transition-colors duration-200 hover:bg-white/5"
                @click="handleMessages"
              >
                {{ t('common.nav.messages') }}
              </view>
              <view class="h-px bg-white/20" />
              <view
                class="cursor-pointer px-4 py-3 text-[14px] text-text-inverse-faint transition-colors duration-200 hover:bg-white/5"
                @click="handleLogout"
              >
                {{ t('common.nav.logout') }}
              </view>
            </view>
          </view>
        </template>

        <!-- 语言切换 -->
        <view class="relative inline-block" @click.stop>
          <view
            class="flex cursor-pointer items-center justify-center gap-1 border border-border-highlight-soft/50 bg-transparent px-2 py-1 text-[12px] text-text-inverse-faint transition-colors duration-200 hover:bg-border-highlight-soft/10"
            @click="toggleLocaleDropdown"
          >
            <text>{{ locale.toUpperCase() }}</text>
            <text class="text-[10px] text-border-highlight-soft">▼</text>
          </view>

          <view
            v-if="showLocaleDropdown"
            class="absolute left-1/2 top-[calc(100%+12px)] w-[90%] border border-border-inverse bg-page-inverse shadow-[0_10px_30px_rgba(0,0,0,0.25)] animate-dropdown"
          >
            <view
              v-for="item in locales"
              :key="item"
              class="cursor-pointer px-1 py-3 text-center text-[13px] transition-colors duration-200"
              :class="locale === item ? 'bg-white/5 text-brand-highlight-strong' : 'text-text-inverse-faint hover:bg-white/5'"
              @click="handleLocaleChange(item)"
            >
              {{ item.toUpperCase() }}
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
import { useAuthStore } from '@/stores/modules/auth'

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
const { t, locale, locales, setLocale } = useAppI18n()

const showLocaleDropdown = ref(false)
const showUserDropdown = ref(false)

function handleNavIndex(): void {
  closeAllDropdowns()
  uni.navigateTo({
    url: '/pages/index/index',
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
  auth.loginMock()
}

function handleAccount() {
  closeAllDropdowns()
  emit('account-click')
  uni.navigateTo({
    url: '/pages/account/index',
  })
}

function handleMyProfile() {
  closeAllDropdowns()
  uni.navigateTo({
    url: '/pages/my-profile/index',
  })
}

function handleMessages() {
  closeAllDropdowns()
  uni.navigateTo({
    url: '/pages/messages/index',
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

function toggleUserDropdown() {
  showLocaleDropdown.value = false
  showUserDropdown.value = !showUserDropdown.value
}

function closeAllDropdowns() {
  showLocaleDropdown.value = false
  showUserDropdown.value = false
}
</script>
