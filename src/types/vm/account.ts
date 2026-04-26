import type { AccountMembershipLevel } from '@/api/account/account.client'

export interface AccountMetricItemVM {
  label: string
  value: string
}

export interface AccountRowItemVM {
  label: string
  value: string
}

export interface AccountConnectionsItemVM {
  id: string
  familyVisible: boolean
  displayName: string
  city: string
  ageText: string
  note: string
  tags: string[]
}

export interface AccountActivityItemVM {
  id: string
  date: string
  city: string
  title: string
  note: string
  venue: string
  statusLabel: string
  cardClass: string
  badgeClass: string
}

export interface AccountMessageItemVM {
  id: string
  profileId: string
  displayName: string
  city: string
  ageText: string
  familyVisible: boolean
  unread: number
  lastMessage: string
  updatedAt: string
}

export interface AccountPrivacyCardVM {
  id: string
  title: string
  desc: string
  enabled: boolean
}

export interface AccountVerificationItemVM {
  label: string
  done: boolean
}

export interface AccountMembershipPlanCardVM {
  key: AccountMembershipLevel
  badge: string
  title: string
  period: string
  features: string[]
  cardClass: string
  eyebrowClass: string
  titleClass: string
  metaClass: string
  featureClass: string
}

export interface AccountProfilePageVM {
  bio: string
  membershipLabel: string
  summaryItems: AccountMetricItemVM[]
  baseRows: AccountRowItemVM[]
  visibilityRows: AccountRowItemVM[]
  mediaPoints: string[]
  taskPoints: string[]
  summaryText: string
  highlightTexts: string[]
  tagTexts: string[]
}

export interface AccountConnectionsPageVM {
  filterItems: AccountMetricItemVM[]
  summaryItems: AccountMetricItemVM[]
  reasonPoints: string[]
  items: AccountConnectionsItemVM[]
}

export interface AccountActivityPageVM {
  filterItems: AccountMetricItemVM[]
  supportPoints: string[]
  familyPoints: string[]
  items: AccountActivityItemVM[]
}

export interface AccountMessagesPageVM {
  filterItems: AccountMetricItemVM[]
  supportPoints: string[]
  boundaryPoints: string[]
  items: AccountMessageItemVM[]
}

export interface AccountSafetyPageVM {
  visibilityRows: AccountRowItemVM[]
  privacyCards: AccountPrivacyCardVM[]
  familyDescription: string
  familyPoints: string[]
  notePoints: string[]
}

export interface AccountVerificationPageVM {
  verificationItems: AccountVerificationItemVM[]
  overviewItems: AccountMetricItemVM[]
  controlRows: AccountRowItemVM[]
  inviteDescription: string
}

export interface AccountMembershipPageVM {
  membershipLabel: string
  currentItems: AccountMetricItemVM[]
  planCards: AccountMembershipPlanCardVM[]
}
