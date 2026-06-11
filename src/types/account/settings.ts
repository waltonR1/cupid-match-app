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

export interface AccountSecurityIdentityViewModel {
  id: string
  provider: BindableIdentityProvider
  providerLabel: string
  identifier: string
  verifiedText: string
  canBind: boolean
  canUnbind: boolean
}
