<template>
  <AccountShell active-page="profiles">
    <view v-if="pageData" class="grid gap-6">
      <view
        class="inline-flex w-fit cursor-pointer items-center gap-2 text-[14px] text-semantic-text-secondary transition-colors hover:text-semantic-text-primary"
        @click="goBack"
      >
        <text>&lt;</text>
        <text>{{ t('profiles.detail.back') }}</text>
      </view>

      <AccountSubPageHeader
        :label="t('profiles.title')"
        :title="pageData.profileTitle || resolveProfileTitleText()"
        :description="t('profiles.detail.subtitle')"
      />

      <view class="flex flex-wrap items-center gap-2 text-[13px] text-semantic-text-secondary">
        <view>{{ t('profiles.detail.editLocale') }}</view>
        <view
          v-for="item in locales"
          :key="item"
          class="cursor-pointer border px-3 py-1.5 transition-colors"
          :class="editLocale === item
            ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
            : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary hover:text-semantic-text-primary'"
          @click="requestEditLocaleChange(item)"
        >
          {{ t(`profiles.detail.values.language.${item}`) }}
        </view>
      </view>
      <view
        v-if="localeSwitchPromptOpen"
        class="flex flex-wrap items-center justify-between gap-4 border border-semantic-border-emphasis bg-semantic-surface-card px-4 py-3 text-[14px] shadow-panel"
      >
        <view class="text-semantic-text-secondary">
          {{ t('profiles.detail.switchLocaleNotice') }}
        </view>
        <view class="flex flex-wrap gap-2">
          <view
            class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-3 py-2 text-semantic-text-primary"
            @click="saveAndSwitchLocale"
          >
            {{ t('profiles.actions.saveBeforeSwitch') }}
          </view>
          <view
            class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-semantic-text-secondary"
            @click="discardAndSwitchLocale"
          >
            {{ t('profiles.actions.discardBeforeSwitch') }}
          </view>
          <view
            class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-semantic-text-secondary"
            @click="cancelLocaleSwitch"
          >
            {{ t('common.cancel') }}
          </view>
        </view>
      </view>

      <view class="flex flex-wrap gap-3">
        <view
          class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-3 text-[14px]"
          @click="toggleEditing"
        >
          {{ editing ? t('profiles.actions.cancelEdit') : t('profiles.actions.edit') }}
        </view>
        <view
          v-if="editing"
          class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px]"
          @click="saveDraft"
        >
          {{ t('profiles.actions.save') }}
        </view>
        <view
          v-if="!createMode"
          class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-3 text-[14px]"
          @click="archiveProfile"
        >
          {{ t('profiles.actions.archive') }}
        </view>
      </view>

      <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
        <view class="flex flex-wrap items-center gap-4">
          <image :src="pageData.avatarUrl" class="h-16 w-16 rounded-full object-cover" />
          <view>
            <view class="text-[20px] font-semibold">{{ pageData.profileTitle || resolveProfileTitleText() }}</view>
            <view class="mt-1 text-[14px] text-semantic-text-secondary">{{ pageData.city || '-' }}</view>
          </view>
          <view class="flex flex-wrap gap-2">
            <view
              v-for="badge in pageData.ownershipBadgeKeys"
              :key="badge"
              class="border border-semantic-border-soft bg-semantic-surface-panel px-3 py-1.5 text-[12px] text-semantic-text-secondary"
            >
              {{ t(badge) }}
            </view>
          </view>
        </view>

        <view class="mt-6 grid border-t border-semantic-border-soft pt-5 sm:grid-cols-3">
          <view
            v-for="entry in pageData.statusItems"
            :key="entry.labelKey"
            class="border-b border-semantic-border-soft py-4 sm:border-r sm:px-4 xl:border-b-0 first:sm:pl-0 last:sm:border-r-0"
          >
            <view class="text-[12px] text-semantic-text-card-label">{{ t(entry.labelKey) }}</view>
            <view class="mt-2 text-[14px] text-semantic-text-primary">{{ formatStatusValue(entry) }}</view>
          </view>
        </view>

        <view class="mt-6 border-t border-semantic-border-soft pt-5">
          <view class="text-[16px] font-semibold">{{ t('profiles.detail.sections.ownership') }}</view>
          <view class="mt-4 grid gap-4 md:grid-cols-3">
            <view>
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.detail.fields.relationshipToProfile') }}</view>
              <view v-if="editing" class="mt-2 max-w-[280px]">
                <view class="relative">
                  <view
                    class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                    @click="toggleSelect('relationshipToProfile')"
                  >
                    <text>{{ selectedRelationshipLabel }}</text>
                    <text class="text-semantic-text-muted">{{ openSelectKey === 'relationshipToProfile' ? '^' : 'v' }}</text>
                  </view>
                  <view
                    v-if="openSelectKey === 'relationshipToProfile'"
                    class="absolute left-0 top-[calc(100%+6px)] z-30 w-full overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                  >
                    <view
                      v-for="option in relationshipOptions"
                      :key="option.value"
                      class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                      :class="option.value === draftOwnership.relationshipToProfile
                        ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                        : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                      @click="selectRelationship(option.value)"
                    >
                      {{ option.label }}
                    </view>
                  </view>
                </view>
            </view>
            <view v-else class="mt-2 text-[15px]">{{ selectedRelationshipLabel }}</view>
          </view>
          </view>
        </view>
      </view>

      <view class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <view class="grid gap-6">
          <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.detail.sections.photos') }}</view>
            <view class="mt-5 grid gap-4">
              <view
                v-for="photo in visiblePhotoDrafts"
                :key="photo.clientId"
                class="grid gap-4 border border-semantic-border-soft bg-semantic-surface-panel p-4 md:grid-cols-[120px_minmax(0,1fr)]"
              >
                <image :src="photo.url" class="h-[120px] w-full object-cover" />
                <view class="grid gap-3">
                  <view v-if="!editing" class="text-[14px] text-semantic-text-secondary">
                    {{ photoStatusLabel(photo.status) }}
                  </view>
                  <view v-else class="grid gap-3">
                    <view class="text-[13px] text-semantic-text-muted">
                      {{ photoStatusLabel(photo.status) }}
                    </view>
                    <view class="w-fit cursor-pointer border border-semantic-border-soft bg-semantic-surface-card px-3 py-2 text-[13px]" @click="chooseDraftPhoto(photo.clientId)">
                      {{ t('profiles.detail.choosePhoto') }}
                    </view>
                  </view>
                  <view v-if="editing" class="flex flex-wrap gap-2">
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]" @click="markPrimaryPhoto(photo.clientId)">
                      {{ photo.isPrimary ? t('profiles.detail.photoPrimary') : t('profiles.detail.setPrimary') }}
                    </view>
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]" @click="removePhotoDraft(photo.clientId)">
                      {{ t('profiles.actions.remove') }}
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="editing" class="grid gap-3 border border-semantic-border-soft bg-semantic-surface-panel p-4">
                <view class="w-fit cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2.5 text-[14px]" @click="addDraftPhoto">
                  {{ t('profiles.detail.addPhoto') }}
                </view>
              </view>
            </view>
          </view>

          <view
            v-for="section in pageData.profileSections"
            :key="section.key"
            class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel"
          >
            <view class="flex items-center justify-between gap-4">
              <view class="text-[16px] font-semibold">{{ t(section.titleKey) }}</view>
            </view>
            <view class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
              <view
                v-for="entry in section.items"
                :key="entry.labelKey"
                class="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start"
              >
                <view class="text-[13px] text-semantic-text-secondary">
                  {{ t(entry.labelKey) }}
                  <text v-if="entry.required" class="text-semantic-state-danger">*</text>
                </view>
                <view v-if="!editing || !entry.fieldKey" class="min-h-[24px] text-[15px]">
                  <view v-if="entry.editor === 'list'" class="flex flex-wrap gap-2">
                    <view
                      v-for="item in displayListItems(entry)"
                      :key="item"
                      class="border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1.5 text-[12px] text-semantic-text-secondary"
                    >
                      {{ item }}
                    </view>
                  </view>
                  <template v-else>{{ formatDisplayValue(entry) }}</template>
                </view>
                <view v-else-if="entry.editor === 'boolean'" class="flex flex-wrap gap-2">
                  <view
                    v-for="option in booleanOptions"
                    :key="String(option.value)"
                    class="cursor-pointer border px-3 py-2 text-[14px]"
                    :class="readBooleanDraft(entry.fieldKey) === option.value
                      ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
                      : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'"
                    @click="writeBooleanDraft(entry.fieldKey, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <view v-else-if="entry.editor === 'enum'" class="max-w-[360px]">
                  <view class="relative">
                    <view
                      class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                      @click="toggleSelect(entry.fieldKey)"
                    >
                      <text>{{ selectedEnumLabel(entry.fieldKey) }}</text>
                      <text class="text-semantic-text-muted">{{ openSelectKey === entry.fieldKey ? '^' : 'v' }}</text>
                    </view>
                    <view
                      v-if="openSelectKey === entry.fieldKey"
                      class="absolute left-0 top-[calc(100%+6px)] z-30 w-full overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                    >
                      <view
                        v-for="option in enumOptions(entry.fieldKey)"
                        :key="option.value"
                        class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                        :class="option.value === readDraft(entry.fieldKey)
                          ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                          : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                        @click="selectEnum(entry.fieldKey, option.value)"
                      >
                        {{ option.label }}
                      </view>
                    </view>
                  </view>
                </view>
                <view v-else-if="entry.editor === 'list' && entry.fieldKey === 'relationshipValues'" class="flex flex-wrap gap-2">
                  <view
                    v-for="option in relationshipValueOptions"
                    :key="option.value"
                    class="cursor-pointer rounded-full border px-3 py-1.5 text-[13px] transition-colors"
                    :class="selectionChipClass(readListDraft(entry.fieldKey).includes(option.value))"
                    @click="toggleListDraft(entry.fieldKey, option.value)"
                  >
                    {{ option.label }}
                  </view>
                </view>
                <view v-else-if="entry.editor === 'list'" class="grid gap-3">
                  <view class="flex flex-wrap gap-2">
                    <view
                      v-for="item in readListDraft(entry.fieldKey)"
                      :key="item"
                      class="flex items-center gap-2 border border-component-directory-card-tag-border bg-component-directory-card-tag-background px-3 py-1.5 text-[12px] text-semantic-text-secondary"
                    >
                      <text>{{ displayTagDraft(entry.fieldKey, item) }}</text>
                      <text class="cursor-pointer text-semantic-text-muted" @click="removeListDraft(entry.fieldKey, item)">x</text>
                    </view>
                  </view>
                  <view class="flex flex-wrap gap-2">
                    <input
                      :value="readTagInput(entry.fieldKey)"
                      class="box-border min-h-[40px] min-w-[220px] flex-1 border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
                      :placeholder="t('profiles.detail.tagPlaceholder')"
                      @input="writeTagInput(entry.fieldKey, getInputValue($event))"
                    />
                    <view
                      class="cursor-pointer border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2 text-[14px]"
                      @click="addListDraft(entry.fieldKey)"
                    >
                      {{ t('profiles.actions.add') }}
                    </view>
                  </view>
                </view>
                <view v-else-if="entry.editor === 'ageRange'" class="grid gap-3 sm:grid-cols-2">
                  <input
                    :value="readDraft('preferredAgeMin')"
                    type="number"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                    @input="writeDraft('preferredAgeMin', getInputValue($event))"
                  />
                  <input
                    :value="readDraft('preferredAgeMax')"
                    type="number"
                    class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                    @input="writeDraft('preferredAgeMax', getInputValue($event))"
                  />
                </view>
                <input
                  v-else
                  :value="readDraft(entry.fieldKey)"
                  :type="entry.editor === 'number' ? 'number' : 'text'"
                  class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                  @input="writeDraft(entry.fieldKey, getInputValue($event))"
                />
              </view>
            </view>
          </view>

          <view class="border border-semantic-border-default bg-semantic-surface-card px-6 py-6 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t(pageData.contactSection.titleKey) }}</view>
            <view class="mt-5 divide-y divide-semantic-border-soft border-y border-semantic-border-soft">
              <view
                v-for="entry in pageData.contactSection.items"
                :key="entry.labelKey"
                class="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start"
              >
                <view class="text-[13px] text-semantic-text-secondary">{{ t(entry.labelKey) }}</view>
                <view v-if="!editing || !entry.fieldKey" class="min-h-[24px] text-[15px]">
                  {{ formatDisplayValue(entry) }}
                </view>
                <view v-else-if="entry.editor === 'enum'" class="max-w-[360px]">
                  <view class="relative">
                    <view
                      class="flex min-h-[40px] cursor-pointer items-center justify-between border border-semantic-border-default bg-semantic-surface-soft px-3 text-[14px] transition-colors hover:border-semantic-border-interactive-hover hover:bg-semantic-surface-panel"
                      @click="toggleSelect(entry.fieldKey)"
                    >
                      <text>{{ selectedEnumLabel(entry.fieldKey) }}</text>
                      <text class="text-semantic-text-muted">{{ openSelectKey === entry.fieldKey ? '^' : 'v' }}</text>
                    </view>
                    <view
                      v-if="openSelectKey === entry.fieldKey"
                      class="absolute left-0 top-[calc(100%+6px)] z-30 w-full overflow-hidden border border-semantic-border-soft bg-semantic-surface-card shadow-dropdown"
                    >
                      <view
                        v-for="option in enumOptions(entry.fieldKey)"
                        :key="option.value"
                        class="cursor-pointer border-b border-semantic-border-divider px-3 py-2 text-[14px] last:border-b-0"
                        :class="option.value === readDraft(entry.fieldKey)
                          ? 'bg-component-directory-control-selected-background text-component-directory-control-selected-text'
                          : 'text-semantic-text-secondary hover:bg-semantic-surface-soft hover:text-semantic-text-primary'"
                        @click="selectEnum(entry.fieldKey, option.value)"
                      >
                        {{ option.label }}
                      </view>
                    </view>
                  </view>
                </view>
                <input
                  v-else
                  :value="readDraft(entry.fieldKey)"
                  class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                  @input="writeDraft(entry.fieldKey, getInputValue($event))"
                />
              </view>
            </view>
          </view>
        </view>

        <aside class="grid h-fit gap-6 xl:sticky xl:top-6">
          <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.verificationPanel.title') }}</view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.verificationPanel.description') }}
            </view>
            <view class="mt-4 grid gap-3">
              <view
                v-for="item in pageData.verificationItems"
                :key="item.key"
                class="flex items-center justify-between gap-3 border-t border-semantic-border-soft pt-3"
              >
                <view class="text-[14px] text-semantic-text-secondary">{{ t(item.labelKey) }}</view>
                <view
                  class="cursor-pointer border px-2.5 py-1 text-[12px] transition-colors hover:bg-semantic-surface-soft"
                  :class="verificationToneClass(item.tone)"
                  @click="openVerificationPanel(item.key)"
                >
                  {{ t(item.valueKey) }}
                </view>
              </view>
            </view>
            <view
              v-if="verificationPanelKey"
              class="mt-4 grid gap-3 border border-semantic-border-soft bg-semantic-surface-panel p-3"
            >
              <view class="flex items-center justify-between gap-3">
                <view class="text-[14px] font-semibold">{{ selectedVerificationTitle }}</view>
                <view class="cursor-pointer text-[12px] text-semantic-text-secondary" @click="verificationPanelKey = null">
                  {{ t('common.cancel') }}
                </view>
              </view>
              <template v-if="verificationPanelKey === 'identity' && isIdentityVerified">
                <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verificationPanel.verifiedIdentityHint') }}</view>
                <view class="grid gap-2 text-[13px]">
                  <view>{{ t('profiles.verification.legalName') }}: {{ maskedIdentityName || '-' }}</view>
                  <view>{{ t('profiles.verification.dateOfBirth') }}: {{ maskedIdentityDate || '-' }}</view>
                </view>
              </template>
              <template v-else-if="verificationPanelKey === 'identity'">
                <view class="text-[13px] text-semantic-text-secondary">
                  {{ editing ? t('profiles.verificationPanel.identityEditHint') : t('profiles.verificationPanel.identityReadOnlyHint') }}
                </view>
                <view>
                  <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verification.legalName') }}</view>
                  <input
                    v-if="editing"
                    :value="readDraft('legalName')"
                    class="mt-2 box-border min-h-[42px] w-full border border-semantic-border-soft bg-semantic-surface-card px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
                    @input="writeDraft('legalName', getInputValue($event))"
                  />
                  <view v-else class="mt-2 text-[14px] text-semantic-text-primary">{{ maskedIdentityName || '-' }}</view>
                </view>
                <view>
                  <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.verification.dateOfBirth') }}</view>
                  <input
                    v-if="editing"
                    :value="readDraft('dateOfBirth')"
                    class="mt-2 box-border min-h-[42px] w-full border border-semantic-border-soft bg-semantic-surface-card px-3 py-2 text-[14px] leading-6 text-semantic-text-primary"
                    placeholder="YYYY-MM-DD"
                    @input="writeDraft('dateOfBirth', getInputValue($event))"
                  />
                  <view v-else class="mt-2 text-[14px] text-semantic-text-primary">{{ maskedIdentityDate || '-' }}</view>
                </view>
              </template>
              <template v-else>
                <view class="text-[13px] leading-6 text-semantic-text-secondary">
                  {{ t('profiles.verificationPanel.staffManagedHint') }}
                </view>
              </template>
            </view>
          </view>

          <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-5 shadow-panel">
            <view class="text-[16px] font-semibold">{{ t('profiles.privacyPreferences.title') }}</view>
            <view class="mt-2 text-[13px] leading-6 text-semantic-text-secondary">
              {{ t('profiles.privacyPreferences.description') }}
            </view>
            <view class="mt-4 grid gap-3">
              <view
                v-for="item in pageData.privacyPreferenceItems"
                :key="item.key"
                class="flex items-center justify-between gap-3 border-t border-semantic-border-soft pt-3"
              >
                <view>
                  <view class="text-[14px]">{{ t(item.labelKey) }}</view>
                  <view class="mt-1 text-[12px] text-semantic-text-secondary">{{ t(item.statusKey) }}</view>
                </view>
                <view
                  class="cursor-pointer border px-3 py-1.5 text-[12px]"
                  :class="item.hidden
                    ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
                    : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'"
                  @click="togglePrivacyPreference(item.key, !item.hidden)"
                >
                  {{ item.hidden ? t('profiles.privacyPreferences.hidden') : t('profiles.privacyPreferences.default') }}
                </view>
              </view>
            </view>
          </view>
        </aside>
      </view>
    </view>

    <ConfirmDialog
      :open="confirmOpen"
      :title="confirmTitle"
      :description="confirmDescription"
      :confirm-label="confirmActionLabel"
      :cancel-label="t('common.cancel')"
      :destructive="true"
      :loading="confirmLoading"
      @confirm="handleConfirm"
      @cancel="confirmOpen = false"
    />
  </AccountShell>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useAccountProfileDetail } from '@/hooks/account'
