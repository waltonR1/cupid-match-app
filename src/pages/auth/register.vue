<template>
  <AppPageLayout>
    <view class="relative overflow-hidden bg-gradient-auth-hero text-semantic-text-inverse">
      <view class="pointer-events-none absolute -right-16 top-10 h-[280px] w-[280px] rounded-full border border-semantic-border-hero-ornament" />
      <view class="pointer-events-none absolute right-20 top-28 h-[200px] w-[200px] rounded-full border border-semantic-border-hero-ornament" />

      <view class="mx-auto max-w-[1280px] px-8 pb-20 pt-10 lg:pb-24 lg:pt-12">
        <view class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <view class="max-w-[500px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-semantic-border-hero bg-component-auth-overlay-background-soft px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-semantic-border-eyebrow" />
              <text class="text-[12px] uppercase tracking-[6px] text-semantic-text-hero-eyebrow">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="text-[44px] font-semibold leading-[1.06] text-semantic-text-inverse lg:text-[64px]">
              {{ labels.title }}
            </view>

            <view class="mt-6 max-w-[580px] text-[17px] leading-8 text-semantic-text-hero-body">
              {{ labels.subtitle }}
            </view>

            <view class="mt-10 grid gap-3 sm:grid-cols-2">
              <view
                v-for="option in pathOptions"
                :key="option.value"
                class="cursor-pointer border px-5 py-4 backdrop-blur transition-all duration-300"
                :class="option.value === path
                  ? 'border-component-auth-selection-border bg-component-auth-selection-background'
                  : 'border-semantic-border-hero bg-component-auth-overlay-background-soft hover:border-component-auth-selection-hover-border'"
                @click="selectPath(option.value)"
              >
                <view class="text-[12px] uppercase tracking-[4px]" :class="option.value === path ? 'text-semantic-text-hero-label' : 'text-semantic-text-hero-secondary'">
                  {{ option.badge }}
                </view>
                <view class="mt-2 text-[18px] font-semibold text-semantic-text-inverse">
                  {{ option.title }}
                </view>
                <view class="mt-2 text-[14px] leading-6 text-semantic-text-hero-secondary">
                  {{ option.desc }}
                </view>
              </view>
            </view>
          </view>

          <view class="relative lg:max-w-[520px]">
            <view class="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border border-semantic-border-hero bg-component-auth-overlay-background-soft" />

            <view class="relative border border-semantic-border-hero bg-semantic-surface-hero-panel px-7 py-7 text-semantic-text-inverse shadow-hero backdrop-blur">
              <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label">
                {{ labels.formTitle }}
              </view>
              <view class="mt-2 text-[26px] leading-[1.3] text-semantic-text-inverse">
                {{ labels.panelTitle }}
              </view>

              <view class="mt-2 text-[14px] leading-6 text-semantic-text-hero-body">
                {{ labels.panelHint }}
              </view>

              <view class="mt-5 grid gap-3">
                <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                  <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                    {{ formLabels.accountName }}
                  </view>
                  <input
                    v-model="accountName"
                    autocomplete="name"
                    class="mt-1 h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                    :placeholder="formPlaceholders.accountName"
                    placeholder-class="text-semantic-text-hero-secondary"
                  >
                </view>

                <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                  <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                    {{ formLabels.identifier }}
                  </view>
                  <input
                    v-model="identifier"
                    autocomplete="email"
                    class="mt-1 h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                    :placeholder="formPlaceholders.identifier"
                    placeholder-class="text-semantic-text-hero-secondary"
                  >
                </view>

                <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                  <view class="flex items-center justify-between gap-3">
                    <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                      {{ formLabels.code }}
                    </view>
                    <view
                      class="cursor-pointer text-[12px] text-semantic-text-link"
                      :class="codeSending || resendSeconds > 0 ? 'pointer-events-none opacity-60' : ''"
                      @click="handleSendCode"
                    >
                      {{ sendCodeText }}
                    </view>
                  </view>
                  <input
                    v-model="verificationCode"
                    class="mt-1 h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                    :placeholder="formPlaceholders.code"
                    placeholder-class="text-semantic-text-hero-secondary"
                  >
                </view>

                <AuthPasswordField
                  v-model="password"
                  :label="formLabels.password"
                  :placeholder="formPlaceholders.password"
                  autocomplete="new-password"
                />

                <AuthPasswordField
                  v-model="confirmPassword"
                  :label="formLabels.confirmPassword"
                  :placeholder="formPlaceholders.confirmPassword"
                  autocomplete="new-password"
                />

                <view
                  v-if="registerError"
                  class="px-1 text-[14px] font-medium leading-6 text-semantic-state-danger"
                >
                  {{ registerError }}
                </view>
              </view>

              <label class="mt-5 flex items-start gap-3 border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                <checkbox :checked="agreed" @click="toggleAgreement" />
                <view class="text-[13px] leading-7 text-semantic-text-hero-body">
                  <text>{{ agreement.prefix }}</text>
                  <text class="text-semantic-text-link underline" @click.stop="openAgreementDialog('terms')">
                    {{ agreement.terms }}
                  </text>
                  <text>{{ agreement.connector }}</text>
                  <text class="text-semantic-text-link underline" @click.stop="openAgreementDialog('privacy')">
                    {{ agreement.privacy }}
                  </text>
                  <text>{{ agreement.suffix }}</text>
                </view>
              </label>

              <view class="mt-6 grid gap-3">
                <AppButton
                  width="cta"
                  size="lg"
                  class="[margin-left:0] [margin-right:0]"
                  :disabled="submitting"
                  @click="handleSubmit"
                >
                  {{ submitting ? labels.loading : labels.submit }}
                </AppButton>

                <AppButton
                  variant="secondary"
                  context="hero"
                  width="cta"
                  size="lg"
                  class="[margin-left:0] [margin-right:0]"
                  :disabled="submitting"
                  @click="openLoginPage"
                >
                  {{ loginText }}
                </AppButton>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <AgreementDialog
      :document="agreementDocument"
      :error="agreementError"
      :loading="agreementLoading"
      :open="agreementDialogOpen"
      @close="closeAgreementDialog"
    />
  </AppPageLayout>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import AgreementDialog from '@/components/common/AgreementDialog.vue'
