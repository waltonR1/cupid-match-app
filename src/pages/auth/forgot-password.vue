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
          </view>

          <view class="relative lg:max-w-[520px]">
            <view class="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border border-semantic-border-hero bg-component-auth-overlay-background-soft" />

            <view class="relative border border-semantic-border-hero bg-semantic-surface-hero-panel px-7 py-7 text-semantic-text-inverse shadow-hero backdrop-blur">
              <!-- Step 1: identifier + send code -->
              <template v-if="step === 1">
                <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label">
                  {{ labels.eyebrow }}
                </view>
                <view class="mt-2 text-[26px] leading-[1.3] text-semantic-text-inverse">
                  {{ labels.title }}
                </view>

                <view class="mt-2 text-[14px] leading-6 text-semantic-text-hero-body">
                  {{ labels.subtitle }}
                </view>

                <view class="mt-5 grid gap-3">
                  <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                    <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                      {{ formLabels.identifierLabel }}
                    </view>
                    <input
                      v-model="identifier"
                      autocomplete="email"
                      class="mt-1 h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                      :placeholder="formLabels.identifierPlaceholder"
                      placeholder-class="text-semantic-text-hero-secondary"
                    >
                  </view>

                  <view
                    v-if="step1Error"
                    class="px-1 text-[14px] font-medium leading-6 text-semantic-state-danger"
                  >
                    {{ step1Error }}
                  </view>
                </view>

                <view class="mt-6 grid gap-3">
                  <AppButton
                    width="cta"
                    size="lg"
                    class="[margin-left:0] [margin-right:0]"
                    :disabled="codeSending"
                    @click="handleSendCode"
                  >
                    {{ codeSending ? formLabels.sending : formLabels.sendCode }}
                  </AppButton>

                  <AppButton
                    variant="secondary"
                    context="hero"
                    width="cta"
                    size="lg"
                    class="[margin-left:0] [margin-right:0]"
                    :disabled="codeSending"
                    @click="openLoginPage"
                  >
                    {{ formLabels.step1Action }}
                  </AppButton>
                </view>
              </template>

              <!-- Step 2: code + new password + confirm password -->
              <template v-else>
                <view class="flex items-center gap-3">
                  <view
                    class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-semantic-border-hero bg-component-auth-overlay-background-soft transition-colors hover:bg-component-auth-overlay-background-soft"
                    @click="step = 1"
                  >
                    <view class="h-3 w-3 border-l-2 border-t-2 border-semantic-text-hero-secondary -rotate-45 translate-x-0.5" />
                  </view>
                  <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label">
                    {{ step2Labels.title }}
                  </view>
                </view>

                <view class="mt-5 grid gap-3">
                  <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                    <view class="text-[11px] uppercase tracking-[3px] text-semantic-text-card-label">
                      {{ step2Labels.codeLabel }}
                    </view>
                    <input
                      v-model="verificationCode"
                      class="mt-1 h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                      :placeholder="step2Labels.codePlaceholder"
                      placeholder-class="text-semantic-text-hero-secondary"
                    >
                    <view class="mt-1 text-[12px] text-semantic-text-hero-secondary">
                      {{ step2Labels.codeHint }}
                    </view>
                  </view>

                  <AuthPasswordField
                    v-model="newPassword"
                    :label="step2Labels.newPasswordLabel"
                    :placeholder="step2Labels.newPasswordLabel"
                    autocomplete="new-password"
                  />

                  <AuthPasswordField
                    v-model="confirmPassword"
                    :label="step2Labels.confirmPasswordLabel"
                    :placeholder="step2Labels.confirmPasswordLabel"
                    autocomplete="new-password"
                  />

                  <view
                    v-if="step2Error"
                    class="px-1 text-[14px] font-medium leading-6 text-semantic-state-danger"
                  >
                    {{ step2Error }}
                  </view>
                </view>

                <view class="mt-6 grid gap-3">
                  <AppButton
                    width="cta"
                    size="lg"
                    class="[margin-left:0] [margin-right:0]"
                    :disabled="resetting"
                    @click="handleResetPassword"
                  >
                    {{ resetting ? step2Labels.loading : step2Labels.action }}
                  </AppButton>
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </view>
  </AppPageLayout>
    <Toast
        :message="toast.message.value"
        :type="toast.type.value"
        :visible="toast.visible.value"
        @close="toast.hide"
    />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import AppButton from '@/components/common/AppButton.vue'