import { usePageI18n } from '@/i18n/composables/use-page-i18n'
import { openMyProfilePage } from '@/utils/navigation'
import { formatLocalizedDateTime } from '@/utils/locale-format'
import type { ProfileDetailPageData } from '@/mappers/account-profile-detail'

const { t, locale, locales } = usePageI18n('accountCenter')
const profileId = ref('')
const createMode = ref(false)
const editLocale = ref(locale.value)
const {
  payload,
  pageData,
  saveDetail,
  savePrivacyPreferences,
  archive,
  uploadProfileImage,
} = useAccountProfileDetail(() => profileId.value, () => editLocale.value, () => createMode.value)
const editing = ref(false)
const draft = ref<Record<string, string>>({})
type PhotoDraft = {
  id?: string
  clientId: string
  url: string
  isPrimary: boolean
  sortOrder: number
  status: NonNullable<typeof payload.value>['photos'][number]['status']
  delete?: boolean
}
const photoDrafts = ref<PhotoDraft[]>([])
const draftOwnership = ref({
  relationshipToProfile: 'relative' as 'self' | 'father' | 'mother' | 'relative',
})
const tagInputs = ref<Record<string, string>>({})
const openSelectKey = ref<string | null>(null)
const pendingEditLocale = ref<typeof editLocale.value | null>(null)
const localeSwitchPromptOpen = ref(false)
const verificationPanelKey = ref<string | null>(null)

