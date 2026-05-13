export type AccountMembershipLevel = 'free' | 'silver' | 'gold' | 'diamond'

export interface AccountShellUser {
  id: string
  accountName: string
  avatarUrl: string
  joinedAt: string
  membership: AccountMembershipLevel
}

export interface AccountOverviewResponse {
  user: AccountShellUser
}
