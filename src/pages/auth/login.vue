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
                v-for="item in accessCards.slice(0, 2)"
                :key="item.title"
                class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-5 py-4 backdrop-blur"
              >
                <view class="text-[20px] font-medium text-semantic-text-inverse">
                  {{ item.title }}
                </view>
                <view class="mt-2 text-[14px] leading-6 text-semantic-text-hero-secondary">
                  {{ item.desc }}
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
                  <input
                    v-model="identifier"
                    class="h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                    :placeholder="formPlaceholders.identifier"
                    placeholder-class="text-semantic-text-hero-secondary"
                  >
                </view>

                <view class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3">
                  <input
                    v-model="password"
                    password="false"
                    class="h-10 w-full bg-transparent px-0 text-[15px] text-semantic-text-inverse placeholder:text-semantic-text-hero-secondary"
                    :placeholder="formPlaceholders.password"
                    placeholder-class="text-semantic-text-hero-secondary"
                  >
                </view>

                <view
                  v-if="loginError"
                  class="border border-semantic-border-hero bg-component-auth-overlay-background-soft px-4 py-3 text-[14px] leading-6 text-semantic-text-hero-body"
                >
                  {{ loginError }}
                </view>
              </view>

              <view class="mt-6 grid gap-3">
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
                  @click="openRegisterPage"
                >
                  {{ labels.secondary }}
                </AppButton>
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

    <view
      v-if="showConsentConfirm"
      class="fixed inset-0 z-[71] flex items-center justify-center bg-[#07131fcc] px-6 py-10"
      @click="closeConsentConfirm"
    >
      <view
        class="w-full max-w-[520px] border border-semantic-border-hero bg-semantic-surface-hero-panel px-7 py-7 text-semantic-text-inverse shadow-hero"
        @click.stop
      >
        <view class="text-[12px] uppercase tracking-[4px] text-semantic-text-hero-label">
          {{ consentConfirm.kicker }}
        </view>
        <view class="mt-4 text-[28px] font-semibold leading-[1.3] text-semantic-text-inverse">
          {{ consentConfirm.title }}
        </view>
        <view class="mt-4 text-[15px] leading-8 text-semantic-text-hero-body">
          {{ consentConfirm.desc }}
        </view>

        <view class="mt-8 grid gap-4 sm:grid-cols-2">
          <AppButton
            variant="secondary"
            context="hero"
            width="full"
            size="lg"
            class="[margin-left:0] [margin-right:0]"
            @click="closeConsentConfirm"
          >
            {{ consentConfirm.reject }}
          </AppButton>

          <AppButton
            width="full"
            size="lg"
            class="[margin-left:0] [margin-right:0]"
            @click="acceptAgreementAndLogin"
          >
            {{ consentConfirm.accept }}
          </AppButton>
        </view>
      </view>
    </view>
  </AppPageLayout>
</template>

<script setup lang="ts">
import AppPageLayout from '@/components/layout/AppPageLayout.vue'
import AppButton from "@/components/common/AppButton.vue";
import { computed, ref } from 'vue'
import { useLogin } from '@/hooks/auth'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { useAppI18n } from '@/i18n/composables/use-app-i18n'
import { validateIdentifier, validatePassword } from '@/utils/validate'
import { openRegisterPage, redirectToAuthLanding } from '@/utils/navigation'

const { t } = usePageI18n('login')
const { t: tApp } = useAppI18n()
const loginAction = useLogin()
const identifier = ref('')
const password = ref('')
const loginError = ref('')
const agreed = ref(false)
const agreementDialog = ref<'terms' | 'privacy' | null>(null)
const showConsentConfirm = ref(false)

const labels = computed(() => ({
  eyebrow: t('hero.eyebrow'),
  title: t('hero.title'),
  subtitle: t('hero.subtitle'),
  formTitle: t('hero.formTitle'),
  panelTitle: t('hero.panelTitle'),
  panelHint: t('hero.panelHint'),
  submit: t('hero.submit'),
  secondary: t('hero.secondary'),
}))

const agreement = computed(() => ({
  prefix: t('hero.agreementPrefix'),
  terms: t('hero.agreementTerms'),
  connector: t('hero.agreementConnector'),
  privacy: t('hero.agreementPrivacy'),
  suffix: t('hero.agreementSuffix'),
}))

const consentConfirm = computed(() => ({
  kicker: t('hero.consentConfirm.kicker'),
  title: t('hero.consentConfirm.title'),
  desc: t('hero.consentConfirm.desc'),
  accept: t('hero.consentConfirm.accept'),
  reject: t('hero.consentConfirm.reject'),
}))

const accessCards = computed(() => [
  { title: t('access.account.title'), desc: t('access.account.desc') },
  { title: t('access.favorites.title'), desc: t('access.favorites.desc') },
])

const formPlaceholders = computed(() => ({
  identifier: t('form.identifier.placeholder'),
  password: t('form.password.placeholder'),
}))

async function handleSubmit() {
  if (!agreed.value) {
    showConsentConfirm.value = true
    return
  }

  loginError.value = ''

  const idErr = validateIdentifier(identifier.value)
  if (idErr) { loginError.value = tApp(idErr); return }

  const pwErr = validatePassword(password.value)
  if (pwErr) { loginError.value = tApp(pwErr); return }

  try {
    const session = await loginAction.login({
      identifier: identifier.value,
      password: password.value,
    })

    redirectToAuthLanding(session)
  } catch {
    loginError.value = t('form.error.invalid')
  }
}

function toggleAgreement() {
  agreed.value = !agreed.value
}

function openAgreementDialog(kind: 'terms' | 'privacy') {
  agreementDialog.value = kind
}

function closeAgreementDialog() {
  agreementDialog.value = null
}

function closeConsentConfirm() {
  showConsentConfirm.value = false
}

function acceptAgreementAndLogin() {
  agreed.value = true
  showConsentConfirm.value = false
  void handleSubmit()
}
</script>