// confirm dialog
const confirmOpen = ref(false)
const confirmTitle = ref('')
const confirmDescription = ref('')
const confirmActionLabel = ref('')
const confirmLoading = ref(false)
let confirmAction: (() => Promise<void>) | null = null

function openConfirm(title: string, description: string, label: string, action: () => Promise<void>) {
  confirmTitle.value = title
  confirmDescription.value = description
  confirmActionLabel.value = label
  confirmAction = action
  confirmOpen.value = true
}

async function handleConfirm() {
  if (!confirmAction) return
  confirmLoading.value = true
  try { await confirmAction() }
  finally { confirmLoading.value = false; confirmOpen.value = false }
}

const visiblePhotoDrafts = computed(() => photoDrafts.value
  .filter((photo) => !photo.delete)
  .sort((a, b) => a.sortOrder - b.sortOrder))
const isIdentityVerified = computed(() => payload.value?.verification.identityStatus === 'verified')
const maskedIdentityName = computed(() => maskName(payload.value?.verification.legalName))
const maskedIdentityDate = computed(() => maskDate(payload.value?.verification.dateOfBirth))
const selectedVerificationTitle = computed(() => {
  const item = pageData.value?.verificationItems.find((entry) => entry.key === verificationPanelKey.value)
  return item ? t(item.labelKey) : ''
})

