<template>
  <view class="min-h-screen bg-[#f5f0e8] text-[#1d1d1f]">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-[linear-gradient(135deg,#0d2238_0%,#183354_52%,#102842_100%)] text-white">
      <view class="absolute inset-x-0 top-0 h-[240px] bg-[radial-gradient(circle_at_top_left,rgba(215,184,110,0.18),transparent_54%)]" />
      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <view class="max-w-[680px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <view class="h-[1px] w-12 bg-[#d7b86e]" />
              <text class="text-[12px] uppercase tracking-[6px] text-[#efe1be]">{{ labels.eyebrow }}</text>
            </view>

            <view class="text-[52px] font-semibold leading-[1.02] text-[#fffaf3] lg:text-[86px]">
              {{ labels.title }}
            </view>

            <view class="mt-8 max-w-[620px] text-[19px] leading-8 text-[#e7dbc8]">
              {{ labels.subtitle }}
            </view>
          </view>

          <view class="border border-white/10 bg-white/5 px-8 py-8 backdrop-blur">
            <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.selectedPlan }}</view>
            <view class="mt-4 text-[34px] font-semibold text-white">{{ activePlanLabel }}</view>
            <view class="mt-6 text-[15px] leading-8 text-white/72">
              {{ labels.planNote }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-24">
      <view class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <view class="border border-[#e2d7c9] bg-white px-8 py-10">
          <view class="text-[12px] uppercase tracking-[4px] text-[#cf9aa0]">{{ labels.formTitle }}</view>

          <view class="mt-8 grid gap-5">
            <view v-for="field in formFields" :key="field.label">
              <view class="text-[14px] text-[#7a6757]">{{ field.label }}</view>
              <view class="mt-2 border border-[#eadfd2] bg-[#faf7f1] px-5 py-4 text-[16px] text-[#a18c77]">
                {{ field.placeholder }}
              </view>
            </view>
          </view>

          <button class="mt-10 w-full bg-[#d71934] px-6 py-4 text-[16px] font-medium text-white" @click="handleSubmit">
            {{ labels.submit }}
          </button>
        </view>

        <view class="grid gap-6">
          <view class="border border-[#1f3047] bg-[#203854] px-8 py-10 text-white">
            <view class="text-[12px] uppercase tracking-[4px] text-[#d7b86e]">{{ labels.processTitle }}</view>
            <view class="mt-8 grid gap-5">
              <view
                  v-for="step in processSteps"
                  :key="step.index"
                  class="grid gap-3 border border-white/10 bg-white/5 px-5 py-5 md:grid-cols-[80px_1fr]"
              >
                <view class="text-[14px] uppercase tracking-[4px] text-[#d7b86e]">{{ step.index }}</view>
                <view>
                  <view class="text-[22px] font-medium text-[#fffaf2]">{{ step.title }}</view>
                  <view class="mt-2 text-[14px] leading-7 text-[#d8cfbf]">{{ step.desc }}</view>
                </view>
              </view>
            </view>
          </view>

          <view class="grid gap-6 md:grid-cols-2">
            <view
                v-for="item in policyCards"
                :key="item.title"
                class="border border-[#e2d7c9] bg-[#faf7f1] px-8 py-8"
            >
              <view class="text-[24px]">{{ item.icon }}</view>
              <view class="mt-5 text-[26px] font-semibold text-[#1f1f1f]">{{ item.title }}</view>
              <view class="mt-4 text-[15px] leading-8 text-[#6b5c4d]">{{ item.desc }}</view>
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
import { usePageI18n } from '@/i18n/use-page-i18n'
import { openAccountPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const navList = NAV_LIST
const { t } = usePageI18n('register')
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

const activePlanLabel = computed(() => {
  const supportedPlans = ['free', 'silver', 'gold', 'diamond', 'vip', 'contact', 'event']
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

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  openAccountPage()
}

function handleRegisterClick() {
  openAccountPage()
}
</script>

