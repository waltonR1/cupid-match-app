import type { AccountProfileDetailDTO } from '@/api/account'

export interface AccountProfileDetailSectionItem {
  fieldKey: string
  labelKey: string
  rawValue: unknown
  editor: 'text' | 'number' | 'boolean' | 'enum' | 'list' | 'ageRange'
  valueKey?: string
  required?: boolean
}

export interface AccountProfileDetailSection {
  key: string
  titleKey: string
  items: AccountProfileDetailSectionItem[]
}

export interface AccountProfileDetailStatusItem {
  labelKey: string
  rawValue: unknown
}

export interface AccountProfileDetailVerificationItem {
  key: string
  labelKey: string
  valueKey: string
  valueRaw?: string
  tone: string
}

export interface AccountProfileDetailPrivacyPreferenceItem {
  key: string
  labelKey: string
  statusKey: string
  hidden: boolean
}

export interface AccountProfilePhotoDraft {
  id?: string
  clientId: string
  url: string
  isPrimary: boolean
  sortOrder: number
  status: AccountProfileDetailDTO['photos'][number]['status']
  delete?: boolean
}

export interface AccountProfileDetailPageData {
  profileTitle: string | null
  profileTitleKey: string | undefined
  profileTitleRelation: string | undefined
  avatarUrl: string
  city: string
  ownershipBadgeKeys: string[]
  statusItems: AccountProfileDetailStatusItem[]
  profileSections: AccountProfileDetailSection[]
  contactSection: AccountProfileDetailSection
  photos: AccountProfileDetailDTO['photos']
  verification: AccountProfileDetailDTO['verification']
  verificationItems: AccountProfileDetailVerificationItem[]
  privacyPreferenceItems: AccountProfileDetailPrivacyPreferenceItem[]
}