const hasSelfProfile = ref(false)

onLoad((query) => {
  createMode.value = query?.mode === 'create'
  if (createMode.value) {
    editing.value = true
    if (query && typeof query.rel === 'string' && ['self', 'father', 'mother', 'relative'].includes(query.rel)) {
      draftOwnership.value.relationshipToProfile = query.rel as typeof draftOwnership.value.relationshipToProfile
    }
    hasSelfProfile.value = query?.hasSelf === '1'
    return
  }
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

watch(payload, (value) => {
  if (!value) return
  hydrateDraft(value)
}, { immediate: true })

function hydrateDraft(value: NonNullable<typeof payload.value>) {
  draft.value = {
    profileName: value.profileName,
    gender: value.gender,
    birthYear: String(value.birthYear),
    height: String(value.height),
    city: value.city,
    country: value.country,
    nationality: value.nationality,
    languages: value.languages.join(' / '),
    degreeLevel: value.degreeLevel,
    education: value.education,
    industry: value.industry,
    careerDirection: value.careerDirection ?? '',
    maritalStatus: value.maritalStatus,
    hasChildren: String(value.hasChildren),
    childrenPlan: value.childrenPlan,
    acceptsLongDistance: String(value.acceptsLongDistance),
    datingIntentionCode: value.datingIntentionCode,
    relationshipGoal: value.relationshipGoal,
    residencePlan: value.residencePlan,
    relocation: value.relocation,
    relationshipValues: value.relationshipValues.join(' / '),
    preferredAgeMin: String(value.preferredAgeMin),
    preferredAgeMax: String(value.preferredAgeMax),
    preferredLocation: value.preferredLocation,
    preferredEducation: value.preferredEducation,
    familyLife: value.familyLife,
    dealBreakers: value.dealBreakers.join(' / '),
    smoking: value.smoking,
    drinking: value.drinking,
    exercise: value.exercise,
    activityLevel: value.activityLevel,
    weekendStyle: value.weekendStyle,
    pets: value.pets,
    personalityTraits: value.personalityTraits.join(' / '),
    interests: value.interests.join(' / '),
    communicationStyle: value.communicationStyle,
    summary: value.summary,
    tags: value.tags.join(' / '),
    familyVisible: String(value.familyVisible),
    legalName: value.verification.legalName ?? '',
    dateOfBirth: value.verification.dateOfBirth ?? '',
    phone: value.contact.phone ?? '',
    email: value.contact.email ?? '',
    wechat: value.contact.wechat ?? '',
    preferredChannel: value.contact.preferredChannel ?? 'email',
    contactVisibility: value.contact.visibility,
  }
  photoDrafts.value = value.photos.map((photo, index) => ({
    id: photo.id,
    clientId: photo.id,
    url: photo.url,
    isPrimary: photo.isPrimary,
    sortOrder: photo.sortOrder || index + 1,
    status: photo.status,
  }))
  draftOwnership.value = {
    relationshipToProfile: value.ownership.relationshipToProfile,
  }
  tagInputs.value = {}
}

function resolveProfileTitleText() {
  if (!pageData.value) return ''
  if (pageData.value.profileTitleRelation) {
    return `${t(pageData.value.profileTitleRelation)} ${t(pageData.value.profileTitleKey!)}`
  }
  return t(pageData.value.profileTitleKey!)
}

function formatDisplayValue(entry: ProfileDetailPageData['profileSections'][number]['items'][number]) {
  const v = entry.rawValue
  if (v === null || v === undefined) return '-'
  if (entry.editor === 'enum') return t(entry.valueKey!)
  if (entry.editor === 'boolean') return v ? t('common.yes') : t('common.no')
  if (entry.editor === 'list') return displayListItems(entry).join(' / ') || '-'
  if (entry.editor === 'number') return Number(v) > 0 ? String(v) : '-'
  return String(v) || '-'
}

function displayListItems(entry: ProfileDetailPageData['profileSections'][number]['items'][number]) {
  const values = Array.isArray(entry.rawValue) ? entry.rawValue : []
  if (values.length === 0) return ['-']
  if (entry.fieldKey === 'languages') {
    return values.map((value) => t(`profiles.detail.values.language.${value.toLowerCase()}`))
  }
  if (entry.fieldKey === 'relationshipValues') {
    return values.map((value) => t(`profiles.detail.values.relationshipValues.${value}`))
  }
  return values.map(String)
}

function formatStatusValue(entry: ProfileDetailPageData['statusItems'][number]) {
  const v = entry.rawValue
  if (typeof v !== 'string') return String(v)
  if (v.startsWith('profiles.')) return t(v)
  // ISO date from lastActiveAt
  return formatLocalizedDateTime(locale.value, v)
}

function goBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({ delta: 1 })
    return
  }
  openMyProfilePage()
}