import AppButton from '@/components/common/AppButton.vue'
import AuthPasswordField from '@/components/auth/AuthPasswordField.vue'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import { isDuplicateRegistrationError, useRegister } from '@/hooks/auth'
import { useAgreementDialog } from '@/hooks/legal'
import { useAppI18n } from '@/i18n/composables/use-app-i18n'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { validateAccountName, validateIdentifier, validatePassword } from '@/utils/validate'
import { openLoginPage, redirectToRegistrationLanding } from '@/utils/navigation'

type OnboardingPath = 'self' | 'family'
type AuthProvider = 'email' | 'phone'

const { t, locale } = usePageI18n('register')
const { t: tApp } = useAppI18n()
const registerAction = useRegister()
const path = ref<OnboardingPath>('self')
const accountName = ref('')
const identifier = ref('')
const verificationCode = ref('')
const password = ref('')
const confirmPassword = ref('')
const registerError = ref('')
const codeSending = ref(false)
const resendSeconds = ref(0)
const agreed = ref(false)
let resendTimer: ReturnType<typeof setInterval> | null = null
const {
  agreementDialogOpen,
  agreementDocument,
  agreementLoading,
  agreementError,
  openAgreementDialog,
  closeAgreementDialog,
} = useAgreementDialog()

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  formTitle: t('hero.formTitle'),
  panelTitle: t('hero.panelTitle'),
  panelHint: t('hero.panelHint'),
  submit: t('hero.submit'),
  loading: t('hero.loading'),
}))

const loginText = computed(() => tApp('common.nav.login'))
const agreement = computed(() => ({
  prefix: t('hero.agreementPrefix'),
  terms: t('hero.agreementTerms'),
  connector: t('hero.agreementConnector'),
  privacy: t('hero.agreementPrivacy'),
  suffix: t('hero.agreementSuffix'),
}))

