<template>
  <view class="bg-home-hero text-text-inverse">
    <view
        class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:flex lg:min-h-[680px] lg:items-start lg:justify-between lg:pb-24 lg:pt-12">
      <view class="max-w-[680px]">
        <view class="mb-6 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-border-highlight-soft"/>
          <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">{{ t('hero.meta', {year}) }}</text>
        </view>

        <view class="text-[64px] font-semibold leading-[1.05] text-text-inverse lg:text-[92px]">
          {{ t('hero.title') }}
        </view>

        <view class="mt-3 text-[42px] italic leading-[1.15] text-brand-highlight-strong lg:text-[68px]">
          {{ t('hero.titleAccent') }}
        </view>

        <view class="mt-8 text-[18px] leading-8 text-text-inverse-muted lg:text-[20px]">
          {{ t('hero.description') }}
        </view>

        <view class="mt-4 text-[17px] italic leading-8 text-text-inverse-subtle lg:text-[18px]">
          {{ t('hero.secondaryDescription') }}
        </view>

        <view class="mt-12 flex flex-wrap gap-5">
          <view
              class="inline-flex min-w-btn-cta cursor-pointer items-center justify-center bg-button-primary px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-white transition-all duration-300 hover:bg-button-primary-hover"
              @click="openPlan('free')">
            {{ t('hero.actions.primary') }}
          </view>
          <view
              class="inline-flex min-w-btn-cta cursor-pointer items-center justify-center border border-border-highlight-soft bg-transparent px-btn-cta-x py-btn-cta-y text-[16px] text-text-inverse-faint transition-all duration-300 hover:border-border-highlight-hover hover:bg-border-highlight-soft/10 hover:text-text-inverse"
              @click="openProfiles"
          >
            {{ t('hero.actions.secondary') }}
          </view>
        </view>

        <view class="mt-14 border-l-2 border-border-accent-strong pl-5 text-[20px] text-text-inverse-faint">
          「{{ t('hero.quote') }}」
        </view>

        <view class="mt-5 grid grid-cols-3 gap-10 border-t border-white/10 pt-5">
          <view v-for="item in stats" :key="item.label">
            <view class="text-[36px] font-semibold text-brand-highlight-strong lg:text-[48px]">
              {{ t(item.value) }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-text-inverse-subtle">
              {{ t(item.label) }}
            </view>
          </view>
        </view>
      </view>

      <view class="relative mt-16 hidden h-[560px] w-[420px] lg:block">
        <view class="absolute inset-0 rounded-t-[220px] border border-white/10"/>
        <view class="absolute left-1/2 top-[34px] h-[440px] w-[2px] -translate-x-1/2 bg-white/10"/>
        <view
            class="absolute left-1/2 top-[34px] h-0 w-0 -translate-x-1/2 border-l-[130px] border-r-[130px] border-b-[420px] border-l-transparent border-r-transparent border-b-white/5"/>
        <view class="absolute left-1/2 top-[128px] h-[1px] w-[170px] -translate-x-1/2 bg-white/10"/>
        <view class="absolute left-1/2 top-[220px] h-[1px] w-[210px] -translate-x-1/2 bg-white/10"/>
        <view class="absolute left-1/2 top-[312px] h-[1px] w-[250px] -translate-x-1/2 bg-white/10"/>
        <view class="absolute left-1/2 top-[404px] h-[1px] w-[290px] -translate-x-1/2 bg-white/10"/>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {usePageI18n} from "@/i18n/use-page-i18n";
import {openRegisterPage} from "@/utils/demo-navigation";

const { t } = usePageI18n('home')

const year = new Date().getFullYear()

function openProfiles() {
  uni.navigateTo({
    url: '/pages/profiles/index',
  })
}

function openPlan(plan: string) {
  openRegisterPage(plan)
}

const stats = [
  { value: 'hero.stats.members.value', label: 'hero.stats.members.label' },
  { value: 'hero.stats.events.value', label: 'hero.stats.events.label' },
  { value: 'hero.stats.connections.value', label: 'hero.stats.connections.label' }
]
</script>
