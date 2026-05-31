<template>
  <AccountShell active-page="settings">
    <view>
      <AccountSubPageHeader
          :description="t('settings.subtitle')"
          :label="t('settings.title')"
          :title="t('settings.title')"
      />

      <view v-if="settings" class="max-w-[960px]">
        <view class="grid gap-5">
          <!-- Account summary -->
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-7 shadow-panel">
            <view class="flex flex-wrap items-start gap-5">
              <view
                class="shrink-0"
                :class="editing ? 'cursor-pointer' : ''"
                @click="editing && chooseAndUploadAvatar()"
              >
                <view class="relative h-[72px] w-[72px]">
                  <image
                      :src="editing ? (accountDraft.avatarUrl || settings.account.avatarUrl || defaultAvatar) : (settings.account.avatarUrl || defaultAvatar)"
                      class="h-[72px] w-[72px] rounded-full border border-semantic-border-soft object-cover"
                  />
                  <view
                    v-if="editing"
                    class="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100"
                  >
                    <text class="text-[11px] text-white">{{ t('settings.actions.changeAvatar') }}</text>
                  </view>
                </view>
              </view>

              <view class="min-w-0 flex-1">
                <view class="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <view class="text-[20px] font-semibold leading-7 text-semantic-text-primary">
                    {{ t('settings.account') }}
                  </view>

                  <view
                      class="border border-component-account-badge-status-border bg-component-account-badge-status-background px-3 py-1 text-[12px] leading-5 text-component-account-badge-status-text"
                  >
                    {{ t(`settings.accountStatus.${settings.account.status}`) }}
                  </view>
                </view>

                <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                  {{ t('settings.sectionHints.account') }}
                </view>
                <view class="mt-2 max-w-[680px] text-[13px] leading-6 text-semantic-text-secondary">
                  {{ t('settings.sectionDescriptions.account') }}
                </view>
              </view>

              <view class="ml-auto flex flex-wrap gap-2">
                <view
                  class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px]"
                  @click="editing ? cancelEditing() : startEditing()"
                >
                  {{ editing ? t('settings.actions.cancelEdit') : t('settings.actions.edit') }}
                </view>
                <view
                  v-if="editing"
                  class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-3 py-2 text-[13px]"
                  :class="saving ? 'opacity-50 pointer-events-none' : ''"
                  @click="saveSettings"
                >
                  {{ t('settings.actions.save') }}
                </view>
              </view>
            </view>

            <view class="mt-6 grid gap-x-5 gap-y-3 border-t border-semantic-border-soft pt-6 md:grid-cols-2">
              <view class="px-3 py-3">
                <view class="text-[12px] leading-5 text-semantic-text-muted">
                  {{ t('settings.accountFields.accountName') }}
                </view>
                <input
                  v-if="editing"
                  v-model="accountDraft.accountName"
                  class="mt-1 box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
                />
                <view v-else class="mt-1 break-words text-[14px] font-medium leading-6 text-semantic-text-primary">
                  {{ settings.account.accountName }}
                </view>
              </view>

              <view class="px-3 py-3">
                <view class="text-[12px] leading-5 text-semantic-text-muted">
                  {{ t('settings.accountFields.accountId') }}
                </view>
                <view class="mt-1 break-words text-[14px] font-medium leading-6 text-semantic-text-primary">
                  {{ settings.account.id }}
                </view>
              </view>

              <view class="px-3 py-3">
                <view class="text-[12px] leading-5 text-semantic-text-muted">
                  {{ t('settings.accountFields.status') }}
                </view>
                <view class="mt-1 break-words text-[14px] font-medium leading-6 text-semantic-text-primary">
                  {{ t(`settings.accountStatus.${settings.account.status}`) }}
                </view>
              </view>

              <view class="px-3 py-3">
                <view class="text-[12px] leading-5 text-semantic-text-muted">
                  {{ t('settings.accountFields.preferredLocale') }}
                </view>
                <view v-if="editing" class="mt-1 flex flex-wrap gap-2">
                  <view v-for="loc in localeOptions" :key="loc.value"
                    class="cursor-pointer border px-3 py-1.5 text-[13px]"
                    :class="accountDraft.preferredLocale === loc.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
                      : 'border-semantic-border-soft bg-semantic-surface-panel'"
                    @click="accountDraft.preferredLocale = loc.value"
                  >{{ loc.label }}</view>
                </view>
                <view v-else class="mt-1 break-words text-[14px] font-medium leading-6 text-semantic-text-primary">
                  {{ t(`settings.locale.${settings.account.preferredLocale}`) }}
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
              <view class="mt-0.5 text-[13px] text-semantic-text-muted">{{ t('settings.sectionHints.security') }}</view>
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

                  <view class="flex items-center gap-3">
                    <text class="text-[12px] leading-5 text-semantic-text-secondary">
                      {{ item.verifiedText }}
                    </text>
                    <view
                      v-if="item.canUnbind"
                      class="cursor-pointer text-[13px] text-semantic-text-link"
                      @click="handleUnbindIdentity(item.id)"
                    >
                      {{ t('settings.actions.unbind') }}
                    </view>
                    <view
                      v-if="item.canBind"
                      class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-1 text-[13px] transition-colors hover:bg-semantic-surface-soft"
                      @click="openBindForm(item.provider)"
                    >
                      {{ t('settings.actions.bind') }}
                    </view>
                  </view>
                </view>

                <view class="mt-2 break-words text-[15px] font-medium leading-6 text-semantic-text-primary">
                  {{ item.identifier }}
                </view>
              </view>
            </view>

            <view v-if="showBindForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click="cancelBindForm">
              <view class="w-full max-w-[420px] border border-semantic-border-default bg-semantic-surface-card px-7 py-8 shadow-panel" @click.stop>
                <view class="text-[18px] font-semibold text-semantic-text-primary">
                  {{ bindIdentityTitle }}
                </view>
                <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
                  {{ bindIdentityDescription }}
                </view>

                <view class="mt-6 space-y-4">
                  <view>
                    <view class="mb-2 text-[12px] font-medium text-semantic-text-secondary">
                      {{ bindIdentityIdentifierLabel }}
                    </view>
                    <input
                      v-model="bindForm.identifier"
                      :disabled="codeRequested"
                      class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary disabled:opacity-50"
                      :placeholder="bindIdentityIdentifierPlaceholder"
                    />
                  </view>

                  <view v-if="codeRequested" class="border-l-2 border-semantic-border-emphasis bg-semantic-surface-soft px-4 py-3 text-[13px] leading-6 text-semantic-text-secondary">
                    {{ t('settings.bindIdentity.codeHint') }}
                  </view>

                  <view>
                    <view
                      class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2 text-center text-[13px]"
                      :class="codeSending || resendSeconds > 0 ? 'pointer-events-none opacity-60' : ''"
                      @click="handleSendCode"
                    >
                      {{ bindSendCodeText }}
                    </view>
                  </view>

                  <view v-if="codeRequested">
                    <view class="mb-2 text-[12px] font-medium text-semantic-text-secondary">
                      {{ t('settings.bindIdentity.code') }}
                    </view>
                    <input
                      v-model="bindForm.code"
                      class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
                      :placeholder="t('settings.bindIdentity.codePlaceholder')"
                    />
                  </view>

                  <view v-if="bindError" class="text-[13px] font-medium text-semantic-state-danger">
                    {{ bindError }}
                  </view>
                </view>

                <view class="mt-7 flex justify-end gap-3">
                  <view
                    class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[13px]"
                    @click="cancelBindForm"
                  >
                    {{ t('settings.actions.cancelBind') }}
                  </view>
                  <view
                    v-if="codeRequested"
                    class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2 text-[13px]"
                    :class="binding ? 'opacity-50 pointer-events-none' : ''"
                    @click="handleBindIdentity"
                  >
                    {{ binding ? t('settings.actions.binding') : t('settings.actions.bind') }}
                  </view>
                </view>
              </view>
            </view>

            <view class="pt-6">
              <view class="flex items-center gap-3">
                <view class="text-[13px] font-medium text-semantic-text-secondary">
                  {{ t('settings.security.password') }}
                </view>
                <view class="text-[12px] text-semantic-text-muted">{{ t('settings.security.passwordNote') }}</view>
              </view>

              <view class="mt-3 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
                <view class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4">
                  <text class="text-semantic-text-secondary">{{ t('settings.security.password') }}</text>
                  <text class="font-medium text-semantic-text-primary">{{ settings.password.isSet ? t('settings.security.passwordSet') : t('settings.security.passwordUnset') }}</text>
                </view>
                <view class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4">
                  <text class="text-semantic-text-secondary">{{ t('settings.security.lastChangedAt') }}</text>
                  <text class="font-medium text-semantic-text-primary">{{ settings.password.lastChangedAt ? formatLocalizedDateTime(locale, settings.password.lastChangedAt) : t('settings.security.neverChanged') }}</text>
                </view>
                <view class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4">
                  <text class="text-semantic-text-secondary">{{ t('settings.security.canReset') }}</text>
                  <text class="font-medium text-semantic-text-primary">{{ settings.password.canReset ? t('common.yes') : t('common.no') }}</text>
                </view>
                <view class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4">
                  <text class="text-semantic-text-secondary">{{ t('settings.security.requiresMfa') }}</text>
                  <text class="font-medium text-semantic-text-primary">{{ settings.password.requiresMfa ? t('common.yes') : t('common.no') }}</text>
                </view>
              </view>

              <view class="mt-4">
                <view
                  v-if="!showPasswordForm"
                  class="inline-flex cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px] transition-colors hover:bg-semantic-surface-soft"
                  @click="handleChangePassword"
                >
                  {{ t('settings.actions.changePassword') }}
                </view>

                <view v-else class="max-w-[400px] space-y-3">
                  <input v-model="passwordForm.current" type="password"
                    :placeholder="t('settings.passwordFields.current')"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary" />
                  <input v-model="passwordForm.new" type="password"
                    :placeholder="t('settings.passwordFields.newPassword')"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary" />
                  <input v-model="passwordForm.confirm" type="password"
                    :placeholder="t('settings.passwordFields.confirmNew')"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary" />
                  <view v-if="passwordError" class="text-[13px] text-semantic-state-danger">{{ passwordError }}</view>
                  <view class="flex gap-2">
                    <view class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[13px]" @click="cancelPasswordForm">
                      {{ t('settings.actions.cancelEdit') }}
                    </view>
                    <view class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-3 py-2 text-[13px]"
                      :class="changingPassword ? 'opacity-50 pointer-events-none' : ''" @click="confirmPasswordChange">
                      {{ t('settings.actions.changePassword') }}
                    </view>
                  </view>
                </view>
              </view>

            </view>
          </view>

          <!-- Notifications -->
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel">
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.notifications') }}
              </view>
              <view class="mt-0.5 text-[13px] text-semantic-text-muted">{{ t('settings.sectionHints.notifications') }}</view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in notificationItems"
                  :key="item.code"
                  class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
              >
                <text class="text-semantic-text-secondary">{{ item.label }}</text>

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
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel">
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.servicePreferences') }}
              </view>
              <view class="mt-0.5 text-[13px] text-semantic-text-muted">{{ t('settings.sectionHints.servicePreferences') }}</view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in servicePreferenceItems"
                  :key="item.code"
                  class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
              >
                <text class="text-semantic-text-secondary">{{ item.label }}</text>

                <input
                  v-if="editing && item.code === 'preferred_city'"
                  :value="String(readPreference(item.code) ?? '')"
                  class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[14px] leading-6 text-semantic-text-primary"
                  @input="(e: any) => writePreference(item.code, e.detail.value)"
                />
                <view v-else-if="editing && item.code === 'preferred_contact_channel'" class="flex flex-wrap gap-2">
                  <view
                    v-for="ch in contactChannelOptions"
                    :key="ch.value"
                    class="cursor-pointer border px-3 py-1.5 text-[13px]"
                    :class="readPreference(item.code) === ch.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
                      : 'border-semantic-border-soft bg-semantic-surface-panel'"
                    @click="writePreference(item.code, ch.value)"
                  >
                    {{ ch.label }}
                  </view>
                </view>
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
          <view class="border border-semantic-border-default bg-semantic-surface-card px-7 py-6 shadow-panel">
            <view class="border-b border-semantic-border-soft pb-4">
              <view class="text-[16px] font-semibold text-semantic-text-primary">
                {{ t('settings.privacy') }}
              </view>
              <view class="mt-0.5 text-[13px] text-semantic-text-muted">{{ t('settings.sectionHints.privacy') }}</view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view
                  v-for="item in privacyItems"
                  :key="item.code"
                  class="grid gap-2 border border-transparent px-3 py-4 text-[14px] transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-4"
              >
                <text class="text-semantic-text-secondary">{{ item.label }}</text>

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
              <view class="mt-0.5 text-[13px] text-semantic-text-muted">{{ t('settings.sectionHints.accountActions') }}</view>
            </view>

            <view class="divide-y divide-semantic-border-soft">
              <view class="flex flex-wrap items-center justify-between gap-3 border border-transparent px-3 py-4 transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft">
                <view>
                  <view class="text-[14px] font-medium text-semantic-text-primary">
                    {{ t('settings.actions.exportData') }}
                  </view>
                  <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                    {{ t('settings.actionHints.exportData') }}
                  </view>
                </view>
                <view
                  class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-1.5 text-[13px] transition-colors hover:bg-semantic-surface-soft"
                  @click="handleExportData"
                >
                  {{ t('settings.actions.exportData') }}
                </view>
              </view>
              <view class="flex flex-wrap items-center justify-between gap-3 border border-transparent px-3 py-4 transition-all duration-200 hover:-translate-y-[1px] hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-soft">
                <view>
                  <view class="text-[14px] font-medium text-semantic-text-primary">
                    {{ t('settings.actions.deactivateAccount') }}
                  </view>
                  <view class="mt-1 text-[13px] leading-6 text-semantic-text-secondary">
                    {{ t('settings.actionHints.deactivateAccount') }}
                  </view>
                </view>
                <view
                  class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-1.5 text-[13px] transition-colors hover:bg-semantic-surface-soft"
                  @click="handleDeactivateAccount"
                >
                  {{ t('settings.actions.deactivateAccount') }}
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Legal links -->
        <view class="mt-5 border-t border-semantic-border-soft px-1 pt-4">
          <view class="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] leading-5 text-semantic-text-muted">
            <text>{{ t('settings.legal') }}</text>
            <text
                class="cursor-pointer transition-colors duration-200 hover:text-semantic-text-link hover:underline hover:underline-offset-4"
                @click="openAgreementDialog('terms')"
            >
              {{ t('settings.actions.viewTerms') }}
            </text>
            <text
                class="cursor-pointer transition-colors duration-200 hover:text-semantic-text-link hover:underline hover:underline-offset-4"
                @click="openAgreementDialog('privacy')"
            >
              {{ t('settings.actions.viewPrivacy') }}
            </text>
          </view>
        </view>
      </view>

      <EmptyStatePanel
          v-else-if="!loading && !error"
          :subtitle="t('settings.empty.description')"
          :title="t('settings.empty.title')"
          size="page"
      />
      <EmptyStatePanel
          v-else-if="!loading && error"
          :subtitle="t('settings.error.description')"
          :title="t('settings.error.title')"
          size="page"
      />
    </view>
  </AccountShell>

  <AgreementDialog
      :document="agreementDocument"
      :error="agreementError"
      :loading="agreementLoading"
      :open="agreementDialogOpen"
      @close="closeAgreementDialog"
  />
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AccountPreferencesDTO } from '@/api/account'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import AgreementDialog from '@/components/common/AgreementDialog.vue'
import EmptyStatePanel from '@/components/common/feedback/EmptyStatePanel.vue'
import { useAccountSettings } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { formatLocalizedDateTime } from '@/utils/locale-format'
import { maskIdentifier } from '@/mappers/account-settings'
import { validatePassword } from '@/utils/validate'
import { useAuthStore } from '@/stores/modules/auth'
import type { AccountPreferenceCode } from '@/types/account/settings'
import { openLoginPage } from '@/utils/navigation'
import { useAgreementDialog } from '@/hooks/legal'

