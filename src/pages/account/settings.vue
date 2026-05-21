<template>
  <AccountShell :account-data="accountData" active-page="settings">
    <view>
      <AccountSubPageHeader
          :description="t('settings.subtitle')"
          :label="t('settings.title')"
          :title="t('settings.title')"
      />

      <view v-if="pageData.account" class="max-w-[960px]">
        <view class="grid gap-5">
          <!-- Account summary -->
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-7 shadow-panel">
            <view class="flex flex-wrap items-start gap-5">
              <image
                  :src="pageData.account.avatarUrl"
                  class="h-[72px] w-[72px] shrink-0 rounded-full border border-semantic-border-soft object-cover"
              />

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <view class="text-[20px] font-semibold leading-7 text-semantic-text-primary">
                    {{ t('settings.account') }}
                  </view>

                  <view
                      class="border border-component-account-badge-status-border bg-component-account-badge-status-background px-3 py-1 text-[12px] leading-5 text-component-account-badge-status-text"
                  >
                    {{ t(`settings.accountStatus.${pageData.account.status}`) }}
                  </view>
                </view>

                <view class="mt-2 max-w-[680px] text-[13px] leading-6 text-semantic-text-secondary">
                  {{ t('settings.sectionDescriptions.account') }}
                </view>
              </view>

              <view class="ml-auto flex flex-wrap gap-2">
                <view
                  class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px]"
                  @click="editing = !editing"
                >
                  {{ editing ? t('common.open') : t('settings.actions.edit') }}
                </view>
                <view
                  v-if="editing"
                  class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-3 py-2 text-[13px]"
                  @click="saveSettings"
                >
                  {{ t('settings.actions.save') }}
                </view>
              </view>
            </view>

            <view class="mt-6 grid gap-x-5 gap-y-3 border-t border-semantic-border-soft pt-6 md:grid-cols-2">
              <view v-if="editing" class="px-3 py-3 md:col-span-2">
                <view class="text-[12px] leading-5 text-semantic-text-muted">
                  {{ t('settings.accountFields.avatarUrl') }}
                </view>
                <input
                  v-model="accountDraft.avatarUrl"
                  class="mt-1 w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px]"
                />
              </view>
              <view
                  v-for="item in pageData.account.items"
                  :key="item.key"
                  class="px-3 py-3"
              >
                <view class="text-[12px] leading-5 text-semantic-text-muted">
                  {{ item.label }}
                </view>

                <input
                  v-if="editing && item.key === 'accountName'"
                  v-model="accountDraft.accountName"
                  class="mt-1 w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px]"
                />
                <view v-else class="mt-1 break-words text-[14px] font-medium leading-6 text-semantic-text-primary">
                  {{ item.value }}
                </view>
              </view>
            </view>
          </view>

          <!-- Security -->
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel">
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.security.title') }}
              </view>
            </view>

            <view class="pt-5">
              <view class="text-[13px] font-medium text-semantic-text-secondary">
                {{ t('settings.security.boundAccounts') }}
              </view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in securityAccountItems"
                  :key="item.id"
                  class="border border-transparent px-3 py-5 transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft"
              >
                <view class="flex flex-wrap items-center justify-between gap-3">
                  <text class="text-[14px] font-medium text-semantic-text-primary">
                    {{ item.providerLabel }}
                  </text>

                  <text class="text-[12px] leading-5 text-semantic-text-secondary">
                    {{ item.verifiedText }}
                  </text>
                </view>

                <view class="mt-2 break-words text-[15px] font-medium leading-6 text-semantic-text-primary">
                  {{ item.identifier }}
                </view>
              </view>
            </view>

            <view class="pt-6">
              <view class="text-[13px] font-medium text-semantic-text-secondary">
                {{ t('settings.security.password') }}
              </view>

              <view class="mt-3 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
                <view
                    v-for="item in securityPasswordItems"
                    :key="item.code"
                    class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
                >
                  <text class="text-semantic-text-secondary">
                    {{ item.label }}
                  </text>

                  <text class="font-medium text-semantic-text-primary">
                    {{ item.displayValue }}
                  </text>
                </view>
              </view>
            </view>
          </view>

          <!-- Notifications -->
          <view
              class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel"
          >
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.notifications') }}
              </view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in notificationItems"
                  :key="item.code"
                  class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
              >
                <text class="text-semantic-text-secondary">
                  {{ item.label }}
                </text>

                <view v-if="editing" class="flex flex-wrap gap-2">
                  <view
                    v-for="option in booleanOptions"
                    :key="String(option.value)"
                    class="cursor-pointer border px-3 py-1.5 text-[13px]"
                    :class="readPreference(item.code) === option.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
                      : 'border-semantic-border-soft bg-semantic-surface-panel'"
                    @click="writePreference(item.code, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <text v-else class="font-medium text-semantic-text-primary">{{ item.displayValue }}</text>
              </view>
            </view>
          </view>

          <!-- Service preferences -->
          <view
              class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel"
          >
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.servicePreferences') }}
              </view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in servicePreferenceItems"
                  :key="item.code"
                  class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
              >
                <text class="text-semantic-text-secondary">
                  {{ item.label }}
                </text>

                <input
                  v-if="editing && item.code === 'preferred_city'"
                  :value="String(readPreference(item.code) ?? '')"
                  class="w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px]"
                  @input="writePreference(item.code, getInputValue($event))"
                />
                <input
                  v-else-if="editing && item.code === 'preferred_contact_channel'"
                  :value="String(readPreference(item.code) ?? '')"
                  class="w-full border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px]"
                  @input="writePreference(item.code, getInputValue($event))"
                />
                <view v-else-if="editing" class="flex flex-wrap gap-2">
                  <view
                    v-for="option in booleanOptions"
                    :key="String(option.value)"
                    class="cursor-pointer border px-3 py-1.5 text-[13px]"
                    :class="readPreference(item.code) === option.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
                      : 'border-semantic-border-soft bg-semantic-surface-panel'"
                    @click="writePreference(item.code, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <text v-else class="font-medium text-semantic-text-primary">{{ item.displayValue }}</text>
              </view>
            </view>
          </view>

          <!-- Privacy -->
          <view
              class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel"
          >
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.privacy') }}
              </view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in privacyItems"
                  :key="item.code"
                  class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
              >
                <text class="text-semantic-text-secondary">
                  {{ item.label }}
                </text>

                <view v-if="editing" class="flex flex-wrap gap-2">
                  <view
                    v-for="option in booleanOptions"
                    :key="String(option.value)"
                    class="cursor-pointer border px-3 py-1.5 text-[13px]"
                    :class="readPreference(item.code) === option.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
                      : 'border-semantic-border-soft bg-semantic-surface-panel'"
                    @click="writePreference(item.code, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <text v-else class="font-medium text-semantic-text-primary">{{ item.displayValue }}</text>
              </view>
            </view>
          </view>

          <!-- Account actions -->
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel">
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.accountActions') }}
              </view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in pageData.accountActions"
                  :key="item.key"
                  class="border border-transparent px-3 py-4 transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft"
              >
                <view class="text-[14px] font-medium text-semantic-text-primary">
                  {{ item.label }}
                </view>

                <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                  {{ item.hint }}
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Legal links -->
        <view class="mt-5 border-t border-semantic-border-soft px-1 pt-4">
          <view class="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] leading-5 text-semantic-text-muted">
            <text>
              {{ t('settings.legal') }}
            </text>

            <text
                v-for="item in pageData.legalDocuments"
                :key="item.type"
                class="cursor-pointer transition-colors duration-200 hover:text-semantic-text-link hover:underline hover:underline-offset-4"
                @click="openAgreementDialog(item.type)"
            >
              {{ item.label }}
            </text>
          </view>
        </view>
      </view>

      <EmptyStatePanel
          v-else-if="!accountData.loading.value"
          :subtitle="t('settings.empty.description')"
          :title="t('settings.empty.title')"
          size="page"
      />
    </view>
  </AccountShell>

  <AgreementDialog
      :kind="agreementDialog"
      :open="agreementDialog !== null"
      @close="closeAgreementDialog"
  />
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import type {AccountPreferencesDTO} from '@/api/account'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import AgreementDialog from '@/components/common/AgreementDialog.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import {useAccountOverview, useAccountSettings} from '@/hooks/account'
import {usePageI18n} from '@/i18n/composables/use-page-i18n'
import type {AccountPreferenceCode} from '@/types/account/settings'

