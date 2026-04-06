<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-auth-hero text-text-heading">
      <view class="pointer-events-none absolute left-[-72px] top-[-48px] h-[240px] w-[240px] rounded-full bg-brand-accent/10 blur-[88px]" />
      <view class="pointer-events-none absolute right-[-120px] top-14 h-[320px] w-[320px] rounded-full border border-border-light/20" />

      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[680px] lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
          <view class="max-w-[720px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-brand-accent" />
              <text class="text-[12px] uppercase tracking-[6px] text-brand-accent-soft">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="max-w-[660px] text-[50px] font-semibold leading-[1.04] text-text-heading lg:text-[84px]">
              {{ labels.title }}
            </view>

            <view class="mt-8 max-w-[660px] text-[18px] leading-8 text-text-body lg:text-[20px]">
              {{ labels.subtitle }}
            </view>

            <view class="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <view
                  v-for="item in accessCards"
                  :key="item.title"
                  class="border border-border-base/70 bg-surface-card/18 px-5 py-5 backdrop-blur transition-all duration-300 hover:-translate-y-[2px] hover:border-border-accent/50"
              >
                <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                  {{ item.kicker }}
                </view>
                <view class="mt-4 text-[22px] font-medium text-text-heading">
                  {{ item.title }}
                </view>
                <view class="mt-3 text-[14px] leading-7 text-text-body">
                  {{ item.desc }}
                </view>
              </view>
            </view>
          </view>

          <view class="relative lg:ml-auto lg:w-full lg:max-w-[520px]">
            <view class="pointer-events-none absolute inset-0 translate-x-5 translate-y-5 border border-border-base/30 bg-surface-card/10" />

        <view class="relative border border-border-base/70 bg-surface-card-soft/32 px-8 py-8 shadow-hero backdrop-blur">
              <view>
                <view class="text-[12px] uppercase tracking-[4px] text-brand-support">
                  {{ labels.formTitle }}
                </view>
                <view class="mt-4 text-[30px] leading-[1.35] text-text-heading">
                  {{ labels.panelTitle }}
                </view>
              </view>

              <view class="mt-4 text-[15px] leading-7 text-text-body">
                {{ labels.panelHint }}
              </view>

              <view class="mt-8 grid gap-5">
                <view
                    v-for="field in formFields"
                    :key="field.label"
                  class="border border-border-base/60 bg-surface-card-soft/52 px-5 py-4"
                >
                  <view class="text-[12px] uppercase tracking-[3px] text-brand-support">
                    {{ field.label }}
                  </view>
                  <view class="mt-3 text-[16px] text-text-body">
                    {{ field.placeholder }}
                  </view>
                </view>
              </view>

              <view class="mt-8 grid gap-4">
                <button
                    class="[margin-left:0] [margin-right:0] inline-flex w-full items-center justify-center rounded-button border border-button-accent bg-button-accent px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:border-button-accent-hover hover:bg-button-accent-hover hover:shadow-card"
                    @click="handleSubmit"
                >
                  {{ labels.submit }}
                </button>

                <button
                    class="[margin-left:0] [margin-right:0] inline-flex w-full items-center justify-center rounded-button border border-border-base/70 bg-transparent px-btn-cta-x py-btn-cta-y text-[15px] font-medium text-text-body transition-all duration-300 hover:-translate-y-[1px] hover:border-border-accent/55 hover:bg-surface-card/24 hover:text-text-heading"
                    @click="handleRegisterClick"
                >
                  {{ labels.secondary }}
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="bg-page-soft">
      <view class="mx-auto max-w-[1280px] px-8 py-20">
        <view class="mb-8 inline-flex items-center gap-4">
          <view class="h-[1px] w-12 bg-border-accent-soft" />
          <text class="text-[12px] uppercase tracking-[6px] text-brand-support">
            {{ labels.accessTitle }}
          </text>
        </view>

        <view class="grid gap-6 lg:grid-cols-3">
          <view
              v-for="item in accessCards"
              :key="item.title"
              class="border border-border-base bg-surface-card px-7 py-7 shadow-card transition-all duration-300 hover:-translate-y-[2px] hover:border-border-accent/50"
          >
            <view class="text-[12px] uppercase tracking-[4px] text-brand-secondary">
              {{ item.kicker }}
            </view>
            <view class="mt-4 text-[26px] font-semibold text-text-heading">
              {{ item.title }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-text-body">
              {{ item.desc }}
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
import { computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useAuthStore } from '@/stores/modules/auth'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const SELF_ROUTE = '/pages/discovery/self/index'

const auth = useAuthStore()
const navList = NAV_LIST
const { t } = usePageI18n('login')

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  formTitle: t('hero.formTitle'),
  panelTitle: t('hero.panelTitle'),
  panelHint: t('hero.panelHint'),
  submit: t('hero.submit'),
  secondary: t('hero.secondary'),
  accessTitle: t('hero.accessTitle'),
  autoRouteTitle: t('hero.autoRouteTitle'),
  autoRouteHeading: t('hero.autoRouteHeading'),
  autoRouteDesc: t('hero.autoRouteDesc'),
}))

const formFields = computed(() => [
  { label: t('form.identity.label'), placeholder: t('form.identity.placeholder') },
  { label: t('form.password.label'), placeholder: t('form.password.placeholder') },
])

const accessCards = computed(() => [
  { kicker: '01', title: t('access.account.title'), desc: t('access.account.desc') },
  { kicker: '02', title: t('access.favorites.title'), desc: t('access.favorites.desc') },
  { kicker: '03', title: t('access.events.title'), desc: t('access.events.desc') },
])

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  auth.loginMock()
  uni.redirectTo({
    url: SELF_ROUTE,
  })
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
