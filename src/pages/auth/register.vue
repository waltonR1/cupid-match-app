<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-membership-hero text-text-inverse">
      <view class="pointer-events-none absolute right-[-140px] top-14 h-[320px] w-[320px] rounded-full border border-border-inverse/28" />

      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[640px] lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
          <view class="max-w-[660px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/34 px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-brand-highlight" />
              <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-text-inverse lg:text-[84px]">
              {{ labels.title }}
            </view>

            <view class="mt-10 max-w-[620px] text-[19px] leading-8 text-text-inverse-soft lg:text-[20px]">
              {{ labels.subtitle }}
            </view>

            <view class="mt-12 border border-border-inverse/24 bg-surface-inverse-panel/24 px-6 py-6 backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-highlight">
                {{ labels.selectedPlan }}
              </view>
              <view class="mt-4 text-[34px] font-semibold text-text-inverse">
                {{ activePlanLabel }}
              </view>
              <view class="mt-3 text-[15px] leading-8 text-text-inverse-muted">
                {{ labels.planNote }}
              </view>
            </view>
          </view>

          <view class="grid gap-4 lg:ml-auto lg:max-w-[560px]">
            <view class="grid gap-4 sm:grid-cols-2">
              <view
                v-for="plan in planOptions"
                :key="plan.key"
                class="border px-5 py-5 transition-all duration-300"
                :class="plan.className"
              >
                <view class="text-[12px] uppercase tracking-[4px]" :class="plan.kickerClassName">
                  {{ plan.kicker }}
                </view>
                <view class="mt-4 text-[22px] font-medium">
                  {{ plan.label }}
                </view>
              </view>
            </view>

            <view class="grid gap-4 sm:grid-cols-2">
              <view
                v-for="item in policyCards"
                :key="item.title"
                class="border border-border-inverse/20 bg-surface-inverse-panel/26 px-6 py-6 backdrop-blur"
              >
                <view class="text-[12px] uppercase tracking-[4px] text-brand-highlight-soft">
                  {{ item.icon }}
                </view>
                <view class="mt-4 text-[24px] font-medium text-text-inverse">
                  {{ item.title }}
                </view>
                <view class="mt-3 text-[15px] leading-7 text-text-inverse-muted">
                  {{ item.desc }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-20">
      <view class="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <view class="border border-border-base bg-surface-elevated px-8 py-8 shadow-card">
          <view class="flex items-center justify-between gap-4">
            <view class="text-[12px] uppercase tracking-[4px] text-brand-rose-deep">
              {{ labels.formTitle }}
            </view>
            <view class="rounded-full border border-border-highlight/45 bg-brand-highlight/10 px-3 py-1 text-[11px] uppercase tracking-[3px] text-brand-brown">
              {{ activePlanLabel }}
            </view>
          </view>

          <view class="mt-8 grid gap-5">
            <view
              v-for="field in formFields"
              :key="field.label"
              class="border border-border-soft bg-surface-card px-5 py-4"
            >
              <view class="text-[12px] uppercase tracking-[3px] text-text-subtle">
                {{ field.label }}
              </view>
              <view class="mt-3 text-[16px] text-text-body">
                {{ field.placeholder }}
              </view>
            </view>
          </view>

          <view class="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              class="[margin-left:0] [margin-right:0] inline-flex min-w-btn-cta items-center justify-center rounded-button border border-button-primary bg-button-primary px-btn-cta-x py-btn-cta-y text-[16px] font-medium text-button-neutral-contrast transition-all duration-300 hover:-translate-y-[1px] hover:border-button-primary-hover hover:bg-button-primary-hover hover:shadow-emphasis"
              @click="handleSubmit"
            >
              {{ labels.submit }}
            </button>

            <button
              class="[margin-left:0] [margin-right:0] inline-flex min-w-btn-cta items-center justify-center rounded-button border border-border-base bg-surface-card px-btn-cta-x py-btn-cta-y text-[15px] font-medium text-text-body transition-all duration-300 hover:-translate-y-[1px] hover:border-border-highlight/50 hover:text-text-heading"
              @click="handleLoginClick"
            >
              {{ loginText }}
            </button>
          </view>
        </view>

        <view class="grid gap-6">
          <view class="border border-border-base bg-surface-card px-8 py-8 shadow-card">
            <view class="text-[12px] uppercase tracking-[4px] text-brand-rose-deep">
              {{ labels.processTitle }}
            </view>

            <view class="mt-8 grid gap-4">
              <view
                v-for="step in processSteps"
                :key="step.index"
                class="grid gap-3 border border-border-soft bg-surface-card-soft px-5 py-5 md:grid-cols-[72px_1fr]"
              >
                <view class="text-[13px] uppercase tracking-[4px] text-brand-brown">
                  {{ step.index }}
                </view>
                <view>
                  <view class="text-[22px] font-medium text-text-heading">
                    {{ step.title }}
                  </view>
                  <view class="mt-3 text-[15px] leading-8 text-text-body">
                    {{ step.desc }}
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="border border-border-base bg-surface-panel px-8 py-8 shadow-panel">
            <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
              {{ labels.selectedPlan }}
            </view>
            <view class="mt-4 text-[30px] font-semibold text-text-heading">
              {{ activePlanLabel }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-text-body-soft">
              {{ labels.planNote }}
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
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { NAV_LIST } from '@/constants/nav'
import { useAppI18n } from '@/i18n/use-app-i18n'
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openLoginPage, openRegisterPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t } = usePageI18n('register')
const { t: appT } = useAppI18n()
const selectedPlan = ref('free')

onLoad((query) => {
  if (query && typeof query.plan === 'string' && query.plan) {
    selectedPlan.value = query.plan
  }
})

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  selectedPlan: t('hero.selectedPlan'),
  planNote: t('hero.planNote'),
  formTitle: t('hero.formTitle'),
  submit: t('hero.submit'),
  processTitle: t('hero.processTitle'),
}))