const { t, locale } = usePageI18n('accountCenter')
const { t: globalT } = useI18n({ useScope: 'global' })
const { loading, error, settings, refresh, saveAccount, savePreferences, uploadAvatar, changePassword, deactivateAccount, requestVerificationCode, bindIdentity, unbindIdentity, exportData } = useAccountSettings()
watch(locale, () => { if (!editing.value) { void refresh() } })
const editing = ref(false)
const saving = ref(false)
const accountDraft = ref<{ accountName: string; avatarUrl: string; preferredLocale: 'zh' | 'en' | 'fr' }>({ accountName: '', avatarUrl: '', preferredLocale: 'zh' })
const defaultAvatar = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23e5e7eb" width="100" height="100"/><text x="50" y="58" text-anchor="middle" fill="%239ca3af" font-size="40">?</text></svg>'
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

function buildPreferenceItems(codes: AccountPreferenceCode[]) {
  return codes.map((code) => {
    const key = PREFERENCE_CODE_TO_KEY[code]
    return { code, label: t(`settings.preference.${code}`), displayValue: formatPreferenceDisplay(code, settings.value?.preferences?.[key]) }
  })
}

function formatPreferenceDisplay(code: AccountPreferenceCode, value: unknown) {
  if (code === 'preferred_city' && (!value || value === '')) return t('settings.placeholders.preferredCity')
  if (code === 'preferred_contact_channel' && typeof value === 'string') return t(`settings.contactChannel.${value}`)
  if (typeof value === 'boolean') return value ? t('common.yes') : t('common.no')
  if (Array.isArray(value)) return value.join(' / ')
  return String(value ?? '')
}