function readDraft(fieldKey: string) {
  return draft.value[fieldKey] ?? ''
}

function writeDraft(fieldKey: string, value: string) {
  draft.value[fieldKey] = value
}

function toggleEditing() {
  if (editing.value) {
    if (payload.value) hydrateDraft(payload.value)
    editing.value = false
    return
  }
  editing.value = true
}

function requestEditLocaleChange(nextLocale: typeof editLocale.value) {
  if (nextLocale === editLocale.value) return
  if (!editing.value) {
    editLocale.value = nextLocale
    return
  }
  pendingEditLocale.value = nextLocale
  localeSwitchPromptOpen.value = true
}

function cancelLocaleSwitch() {
  pendingEditLocale.value = null
  localeSwitchPromptOpen.value = false
}

function saveAndSwitchLocale() {
  if (!pendingEditLocale.value) return
  void saveDraft().then((saved) => {
    if (!saved || !pendingEditLocale.value) return
    editLocale.value = pendingEditLocale.value
    cancelLocaleSwitch()
  })
}

function discardAndSwitchLocale() {
  if (!pendingEditLocale.value) return
  if (payload.value) hydrateDraft(payload.value)
  editing.value = false
  editLocale.value = pendingEditLocale.value
  cancelLocaleSwitch()
}

function readBooleanDraft(fieldKey: string) {
  return draft.value[fieldKey] === 'true'
}

