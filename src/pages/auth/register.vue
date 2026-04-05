<template>
  <view class="min-h-screen bg-page-base text-text-heading">
    <AppHeader
        :nav-list="navList"
        active-nav=""
        @nav-click="handleNavClick"
        @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-membership-hero text-text-inverse">
      <view class="pointer-events-none absolute right-[-140px] top-14 h-[320px] w-[320px] rounded-full border border-border-inverse/24" />
      <view class="pointer-events-none absolute left-[-72px] top-[-44px] h-[240px] w-[240px] rounded-full bg-brand-highlight/10 blur-[86px]" />

      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[620px] lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <view class="max-w-[640px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-border-inverse/34 bg-surface-inverse-panel/24 px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-brand-highlight" />
              <text class="text-[12px] uppercase tracking-[6px] text-brand-highlight-soft">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="text-[50px] font-semibold leading-[1.04] text-text-inverse lg:text-[84px]">
              {{ labels.title }}
            </view>

            <view class="mt-8 max-w-[620px] text-[18px] leading-8 text-text-inverse-soft lg:text-[20px]">
              {{ labels.subtitle }}
            </view>
          </view>

          <view class="grid gap-6 lg:ml-auto lg:max-w-[560px]">
            <view class="grid gap-4 sm:grid-cols-2">
              <view
                  v-for="role in roleOptions"
                  :key="role.key"
                  class="cursor-pointer border px-6 py-6 transition-all duration-300"
                  :class="role.className"
                  @click="selectRole(role.key)"
              >
                <view class="flex items-start justify-between gap-4">
                  <view class="text-[12px] uppercase tracking-[4px]" :class="role.kickerClassName">
                    {{ role.kicker }}
                  </view>
                  <view class="mt-[2px] h-3.5 w-3.5 rounded-full border" :class="role.dotClassName" />
                </view>

                <view class="mt-4 text-[24px] font-medium text-text-inverse">
                  {{ role.title }}
                </view>

                <view class="mt-3 text-[14px] leading-7" :class="role.descClassName">
                  {{ role.desc }}
                </view>
              </view>
            </view>

            <view class="border border-border-inverse/30 bg-surface-inverse-panel/18 px-6 py-6 backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-brand-highlight">
                {{ labels.selectedRole }}
              </view>
              <view class="mt-4 text-[34px] font-semibold text-text-inverse">
                {{ activeRoleLabel }}
              </view>
              <view class="mt-3 text-[15px] leading-8 text-text-inverse-soft">
                {{ activeRoleNote }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-auto max-w-[1280px] px-8 py-20">
      <view class="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <view class="border border-border-base bg-surface-elevated px-8 py-8 shadow-card">
          <view class="flex flex-wrap items-center justify-between gap-4">
            <view>
              <view class="text-[12px] uppercase tracking-[4px] text-brand-rose-deep">
                {{ labels.formTitle }}
              </view>
              <view class="mt-4 text-[30px] font-semibold text-text-heading">
                {{ activeRoleLabel }}
              </view>
            </view>
            <view class="rounded-full border border-border-highlight/45 bg-brand-highlight/10 px-3 py-1 text-[11px] uppercase tracking-[3px] text-brand-brown">
              {{ activeRoleShort }}
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

          <view class="mt-8 border border-border-soft bg-surface-card-soft px-5 py-5">
            <view class="text-[12px] uppercase tracking-[4px] text-brand-brown">
              {{ labels.roleBenefitTitle }}
            </view>
            <view class="mt-4 text-[22px] font-medium text-text-heading">
              {{ activeRoleBenefit.title }}
            </view>
            <view class="mt-3 text-[15px] leading-8 text-text-body">
              {{ activeRoleBenefit.desc }}
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
import { openLoginPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

const SELF_ROUTE = '/pages/discovery/self/index'
const PARENT_ROUTE = '/pages/discovery/family/index'

const navList = NAV_LIST
const { t } = usePageI18n('register')
const { t: appT } = useAppI18n()
const selectedRole = ref<'self' | 'parent'>('self')

onLoad((query) => {
  if (query && typeof query.role === 'string' && (query.role === 'self' || query.role === 'parent')) {
    selectedRole.value = query.role
  }
})

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  selectedRole: t('hero.selectedRole'),
  formTitle: t('hero.formTitle'),
  submit: t('hero.submit'),
  processTitle: t('hero.processTitle'),
  roleBenefitTitle: t('hero.roleBenefitTitle'),
}))

const loginText = computed(() => appT('common.nav.login'))
const activeRoleLabel = computed(() => t(`roles.${selectedRole.value}.title`))
const activeRoleShort = computed(() => t(`roles.${selectedRole.value}.badge`))
const activeRoleNote = computed(() => t(`roles.${selectedRole.value}.note`))

const formFields = computed(() => [
  { label: t('form.name.label'), placeholder: t('form.name.placeholder') },
  { label: t('form.city.label'), placeholder: t('form.city.placeholder') },
  { label: t('form.contact.label'), placeholder: t('form.contact.placeholder') },
  { label: t('form.intent.label'), placeholder: t(`form.intent.placeholder.${selectedRole.value}`) },
])

const processSteps = computed(() => [
  { index: '01', title: t('process.step1.title'), desc: t(`process.step1.desc.${selectedRole.value}`) },
  { index: '02', title: t('process.step2.title'), desc: t(`process.step2.desc.${selectedRole.value}`) },
  { index: '03', title: t('process.step3.title'), desc: t(`process.step3.desc.${selectedRole.value}`) },
])

const activeRoleBenefit = computed(() => ({
  title: t(`roleBenefits.${selectedRole.value}.title`),
  desc: t(`roleBenefits.${selectedRole.value}.desc`),
}))

const roleOptions = computed(() => {
  return ['self', 'parent'].map((roleKey, index) => {
    const isActive = roleKey === selectedRole.value

    return {
      key: roleKey as 'self' | 'parent',
      kicker: index === 0 ? 'ME' : 'FA',
      title: t(`roles.${roleKey}.title`),
      desc: t(`roles.${roleKey}.desc`),
      className: isActive
          ? 'border-brand-highlight bg-brand-highlight/10 shadow-card'
          : 'border-border-inverse/30 bg-surface-inverse-panel/16 hover:border-border-highlight/40 hover:bg-surface-inverse-card/24',
      kickerClassName: isActive ? 'text-brand-highlight' : 'text-text-inverse-muted',
      descClassName: isActive ? 'text-text-inverse-soft' : 'text-text-inverse-muted',
      dotClassName: isActive ? 'border-brand-highlight bg-brand-highlight shadow-card' : 'border-border-inverse/50 bg-transparent',
    }
  })
})

function selectRole(role: 'self' | 'parent') {
  selectedRole.value = role
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  uni.redirectTo({
    url: selectedRole.value === 'parent' ? PARENT_ROUTE : SELF_ROUTE,
  })
}

function handleLoginClick() {
  openLoginPage()
}

function handleRegisterClick() {
  return
}
</script>