type BindableIdentityProvider = 'email' | 'phone'
type SecurityAccountItem = {
  id: string
  provider: 'email' | 'phone'
  providerLabel: string
  identifier: string
  verifiedText: string
  canBind: boolean
  canUnbind: boolean
}

const securityAccountItems = computed<SecurityAccountItem[]>(() => {
  const identities = (settings.value?.identities ?? []).filter((item) => item.provider === 'email' || item.provider === 'phone')
  const real = identities
    .map((item, _index, list) => ({
    id: item.id,
    provider: item.provider as 'email' | 'phone',
    providerLabel: t(`settings.provider.${item.provider}`),
    identifier: maskIdentifier(item.identifier, item.provider),
    verifiedText: item.verifiedAt ? t('settings.security.verified') : t('settings.security.unverified'),
    canBind: false,
    canUnbind: list.length > 1,
  }))
  const previews = [
    { id: 'email-preview', provider: 'email' as const, providerLabel: t('settings.provider.email'), identifier: t('settings.security.unbound'), verifiedText: t('settings.security.unverified'), canBind: true, canUnbind: false },
    { id: 'phone-preview', provider: 'phone' as const, providerLabel: t('settings.provider.phone'), identifier: t('settings.security.unbound'), verifiedText: t('settings.security.unverified'), canBind: true, canUnbind: false },
  ]
  const providers = new Set(real.map((item) => item.provider))
  return [...real, ...previews.filter((item) => !providers.has(item.provider))]
})

