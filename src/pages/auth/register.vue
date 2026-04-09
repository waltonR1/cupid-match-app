<template>
  <view class="min-h-screen bg-next-semantic-page-default text-next-semantic-text-primary">
    <AppHeader
      :nav-list="navList"
      active-nav=""
      @nav-click="handleNavClick"
      @register-click="handleRegisterClick"
    />

    <view class="relative overflow-hidden bg-next-gradient-auth-hero text-next-semantic-text-inverse">
      <view class="pointer-events-none absolute -right-16 top-10 h-[280px] w-[280px] rounded-full border border-next-component-hero-ornament-line" />
      <view class="pointer-events-none absolute right-20 top-28 h-[200px] w-[200px] rounded-full border border-next-component-hero-ornament-line" />

      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-12 lg:min-h-[680px] lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <view class="max-w-[740px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-next-component-section-line" />
              <text class="text-[12px] uppercase tracking-[6px] text-next-component-hero-eyebrow">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="max-w-[700px] text-[52px] font-semibold leading-[1.04] text-next-semantic-text-inverse lg:text-[84px]">
              {{ labels.title }}
            </view>

            <view class="mt-8 max-w-[680px] text-[18px] leading-8 text-next-component-hero-description lg:text-[20px]">
              {{ labels.subtitle }}
            </view>

            <view class="mt-12 grid gap-4 sm:grid-cols-2">
              <view
                v-for="option in roleOptions"
                :key="option.value"
                class="cursor-pointer border px-6 py-6 backdrop-blur transition-all duration-300 hover:-translate-y-[2px]"
                :class="option.value === role
                  ? 'border-next-semantic-accent-secondary bg-next-component-hero-overlay-background-panel shadow-next-panel'
                  : 'border-next-component-hero-border bg-next-component-auth-overlay-background-soft hover:border-next-semantic-accent-secondary'"
                @click="selectRole(option.value)"
              >
                <view class="flex items-start justify-between gap-4">
                  <view>
                    <view
                      class="text-[12px] uppercase tracking-[4px]"
                      :class="option.value === role ? 'text-next-component-hero-label' : 'text-next-component-hero-secondary-description'"
                    >
                      {{ option.badge }}
                    </view>
                    <view class="mt-4 text-[24px] font-semibold text-next-semantic-text-inverse">
                      {{ option.title }}
                    </view>
                  </view>

                  <view
                    class="mt-1 h-3.5 w-3.5 rounded-full border"
                    :class="option.value === role
                      ? 'border-next-semantic-accent-secondary bg-next-semantic-accent-secondary shadow-next-panel'
                      : 'border-next-component-hero-border bg-transparent'"
                  />
                </view>

                <view class="mt-4 text-[15px] leading-7" :class="option.value === role ? 'text-next-component-hero-description' : 'text-next-component-hero-secondary-description'">
                  {{ option.desc }}
                </view>
              </view>
            </view>

            <view class="mt-6 border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-6 py-6 backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-next-component-hero-label">
                {{ labels.selectedRole }}
              </view>
              <view class="mt-4 text-[28px] font-semibold text-next-semantic-text-inverse">
                {{ activeRoleLabel }}
              </view>
              <view class="mt-3 text-[16px] leading-8 text-next-component-hero-description">
                {{ activeRoleNote }}
              </view>
            </view>
          </view>

          <view class="relative lg:ml-auto lg:w-full lg:max-w-[520px]">
            <view class="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border border-next-component-hero-border bg-next-component-auth-overlay-background-soft" />

            <view class="relative border border-next-component-hero-border bg-next-component-hero-overlay-background-panel px-8 py-8 text-next-semantic-text-inverse shadow-next-shadow-hero backdrop-blur">
              <view>
                <view class="text-[12px] uppercase tracking-[4px] text-next-component-hero-label">
                  {{ labels.formTitle }}
                </view>
                <view class="mt-4 text-[30px] leading-[1.3] text-next-semantic-text-inverse">
                  {{ labels.panelTitle }}
                </view>
              </view>

              <view class="mt-4 text-[15px] leading-7 text-next-component-hero-description">
                {{ labels.panelHint }}
              </view>

              <view class="mt-8 grid gap-5">
                <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                  <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                    {{ formLabels.name }}
                  </view>
                  <input
                    v-model="name"
                    class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                    :placeholder="formPlaceholders.name"
                    placeholder-class="text-next-component-hero-secondary-description"
                  >
                </view>

                <view class="grid gap-5 md:grid-cols-2">
                  <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                    <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                      {{ formLabels.email }}
                    </view>
                    <input
                      v-model="email"
                      class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                      :placeholder="formPlaceholders.email"
                      placeholder-class="text-next-component-hero-secondary-description"
                    >
                  </view>

                  <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                    <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                      {{ formLabels.city }}
                    </view>
                    <input
                      v-model="city"
                      class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                      :placeholder="formPlaceholders.city"
                      placeholder-class="text-next-component-hero-secondary-description"
                    >
                  </view>

                </view>

                <view class="grid gap-5 md:grid-cols-2">
                  <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                    <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                      {{ formLabels.password }}
                    </view>
                    <input
                      v-model="password"
                      password
                      class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                      :placeholder="formPlaceholders.password"
                      placeholder-class="text-next-component-hero-secondary-description"
                    >
                  </view>

                  <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                    <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                      {{ formLabels.confirmPassword }}
                    </view>
                    <input
                      v-model="confirmPassword"
                      password
                      class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                      :placeholder="formPlaceholders.confirmPassword"
                      placeholder-class="text-next-component-hero-secondary-description"
                    >
                  </view>
                </view>
              </view>

              <label class="mt-6 flex items-start gap-3 border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                <checkbox :checked="agreed" @click="toggleAgreement" />
                <view class="text-[14px] leading-7 text-next-component-hero-description">
                  <text>{{ agreement.prefix }}</text>
                  <text class="text-next-semantic-accent-secondary underline" @click.stop="openAgreementDialog('terms')">
                    {{ agreement.terms }}
                  </text>
                  <text>{{ agreement.connector }}</text>
                  <text class="text-next-semantic-accent-secondary underline" @click.stop="openAgreementDialog('privacy')">
                    {{ agreement.privacy }}
                  </text>
                  <text>{{ agreement.suffix }}</text>
                </view>
              </label>

              <view class="mt-8 grid gap-4">
                <AppButton
                  width="cta"
                  size="lg"
                  class="[margin-left:0] [margin-right:0]"
                  @click="handleSubmit"
                >
                  {{ labels.submit }}
                </AppButton>

                <AppButton
                  variant="secondary"
                  context="hero"
                  width="cta"
                  size="lg"
                  class="[margin-left:0] [margin-right:0]"
                  @click="handleLoginClick"
                >
                  {{ loginText }}
                </AppButton>
              </view>

              <view class="mt-6 text-[14px] leading-7 text-next-component-hero-secondary-description">
                {{ labels.formFootnote }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="bg-next-semantic-page-subtle">
      <view class="mx-auto max-w-[1280px] px-8 py-20">
        <view class="mb-10 inline-flex items-center gap-4">
          <view class="h-[1px] w-12 bg-next-component-section-line" />
          <text class="text-[12px] uppercase tracking-[6px] text-next-component-section-eyebrow">
            {{ labels.processTitle }}
          </text>
        </view>

        <view class="grid gap-6 lg:grid-cols-3">
          <view
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="border border-next-semantic-border-default bg-next-semantic-surface-panel px-7 py-7 shadow-next-panel"
          >
            <view class="text-[12px] uppercase tracking-[4px] text-next-component-card-label">
              {{ String(index + 1).padStart(2, '0') }}
            </view>
            <view class="mt-4 text-[24px] font-semibold leading-[1.35] text-next-semantic-text-primary">
              {{ step.title }}
            </view>
            <view class="mt-4 text-[15px] leading-8 text-next-semantic-text-secondary">
              {{ step.desc }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <AgreementDialog
      :open="Boolean(agreementDialog)"
      :kind="agreementDialog || 'terms'"
      @close="closeAgreementDialog"
    />

    <AppFooter
      :nav-list="navList"
      @nav-click="handleNavClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AgreementDialog from '@/components/common/AgreementDialog.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { NAV_LIST } from '@/constants/nav'
import { useAppI18n } from '@/i18n/composables/use-app-i18n'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openLoginPage } from '@/utils/demo-navigation'
import { navigateByNavKey } from '@/utils/navigation'

type RegisterRole = 'self' | 'parent'
type AgreementDialogType = 'terms' | 'privacy' | null

const navList = NAV_LIST
const { t } = usePageI18n('register')
const { t: tApp } = useAppI18n()
const role = ref<RegisterRole>('self')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')
const city = ref('')
const agreed = ref(false)
const agreementDialog = ref<AgreementDialogType>(null)

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  selectedRole: t('hero.selectedRole'),
  formTitle: t('hero.formTitle'),
  panelTitle: t('hero.panelTitle'),
  panelHint: t('hero.panelHint'),
  submit: t('hero.submit'),
  processTitle: t('hero.processTitle'),
  formFootnote: t('hero.formFootnote'),
}))