const {t} = usePageI18n('accountCenter')
const accountData = useAccountOverview()
const {settings, pageData, saveAccount, savePreferences} = useAccountSettings(t)
const editing = ref(false)
const accountDraft = ref({ accountName: '', avatarUrl: '' })
const preferenceDraft = ref<Record<string, string | boolean | number | string[]>>({})
const PREFERENCE_CODE_TO_KEY = {
  preferred_city: 'preferredCity',
  preferred_contact_channel: 'preferredContactChannel',
  advisor_contact_enabled: 'advisorContactEnabled',
  family_assist_enabled: 'familyAssistEnabled',
  introduction_updates_enabled: 'introductionUpdatesEnabled',
  event_reminders_enabled: 'eventRemindersEnabled',
  service_announcements_enabled: 'serviceAnnouncementsEnabled',
  marketing_emails_enabled: 'marketingEmailsEnabled',
  analytics_consent_enabled: 'analyticsConsentEnabled',
} satisfies Record<AccountPreferenceCode, keyof AccountPreferencesDTO>
const securityAccountItems = computed(() => mergePreviewSecurityAccounts(pageData.value.security, [
  previewSecurityAccount('phone-preview', t('settings.provider.phone'), t('settings.security.unbound'), t('settings.security.unverified')),
  previewSecurityAccount('wechat-preview', t('settings.provider.wechat'), t('settings.security.unbound'), t('settings.security.unverified')),
]))
const securityPasswordItems = computed(() => [
  previewItem('password', t('settings.security.password'), pageData.value.password?.isSetText ?? t('settings.security.passwordUnset')),
  previewItem('password_last_changed', t('settings.security.lastChangedAt'), pageData.value.password?.lastChangedText ?? t('settings.security.neverChanged')),
  previewItem('password_can_reset', t('settings.security.canReset'), pageData.value.password?.canResetText ?? t('common.no')),
  previewItem('password_requires_mfa', t('settings.security.requiresMfa'), pageData.value.password?.requiresMfaText ?? t('common.no')),
])
const notificationItems = computed(() => mergePreviewItems(pageData.value.notificationPreferences, [
  previewItem('introduction_updates_enabled', t('settings.preference.introduction_updates_enabled'), t('common.yes')),
  previewItem('event_reminders_enabled', t('settings.preference.event_reminders_enabled'), t('common.yes')),
  previewItem('service_announcements_enabled', t('settings.preference.service_announcements_enabled'), t('common.yes')),
  previewItem('marketing_emails_enabled', t('settings.preference.marketing_emails_enabled'), t('common.no')),
]))
const servicePreferenceItems = computed(() => mergePreviewItems(pageData.value.servicePreferences, [
  previewItem('preferred_city', t('settings.preference.preferred_city'), 'Paris'),
  previewItem('preferred_contact_channel', t('settings.preference.preferred_contact_channel'), t('settings.contactChannel.email')),
  previewItem('advisor_contact_enabled', t('settings.preference.advisor_contact_enabled'), t('common.yes')),
  previewItem('family_assist_enabled', t('settings.preference.family_assist_enabled'), t('common.yes')),
]))
const privacyItems = computed(() => mergePreviewItems(pageData.value.privacyPreferences, [
  previewItem('analytics_consent_enabled', t('settings.preference.analytics_consent_enabled'), t('common.no')),
]))

