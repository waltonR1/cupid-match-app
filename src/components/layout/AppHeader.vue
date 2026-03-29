<template>
  <view class="sticky top-0 z-50 border-b border-[#2d3d52] bg-[rgba(13,34,56,0.94)] backdrop-blur">
    <view class="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-5">
      <view class="flex flex-col pr-8" @click="handleNavIndex">
        <text class="text-[24px] font-semibold tracking-[2px] text-[#d4af37]">{{ t('common.brand.name') }}</text>
        <text class="mt-1 text-[13px] italic tracking-[2px] text-[#d8c8a8]">
          {{ t('common.brand.tagline') }}
        </text>
      </view>

      <view class="hidden flex-1 items-center justify-center gap-10 lg:flex xl:gap-12">
        <text
          v-for="item in navList"
          :key="item.key"
          class="cursor-pointer text-[15px] transition-opacity duration-200"
          :class="activeNav === item.key ? 'text-[#d4af37]' : 'text-white/85 hover:opacity-100'"
          @click="handleNavClick(item.key)"
        >
          {{ t(item.key) }}
        </text>
      </view>

      <view class="flex items-center gap-4">
        <view class="flex overflow-hidden rounded-full border border-[#c9a96a]">
          <button
            v-for="item in locales"
            :key="item"
            class="min-w-[44px] border-0 px-3 py-1 text-[12px]"
            :class="locale === item ? 'bg-[#c9a96a] text-[#0d2238]' : 'bg-transparent text-[#f3e7cf]'"
            @click="handleLocaleChange(item)"
          >
            {{ item.toUpperCase() }}
          </button>
        </view>

        <button
          class="rounded-none bg-[#d90429] px-6 py-2 text-[14px] font-medium text-white"
          @click="$emit('register-click')"
        >
          {{ t('common.nav.register') }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAppI18n } from '@/i18n/use-app-i18n'
import type { AppLocale } from '@/i18n/types'

interface NavItem {
  key: string
}

defineProps<{
  navList: NavItem[]
  activeNav: string
}>()

const { t, locale, locales, setLocale } = useAppI18n()

const emit = defineEmits<{
  (e: 'nav-click', key: string): void
  (e: 'register-click'): void
}>()

function handleNavIndex(): void {
  uni.navigateTo({
    url: '/pages/index/index',
  })
}

function handleLocaleChange(value: AppLocale) {
  setLocale(value)
}

function handleNavClick(key: string) {
  emit('nav-click', key)
}
</script>