const loginText = computed(() => tApp('common.nav.login'))
const agreement = computed(() => ({
  prefix: t('hero.agreementPrefix'),
  terms: t('hero.agreementTerms'),
  connector: t('hero.agreementConnector'),
  privacy: t('hero.agreementPrivacy'),
  suffix: t('hero.agreementSuffix'),
}))

const roleOptions = computed(() => [
  {
    value: 'self' as const,
    badge: t('roles.self.badge'),
    title: t('roles.self.title'),
    desc: t('roles.self.desc'),
    note: t('roles.self.note'),
  },
  {
    value: 'parent' as const,
    badge: t('roles.parent.badge'),
    title: t('roles.parent.title'),
    desc: t('roles.parent.desc'),
    note: t('roles.parent.note'),
  },
])

const activeRoleLabel = computed(() => t(`roles.${role.value}.title`))
const activeRoleNote = computed(() => t(`roles.${role.value}.note`))

const formLabels = computed(() => ({
  email: t('form.email.label'),
  password: t('form.password.label'),
  confirmPassword: t('form.confirmPassword.label'),
  name: t('form.name.label'),
  city: t('form.city.label'),
}))

const formPlaceholders = computed(() => ({
  email: t('form.email.placeholder'),
  password: t('form.password.placeholder'),
  confirmPassword: t('form.confirmPassword.placeholder'),
  name: t('form.name.placeholder'),
  city: t('form.city.placeholder'),
}))

const processSteps = computed(() => [
  {
    title: t('process.step1.title'),
    desc: t(`process.step1.desc.${role.value}`),
  },
  {
    title: t('process.step2.title'),
    desc: t(`process.step2.desc.${role.value}`),
  },
  {
    title: t('process.step3.title'),
    desc: t(`process.step3.desc.${role.value}`),
  },
])

function selectRole(nextRole: RegisterRole) {
  role.value = nextRole
}

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  uni.showToast({
    title: labels.value.submit,
    icon: 'none',
  })
}

function handleLoginClick() {
  openLoginPage()
}

function toggleAgreement() {
  agreed.value = !agreed.value
}

function openAgreementDialog(kind: Exclude<AgreementDialogType, null>) {
  agreementDialog.value = kind
}

function closeAgreementDialog() {
  agreementDialog.value = null
}

function handleRegisterClick() {
  handleSubmit()
}

onLoad((query?: Record<string, string | undefined>) => {
  if (query?.plan === 'parent') {
    role.value = 'parent'
  }
})
</script>
