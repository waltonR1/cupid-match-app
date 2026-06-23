export type AccountPreferenceCode =
  | 'preferred_city'
  | 'preferred_contact_channel'
  | 'staff_contact_enabled'
  | 'family_assist_enabled'
  | 'introduction_updates_enabled'
  | 'event_reminders_enabled'
  | 'service_announcements_enabled'
  | 'marketing_emails_enabled'
  | 'analytics_consent_enabled'

export type BindableIdentityProvider = 'email' | 'phone'
export type AccountSecurityChallengeAction = 'change_password' | 'deactivate_account' | 'export_data' | 'unbind_identity'

export interface AccountPreferences {
  preferredCity?: string
  preferredContactChannel?: 'email' | 'phone' | 'wechat'
  staffContactEnabled: boolean
  familyAssistEnabled: boolean
  introductionUpdatesEnabled: boolean
  eventRemindersEnabled: boolean
  serviceAnnouncementsEnabled: boolean
  marketingEmailsEnabled: boolean
  analyticsConsentEnabled: boolean
}

export interface AccountSecurityIdentityViewModel {
  id: string
  provider: BindableIdentityProvider
  providerLabel: string
  identifier: string
  verifiedText: string
  canBind: boolean
  canUnbind: boolean
}
