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

      <view class="flex flex-wrap items-center gap-2">
        <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.detail.editLocale') }}</view>
        <view
          v-for="item in locales"
          :key="item"
          class="cursor-pointer border px-3 py-2 text-[13px]"
          :class="editLocale === item
            ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis text-semantic-text-primary'
            : 'border-semantic-border-soft bg-semantic-surface-panel text-semantic-text-secondary'"
          @click="editLocale = item"
        >
          {{ t(`profiles.detail.values.language.${item}`) }}
        </view>
      </view>

      <view class="border border-semantic-border-default bg-semantic-surface-card px-5 py-4 text-[14px] leading-7 text-semantic-text-secondary shadow-panel">
        {{ t('profiles.detail.editNotice') }}
      </view>

      <view class="flex flex-wrap gap-3">
        <view
          class="cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-3 text-[14px]"
          @click="editing = !editing"
        >
          {{ editing ? t('common.open') : t('profiles.actions.edit') }}
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

        <view class="mt-6 grid border-t border-semantic-border-soft pt-5 sm:grid-cols-2 xl:grid-cols-4">
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
          <view class="mt-4 grid gap-4 md:grid-cols-2">
            <view>
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.detail.fields.relationshipToProfile') }}</view>
              <picker
                v-if="editing"
                :range="relationshipOptions"
                range-key="label"
                :value="relationshipIndex"
                @change="selectRelationship"
              >
                <view class="mt-2 border border-semantic-border-soft bg-semantic-surface-panel px-3 py-2.5 text-[15px]">
                  {{ relationshipOptions[relationshipIndex]?.label }}
                </view>
              </picker>
              <view v-else class="mt-2 text-[15px]">{{ relationshipOptions[relationshipIndex]?.label }}</view>
            </view>
            <view>
              <view class="text-[13px] text-semantic-text-secondary">{{ t('profiles.detail.fields.isPrimary') }}</view>
              <view
                v-if="editing"
                class="mt-2 inline-flex cursor-pointer border px-3 py-2.5 text-[15px]"
                :class="draftOwnership.isPrimary
                  ? 'border-semantic-border-emphasis bg-semantic-surface-emphasis'
                  : 'border-semantic-border-soft bg-semantic-surface-panel'"
                @click="draftOwnership.isPrimary = !draftOwnership.isPrimary"
              >
                {{ draftOwnership.isPrimary ? t('common.yes') : t('common.no') }}
              </view>
              <view v-else class="mt-2 text-[15px]">{{ draftOwnership.isPrimary ? t('common.yes') : t('common.no') }}</view>
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
                v-for="photo in pageData.photos"
                :key="photo.id"
                class="grid gap-4 border border-semantic-border-soft bg-semantic-surface-panel p-4 md:grid-cols-[120px_minmax(0,1fr)]"
              >
                <image :src="photo.url" class="h-[120px] w-full object-cover" />
                <view class="grid gap-3">
                  <view v-if="!editing" class="text-[14px] text-semantic-text-secondary">
                    {{ photoStatusLabel(photo.status) }}
                  </view>
                  <view v-else class="grid gap-3">
                    <input
                      :value="photoDrafts[photo.id]?.url ?? photo.url"
                      class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-card px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                      @input="writePhotoDraft(photo.id, 'url', getInputValue($event))"
                    />
                    <view class="text-[13px] text-semantic-text-muted">
                      {{ photoStatusLabel(photo.status) }}
                    </view>
                  </view>
                  <view v-if="editing" class="flex flex-wrap gap-2">
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]" @click="saveDraftPhoto(photo)">
                      {{ t('profiles.actions.save') }}
                    </view>
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]" @click="markPrimaryPhoto(photo)">
                      {{ photo.isPrimary ? t('profiles.detail.photoPrimary') : t('profiles.detail.setPrimary') }}
                    </view>
                    <view class="cursor-pointer border border-semantic-border-soft px-3 py-2 text-[13px]" @click="removePhoto(photo.id)">
                      {{ t('profiles.actions.remove') }}
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="editing" class="grid gap-3 border border-semantic-border-soft bg-semantic-surface-panel p-4">
                <input
                  v-model="newPhotoUrl"
                  class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-card px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary"
                  :placeholder="t('profiles.detail.placeholders.photoUrl')"
                />
                <view class="w-fit cursor-pointer border border-semantic-border-emphasis bg-semantic-surface-emphasis px-4 py-2.5 text-[14px]" @click="addDraftPhoto">
                  {{ t('profiles.actions.add') }}
                </view>
              </view>
            </view>
          </view>

          <view
            v-for="section in pageData.sections"
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
                <view class="text-[13px] text-semantic-text-secondary">{{ t(entry.labelKey) }}</view>
                <view v-if="!editing || !entry.fieldKey" class="min-h-[24px] text-[15px]">{{ formatDisplayValue(entry) }}</view>
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
                <picker
                  v-else-if="entry.editor === 'enum'"
                  :range="enumOptions(entry.fieldKey)"
                  range-key="label"
                  :value="enumIndex(entry.fieldKey)"
                  @change="selectEnum(entry.fieldKey, $event)"
                >
                  <view class="box-border min-h-[44px] w-full border border-semantic-border-soft bg-semantic-surface-panel px-4 py-2.5 text-[15px] leading-6 text-semantic-text-primary">
                    {{ enumOptions(entry.fieldKey)[enumIndex(entry.fieldKey)]?.label }}
                  </view>
                </picker>
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
                  class="border px-2.5 py-1 text-[12px]"
                  :class="verificationToneClass(item.tone)"
                >
                  {{ item.valueRaw ? formatLocalizedDateTime(locale, item.valueRaw) : t(item.valueKey) }}
                </view>
              </view>
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
  </AccountShell>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import AccountShell from '@/components/account/AccountShell.vue'