function writeBooleanDraft(fieldKey: string, value: boolean) {
  draft.value[fieldKey] = String(value)
}

function getInputValue(event: Event) {
  return (event as unknown as { detail: { value: string } }).detail.value
}

function validateProfileDraft() {
  const requiredFields = [
    'profileName',
    'gender',
    'birthYear',
    'height',
    'city',
    'country',
    'degreeLevel',
    'education',
    'industry',
    'maritalStatus',
    'datingIntentionCode',
    'relationshipGoal',
    'summary',
  ]
  if (requiredFields.some((key) => !readDraft(key).trim() || readDraft(key) === '0')) {
    return t('profiles.validation.required')
  }
  const minAge = toNumber(readDraft('preferredAgeMin'))
  const maxAge = toNumber(readDraft('preferredAgeMax'))
  if ((minAge > 0 || maxAge > 0) && (!minAge || !maxAge || minAge > maxAge)) {
    return t('profiles.validation.ageRange')
  }
  return ''
}

async function saveDraft() {
  if (!payload.value) return false
  const validationMessage = validateProfileDraft()
  if (validationMessage) {
    uni.showToast({ title: validationMessage, icon: 'none' })
    return false
  }
  const profilePayload = buildProfilePayload()
  const contactPayload = {
    phone: draft.value.phone ?? '',
    email: draft.value.email ?? '',
    wechat: draft.value.wechat ?? '',
    preferredChannel: draft.value.preferredChannel as NonNullable<typeof payload.value.contact.preferredChannel>,
    visibility: draft.value.contactVisibility as typeof payload.value.contact.visibility,
  }
  const detail = await saveDetail({
    profileId: createMode.value ? undefined : profileId.value,
    profileType: draftOwnership.value.relationshipToProfile === 'self' ? 'self' : 'family',
    ownership: draftOwnership.value,
    profile: profilePayload,
    contact: contactPayload,
    verification: {
      legalName: draft.value.legalName ?? '',
      dateOfBirth: draft.value.dateOfBirth ?? '',
    },
    photos: buildPhotoPayload(),
  })
  if (detail && createMode.value) {
    createMode.value = false
    profileId.value = detail.profileId
    uni.redirectTo({ url: `/pages/account/profile-detail?id=${encodeURIComponent(detail.profileId)}` })
  }
  editing.value = false
  return true
}

