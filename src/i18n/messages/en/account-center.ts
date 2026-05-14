import type { AppMessageSchema } from '@/i18n/types'

export const accountCenterMessages: AppMessageSchema = {
  nav: {
    profile: 'Profile',
    verification: 'Verification',
    connections: 'Connections',
    messages: 'Messages',
    safety: 'Safety',
    membership: 'Services',
  },
  topSummary: {
    title: 'Account center',
    guestName: 'Signed-out account',
    subtitle: 'The account center is being rebuilt around the new profile, membership, and mediated-introduction model. For now it keeps only account state and navigation.',
    metrics: {
      status: 'Status',
      workspace: 'Account module',
      membership: 'Membership',
      activity: 'Activities',
    },
    status: {
      signedIn: 'Signed in',
      guest: 'Signed out',
      rebuilding: 'Rebuilding',
      paused: 'Paused',
    },
    actions: {
      profile: 'Edit profile',
      verification: 'Verify now',
      connections: 'Open connections',
      membership: 'View services',
    },
  },
  placeholder: {
    title: 'Account center rebuilding',
    profile: 'The profile page currently keeps only the account shell. It will reconnect through profile ownership and the new field model.',
    membership: 'Membership will reopen after membership plans, entitlements, and quota balances are rebuilt.',
    activity: 'Activity will reconnect after event registrations become the source of truth.',
    connections: 'Favorites and private introduction states will reconnect through the new account connections flow.',
    messages: 'Messages will move to private introduction rooms and advisor follow-ups instead of legacy thread summaries.',
    safety: 'Privacy and safety will be rebuilt from user preferences and profile visibility settings.',
    verification: 'Verification will be rebuilt from profile verifications and advisor review records.',
  },
  profile: {
    eyebrow: 'Profile',
    title: 'My profile',
    subtitle: 'Profile quality comes first. Make your information complete, trustworthy, and ready for matching.',
  },
  verification: {
    eyebrow: 'Trust',
    title: 'Verification center',
    subtitle: 'Serious matchmaking needs visible trust. Keep certification and risk tools separate from generic settings.',
  },
  connections: {
    eyebrow: 'Matches',
    title: 'My connections',
    subtitle: 'Treat favorites, mutual interest, family-visible profiles, and recommendations as one connection pipeline.',
  },
  messages: {
    eyebrow: 'Messages',
    title: 'Conversations',
    subtitle: 'Keep messaging focused on progress, with trust state and safety reminders close at hand.',
  },
  safety: {
    eyebrow: 'Safety',
    title: 'Privacy and safety',
    subtitle: 'Visibility, contact rules, family access, and risk handling should live in one explicit control page.',
  },
  membership: {
    eyebrow: 'Service',
    title: 'Membership and services',
    subtitle: 'Membership should explain service value clearly instead of taking over the whole account structure.',
  },
  activity: {
    eyebrow: 'Activity',
    title: 'My activity',
    subtitle: 'Keep event participation as a secondary account page instead of a top-level dashboard destination.',
  },
}
