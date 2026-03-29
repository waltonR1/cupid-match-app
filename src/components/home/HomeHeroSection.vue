<script lang="ts" setup>
import {usePageI18n} from "@/i18n/use-page-i18n";
import {openRegisterPage} from "@/utils/demo-navigation";

const { t } = usePageI18n('home')

const year = new Date().getFullYear()

function openEvents() {
  uni.navigateTo({
    url: '/pages/events/index',
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

<template>
  <view class="bg-[linear-gradient(135deg,#0d2238_0%,#183354_45%,#0d2238_100%)] text-white">
    <view
        class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:flex lg:min-h-[680px] lg:items-start lg:justify-between lg:pb-24 lg:pt-12">
      <view class="max-w-[680px]">
        <view class="mb-6 inline-flex items-center gap-4">
          <view class="h-[1px] w-16 bg-[#c9a96a]"/>
          <text class="text-[12px] uppercase tracking-[6px] text-[#d8c8a8]">{{ t('hero.meta', {year}) }}</text>
        </view>

        <view class="text-[64px] font-semibold leading-[1.05] text-[#fffaf3] lg:text-[92px]">
          {{ t('hero.title') }}
        </view>

        <view class="mt-3 text-[42px] italic leading-[1.15] text-[#d4af37] lg:text-[68px]">
          {{ t('hero.titleAccent') }}
        </view>

        <view class="mt-8 text-[18px] leading-8 text-[#e8dcc6] lg:text-[20px]">
          {{ t('hero.description') }}
        </view>

        <view class="mt-4 text-[17px] italic leading-8 text-white/60 lg:text-[18px]">
          {{ t('hero.secondaryDescription') }}
        </view>

        <view class="mt-12 flex flex-wrap gap-5">
          <button class="min-w-[190px] bg-[#d90429] px-6 py-4 text-[16px] font-medium text-white"
                  @click="openPlan('free')">
            {{ t('hero.actions.primary') }}
          </button>
          <button
              class="min-w-[190px] border border-[#c9a96a] bg-transparent px-6 py-4 text-[16px] text-[#f5e7c8]"
              @click="openEvents"
          >
            {{ t('hero.actions.secondary') }}
          </button>
        </view>

        <view class="mt-14 border-l-2 border-[#d90429] pl-5 text-[20px] text-[#f3e7cf]">
          「{{ t('hero.quote') }}」
        </view>

        <view class="mt-5 grid grid-cols-3 gap-10 border-t border-white/10 pt-5">
          <view v-for="item in stats" :key="item.label">
            <view class="text-[36px] font-semibold text-[#d4af37] lg:text-[48px]">
              {{ t(item.value) }}
            </view>
            <view class="mt-2 text-[13px] leading-6 text-white/65">
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