function buildProfilePayload() {
  if (!payload.value) throw new Error('Missing account profile payload')
  return {
    profileName: draft.value.profileName,
    gender: draft.value.gender as NonNullable<typeof payload.value>['gender'],
    birthYear: toNumber(draft.value.birthYear),
    height: toNumber(draft.value.height),
    city: draft.value.city,
    country: draft.value.country,
    nationality: draft.value.nationality,
    languages: toList(draft.value.languages),
    degreeLevel: draft.value.degreeLevel as NonNullable<typeof payload.value>['degreeLevel'],
    education: draft.value.education,
    industry: draft.value.industry,
    careerDirection: draft.value.careerDirection,
    maritalStatus: draft.value.maritalStatus as NonNullable<typeof payload.value>['maritalStatus'],
    hasChildren: toBoolean(draft.value.hasChildren),
    childrenPlan: draft.value.childrenPlan as NonNullable<typeof payload.value>['childrenPlan'],
    acceptsLongDistance: toBoolean(draft.value.acceptsLongDistance),
    datingIntentionCode: draft.value.datingIntentionCode as NonNullable<typeof payload.value>['datingIntentionCode'],
    relationshipGoal: draft.value.relationshipGoal,
    residencePlan: draft.value.residencePlan,
    relocation: draft.value.relocation as NonNullable<typeof payload.value>['relocation'],
    relationshipValues: toList(draft.value.relationshipValues) as NonNullable<typeof payload.value>['relationshipValues'],
    preferredAgeMin: toNumber(draft.value.preferredAgeMin),
    preferredAgeMax: toNumber(draft.value.preferredAgeMax),
    preferredLocation: draft.value.preferredLocation as NonNullable<typeof payload.value>['preferredLocation'],
    preferredEducation: draft.value.preferredEducation,
    familyLife: draft.value.familyLife,
    dealBreakers: toList(draft.value.dealBreakers),
    smoking: draft.value.smoking as NonNullable<typeof payload.value>['smoking'],
    drinking: draft.value.drinking as NonNullable<typeof payload.value>['drinking'],
    exercise: draft.value.exercise,
    activityLevel: draft.value.activityLevel as NonNullable<typeof payload.value>['activityLevel'],
    weekendStyle: draft.value.weekendStyle as NonNullable<typeof payload.value>['weekendStyle'],
    pets: draft.value.pets as NonNullable<typeof payload.value>['pets'],
    personalityTraits: toList(draft.value.personalityTraits),
    interests: toList(draft.value.interests),
    communicationStyle: draft.value.communicationStyle as NonNullable<typeof payload.value>['communicationStyle'],
    summary: draft.value.summary,
    tags: toList(draft.value.tags),
    familyVisible: toBoolean(draft.value.familyVisible),
  }
}

const relationshipOptions = computed(() => {
  const all: Array<{ label: string; value: typeof draftOwnership.value.relationshipToProfile }> = [
    { label: t('profiles.relationship.father'), value: 'father' },
    { label: t('profiles.relationship.mother'), value: 'mother' },
    { label: t('profiles.relationship.relative'), value: 'relative' },
  ]
  if (!hasSelfProfile.value) {
    all.unshift({ label: t('profiles.relationship.self'), value: 'self' })
  }
  return all
})

const selectedRelationshipLabel = computed(() => {
  return relationshipOptions.value.find((item) => item.value === draftOwnership.value.relationshipToProfile)?.label ?? '-'
})

function selectionChipClass(active: boolean) {
  return active
    ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
    : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary hover:text-semantic-text-primary'
}

function toggleSelect(key: string) {
  openSelectKey.value = openSelectKey.value === key ? null : key
}

function selectRelationship(value: typeof draftOwnership.value.relationshipToProfile) {
  draftOwnership.value.relationshipToProfile = value
  openSelectKey.value = null
}

const languageOptions = computed(() => ['zh', 'fr', 'en'].map((value) => ({
  label: t(`profiles.detail.values.language.${value}`),
  value,
})))

const relationshipValueOptions = computed(() => [
  'honesty',
  'trust',
  'communication',
  'respect',
  'loyalty',
  'family',
  'growth',
  'support',
  'humor',
  'ambition',
  'kindness',
  'independence',
  'romance',
  'stability',
].map((value) => ({
  label: t(`profiles.detail.values.relationshipValues.${value}`),
  value,
})))

function readListDraft(fieldKey: string) {
  return toList(readDraft(fieldKey))
}

function toggleListDraft(fieldKey: string, value: string) {
  const values = readListDraft(fieldKey)
  const nextValues = values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
  writeDraft(fieldKey, nextValues.join(' / '))
}

function readTagInput(fieldKey: string) {
  return tagInputs.value[fieldKey] ?? ''
}

function writeTagInput(fieldKey: string, value: string) {
  tagInputs.value[fieldKey] = value
}

function addListDraft(fieldKey: string) {
  const value = readTagInput(fieldKey).trim()
  if (!value) return
  const values = readListDraft(fieldKey)
  if (!values.includes(value)) {
    writeDraft(fieldKey, [...values, value].join(' / '))
  }
  writeTagInput(fieldKey, '')
}

function removeListDraft(fieldKey: string, value: string) {
  writeDraft(fieldKey, readListDraft(fieldKey).filter((item) => item !== value).join(' / '))
}

function displayTagDraft(fieldKey: string, value: string) {
  if (fieldKey === 'relationshipValues') return t(`profiles.detail.values.relationshipValues.${value}`)
  return value
}

function toList(value: string | undefined) {
  return (value ?? '').split(/[\/,，、]/).map((item) => item.trim()).filter(Boolean)
}

function toNumber(value: string | undefined) {
  return Number(value ?? 0)
}

function toBoolean(value: string | undefined) {
  return value === 'true'
}

const booleanOptions = computed(() => [
  {label: t('common.yes'), value: true},
  {label: t('common.no'), value: false},
])

