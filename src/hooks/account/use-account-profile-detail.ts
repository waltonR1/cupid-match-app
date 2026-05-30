import { computed, ref, watch } from 'vue'
import {
  archiveAccountProfile,
  getAccountProfileDetail,
  saveAccountProfileDetail,
  updateAccountProfilePrivacyPreferences,
  type AccountProfileDetailDTO,
  type AccountProfileDetailSavePayload,
  type AccountProfilePrivacyPreferencesUpdatePayload,
} from '@/api/account'
import { uploadImage } from '@/api/upload/upload'
import { useLatestRequest } from '@/hooks/common/useLatestRequest'
import { toAccountProfileDetailPageData } from '@/mappers/account-profile-detail'
import { useAuthStore } from '@/stores/modules/auth'
import type { FormatLocale } from '@/utils/locale-format'

const LOCALIZED_PROFILE_FIELD_KEYS = [
  'profileName',
  'city',
  'country',
  'nationality',
  'education',
  'industry',
  'careerDirection',
  'relationshipGoal',
  'residencePlan',
  'preferredEducation',
  'familyLife',
  'exercise',
  'summary',
  'dealBreakers',
  'personalityTraits',
  'interests',
  'tags',
] as const

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

  async function saveDetail(next: AccountProfileDetailSavePayload) {
    const data = await latest.run(() => saveAccountProfileDetail(next, editLocale()))
    if (data) payload.value = data
    return data
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

  function uploadProfileImage(filePath: string) {
    return uploadImage(filePath)
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
    saveDetail,
    savePrivacyPreferences,
    archive,
    uploadProfileImage,
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
      relationshipToProfile: 'relative',
      permission: 'owner',
      status: 'active',
    },
    verification: {
      legalName: '',
      dateOfBirth: '',
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
    localizedMeta: {
      editLocale,
      fields: Object.fromEntries(LOCALIZED_PROFILE_FIELD_KEYS.map((key) => [
        key,
        {
          locale: editLocale,
          source: null,
          provider: null,
          status: 'missing',
          hasValue: false,
        },
      ])),
    },
    contact: {
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
    lastActiveAt: now,
    familyVisible: false,
    degreeLevel: 'bachelor',
    education: '',
    industry: '',
    careerDirection: '',
    maritalStatus: 'never_married',
    hasChildren: false,
    childrenPlan: 'open_to_discuss',
    acceptsLongDistance: false,
    datingIntentionCode: 'serious',
    relationshipGoal: '',
    residencePlan: '',
    relocation: 'open_to_discuss',
    relationshipValues: [],
    preferredAgeMin: 0,
    preferredAgeMax: 0,
    preferredLocation: 'local',
    preferredEducation: '',
    familyLife: '',
    dealBreakers: [],
    smoking: 'never',
    drinking: 'never',
    exercise: '',
    activityLevel: 'moderate',
    weekendStyle: 'flexible',
    pets: 'none',
    personalityTraits: [],
    interests: [],
    communicationStyle: 'balanced',
    summary: '',
    tags: [],
    createdAt: now,
    updatedAt: now,
  }
}
