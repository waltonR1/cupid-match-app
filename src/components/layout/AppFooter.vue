<template>
  <view class="border-t border-next-semantic-border-default bg-next-component-footer-background text-next-semantic-text-secondary">
    <view class="mx-auto max-w-[1280px] px-8 py-10">
      <!-- 上半部分 -->
      <view class="grid gap-12 md:grid-cols-4">
        <!-- 品牌 -->
        <view>
          <view class="text-[22px] font-semibold tracking-[2px] text-next-semantic-accent-primary">
            {{ t('common.brand.name') }}
          </view>
          <view class="mt-2 text-[13px] italic tracking-[2px] text-next-semantic-accent-muted">
            {{ t('common.brand.tagline') }}
          </view>
          <view class="mt-4 text-[14px] leading-6 text-next-semantic-text-secondary">
            {{ t('common.footer.brandDesc') }}
          </view>
        </view>

        <!-- 导航 -->
        <view>
          <view class="text-[16px] font-medium text-next-semantic-accent-secondary">
            {{ t('common.footer.nav') }}
          </view>
          <view class="mt-3 space-y-2 text-[14px] text-next-semantic-text-secondary">
            <view
              v-for="item in navList"
              :key="item.key"
              class="group relative w-fit cursor-pointer pb-2 transition-colors duration-200"
              @click="handleNavClick(item.key)"
            >
              <view
                class="text-[14px] text-next-semantic-text-muted transition-colors duration-200 group-hover:text-next-semantic-text-primary"
              >
                {{ t(item.key) }}
              </view>
              <view class="absolute left-0 top-[calc(100%+2px)] h-px w-0 bg-next-semantic-accent-secondary transition-all duration-200 group-hover:w-full" />
            </view>
          </view>
        </view>

        <!-- 联系 -->
        <view>
          <view class="text-[16px] font-medium text-next-semantic-accent-secondary">
            {{ t('common.footer.contact') }}
          </view>
          <view class="mt-3 space-y-2 text-[14px] text-next-semantic-text-secondary">
            <view>{{ t('common.contact.email', { email }) }}</view>
            <view>{{ t('common.contact.wechat') }}</view>
            <view>{{ t('common.contact.location') }}</view>
          </view>
        </view>

        <!-- 语言 -->
        <view>
          <view class="text-[16px] font-medium text-next-semantic-accent-secondary">
            {{ t('common.footer.lang') }}
          </view>
          <view class="mt-3 text-[14px] leading-7 text-next-semantic-text-secondary">
            {{ t('common.footer.languageList') }}
          </view>
        </view>
      </view>
    </view>

    <!-- 底部收口区 -->
    <view class="border-t border-next-component-footer-divider py-4">
      <view class="text-center text-[12px] tracking-wide text-next-semantic-text-subtle">
        {{ t('common.footer.rights', { year }) }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAppI18n } from '@/i18n/composables/use-app-i18n'

interface NavItem {
  key: string
}

defineProps<{
  navList: NavItem[]
}>()

const { t } = useAppI18n()

const year = new Date().getFullYear()
const email = 'contact@rencontreaparis.com'

const emit = defineEmits<{
  (e: 'nav-click', key: string): void
}>()

function handleNavClick(key: string) {
  emit('nav-click', key)
}
</script>