const notificationItems = computed(() => buildPreferenceItems([
  'introduction_updates_enabled',
  'event_reminders_enabled',
  'service_announcements_enabled',
  'marketing_emails_enabled',
]))

const servicePreferenceItems = computed(() => buildPreferenceItems([
  'preferred_city',
  'preferred_contact_channel',
  'advisor_contact_enabled',
  'family_assist_enabled',
]))

const privacyItems = computed(() => buildPreferenceItems(['analytics_consent_enabled']))

const {
  agreementDialogOpen,
  agreementDocument,
  agreementLoading,
  agreementError,
  openAgreementDialog,
  closeAgreementDialog,
} = useAgreementDialog()
const booleanOptions = computed(() => [
  { label: t('common.yes'), value: true },
  { label: t('common.no'), value: false },
])

watch(settings, (value) => {
  if (!value || saving.value) return
  accountDraft.value = {
    accountName: value.account.accountName,
    avatarUrl: value.account.avatarUrl,
    preferredLocale: (value.account.preferredLocale ?? 'zh') as 'zh' | 'en' | 'fr',
  }
  preferenceDraft.value = Object.fromEntries(
    Object.entries(PREFERENCE_CODE_TO_KEY)
      .filter(([, key]) => value.preferences[key] !== undefined)
      .map(([code, key]) => [code, value.preferences[key]]),
  ) as Record<string, string | boolean | number | string[]>
}, { immediate: true })