const loginText = computed(() => appT('common.nav.login'))

const supportedPlans = ['free', 'silver', 'gold', 'diamond', 'vip', 'contact', 'event']

const activePlanLabel = computed(() => {
  return supportedPlans.includes(selectedPlan.value) ? t(`plans.${selectedPlan.value}`) : selectedPlan.value
})

const formFields = computed(() => [
  { label: t('form.name.label'), placeholder: t('form.name.placeholder') },
  { label: t('form.city.label'), placeholder: t('form.city.placeholder') },
  { label: t('form.contact.label'), placeholder: t('form.contact.placeholder') },
  { label: t('form.intent.label'), placeholder: t('form.intent.placeholder') },
])

const processSteps = computed(() => [
  { index: '01', title: t('process.step1.title'), desc: t('process.step1.desc') },
  { index: '02', title: t('process.step2.title'), desc: t('process.step2.desc') },
  { index: '03', title: t('process.step3.title'), desc: t('process.step3.desc') },
])

const policyCards = computed(() => [
  { icon: 'PR', title: t('policy.privacy.title'), desc: t('policy.privacy.desc') },
  { icon: 'UP', title: t('policy.upgrade.title'), desc: t('policy.upgrade.desc') },
])

const planOptions = computed(() => {
  return supportedPlans.map((planKey, index) => ({
    key: planKey,
    label: t(`plans.${planKey}`),
    kicker: `${index + 1}`.toString().padStart(2, '0'),
    className: getPlanCardClassName(planKey, planKey === selectedPlan.value),
    kickerClassName: getPlanKickerClassName(planKey, planKey === selectedPlan.value),
  }))
})

function getPlanCardClassName(planKey: string, isActive: boolean) {
  if (planKey === 'diamond') {
    return isActive
      ? 'border-border-membership-diamond bg-surface-membership-diamond text-text-inverse shadow-luxe'
      : 'border-border-inverse/24 bg-surface-inverse-panel/22 text-text-inverse-soft'
  }

  if (planKey === 'gold' || planKey === 'vip') {
    return isActive
      ? 'border-border-membership-gold bg-surface-membership-gold text-text-heading shadow-card'
      : 'border-border-inverse/24 bg-surface-inverse-panel/22 text-text-inverse-soft'
  }

  if (planKey === 'silver') {
    return isActive
      ? 'border-border-membership-silver bg-surface-membership-silver text-text-heading shadow-card'
      : 'border-border-inverse/24 bg-surface-inverse-panel/22 text-text-inverse-soft'
  }

  return isActive
    ? 'border-brand-highlight bg-brand-highlight/14 text-text-inverse shadow-card'
    : 'border-border-inverse/24 bg-surface-inverse-panel/22 text-text-inverse-soft'
}

function getPlanKickerClassName(planKey: string, isActive: boolean) {
  if (planKey === 'diamond') {
    return isActive ? 'text-brand-highlight-soft' : 'text-text-inverse-muted'
  }

  if (planKey === 'gold' || planKey === 'vip' || planKey === 'silver') {
    return isActive ? 'text-brand-brown' : 'text-text-inverse-muted'
  }

  return isActive ? 'text-brand-highlight' : 'text-text-inverse-muted'
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  uni.redirectTo({
    url: '/pages/discovery/self/index',
  })
}

function handleLoginClick() {
  openLoginPage()
}

function handleRegisterClick() {
  const pageStack = getCurrentPages()
  const currentRoute = pageStack.length ? pageStack[pageStack.length - 1].route : ''

  if (currentRoute === 'pages/auth/register') {
    return
  }

  openRegisterPage(selectedPlan.value)
}
</script>