const agreementDialog = ref<'terms' | 'privacy' | null>(null)
const booleanOptions = computed(() => [
  { label: t('common.yes'), value: true },
  { label: t('common.no'), value: false },
])

watch(settings, (value) => {
  if (!value) return
  accountDraft.value = {
    accountName: value.account.accountName,
    avatarUrl: value.account.avatarUrl,
  }
  preferenceDraft.value = Object.fromEntries(
    Object.entries(PREFERENCE_CODE_TO_KEY)
      .filter(([, key]) => value.preferences[key] !== undefined)
      .map(([code, key]) => [code, value.preferences[key]]),
  ) as Record<string, string | boolean | number | string[]>
}, { immediate: true })

function openAgreementDialog(kind: 'terms' | 'privacy') {
  agreementDialog.value = kind
}

function closeAgreementDialog() {
  agreementDialog.value = null
}

function previewItem(code: string, label: string, displayValue: string) {
  return { code, label, displayValue }
}

function mergePreviewItems<T extends { code: string }>(items: T[], previews: T[]) {
  const codes = new Set(items.map((item) => item.code))
  return [...items, ...previews.filter((item) => !codes.has(item.code))]
}

function previewSecurityAccount(id: string, providerLabel: string, identifier: string, verifiedText: string) {
  return { id, providerLabel, identifier, verifiedText }
}

function mergePreviewSecurityAccounts<T extends { providerLabel: string }>(items: T[], previews: T[]) {
  const providers = new Set(items.map((item) => item.providerLabel))
  return [...items, ...previews.filter((item) => !providers.has(item.providerLabel))]
}

function readPreference(code: string) {
  return preferenceDraft.value[code]
}

function writePreference(code: string, value: string | boolean | number | string[]) {
  preferenceDraft.value[code] = value
}

function getInputValue(event: Event) {
  return (event as unknown as { detail: { value: string } }).detail.value
}

async function saveSettings() {
  await saveAccount({
    accountName: accountDraft.value.accountName,
    avatarUrl: accountDraft.value.avatarUrl,
  })
  await savePreferences({
    preferences: toPreferencePayload(preferenceDraft.value),
  })
  editing.value = false
}

function toPreferencePayload(values: Record<string, string | boolean | number | string[]>): Partial<AccountPreferencesDTO> {
  return Object.fromEntries(
    Object.entries(PREFERENCE_CODE_TO_KEY)
      .filter(([code]) => values[code] !== undefined)
      .map(([code, key]) => [key, values[code]]),
  ) as Partial<AccountPreferencesDTO>
}
</script>