function startEditing() {
  accountDraft.value = {
    accountName: settings.value?.account.accountName ?? '',
    avatarUrl: settings.value?.account.avatarUrl ?? '',
    preferredLocale: (settings.value?.account.preferredLocale ?? 'zh') as 'zh' | 'en' | 'fr',
  }
  preferenceDraft.value = Object.fromEntries(
    Object.entries(PREFERENCE_CODE_TO_KEY)
      .filter(([, key]) => settings.value?.preferences[key] !== undefined)
      .map(([code, key]) => [code, settings.value?.preferences[key]]),
  ) as Record<string, string | boolean | number | string[]>
  editing.value = true
}

async function chooseAndUploadAvatar() {
  const path = await new Promise<string | null>((resolve) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => resolve(result.tempFilePaths[0] ?? null),
      fail: () => resolve(null),
    })
  })
  if (!path) return

  try {
    const url = await uploadAvatar(path)
    accountDraft.value.avatarUrl = url
  } catch {
    uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
  }
}

function cancelEditing() {
  editing.value = false
}

function readPreference(code: string) {
  return preferenceDraft.value[code]
}

function writePreference(code: string, value: string | boolean | number | string[]) {
  preferenceDraft.value[code] = value
}

const localeOptions = computed(() => [
  { label: t('settings.locale.zh'), value: 'zh' as const },
  { label: t('settings.locale.en'), value: 'en' as const },
  { label: t('settings.locale.fr'), value: 'fr' as const },
])

