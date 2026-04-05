<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-about-hero text-text-inverse">
      <view class="pointer-events-none absolute left-[-56px] top-[-40px] h-[220px] w-[220px] rounded-full bg-brand-highlight/10 blur-[82px]" />
      <view class="pointer-events-none absolute right-[-120px] top-12 h-[280px] w-[280px] rounded-full border border-border-inverse/18" />

      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[620px] lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <view class="max-w-[700px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/35 bg-surface-inverse-panel/28 px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-brand-highlight" />
              <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="max-w-[620px] text-[52px] font-semibold leading-[1.02] text-text-inverse lg:text-[88px]">
              {{ labels.title }}
            </view>

            <view class="mt-10 max-w-[640px] text-[19px] leading-8 text-text-inverse-soft lg:text-[20px]">
              {{ labels.subtitle }}
            </view>

            <view class="mt-12 grid gap-4 sm:grid-cols-3">
              <view
                v-for="(item, index) in accessCards"
                :key="item.title"
                class="border border-border-inverse/30 bg-surface-inverse-panel/28 px-5 py-5 backdrop-blur"
              >
                <view class="text-[12px] uppercase tracking-[4px] text-brand-highlight-soft">
                  {{ formatIndex(index) }}
                </view>
                <view class="mt-4 text-[20px] font-medium text-text-inverse">
                  {{ item.title }}
                </view>
                <view class="mt-3 text-[14px] leading-7 text-text-inverse-muted">
                  {{ item.desc }}
                </view>
              </view>
            </view>
          </view>

          <view class="relative lg:ml-auto lg:w-full lg:max-w-[500px]">
            <view class="pointer-events-none absolute inset-0 translate-x-5 translate-y-5 border border-border-inverse/16 bg-surface-inverse-panel/16" />

            <view class="relative border border-border-inverse/34 bg-surface-inverse-panel/78 px-8 py-8 shadow-hero backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-highlight">
                {{ labels.formTitle }}
              </view>

              <view class="mt-5 text-[30px] leading-[1.45] text-text-inverse">
                {{ accessCards[0].title }}
              </view>

              <view class="mt-3 text-[15px] leading-7 text-text-inverse-muted">
                {{ accessCards[0].desc }}
              </view>

              <view class="mt-8 grid gap-5">
                <view
                  v-for="field in formFields"
                  :key="field.label"
                  class="border border-border-inverse/20 bg-surface-inverse-card/55 px-5 py-4"
                >
                  <view class="text-[12px] uppercase tracking-[3px] text-brand-highlight-soft">
                    {{ field.label }}
                  </view>
                  <view class="mt-3 text-[16px] text-text-inverse-soft">
                    {{ field.placeholder }}
                  </view>
                </view>
              </view>

              <view class="mt-8 grid gap-4">
                <button
                  class="[margin-left:0] [margin-right:0] inline-flex w-full items-center justify-center rounded-button border border-button-highlight bg-button-highlight px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-button-neutral-ink transition-all duration-300 hover:-translate-y-[1px] hover:border-button-highlight-hover hover:bg-button-highlight-hover hover:shadow-card"
                  @click="handleSubmit"
                >
                  {{ labels.submit }}
                </button>

                <button
                  class="[margin-left:0] [margin-right:0] inline-flex w-full items-center justify-center rounded-button border border-border-inverse/36 bg-transparent px-btn-cta-x py-btn-cta-y text-[15px] font-medium text-text-inverse-soft transition-all duration-300 hover:-translate-y-[1px] hover:border-brand-highlight/55 hover:bg-brand-highlight/10 hover:text-text-inverse"
                  @click="handleRegisterClick"
                >
                  {{ labels.secondary }}
                </button>
              </view>

              <view class="mt-8 border-t border-border-inverse/16 pt-6 text-[14px] leading-7 text-text-inverse-muted">
                {{ labels.accessTitle }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="bg-page-soft">
      <view class="mx-auto max-w-[1280px] px-8 py-20">
        <view class="mb-8 inline-flex items-center gap-4">
          <view class="h-[1px] w-12 bg-border-highlight-soft" />
          <text class="text-[12px] uppercase tracking-[6px] text-brand-brown">
            {{ labels.accessTitle }}
          </text>
        </view>

        <view class="grid gap-6 lg:grid-cols-3">
          <view
            v-for="item in accessCards"
            :key="item.title"
            class="border border-border-base bg-surface-card px-7 py-7 shadow-card transition-all duration-300 hover:-translate-y-[2px] hover:border-border-highlight/50"
          >
            <view class="text-[12px] uppercase tracking-[4px] text-brand-rose-deep">
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
import { usePageI18n } from '@/i18n/use-page-i18n'
import { useAuthStore } from '@/stores/modules/auth'
import { openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const auth = useAuthStore()
const navList = NAV_LIST
const { t } = usePageI18n('login')

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  formTitle: t('hero.formTitle'),
  submit: t('hero.submit'),
  secondary: t('hero.secondary'),
  accessTitle: t('hero.accessTitle'),
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

function formatIndex(index: number) {
  return `${index + 1}`.padStart(2, '0')
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  auth.loginMock()
  uni.redirectTo({
    url: '/pages/discovery/self/index',
  })
}

function handleRegisterClick() {
  openRegisterPage('free')
}
</script>
