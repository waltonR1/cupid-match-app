<template>
  <view class="bg-[#0d2238] text-white">
    <view class="mx-auto max-w-[1280px] px-8 py-16">
      <view class="grid gap-12 md:grid-cols-4">
        <view>
          <view class="text-[24px] font-semibold tracking-[2px] text-[#d4af37]">{{ t('common.brand.name') }}</view>
          <view class="mt-2 text-[14px] italic tracking-[2px] text-[#dbc8a2]">
            {{ t('common.brand.tagline') }}
          </view>
          <view class="mt-5 text-[15px] leading-7 text-white/70">
            {{ t('common.footer.brandDesc') }}
          </view>
        </view>

        <view>
          <view class="text-[18px] font-medium text-[#d4af37]">{{ t('common.footer.nav') }}</view>
          <view class="mt-4 space-y-3 text-[15px] text-white/75">
            <view
              v-for="item in navList"
              :key="item.key"
              class="cursor-pointer"
              @click="handleNavClick(item.key)"
            >
              {{ t(item.key) }}
            </view>
          </view>
        </view>

        <view>
          <view class="text-[18px] font-medium text-[#d4af37]">{{ t('common.footer.contact') }}</view>
          <view class="mt-4 space-y-3 text-[15px] text-white/75">
            <view>{{ t('common.contact.email') }}</view>
            <view>{{ t('common.contact.wechat') }}</view>
            <view>{{ t('common.contact.location') }}</view>
          </view>
        </view>

        <view>
          <view class="text-[18px] font-medium text-[#d4af37]">{{ t('common.footer.lang') }}</view>
          <view class="mt-4 text-[15px] leading-8 text-white/75">
            {{ t('common.footer.languageList') }}
          </view>
        </view>
      </view>

      <view class="mt-12 border-t border-white/10 pt-6 text-[13px] text-white/45">
        {{ t('common.footer.rights') }}
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

const emit = defineEmits<{
  (e: 'nav-click', key: string): void
}>()

function handleNavClick(key: string) {
  emit('nav-click', key)
}
</script>
