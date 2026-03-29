<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <!-- Hero -->
    <view class="bg-[linear-gradient(135deg,#0d2238_0%,#183354_45%,#0d2238_100%)] text-white">
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:flex lg:min-h-[680px] lg:items-start lg:justify-between lg:pb-24 lg:pt-12">
        <view class="max-w-[680px]">
          <view class="mb-6 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#c9a96a]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#d8c8a8]">{{ t('hero.meta') }}</text>
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
            <button class="min-w-[190px] bg-[#d90429] px-6 py-4 text-[16px] font-medium text-white" @click="openPlan('free')">
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

          <view class="mt-16 grid grid-cols-3 gap-10 border-t border-white/10 pt-10">
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
          <view class="absolute inset-0 rounded-t-[220px] border border-white/10" />
          <view class="absolute left-1/2 top-[34px] h-[440px] w-[2px] -translate-x-1/2 bg-white/10" />
          <view class="absolute left-1/2 top-[34px] h-0 w-0 -translate-x-1/2 border-l-[130px] border-r-[130px] border-b-[420px] border-l-transparent border-r-transparent border-b-white/5" />
          <view class="absolute left-1/2 top-[128px] h-[1px] w-[170px] -translate-x-1/2 bg-white/10" />
          <view class="absolute left-1/2 top-[220px] h-[1px] w-[210px] -translate-x-1/2 bg-white/10" />
          <view class="absolute left-1/2 top-[312px] h-[1px] w-[250px] -translate-x-1/2 bg-white/10" />
          <view class="absolute left-1/2 top-[404px] h-[1px] w-[290px] -translate-x-1/2 bg-white/10" />
        </view>
      </view>
    </view>

    <!-- 愿景 -->
    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <view class="border border-[#e2d7c9] bg-[#f6ecdf] px-8 py-10 lg:sticky lg:top-28 lg:self-start">
          <view class="mb-6 inline-flex items-center gap-4">
            <view class="h-[1px] w-12 bg-[#d28f8f]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cc8f93]">
              {{ t('vision.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.08] text-[#1f1620] lg:text-[62px]">
            {{ t('vision.title') }}
            <text class="text-[#cf2438]"> · {{ t('vision.titleAccent') }}</text>
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-3">
          <view class="border border-[#eadfd2] bg-white px-8 py-9 lg:col-span-2">
            <view class="text-[21px] italic leading-[2] text-[#8c6b49] lg:text-[24px]">
              {{ t('vision.description') }}
            </view>
            <view class="mt-8 text-[19px] italic leading-[1.95] text-[#a27b55] lg:text-[21px]">
              {{ t('vision.secondaryDescription') }}
            </view>
          </view>

          <view
              v-for="item in visionPoints"
              :key="item.title"
              class="border border-[#eadfd2] bg-[#fbf7ef] px-7 py-8"
          >
            <view class="text-[14px] uppercase tracking-[4px] text-[#cc8f93]">{{ t('vision.pointLabel') }}</view>
            <view class="mt-5 text-[26px] text-[#cf2438]">{{ t(item.title) }}</view>
            <view class="mt-4 text-[16px] italic leading-7 text-[#7c654f]">
              {{ t(item.desc) }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 核心功能 -->
    <view class="bg-[#0d2238] text-white">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="mb-16">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#b84c5c]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#d58f97]">
              {{ t('features.eyebrow') }}
            </text>
          </view>
          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('features.title') }}
            <text class="italic text-[#e0143d]">& {{ t('features.titleAccent') }}</text>
          </view>
          <view class="mt-5 max-w-[760px] text-[19px] italic leading-8 text-[#d9d0c4] lg:text-[21px]">
            {{ t('features.subtitle') }}
          </view>
        </view>

        <view class="grid gap-[1px] overflow-hidden bg-[#233b56] md:grid-cols-2 xl:grid-cols-3">
          <view
              v-for="card in serviceCards"
              :key="card.title"
              class="bg-[#203854] px-10 py-12"
              @click="openPath(card.path)"
          >
            <view class="text-[34px]">{{ card.icon }}</view>
            <view class="mt-6 text-[30px] font-semibold text-[#d4af37]">
              {{ t(card.title) }}
            </view>
            <view class="mt-5 min-h-[120px] text-[17px] leading-8 text-[#f3ede4] lg:text-[18px]">
              {{ t(card.desc) }}
            </view>
            <view class="mt-8 text-[15px] italic tracking-[3px] text-[#d63f5f]">
              {{ t(card.fr) }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 为谁而生 -->
    <view class="mx-auto max-w-[1280px] px-8 py-28">
      <view class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <view class="border border-[#e2d7c9] bg-[#f6ecdf] px-8 py-10 lg:sticky lg:top-28 lg:self-start">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('mission.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-[1.12] lg:text-[60px]">
            {{ t('mission.title') }}
            <text class="text-[#d71934]">{{ t('mission.titleAccent') }}</text>
          </view>

          <view class="mt-8 text-[18px] leading-8 text-[#685a4e]">
            {{ t('mission.description') }}
          </view>

          <view class="mt-5 text-[17px] italic leading-8 text-[#8a7765]">
            {{ t('mission.secondaryDescription') }}
          </view>
        </view>

        <view class="grid gap-6">
          <view class="grid gap-5 sm:grid-cols-3">
            <view
                v-for="tag in missionTags"
                :key="tag.title"
                class="border border-[#e2d7c9] bg-white px-7 py-6"
            >
              <view class="text-[22px] font-medium" :class="tag.accent ? 'text-[#d71934]' : 'text-[#1e1e1f]'">
                {{ t(tag.title) }}
              </view>
              <view class="mt-3 text-[14px] italic leading-6 text-[#7d6752]">
                {{ t(tag.desc) }}
              </view>
            </view>
          </view>

          <view class="grid gap-6 md:grid-cols-2">
            <view class="border border-[#203854] bg-[#203854] px-8 py-9 text-white">
              <view class="text-[14px] uppercase tracking-[4px] text-[#d7b86e]">{{ t('mission.card1Label') }}</view>
              <view class="mt-5 text-[30px] leading-[1.55]">
              {{ t('mission.card1') }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-white/72">
                {{ t('mission.card1Accent') }}
              </view>
            </view>

            <view class="border border-[#d71934] bg-[#d71934] px-8 py-9 text-white shadow-[0_24px_60px_rgba(175,16,47,0.16)]">
              <view class="text-[14px] uppercase tracking-[4px] text-[#ffd5dd]">{{ t('mission.card2Label') }}</view>
              <view class="mt-5 text-[30px] leading-[1.55]">
              {{ t('mission.card2') }}
              </view>
              <view class="mt-5 text-[16px] leading-8 text-white/80">
                {{ t('mission.card2Accent') }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 会员体系 -->
    <view class="bg-[#f3ede3]">
      <view class="mx-auto max-w-[1280px] px-8 py-24">
        <view class="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <view class="max-w-[760px]">
          <view class="mb-5 inline-flex items-center gap-4">
            <view class="h-[1px] w-16 bg-[#d08e92]" />
            <text class="text-[12px] uppercase tracking-[6px] text-[#cf9aa0]">
              {{ t('membership.eyebrow') }}
            </text>
          </view>

          <view class="text-[44px] font-semibold leading-tight lg:text-[64px]">
            {{ t('membership.title') }}
            <text class="italic text-[#d71934]">& {{ t('membership.titleAccent') }}</text>
          </view>
          </view>

          <view class="max-w-[420px] text-[18px] italic leading-8 text-[#8c6b49]">
            {{ t('membership.subtitle') }}
          </view>
        </view>

        <view class="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <view class="border border-[#ddd6c8] bg-[#faf7f1] px-8 py-10 text-[#1f1f1f]">
            <view class="text-[13px] uppercase tracking-[5px] text-[#9b907f]">
              {{ t('membership.free.badge') }}
            </view>

            <view class="mt-5 text-[38px] font-semibold">
              {{ t('membership.free.name') }}
            </view>

            <view class="mt-8 text-[32px] font-semibold">
              {{ t('membership.free.price') }}
              <text class="text-[18px] font-normal text-[#7f7669]"> {{ t('membership.free.priceNote') }}</text>
            </view>

            <view class="mt-2 text-[15px] italic text-[#8a7a67]">
              {{ t('membership.free.period') }}
            </view>

            <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#4e463d]">
              <view>• {{ t('membership.free.f1') }}</view>
              <view>• {{ t('membership.free.f2') }}</view>
              <view>• {{ t('membership.free.f3') }}</view>
            </view>

            <button class="mt-10 w-full border border-[#1f1f1f] px-4 py-3 text-[16px] text-[#1f1f1f]" @click="openPlan('free')">
              {{ t('membership.free.button') }}
            </button>
          </view>

          <view class="grid gap-6 lg:grid-cols-3">
          <view class="border border-[#dbcdb6] bg-[#fbf7ef] px-8 py-10 text-[#2d241d] lg:translate-y-6">
            <view class="text-[13px] uppercase tracking-[5px] text-[#b08b4f]">
              {{ t('membership.vip.silver.badge') }}
            </view>

            <view class="mt-5 text-[38px] font-semibold text-[#8b6a36]">
              {{ t('membership.vip.silver.name') }}
            </view>

            <view class="mt-8 text-[32px] font-semibold">
              {{ t('membership.vip.silver.price') }}
              <text class="text-[18px] font-normal text-[#7d7367]"> {{ t('membership.vip.silver.priceNote') }}</text>
            </view>

            <view class="mt-2 text-[15px] italic text-[#8a7a67]">
              {{ t('membership.vip.silver.period') }}
            </view>

            <view class="mt-8 space-y-3 text-[16px] leading-8">
              <view>• {{ t('membership.vip.silver.f1') }}</view>
              <view>• {{ t('membership.vip.silver.f2') }}</view>
              <view>• {{ t('membership.vip.silver.f3') }}</view>
            </view>

            <button class="mt-10 w-full border border-[#8b6a36] px-4 py-3 text-[16px] text-[#8b6a36]" @click="openPlan('silver')">
              {{ t('membership.vip.cta') }}
            </button>
          </view>

          <view class="border border-[#d7b86e] bg-[#203854] px-8 py-12 text-white shadow-[0_20px_50px_rgba(22,41,65,0.12)] lg:-translate-y-4">
            <view class="text-[13px] uppercase tracking-[5px] text-[#d7b86e]">
              {{ t('membership.vip.gold.badge') }}
            </view>

            <view class="mt-5 text-[38px] font-semibold text-[#f4d27f]">
              {{ t('membership.vip.gold.name') }}
            </view>

            <view class="mt-8 text-[32px] font-semibold">
              {{ t('membership.vip.gold.price') }}
              <text class="text-[18px] font-normal text-white/70"> {{ t('membership.vip.gold.priceNote') }}</text>
            </view>

            <view class="mt-2 text-[15px] italic text-white/70">
              {{ t('membership.vip.gold.period') }}
            </view>

            <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#f0e6d8]">
              <view>• {{ t('membership.vip.gold.f1') }}</view>
              <view>• {{ t('membership.vip.gold.f2') }}</view>
              <view>• {{ t('membership.vip.gold.f3') }}</view>
            </view>

            <button class="mt-10 w-full border border-[#d7b86e] bg-[#d7b86e] px-4 py-3 text-[16px] text-[#1f3047]" @click="openPlan('gold')">
              {{ t('membership.vip.cta') }}
            </button>
          </view>

          <view class="border border-[#d90429] bg-[#d90429] px-8 py-10 text-white lg:translate-y-10">
            <view class="text-[13px] uppercase tracking-[5px] text-[#ffd5dc]">
              {{ t('membership.vip.diamond.badge') }}
            </view>

            <view class="mt-5 text-[38px] font-semibold text-[#fff3f5]">
              {{ t('membership.vip.diamond.name') }}
            </view>

            <view class="mt-8 text-[32px] font-semibold">
              {{ t('membership.vip.diamond.price') }}
              <text class="text-[18px] font-normal text-white/75"> {{ t('membership.vip.diamond.priceNote') }}</text>
            </view>

            <view class="mt-2 text-[15px] italic text-white/75">
              {{ t('membership.vip.diamond.period') }}
            </view>

            <view class="mt-8 space-y-3 text-[16px] leading-8 text-[#fff1f3]">
              <view>• {{ t('membership.vip.diamond.f1') }}</view>
              <view>• {{ t('membership.vip.diamond.f2') }}</view>
              <view>• {{ t('membership.vip.diamond.f3') }}</view>
            </view>

            <button class="mt-10 w-full border border-white bg-white px-4 py-3 text-[16px] text-[#d90429]" @click="openPlan('diamond')">
              {{ t('membership.vip.cta') }}
            </button>
          </view>
          </view>
        </view>
      </view>
    </view>

    <AppFooter
        :nav-list="navList"
        @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const { t } = usePageI18n('home')
const navList = NAV_LIST

const stats = [
  { value: 'hero.stats.members.value', label: 'hero.stats.members.label' },
  { value: 'hero.stats.events.value', label: 'hero.stats.events.label' },
  { value: 'hero.stats.connections.value', label: 'hero.stats.connections.label' }
]

const visionPoints = [
  { title: 'vision.point1.title', desc: 'vision.point1.desc' },
  { title: 'vision.point2.title', desc: 'vision.point2.desc' },
  { title: 'vision.point3.title', desc: 'vision.point3.desc' }
]

const serviceCards = [
  { icon: '🤖', title: 'features.ai.title', desc: 'features.ai.desc', fr: 'features.ai.label', path: '/pages/profiles/index' },
  { icon: '💌', title: 'features.message.title', desc: 'features.message.desc', fr: 'features.message.label', path: '/pages/profiles/index' },
  { icon: '🎭', title: 'features.event.title', desc: 'features.event.desc', fr: 'features.event.label', path: '/pages/events/index' },
  { icon: '👨‍👩‍👧', title: 'features.parent.title', desc: 'features.parent.desc', fr: 'features.parent.label', path: '/pages/parents/index' },
  { icon: '💎', title: 'features.vip.title', desc: 'features.vip.desc', fr: 'features.vip.label', path: '/pages/membership/index' },
  { icon: '🏆', title: 'features.story.title', desc: 'features.story.desc', fr: 'features.story.label', path: '/pages/about/index' }
]

const missionTags = [
  { title: 'mission.tag1.title', desc: 'mission.tag1.desc', accent: true },
  { title: 'mission.tag2.title', desc: 'mission.tag2.desc', accent: false },
  { title: 'mission.tag3.title', desc: 'mission.tag3.desc', accent: false }
]

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function openPath(path: string) {
  uni.navigateTo({
    url: path,
  })
}

function openPlan(plan: string) {
  openRegisterPage(plan)
}

function openEvents() {
  uni.navigateTo({
    url: '/pages/events/index',
  })
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