import Toast from '@/components/common/Toast.vue'
import {useToast} from '@/hooks/common/use-toast'
import AuthPasswordField from '@/components/auth/AuthPasswordField.vue'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useAppI18n } from '@/i18n/composables/use-app-i18n'
import { validateIdentifier, validatePassword } from '@/utils/validate'
import { useAuthStore } from '@/stores/modules/auth'
import { openLoginPage } from '@/utils/navigation'
import { useForgotPassword } from '@/hooks/auth'

type AuthProvider = 'email' | 'phone'

const toast = useToast()
const authStore = useAuthStore()
onShow(() => {
  if (authStore.isLoggedIn) {
    uni.redirectTo({ url: '/pages/account/index' })
  }
})

const { t } = usePageI18n('forgotPassword')
const { t: tApp } = useAppI18n()

const step = ref(1)
const identifier = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const step1Error = ref('')
const step2Error = ref('')
const {
  codeSending,
  resetting,
  sendResetCode,
  submitPasswordReset,
} = useForgotPassword()

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
}))

const formLabels = computed(() => ({
  identifierLabel: t('form.identifierLabel'),
  identifierPlaceholder: t('form.identifierPlaceholder'),
  sendCode: t('form.sendCode'),
  sending: t('form.sending'),
  step1Action: t('form.step1Action'),
}))

const step2Labels = computed(() => ({
  title: t('step2.title'),
  codeLabel: t('step2.codeLabel'),
  codePlaceholder: t('step2.codePlaceholder'),
  codeHint: t('step2.codeHint'),
  newPasswordLabel: t('step2.newPasswordLabel'),
  confirmPasswordLabel: t('step2.confirmPasswordLabel'),
  action: t('step2.action'),
  loading: t('step2.loading'),
}))

watch(identifier, () => {
  step1Error.value = ''
})

watch([verificationCode, newPassword, confirmPassword], () => {
  step2Error.value = ''
})

function inferAuthProvider(value: string): AuthProvider {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'email' : 'phone'
}

async function handleSendCode() {
  step1Error.value = ''

  const idErr = validateIdentifier(identifier.value)
  if (idErr) { step1Error.value = tApp(idErr); return }

  try {
    const provider = inferAuthProvider(identifier.value)
    const result = await sendResetCode({
      provider,
      identifier: identifier.value.trim(),
    })
    if (result) {
      toast.show(t('toasts.codeSent'), 'info')
      step.value = 2
      return
    }
    step1Error.value = t('error.identityNotFound')
  } catch {
    step1Error.value = t('error.generic')
  }
}

async function handleResetPassword() {
  step2Error.value = ''

  if (!verificationCode.value.trim()) {
    step2Error.value = t('validation.codeRequired')
    return
  }

  const pwErr = validatePassword(newPassword.value)
  if (pwErr) { step2Error.value = tApp(pwErr); return }

  if (newPassword.value !== confirmPassword.value) {
    step2Error.value = t('validation.passwordsMismatch')
    return
  }

  try {
    const provider = inferAuthProvider(identifier.value)
    const result = await submitPasswordReset({
      provider,
      identifier: identifier.value.trim(),
      code: verificationCode.value.trim(),
      newPassword: newPassword.value,
    })
    if (result) {
      toast.show(t('toasts.passwordReset'), 'success')
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/auth/login' })
      }, 1500)
      return
    }
    step2Error.value = t('error.generic')
  } catch {
    step2Error.value = t('error.generic')
  }
}
</script>
