<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden" :class="heroTheme.containerClass">
      <view class="pointer-events-none absolute inset-0 opacity-90" :class="heroTheme.glowClass" />
      <view class="pointer-events-none absolute inset-x-0 top-0 h-[220px] opacity-80" :class="heroTheme.ambientClass" />

      <view class="mx-auto max-w-[1280px] px-8 pb-16 pt-10 lg:pb-20 lg:pt-12">
        <view class="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <view class="max-w-[720px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border px-5 py-2" :class="heroTheme.eyebrowWrapClass">
              <view class="h-px w-12" :class="heroTheme.eyebrowLineClass" />
              <text class="text-[12px] uppercase tracking-[6px]" :class="heroTheme.eyebrowTextClass">
                {{ eyebrow }}
              </text>
            </view>

            <view class="text-[40px] font-semibold leading-[1.04] lg:text-[72px]" :class="heroTheme.titleClass">
              {{ title }}
            </view>

            <view class="mt-6 max-w-[660px] text-[17px] leading-8 lg:text-[18px]" :class="heroTheme.subtitleClass">
              {{ subtitle }}
            </view>
          </view>

          <view class="grid gap-4 md:grid-cols-3">
            <view
              v-for="item in stats"
              :key="item.label"
              class="border px-6 py-6 shadow-card backdrop-blur"
              :class="heroTheme.statCardClass"
            >
              <view class="text-[12px] uppercase tracking-[4px]" :class="heroTheme.statLabelClass">
                {{ item.label }}
              </view>
              <view class="mt-4 text-[28px] font-semibold lg:text-[34px]" :class="heroTheme.statValueClass">
                {{ item.value }}
              </view>
              <view
                v-if="item.caption"
                class="mt-3 text-[14px] leading-6"
                :class="heroTheme.statCaptionClass"
              >
                {{ item.caption }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-14 lg:py-16">
      <AccountSubnav :active-page="activePage" />

      <view v-if="hasIntroSlot" class="mt-8">
        <slot name="intro" />
      </view>

      <view class="mt-8">
        <slot />
      </view>
    </view>

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AccountSubnav from '@/components/account/AccountSubnav.vue'
import { NAV_LIST } from '@/constants/nav'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

type AccountPageKey = 'overview' | 'profile' | 'events' | 'favorites' | 'messages' | 'privacy'
type HeroTone = 'home' | 'events' | 'membership'

interface HeroStatItem {
  label: string
  value: string
  caption?: string
}

const props = withDefaults(defineProps<{
  activePage: AccountPageKey
  eyebrow: string
  title: string
  subtitle: string
  stats: HeroStatItem[]
  heroTone?: HeroTone
}>(), {
  heroTone: 'membership',
})

const navList = NAV_LIST
const slots = useSlots()

const heroTheme = computed(() => {
  if (props.heroTone === 'events') {
    return {
      containerClass: 'bg-events-hero text-text-inverse',
      glowClass: 'bg-decor-glow',
      ambientClass: 'bg-decor-ambient',
      eyebrowWrapClass: 'border-border-inverse bg-surface-inverse-panel/35',
      eyebrowLineClass: 'bg-brand-accent',
      eyebrowTextClass: 'text-brand-accent-foreground',
      titleClass: 'text-text-inverse',
      subtitleClass: 'text-text-inverse-soft',
      statCardClass: 'border-border-inverse bg-surface-inverse-panel/70',
      statLabelClass: 'text-brand-accent',
      statValueClass: 'text-text-inverse',
      statCaptionClass: 'text-text-inverse-muted',
    }
  }

  if (props.heroTone === 'home') {
    return {
      containerClass: 'bg-home-hero text-text-inverse',
      glowClass: 'bg-decor-glow',
      ambientClass: 'bg-decor-ambient',
      eyebrowWrapClass: 'border-border-inverse bg-surface-inverse-panel/35',
      eyebrowLineClass: 'bg-brand-accent',
      eyebrowTextClass: 'text-brand-accent-foreground',
      titleClass: 'text-text-inverse',
      subtitleClass: 'text-text-inverse-soft',
      statCardClass: 'border-border-inverse bg-surface-inverse-panel/70',
      statLabelClass: 'text-brand-accent',
      statValueClass: 'text-text-inverse',
      statCaptionClass: 'text-text-inverse-muted',
    }
  }

  return {
    containerClass: 'bg-membership-hero text-text-inverse',
    glowClass: 'bg-decor-glow',
    ambientClass: 'bg-decor-ambient',
    eyebrowWrapClass: 'border-border-inverse bg-surface-inverse-panel/35',
    eyebrowLineClass: 'bg-brand-accent',
    eyebrowTextClass: 'text-brand-accent-foreground',
    titleClass: 'text-text-inverse',
    subtitleClass: 'text-text-inverse-soft',
    statCardClass: 'border-border-inverse bg-surface-inverse-panel/70',
    statLabelClass: 'text-brand-accent',
    statValueClass: 'text-text-inverse',
    statCaptionClass: 'text-text-inverse-muted',
  }
})

const hasIntroSlot = computed(() => Boolean(slots.intro))

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
