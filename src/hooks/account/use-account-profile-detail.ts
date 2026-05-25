import { computed, ref, watch } from 'vue'
import {
  archiveAccountProfile,
  createAccountProfile,
  getAccountProfileDetail,
  updateAccountProfile,
  updateAccountProfileContact,
  updateAccountProfileOwnership,
  updateAccountProfilePrivacyPreferences,
  createAccountProfilePhoto,
  updateAccountProfilePhoto,
  deleteAccountProfilePhoto,
  type AccountProfileDetailDTO,
  type AccountManagedProfileCreatePayload,
  type AccountProfileContactUpdatePayload,
  type AccountProfilePrivacyPreferencesUpdatePayload,
  type AccountProfileUpdatePayload,
} from '@/api/account'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountProfileDetailPageData } from '@/mappers/account-profile-detail'
import { useAuthStore } from '@/stores/modules/auth'
import type { FormatLocale } from '@/utils/locale-format'

export function useAccountProfileDetail(
  profileId: () => string,
  editLocale: () => FormatLocale,
  createMode: () => boolean = () => false,
) {
  const authStore = useAuthStore()
  const latest = useLatestRequest()
  const payload = ref<AccountProfileDetailDTO | null>(null)

  watch([profileId, editLocale, createMode], () => {
    void load()
  }, { immediate: true })

  async function load() {
    if (createMode()) {
      payload.value = createDraftProfileDetail(authStore.user, editLocale())
      return
    }
    if (!profileId()) {
      payload.value = null
      return
    }

    const data = await latest.run(() => getAccountProfileDetail(profileId(), editLocale()))
    if (data) payload.value = data
  }

  async function createProfile(next: AccountManagedProfileCreatePayload) {
    const data = await latest.run(() => createAccountProfile(next, editLocale()))
    if (data) payload.value = data
    return data
  }

  async function saveProfile(next: AccountProfileUpdatePayload) {
    if (!profileId()) return
    const data = await latest.run(() => updateAccountProfile(profileId(), next, editLocale()))
    if (data) payload.value = data
  }

  async function saveContact(contact: AccountProfileContactUpdatePayload) {
    if (!profileId()) return
    const data = await latest.run(() => updateAccountProfileContact(profileId(), contact, editLocale()))
    if (data) payload.value = data
  }

  async function saveOwnership(next: {
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
    isPrimary: boolean
  }) {
    if (!profileId()) return
    const data = await latest.run(() => updateAccountProfileOwnership(profileId(), next, editLocale()))
    if (data) payload.value = data
  }

  async function savePrivacyPreferences(next: AccountProfilePrivacyPreferencesUpdatePayload) {
    if (!profileId()) return
    const privacyPreferences = await latest.run(() => updateAccountProfilePrivacyPreferences(profileId(), next))
    if (privacyPreferences && payload.value) payload.value = { ...payload.value, privacyPreferences }
  }

  async function archive() {
    if (!profileId()) return
    const result = await latest.run(() => archiveAccountProfile(profileId()))
    if (result) payload.value = null
    return Boolean(result)
  }

  async function addPhoto(url: string) {
    if (!profileId() || !url) return
    const data = await latest.run(() => createAccountProfilePhoto(profileId(), { url }, editLocale()))
    if (data) payload.value = data
  }

  async function removePhoto(photoId: string) {
    if (!profileId()) return
    const data = await latest.run(() => deleteAccountProfilePhoto(profileId(), photoId, editLocale()))
    if (data) payload.value = data
  }

  async function savePhoto(
    photoId: string,
    next: { url: string; isPrimary?: boolean; sortOrder?: number },
  ) {
    if (!profileId()) return
    const data = await latest.run(() => updateAccountProfilePhoto(profileId(), photoId, next, editLocale()))
    if (data) payload.value = data
  }

  const pageData = computed(() => toAccountProfileDetailPageData({
    payload: payload.value,
  }))

  return {
    loading: latest.loading,
    error: latest.error,
    payload,
    pageData,
    refresh: load,
    createProfile,
    saveProfile,
    saveOwnership,
    saveContact,
    savePrivacyPreferences,
    archive,
    addPhoto,
    savePhoto,
    removePhoto,
  }
}

function createDraftProfileDetail(
  user: ReturnType<typeof useAuthStore>['user'],
  editLocale: FormatLocale,
): AccountProfileDetailDTO {
  const now = new Date().toISOString()
  return {
    profileId: '',
    profileType: 'self',
    profileName: '',
    avatarUrl: user?.avatarUrl ?? '',
    isBlankDraft: true,
    ownership: {
      relationshipToProfile: 'self',
      permission: 'owner',
      status: 'active',
      isPrimary: false,
    },
    verification: {
      identityStatus: 'unverified',
      educationStatus: 'unverified',
      incomeStatus: 'unverified',
      maritalStatus: 'unverified',
      reviewStatus: 'unreviewed',
    },
    privacyPreferences: {
      hideMaritalStatus: false,
      hideHasChildren: false,
      hideChildrenPlan: false,
      hideAcceptsLongDistance: false,
      hideSmoking: false,
      hideDrinking: false,
    },
    localizedMeta: { editLocale, fields: {} },
    contact: {
      phoneVerificationStatus: 'unverified',
      emailVerificationStatus: 'unverified',
      wechatVerificationStatus: 'unverified',
      preferredChannel: 'email',
      visibility: 'after_introduction',
    },
    photos: [],
    gender: 'female',
    birthYear: 0,
    height: 0,
    city: '',
    country: '',
    nationality: '',
    languages: [],
    profileStatus: 'draft',
    isPriorityProfile: false,
    lastActiveAt: now,
    familyVisible: false,
    allowFamilyContact: false,
    familyPriority: false,
    degreeLevel: 'bachelor',
    education: '',
    industry: '',
    careerDirection: '',
    maritalStatus: 'never_married',
    hasChildren: false,
    childrenPlan: 'open_to_discuss',
    acceptsLongDistance: false,
    datingIntentionCode: 'serious',
    relationshipPlan: '',
    residencePlan: '',
    relocationWillingness: '',
    values: [],
    preferredAgeMin: 0,
    preferredAgeMax: 0,
    locationScope: '',
    preferredEducation: '',
    familyPlan: '',
    dealBreakers: [],
    smoking: 'never',
    drinking: 'never',
    exercise: '',
    activityLevel: '',
    weekendStyle: '',
    pets: '',
    personalityTraits: [],
    interests: [],
    communicationStyle: '',
    summary: '',
    tags: [],
    createdAt: now,
    updatedAt: now,
  }
}
