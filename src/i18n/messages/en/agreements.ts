import type { AppMessageSchema } from '@/i18n/types'

export const agreementsMessages: AppMessageSchema = {
  kicker: 'Agreement',
  close: 'Close',
  terms: {
    title: 'Platform Terms',
    p1: 'Creating an account means you will use the platform with real and reachable identity information. Your display name, city, and account contact details should remain basically accurate and must not impersonate another person.',
    p2: 'The platform provides matchmaking services, advisor coordination, and profile browsing. It does not guarantee a match result, a successful introduction, or that any single recommendation or event will become a formal relationship.',
    p3: 'If the platform detects harassment, false statements, privacy abuse, or attempts to bypass the service flow for private diversion, it may limit account access, suspend service, or terminate later cooperation.',
  },
  privacy: {
    title: 'Privacy Notice',
    p1: 'Your email, WeChat, city, and later profile details are used for account setup, advisor follow-up, identity review, and the basic matching process. They are not meant for unrelated circulation.',
    p2: 'The platform controls what is visible according to your identity path, membership level, and privacy settings, including advisor access, field exposure, and family participation boundaries.',
    p3: 'The platform processes account and profile information only within the scope required for service delivery; profile visibility, advisor access, and family participation boundaries follow your active settings and permissions.',
  },
}