const pathOptions = computed(() => [
  { value: 'self' as const, badge: t('paths.self.badge'), title: t('paths.self.title'), desc: t('paths.self.desc') },
  { value: 'family' as const, badge: t('paths.family.badge'), title: t('paths.family.title'), desc: t('paths.family.desc') },
])

const formLabels = computed(() => ({
  accountName: t('form.accountName.label'),
  identifier: t('form.identifier.label'),
  code: t('form.code.label'),
  password: t('form.password.label'),
  confirmPassword: t('form.confirmPassword.label'),
}))

const formPlaceholders = computed(() => ({
  accountName: t('form.accountName.placeholder'),
  identifier: t('form.identifier.placeholder'),
  code: t('form.code.placeholder'),
  password: t('form.password.placeholder'),
  confirmPassword: t('form.confirmPassword.placeholder'),
}))

const submitting = computed(() => registerAction.loading.value)
const sendCodeText = computed(() => {
  if (codeSending.value) return t('form.code.sending')
  if (resendSeconds.value > 0) return t('form.code.resendCountdown', { seconds: resendSeconds.value })
  return verificationCode.value ? t('form.code.resend') : t('form.code.send')
})

watch([accountName, identifier, verificationCode, password, confirmPassword], () => {
  registerError.value = ''
})

watch(identifier, () => {
  verificationCode.value = ''
  resetResendCountdown()
})

onUnmounted(() => {
  resetResendCountdown()
})

function selectPath(nextPath: OnboardingPath) {
  path.value = nextPath
}

async function handleSubmit() {
  registerError.value = ''

  const nameErr = validateAccountName(accountName.value)
  if (nameErr) { registerError.value = tApp(nameErr); return }

  const idErr = validateIdentifier(identifier.value)
  if (idErr) { registerError.value = tApp(idErr); return }

  if (!verificationCode.value.trim()) {
    registerError.value = t('form.error.codeRequired')
    return
  }

  const pwErr = validatePassword(password.value)
  if (pwErr) { registerError.value = tApp(pwErr); return }

  if (password.value !== confirmPassword.value) {
    registerError.value = t('form.error.mismatch')
    return
  }

  if (!agreed.value) {
    registerError.value = t('form.error.agreement')
    return
  }

  const session = await registerAction.register({
    path: path.value,
    provider: inferAuthProvider(identifier.value),
    identifier: identifier.value.trim(),
    code: verificationCode.value.trim(),
    password: password.value,
    accountName: accountName.value.trim(),
    preferredLocale: locale.value,
  })

  if (session) {
    redirectToRegistrationLanding(path.value)
  } else {
    registerError.value = isDuplicateRegistrationError(registerAction.verificationError.value)
      ? t('form.error.duplicate')
      : t('form.error.server')
  }
}

async function handleSendCode() {
  registerError.value = ''

  const idErr = validateIdentifier(identifier.value)
  if (idErr) { registerError.value = tApp(idErr); return }

  codeSending.value = true
  try {
    const result = await registerAction.requestVerificationCode({
      provider: inferAuthProvider(identifier.value),
      identifier: identifier.value.trim(),
    })
    if (result) {
      startResendCountdown()
      return
    }

    registerError.value = isDuplicateRegistrationError(registerAction.error.value)
      ? t('form.error.duplicate')
      : t('form.error.server')
  } finally {
    codeSending.value = false
  }
}

function startResendCountdown() {
  resetResendCountdown()
  resendSeconds.value = 60
  resendTimer = setInterval(() => {
    resendSeconds.value -= 1
    if (resendSeconds.value <= 0) {
      resetResendCountdown()
    }
  }, 1000)
}

function resetResendCountdown() {
  resendSeconds.value = 0
  if (resendTimer) {
    clearInterval(resendTimer)
    resendTimer = null
  }
}

function toggleAgreement() {
  agreed.value = !agreed.value
  if (agreed.value) {
    registerError.value = ''
  }
}

function inferAuthProvider(value: string): AuthProvider {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'email' : 'phone'
}

</script>
