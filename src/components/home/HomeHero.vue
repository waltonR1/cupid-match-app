<template>
  <view class="bg-gradient-home-hero text-semantic-text-primary">
    <view
      class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:flex lg:min-h-[680px] lg:items-start lg:justify-between lg:pb-24 lg:pt-12"
    >
      <view class="max-w-[680px]">
        <view class="mb-6 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-semantic-border-eyebrow" />
          <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
            {{ t('hero.meta', { year }) }}
          </text>
        </view>

        <view class="text-[64px] font-semibold leading-[1.05] text-semantic-text-primary lg:text-[92px]">
          {{ t('hero.title') }}
        </view>

        <view class="mt-3 text-[64px] italic leading-[1.15] text-semantic-text-hero-highlight lg:text-[68px]">
          {{ t('hero.titleAccent') }}
        </view>

        <view class="mt-8 text-[18px] leading-8 text-semantic-text-secondary lg:text-[20px]">
          {{ t('hero.description') }}
        </view>

        <view class="mt-4 text-[17px] italic leading-8 text-semantic-text-muted lg:text-[18px]">
          {{ t('hero.secondaryDescription') }}
        </view>

        <view class="mt-12 flex flex-wrap gap-5">
          <AppButton
            variant="primary"
            size="lg"
            width="cta"
            rounded="none"
            @click="openPlan"
          >
            {{ t('hero.actions.primary') }}
          </AppButton>

          <AppButton
            variant="secondary"
            context="hero"
            size="lg"
            width="cta"
            rounded="none"
            @click="openProfiles"
          >
            {{ t('hero.actions.secondary') }}
          </AppButton>
        </view>

        <view class="mt-14 border-l-2 border-component-home-hero-quote-border pl-5 text-[20px] text-semantic-text-muted">
          "{{ t('hero.quote') }}"
        </view>

        <view class="mt-5 grid grid-cols-3 gap-10 border-t border-component-home-hero-divider pt-5">
          <view v-for="item in stats" :key="item.label">
            <view class="text-[36px] font-semibold text-component-home-hero-metric-value lg:text-[48px]">
              {{ t(item.value) }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-subtle">
              {{ t(item.label) }}
            </view>
          </view>
        </view>
      </view>

      <view class="relative mt-16 hidden h-[560px] w-[420px] lg:block">
        <view class="absolute inset-0 rounded-t-[220px] border border-semantic-border-hero-ornament" />
        <view
          class="absolute left-1/2 top-[34px] h-0 w-0 -translate-x-1/2 border-b-[420px] border-l-[130px] border-l-transparent border-r-[130px] border-r-transparent border-b-component-hero-ornament-fill"
        />
        <view class="absolute left-1/2 top-[34px] h-[440px] w-[2px] -translate-x-1/2 bg-semantic-border-hero-ornament" />
        <view class="absolute left-1/2 top-[128px] h-[1px] w-[170px] -translate-x-1/2 bg-semantic-border-hero-ornament" />
        <view class="absolute left-1/2 top-[220px] h-[1px] w-[210px] -translate-x-1/2 bg-semantic-border-hero-ornament" />
        <view class="absolute left-1/2 top-[312px] h-[1px] w-[250px] -translate-x-1/2 bg-semantic-border-hero-ornament" />
        <view class="absolute left-1/2 top-[404px] h-[1px] w-[290px] -translate-x-1/2 bg-semantic-border-hero-ornament" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/common/AppButton.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openRegisterPage, openSelfDirectoryPage } from '@/utils/navigation'

const { t } = usePageI18n('home')

const year = new Date().getFullYear()

function openProfiles() {
  openSelfDirectoryPage()
}

function openPlan() {
  openRegisterPage()
}

const stats = [
  { value: 'hero.stats.members.value', label: 'hero.stats.members.label' },
  { value: 'hero.stats.events.value', label: 'hero.stats.events.label' },
  { value: 'hero.stats.connections.value', label: 'hero.stats.connections.label' },
]
</script>