const contactChannelOptions = computed(() => [
  { label: t('settings.contactChannel.email'), value: 'email' },
  { label: t('settings.contactChannel.phone'), value: 'phone' },
  { label: t('settings.contactChannel.wechat'), value: 'wechat' },
])

// password change
const showPasswordForm = ref(false)
const passwordForm = ref({ current: '', new: '', confirm: '' })
const passwordError = ref('')
const changingPassword = ref(false)

async function handleExportData() {
  try {
    const exported = await exportData()
    if (!exported) {
      uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
      return
    }
    uni.showToast({ title: t('settings.toasts.exportReady'), icon: 'success' })
  } catch {
    uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
  }
}

async function handleDeactivateAccount() {
  const confirmed = await confirmDeactivateAccount()
  if (!confirmed) return

  try {
    const result = await deactivateAccount()
    if (!result) {
      uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
      return
    }
    const authStore = useAuthStore()
    authStore.logout()
    uni.redirectTo({ url: '/pages/auth/login' })
  } catch {
    uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
  }
}

function confirmDeactivateAccount() {
  return new Promise<boolean>((resolve) => {
    uni.showModal({
      title: t('settings.deactivateConfirm.title'),
      content: t('settings.deactivateConfirm.description'),
      confirmText: t('settings.deactivateConfirm.confirm'),
      cancelText: t('settings.deactivateConfirm.cancel'),
      success: (result) => resolve(result.confirm),
      fail: () => resolve(false),
    })
  })
}

