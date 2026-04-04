<template>
  <view class="bg-home-hero text-text-heading">
    <view
      class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:flex lg:min-h-[680px] lg:items-start lg:justify-between lg:pb-24 lg:pt-12"
    >
      <view class="max-w-[680px]">
        <view class="mb-6 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-border-highlight-soft" />
          <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">
            {{ t('hero.meta', { year }) }}
          </text>
        </view>

        <view class="text-[64px] font-semibold leading-[1.05] text-text-heading lg:text-[92px]">
          {{ t('hero.title') }}
        </view>

        <view class="mt-3 text-[42px] italic leading-[1.15] text-brand-highlight-strong lg:text-[68px]">
          {{ t('hero.titleAccent') }}
        </view>

        <view class="mt-8 text-[18px] leading-8 text-text-body lg:text-[20px]">
          {{ t('hero.description') }}
        </view>

        <view class="mt-4 text-[17px] italic leading-8 text-text-muted lg:text-[18px]">
          {{ t('hero.secondaryDescription') }}
        </view>

        <view class="mt-12 flex flex-wrap gap-5">
          <view
            class="inline-flex min-w-btn-cta cursor-pointer items-center justify-center bg-button-highlight px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:bg-button-highlight-hover hover:shadow-card"
            @click="openPlan('free')"
          >
            {{ t('hero.actions.primary') }}
          </view>

          <view
            class="inline-flex min-w-btn-cta cursor-pointer items-center justify-center border px-btn-cta-x py-btn-cta-y text-[16px] text-text-heading shadow-panel transition-all duration-300 [background-color:var(--hero-secondary-cta-bg)] [border-color:var(--hero-secondary-cta-border)] hover:-translate-y-[1px] hover:text-brand-brown hover:shadow-card hover:[background-color:var(--hero-secondary-cta-bg-hover)]"
            @click="openProfiles"
          >
            {{ t('hero.actions.secondary') }}
          </view>
        </view>

        <view class="mt-14 border-l-2 border-border-highlight pl-5 text-[20px] text-text-body-soft">
          「{{ t('hero.quote') }}」
        </view>

        <view class="mt-5 grid grid-cols-3 gap-10 border-t border-border-light/45 pt-5">
          <view v-for="item in stats" :key="item.label">
            <view class="text-[36px] font-semibold text-brand-highlight-strong lg:text-[48px]">
              {{ t(item.value) }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-text-subtle">
              {{ t(item.label) }}
            </view>
          </view>
        </view>
      </view>

      <view class="relative mt-16 hidden h-[560px] w-[420px] lg:block">
        <view class="absolute inset-0 rounded-t-[220px] border [border-color:var(--hero-ornament-line)]" />
        <view class="absolute left-1/2 top-[34px] h-[440px] w-[2px] -translate-x-1/2 [background-color:var(--hero-ornament-line)]" />
        <view
          class="absolute left-1/2 top-[34px] h-0 w-0 -translate-x-1/2 border-l-[130px] border-r-[130px] border-b-[420px] border-l-transparent border-r-transparent [border-bottom-color:var(--hero-ornament-fill)]"
        />
        <view class="absolute left-1/2 top-[128px] h-[1px] w-[170px] -translate-x-1/2 [background-color:var(--hero-ornament-line)]" />
        <view class="absolute left-1/2 top-[220px] h-[1px] w-[210px] -translate-x-1/2 [background-color:var(--hero-ornament-line)]" />
        <view class="absolute left-1/2 top-[312px] h-[1px] w-[250px] -translate-x-1/2 [background-color:var(--hero-ornament-line)]" />
        <view class="absolute left-1/2 top-[404px] h-[1px] w-[290px] -translate-x-1/2 [background-color:var(--hero-ornament-line)]" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'

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
  { value: 'hero.stats.connections.value', label: 'hero.stats.connections.label' },
]
</script>
