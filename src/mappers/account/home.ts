import type { AccountDashboardDTO } from '@/api/account'

/** 根据用户当前状态返回首要引导动作，无动作时返回 undefined */
export function resolvePrimaryAction(payload: AccountDashboardDTO): string | undefined {
  if (payload.profiles.length === 0) return 'create-profile'
  if (payload.recentIntroductions.length === 0 && payload.favoriteCount === 0) return 'browse-profiles'
  return undefined
}