// identity bind/unbind
const showBindForm = ref(false)
const bindForm = ref({ provider: 'phone' as BindableIdentityProvider, identifier: '', code: '' })
const binding = ref(false)
const bindError = ref('')
const codeSending = ref(false)
const codeRequested = ref(false)
const codeExpiresAt = ref('')
const resendSeconds = ref(0)
let resendTimer: ReturnType<typeof setInterval> | null = null

onUnmounted(() => {
  resetBindResendCountdown()
})

const bindIdentityTitle = computed(() => t(`settings.bindIdentity.${bindForm.value.provider}.title`))
const bindIdentityDescription = computed(() => t(`settings.bindIdentity.${bindForm.value.provider}.description`))
const bindIdentityIdentifierLabel = computed(() => t(`settings.bindIdentity.${bindForm.value.provider}.identifier`))
const bindIdentityIdentifierPlaceholder = computed(() => t(`settings.bindIdentity.${bindForm.value.provider}.identifierPlaceholder`))
const bindSendCodeText = computed(() => {
  if (codeSending.value) return t('settings.bindIdentity.sending')
  if (resendSeconds.value > 0) return t('settings.bindIdentity.resendCountdown', { seconds: resendSeconds.value })
  return codeRequested.value ? t('settings.bindIdentity.resend') : t('settings.bindIdentity.sendCode')
})

function openBindForm(provider: BindableIdentityProvider) {
  bindForm.value = { provider, identifier: '', code: '' }
  bindError.value = ''
  codeRequested.value = false
  codeExpiresAt.value = ''
  resetBindResendCountdown()
  showBindForm.value = true
}

function cancelBindForm() {
  showBindForm.value = false
  bindError.value = ''
  resetBindResendCountdown()
}

async function handleSendCode() {
  bindError.value = ''
  if (!bindForm.value.identifier.trim()) {
    bindError.value = t('settings.validation.identifierRequired')
    return
  }
  if (!isValidBindIdentifier(bindForm.value.provider, bindForm.value.identifier)) {
    bindError.value = t('settings.validation.identifierInvalid')
    return
  }
  codeSending.value = true
  try {
    const result = await requestVerificationCode({ provider: bindForm.value.provider, identifier: bindForm.value.identifier.trim() })
    if (result) {
      codeRequested.value = true
      codeExpiresAt.value = result.expiresAt
      startBindResendCountdown()
    }
  } catch {
    bindError.value = t('settings.toasts.saveFailed')
  } finally {
    codeSending.value = false
  }
}

async function handleBindIdentity() {
  bindError.value = ''
  if (!isValidBindIdentifier(bindForm.value.provider, bindForm.value.identifier)) {
    bindError.value = t('settings.validation.identifierInvalid')
    return
  }
  if (!bindForm.value.code.trim()) {
    bindError.value = t('settings.validation.codeRequired')
    return
  }
  binding.value = true
  try {
    const result = await bindIdentity(bindForm.value)
    if (!result) { bindError.value = t('settings.toasts.saveFailed'); return }
    showBindForm.value = false
    resetBindResendCountdown()
    uni.showToast({ title: t('settings.toasts.saved'), icon: 'success' })
  } catch {
    bindError.value = t('settings.toasts.saveFailed')
  } finally {
    binding.value = false
  }
}

