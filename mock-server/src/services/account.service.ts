import type { Database, MembershipLevel } from '../types/database.js'

interface AccountShellUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  joinedAt: string
  membership: MembershipLevel
}

export interface AccountOverviewDTO {
  user: AccountShellUserDTO
}

export function getAccountOverview(data: Database, userId: string): AccountOverviewDTO | null {
  const user = data.users.find((item) => item.id === userId)
  if (!user) return null

  const membership = data.memberships.find((item) => item.userId === userId)

  return {
    user: {
      id: user.id,
      accountName: user.accountName,
      avatarUrl: user.avatarUrl,
      joinedAt: user.createdAt,
      membership: membership?.tier ?? 'free',
    },
  }
}
