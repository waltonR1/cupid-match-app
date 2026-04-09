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
        <view class="grid gap-12 lg:min-h-[620px] lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <view class="max-w-[700px]">
            <view class="mb-8 inline-flex items-center gap-4 rounded-full border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-2 backdrop-blur">
              <view class="h-[1px] w-12 bg-next-component-section-line" />
              <text class="text-[12px] uppercase tracking-[6px] text-next-component-hero-eyebrow">
                {{ labels.eyebrow }}
              </text>
            </view>

            <view class="max-w-[640px] text-[52px] font-semibold leading-[1.02] text-next-semantic-text-inverse lg:text-[86px]">
              {{ labels.title }}
            </view>

            <view class="mt-10 max-w-[620px] text-[19px] leading-8 text-next-component-hero-description lg:text-[20px]">
              {{ labels.subtitle }}
            </view>

            <view class="mt-12 grid gap-4 sm:grid-cols-2">
              <view
                v-for="item in accessCards.slice(0, 2)"
                :key="item.title"
                class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-6 py-5 backdrop-blur"
              >
                <view class="text-[12px] uppercase tracking-[4px] text-next-component-card-label">
                  {{ item.kicker }}
                </view>
                <view class="mt-4 text-[22px] font-medium text-next-semantic-text-inverse">
                  {{ item.title }}
                </view>
                <view class="mt-3 text-[15px] leading-7 text-next-component-hero-description">
                  {{ item.desc }}
                </view>
              </view>
            </view>
          </view>

          <view class="relative lg:ml-auto lg:w-full lg:max-w-[500px]">
            <view class="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border border-next-component-hero-border bg-next-component-auth-overlay-background-soft" />

            <view class="relative border border-next-component-hero-border bg-next-component-hero-overlay-background-panel px-8 py-8 shadow-next-shadow-hero backdrop-blur lg:px-9 lg:py-9">
              <view>
                <view class="text-[12px] uppercase tracking-[4px] text-next-component-hero-label">
                  {{ labels.formTitle }}
                </view>
                <view class="mt-4 text-[32px] leading-[1.25] text-next-semantic-text-inverse">
                  {{ labels.panelTitle }}
                </view>
              </view>

              <view class="mt-4 text-[15px] leading-7 text-next-component-hero-description">
                {{ labels.panelHint }}
              </view>

              <view class="mt-8 grid gap-5">
                <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                  <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                    {{ formLabels.identity }}
                  </view>
                  <input
                    v-model="identity"
                    class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                    :placeholder="formPlaceholders.identity"
                    placeholder-class="text-next-component-hero-secondary-description"
                  >
                </view>

                <view class="border border-next-component-hero-border bg-next-component-auth-overlay-background-soft px-5 py-4">
                  <view class="text-[12px] uppercase tracking-[3px] text-next-component-card-label">
                    {{ formLabels.password }}
                  </view>
                  <input
                    v-model="password"
                    password="false"
                    class="mt-3 h-12 w-full border-b border-next-component-hero-border bg-transparent px-0 text-[16px] text-next-semantic-text-inverse placeholder:text-next-component-hero-secondary-description"
                    :placeholder="formPlaceholders.password"
                    placeholder-class="text-next-component-hero-secondary-description"
                  >
                </view>
              </view>

              <view class="mt-8 grid gap-4">
                <AppButton
                  width="full"
                  size="lg"
                  class="[margin-left:0] [margin-right:0]"
                  @click="handleSubmit"
                >
                  {{ labels.submit }}
                </AppButton>

                <AppButton
                  variant="secondary"
                  context="hero"
                  width="full"
                  size="lg"
                  class="[margin-left:0] [margin-right:0]"
                  @click="handleRegisterClick"
                >
                  {{ labels.secondary }}
                </AppButton>
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
            {{ labels.accessTitle }}
          </text>
        </view>

        <view class="grid gap-6 lg:grid-cols-3">
          <view
            v-for="item in accessCards"
            :key="item.title"
            class="border border-next-semantic-border-default bg-next-semantic-surface-info-card px-7 py-7 shadow-next-panel transition-all duration-300 hover:-translate-y-[2px] hover:border-next-semantic-border-info-card-hover hover:bg-next-semantic-surface-info-card-hover"
          >
            <view class="text-[12px] uppercase tracking-[4px] text-next-component-card-label">
              {{ item.kicker }}
            </view>
            <view class="mt-4 text-[26px] font-semibold text-next-semantic-text-primary">
              {{ item.title }}
            </view>
            <view class="mt-4 text-[16px] leading-8 text-next-semantic-text-secondary">
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
        class="w-full max-w-[520px] border border-next-component-hero-border bg-next-component-hero-overlay-background-panel px-7 py-7 text-next-semantic-text-inverse shadow-next-shadow-hero"
        @click.stop
      >
        <view class="text-[12px] uppercase tracking-[4px] text-next-component-hero-label">
          {{ consentConfirm.kicker }}
        </view>
        <view class="mt-4 text-[28px] font-semibold leading-[1.3] text-next-semantic-text-inverse">
          {{ consentConfirm.title }}
        </view>
        <view class="mt-4 text-[15px] leading-8 text-next-component-hero-description">
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
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AgreementDialog from '@/components/common/AgreementDialog.vue'
import AppButton from '@/components/common/AppButton.vue'
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
const identity = ref('')
const password = ref('')
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
  accessTitle: t('hero.accessTitle'),
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

const formLabels = computed(() => ({
  identity: t('form.identity.label'),
  password: t('form.password.label'),
}))

const formPlaceholders = computed(() => ({
  identity: t('form.identity.placeholder'),
  password: t('form.password.placeholder'),
}))

const accessCards = computed(() => [
  { kicker: '01', title: t('access.account.title'), desc: t('access.account.desc') },
  { kicker: '02', title: t('access.favorites.title'), desc: t('access.favorites.desc') },
  { kicker: '03', title: t('access.events.title'), desc: t('access.events.desc') },
])

function handleNavClick(key: string) {
  navigateByNavKey(key, navList)
}

function handleSubmit() {
  if (!agreed.value) {
    showConsentConfirm.value = true
    return
  }

  auth.loginMock()
  uni.redirectTo({
    url: SELF_ROUTE,
  })
}

function handleRegisterClick() {
  openRegisterPage('free')
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
  handleSubmit()
}
</script>