function enumOptions(fieldKey: string) {
  const options = {
    gender: ['male', 'female'],
    degreeLevel: ['bachelor', 'master', 'phd'],
    maritalStatus: ['never_married', 'divorced', 'widowed'],
    childrenPlan: ['wants', 'open_to_discuss', 'does_not_want'],
    datingIntentionCode: ['serious', 'marriage', 'exclusive', 'cross_border'],
    relocation: ['willing', 'unwilling', 'open_to_discuss'],
    preferredLocation: ['local', 'regional', 'national', 'international'],
    activityLevel: ['low', 'moderate', 'high'],
    weekendStyle: ['outdoors', 'indoors', 'social', 'flexible'],
    pets: ['has', 'none', 'likes'],
    communicationStyle: ['direct', 'indirect', 'balanced'],
    smoking: ['never', 'social', 'often'],
    drinking: ['never', 'social', 'often'],
    preferredChannel: ['phone', 'email', 'wechat'],
    contactVisibility: ['after_introduction', 'owner_only', 'disabled'],
  }[fieldKey] ?? []

  const keyPrefix = fieldKey === 'smoking' || fieldKey === 'drinking'
    ? 'profiles.detail.values.habit'
    : fieldKey === 'preferredChannel'
      ? 'profiles.detail.values.contactChannel'
      : fieldKey === 'contactVisibility'
        ? 'profiles.detail.values.contactVisibility'
        : `profiles.detail.values.${fieldKey}`

  return options.map((value) => ({
    label: t(`${keyPrefix}.${value}`),
    value,
  }))
}

function selectedEnumLabel(fieldKey: string) {
  return enumOptions(fieldKey).find((option) => option.value === readDraft(fieldKey))?.label ?? '-'
}

function selectEnum(fieldKey: string, value: string) {
  writeDraft(fieldKey, value)
  openSelectKey.value = null
}

function togglePrivacyPreference(key: string, hidden: boolean) {
  void savePrivacyPreferences({
    [key]: hidden,
  } as Partial<NonNullable<typeof payload.value>['privacyPreferences']>)
}

function openVerificationPanel(key: string) {
  verificationPanelKey.value = verificationPanelKey.value === key ? null : key
}

function archiveProfile() {
  openConfirm(
    t('profiles.archiveDialog.title'),
    t('profiles.archiveDialog.description'),
    t('profiles.actions.archive'),
    async () => {
      const archived = await archive()
      if (archived) openMyProfilePage()
    },
  )
}

function maskName(value?: string) {
  if (!value) return ''
  if (value.length <= 1) return '*'
  return `${value.slice(0, 1)}${'*'.repeat(Math.max(value.length - 1, 1))}`
}

function maskDate(value?: string) {
  if (!value) return ''
  return value.replace(/\d(?=\d{2})/g, '*')
}

async function addDraftPhoto() {
  const url = await chooseAndUploadImage()
  if (!url) return
  const nextOrder = visiblePhotoDrafts.value.length + 1
  photoDrafts.value.push({
    clientId: `new-${Date.now()}-${nextOrder}`,
    url,
    isPrimary: visiblePhotoDrafts.value.length === 0,
    sortOrder: nextOrder,
    status: 'review',
  })
}

async function chooseDraftPhoto(clientId: string) {
  const url = await chooseAndUploadImage()
  if (!url) return
  writePhotoDraft(clientId, url)
}

async function chooseAndUploadImage() {
  const tempPath = await chooseLocalImage()
  if (!tempPath) return null

  try {
    return await uploadProfileImage(tempPath)
  } catch {
    uni.showToast({ title: t('profiles.detail.uploadFailed'), icon: 'none' })
    return null
  }
}

function chooseLocalImage() {
  return new Promise<string | null>((resolve) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        const [path] = result.tempFilePaths
        resolve(path ?? null)
      },
      fail: () => resolve(null),
    })
  })
}

function markPrimaryPhoto(clientId: string) {
  photoDrafts.value = photoDrafts.value.map((photo) => ({
    ...photo,
    isPrimary: !photo.delete && photo.clientId === clientId,
  }))
}

function writePhotoDraft(clientId: string, value: string) {
  photoDrafts.value = photoDrafts.value.map((photo) => photo.clientId === clientId ? { ...photo, url: value } : photo)
}

function removePhotoDraft(clientId: string) {
  const target = photoDrafts.value.find((photo) => photo.clientId === clientId)
  if (!target) return
  if (target.id) {
    photoDrafts.value = photoDrafts.value.map((photo) => photo.clientId === clientId ? { ...photo, delete: true } : photo)
  } else {
    photoDrafts.value = photoDrafts.value.filter((photo) => photo.clientId !== clientId)
  }
  ensurePhotoPrimary()
}

function ensurePhotoPrimary() {
  const visiblePhotos = visiblePhotoDrafts.value
  if (visiblePhotos.length === 0 || visiblePhotos.some((photo) => photo.isPrimary)) return
  const primaryClientId = visiblePhotos[0].clientId
  photoDrafts.value = photoDrafts.value.map((photo) => ({
    ...photo,
    isPrimary: !photo.delete && photo.clientId === primaryClientId,
  }))
}

function buildPhotoPayload() {
  ensurePhotoPrimary()
  return photoDrafts.value.map((photo, index) => ({
    id: photo.id,
    url: photo.url,
    isPrimary: photo.isPrimary,
    sortOrder: index + 1,
    delete: photo.delete,
  }))
}

function photoStatusLabel(status: NonNullable<typeof payload.value>['photos'][number]['status']) {
  if (status === 'approved') return t('profiles.detail.photoStatus.approved')
  if (status === 'hidden') return t('profiles.detail.photoStatus.hidden')
  return t('profiles.detail.photoStatus.review')
}

function verificationToneClass(tone: string) {
  if (tone === 'complete') return 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
  if (tone === 'pending') return 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'
  if (tone === 'rejected') return 'border-semantic-state-danger text-semantic-state-danger'
  return 'border-semantic-border-soft text-semantic-text-muted'
}
</script>