import AccountSubPageHeader from '@/components/account/AccountSubPageHeader.vue'
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
  createProfile,
  saveProfile,
  saveOwnership,
  saveContact,
  savePrivacyPreferences,
  archive,
  addPhoto,
  savePhoto,
  removePhoto,
} = useAccountProfileDetail(() => profileId.value, () => editLocale.value, () => createMode.value)
const editing = ref(false)
const draft = ref<Record<string, string>>({})
const photoDrafts = ref<Record<string, { url: string }>>({})
const newPhotoUrl = ref('')
const draftOwnership = ref({
  relationshipToProfile: 'self' as 'self' | 'father' | 'mother' | 'relative',
  isPrimary: false,
})

onLoad((query) => {
  createMode.value = query?.mode === 'create'
  if (createMode.value) {
    editing.value = true
    return
  }
  if (query && typeof query.id === 'string') {
    profileId.value = query.id
  }
})

watch(payload, (value) => {
  if (!value) return
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
    relationshipPlan: value.relationshipPlan,
    residencePlan: value.residencePlan,
    relocationWillingness: value.relocationWillingness,
    values: value.values.join(' / '),
    preferredAgeMin: String(value.preferredAgeMin),
    preferredAgeMax: String(value.preferredAgeMax),
    locationScope: value.locationScope,
    preferredEducation: value.preferredEducation,
    familyPlan: value.familyPlan,
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
    allowFamilyContact: String(value.allowFamilyContact),
    familyPriority: String(value.familyPriority),
    phone: value.contact.phone ?? '',
    email: value.contact.email ?? '',
    wechat: value.contact.wechat ?? '',
    preferredChannel: value.contact.preferredChannel ?? 'email',
    contactVisibility: value.contact.visibility,
  }
  photoDrafts.value = Object.fromEntries(value.photos.map((photo) => [
    photo.id,
    {url: photo.url},
  ]))
  draftOwnership.value = {
    relationshipToProfile: value.ownership.relationshipToProfile,
    isPrimary: value.ownership.isPrimary,
  }
}, { immediate: true })

function resolveProfileTitleText() {
  if (!pageData.value) return ''
  if (pageData.value.profileTitleRelation) {
    return `${t(pageData.value.profileTitleRelation)} ${t(pageData.value.profileTitleKey!)}`
  }
  return t(pageData.value.profileTitleKey!)
}

function formatDisplayValue(entry: ProfileDetailPageData['sections'][number]['items'][number]) {
  const v = entry.rawValue
  if (v === null || v === undefined) return '-'
  if (entry.editor === 'enum') return t(entry.valueKey!)
  if (entry.editor === 'boolean') return v ? t('common.yes') : t('common.no')
  if (entry.editor === 'list') return (v as string[]).length > 0 ? (v as string[]).join(' / ') : '-'
  if (entry.editor === 'number') return Number(v) > 0 ? String(v) : '-'
  return String(v) || '-'
}