function startBindResendCountdown() {
  resetBindResendCountdown()
  resendSeconds.value = 60
  resendTimer = setInterval(() => {
    resendSeconds.value -= 1
    if (resendSeconds.value <= 0) {
      resetBindResendCountdown()
    }
  }, 1000)
}

function resetBindResendCountdown() {
  resendSeconds.value = 0
  if (resendTimer) {
    clearInterval(resendTimer)
    resendTimer = null
  }
}

function isValidBindIdentifier(provider: BindableIdentityProvider, value: string) {
  const trimmed = value.trim()
  return provider === 'email'
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    : /^\+?[1-9]\d{6,14}$/.test(trimmed.replace(/[\s-]/g, ''))
}

async function handleUnbindIdentity(id: string) {
  try {
    const result = await unbindIdentity(id)
    if (result) {
      uni.showToast({ title: t('settings.toasts.saved'), icon: 'success' })
    } else {
      uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
    }
  } catch {
    uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
  }
}

function handleChangePassword() {
  passwordForm.value = { current: '', new: '', confirm: '' }
  passwordError.value = ''
  showPasswordForm.value = true
}

function cancelPasswordForm() {
  showPasswordForm.value = false
}

async function confirmPasswordChange() {
  passwordError.value = ''
  if (!passwordForm.value.current) {
    passwordError.value = t('settings.validation.currentPasswordRequired')
    return
  }

  const pwErrKey = validatePassword(passwordForm.value.new)
  if (pwErrKey) {
    passwordError.value = globalT(pwErrKey)
    return
  }

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = t('settings.validation.passwordsMismatch')
    return
  }

  changingPassword.value = true
  try {
    const result = await changePassword({
      currentPassword: passwordForm.value.current,
      newPassword: passwordForm.value.new,
    })
    if (result) {
      uni.showToast({ title: t('settings.toasts.passwordChanged'), icon: 'success' })
      const authStore = useAuthStore()
      authStore.logout()
      openLoginPage()
    } else {
      passwordError.value = t('settings.validation.incorrectPassword')
    }
  } catch (err: any) {
    passwordError.value = err?.statusCode === 400
      ? t('settings.validation.incorrectPassword')
      : t('settings.toasts.saveFailed')
  } finally {
    changingPassword.value = false
  }
}

async function saveSettings() {
  if (!accountDraft.value.accountName.trim()) {
    uni.showToast({ title: t('settings.validation.accountNameRequired'), icon: 'none' })
    return
  }

  saving.value = true
  const accountPayload = {
    accountName: accountDraft.value.accountName.trim(),
    avatarUrl: accountDraft.value.avatarUrl.trim(),
    preferredLocale: accountDraft.value.preferredLocale,
  }
  const prefsPayload = toPreferencePayload(preferenceDraft.value)
  try {
    const accountOk = await saveAccount(accountPayload)
    if (!accountOk) {
      uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
      return
    }

    const prefsOk = await savePreferences({ preferences: prefsPayload })
    if (!prefsOk) {
      uni.showToast({ title: t('settings.toasts.saveFailed'), icon: 'none' })
      return
    }

    uni.showToast({ title: t('settings.toasts.saved'), icon: 'success' })
    editing.value = false
  } finally {
    saving.value = false
  }
}

function toPreferencePayload(values: Record<string, string | boolean | number | string[]>): Partial<AccountPreferencesDTO> {
  return Object.fromEntries(
    Object.entries(PREFERENCE_CODE_TO_KEY)
      .filter(([code]) => values[code] !== undefined)
      .map(([code, key]) => [key, values[code]]),
  ) as Partial<AccountPreferencesDTO>
}
</script>
