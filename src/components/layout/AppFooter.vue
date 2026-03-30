<template>
  <view class="bg-[#0d2238] text-white">
    <view class="mx-auto max-w-[1280px] px-8 py-10">
      <!-- 上半部分 -->
      <view class="grid gap-12 md:grid-cols-4">
        <!-- 品牌 -->
        <view>
          <view class="text-[22px] font-semibold tracking-[2px] text-[#d4af37]">
            {{ t('common.brand.name') }}
          </view>
          <view class="mt-2 text-[13px] italic tracking-[2px] text-[#dbc8a2]">
            {{ t('common.brand.tagline') }}
          </view>
          <view class="mt-4 text-[14px] leading-6 text-white/65">
            {{ t('common.footer.brandDesc') }}
          </view>
        </view>

        <!-- 导航 -->
        <view>
          <view class="text-[16px] font-medium text-[#d4af37]">
            {{ t('common.footer.nav') }}
          </view>
          <view class="mt-3 space-y-2 text-[14px] text-white/70">
            <view
                v-for="item in navList"
                :key="item.key"
                class="cursor-pointer hover:text-white transition-colors"
                @click="handleNavClick(item.key)"
            >
              {{ t(item.key) }}
            </view>
          </view>
        </view>

        <!-- 联系 -->
        <view>
          <view class="text-[16px] font-medium text-[#d4af37]">
            {{ t('common.footer.contact') }}
          </view>
          <view class="mt-3 space-y-2 text-[14px] text-white/70">
            <view>{{ t('common.contact.email') }}</view>
            <view>{{ t('common.contact.email', { email }) }}</view>
            <view>{{ t('common.contact.wechat') }}</view>
            <view>{{ t('common.contact.location') }}</view>
          </view>
        </view>

        <!-- 语言 -->
        <view>
          <view class="text-[16px] font-medium text-[#d4af37]">
            {{ t('common.footer.lang') }}
          </view>
          <view class="mt-3 text-[14px] leading-7 text-white/70">
            {{ t('common.footer.languageList') }}
          </view>
        </view>
      </view>
    </view>

    <!-- 底部收口区 -->
    <view class="border-t border-white/10 py-4">
      <view class="text-center text-[12px] text-white/40 tracking-wide">
        {{ t('common.footer.rights', { year }) }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAppI18n } from '@/i18n/use-app-i18n'

interface NavItem {
  key: string
}

defineProps<{
  navList: NavItem[]
}>()

const { t } = useAppI18n()

const year = new Date().getFullYear()
const email = 'contact@rencontreaparis.com';

const emit = defineEmits<{
  (e: 'nav-click', key: string): void
}>()

function handleNavClick(key: string) {
  emit('nav-click', key)
}
</script>