function formatStatusValue(entry: ProfileDetailPageData['statusItems'][number]) {
  const v = entry.rawValue
  if (typeof v !== 'string') return String(v)
  if (v.startsWith('profiles.')) return t(v)
  // ISO date from lastActiveAt
  return formatLocalizedDateTime(locale, v)
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

function readBooleanDraft(fieldKey: string) {
  return draft.value[fieldKey] === 'true'
}

function writeBooleanDraft(fieldKey: string, value: boolean) {
  draft.value[fieldKey] = String(value)
}

function getInputValue(event: Event) {
  return (event as unknown as { detail: { value: string } }).detail.value
}

async function saveDraft() {
  if (!payload.value) return
  const profilePayload = buildProfilePayload()
  const contactPayload = {
    phone: draft.value.phone ?? '',
    email: draft.value.email ?? '',
    wechat: draft.value.wechat ?? '',
    preferredChannel: draft.value.preferredChannel as NonNullable<typeof payload.value.contact.preferredChannel>,
    visibility: draft.value.contactVisibility as typeof payload.value.contact.visibility,
  }
  if (createMode.value) {
    const detail = await createProfile({
      ...profilePayload,
      profileType: draftOwnership.value.relationshipToProfile === 'self' ? 'self' : 'family',
      relationshipToProfile: draftOwnership.value.relationshipToProfile,
      isPrimary: draftOwnership.value.isPrimary,
      contact: contactPayload,
    })
    if (detail) {
      createMode.value = false
      editing.value = false
      profileId.value = detail.profileId
      uni.redirectTo({ url: `/pages/account/profile-detail?id=${encodeURIComponent(detail.profileId)}` })
    }
    return
  }
  await saveOwnership(draftOwnership.value)
  await saveProfile(profilePayload)
  await saveContact(contactPayload)
  editing.value = false
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
    relationshipPlan: draft.value.relationshipPlan,
    residencePlan: draft.value.residencePlan,
    relocationWillingness: draft.value.relocationWillingness,
    values: toList(draft.value.values),
    preferredAgeMin: toNumber(draft.value.preferredAgeMin),
    preferredAgeMax: toNumber(draft.value.preferredAgeMax),
    locationScope: draft.value.locationScope,
    preferredEducation: draft.value.preferredEducation,
    familyPlan: draft.value.familyPlan,
    dealBreakers: toList(draft.value.dealBreakers),
    smoking: draft.value.smoking as NonNullable<typeof payload.value>['smoking'],
    drinking: draft.value.drinking as NonNullable<typeof payload.value>['drinking'],
    exercise: draft.value.exercise,
    activityLevel: draft.value.activityLevel,
    weekendStyle: draft.value.weekendStyle,
    pets: draft.value.pets,
    personalityTraits: toList(draft.value.personalityTraits),
    interests: toList(draft.value.interests),
    communicationStyle: draft.value.communicationStyle,
    summary: draft.value.summary,
    tags: toList(draft.value.tags),
    familyVisible: toBoolean(draft.value.familyVisible),
    allowFamilyContact: toBoolean(draft.value.allowFamilyContact),
    familyPriority: toBoolean(draft.value.familyPriority),
  }
}

const relationshipOptions = computed(() => [
  { label: t('profiles.relationship.self'), value: 'self' as const },
  { label: t('profiles.relationship.father'), value: 'father' as const },
  { label: t('profiles.relationship.mother'), value: 'mother' as const },
  { label: t('profiles.relationship.relative'), value: 'relative' as const },
])

const relationshipIndex = computed(() => Math.max(
  relationshipOptions.value.findIndex((item) => item.value === draftOwnership.value.relationshipToProfile),
  0,
))

function selectRelationship(event: Event) {
  const index = Number((event as unknown as { detail: { value: string } }).detail.value)
  const option = relationshipOptions.value[index]
  if (option) draftOwnership.value.relationshipToProfile = option.value
}

function toList(value: string | undefined) {
  return (value ?? '').split('/').map((item) => item.trim()).filter(Boolean)
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

function enumIndex(fieldKey: string) {
  return Math.max(
    enumOptions(fieldKey).findIndex((item) => item.value === readDraft(fieldKey)),
    0,
  )
}

function selectEnum(fieldKey: string, event: Event) {
  const index = Number((event as unknown as { detail: { value: string } }).detail.value)
  const option = enumOptions(fieldKey)[index]
  if (option) writeDraft(fieldKey, option.value)
}

function togglePrivacyPreference(key: keyof NonNullable<typeof payload.value>['privacyPreferences'], hidden: boolean) {
  void savePrivacyPreferences({ [key]: hidden })
}

function archiveProfile() {
  uni.showModal({
    title: t('profiles.archiveDialog.title'),
    content: t('profiles.archiveDialog.description'),
    success: ({confirm}) => {
      if (confirm) {
        void archive().then((archived) => {
          if (archived) openMyProfilePage()
        })
      }
    },
  })
}

async function addDraftPhoto() {
  if (!newPhotoUrl.value.trim()) return
  await addPhoto(newPhotoUrl.value.trim())
  newPhotoUrl.value = ''
}

function markPrimaryPhoto(photo: NonNullable<typeof payload.value>['photos'][number]) {
  void savePhoto(photo.id, {
    url: photoDrafts.value[photo.id]?.url ?? photo.url,
    isPrimary: true,
    sortOrder: photo.sortOrder,
  })
}

function writePhotoDraft(photoId: string, key: 'url', value: string) {
  photoDrafts.value[photoId] = { [key]: value }
}

function saveDraftPhoto(photo: NonNullable<typeof payload.value>['photos'][number]) {
  void savePhoto(photo.id, {
    url: photoDrafts.value[photo.id]?.url ?? photo.url,
    isPrimary: photo.isPrimary,
    sortOrder: photo.sortOrder,
  })
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
