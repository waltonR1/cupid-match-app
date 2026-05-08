import type {MembershipLevel} from '../types/database.js'

export interface MembershipBenefit {
    privateIntroductionQuota: number
    conciergePriority: boolean
}

export const MEMBERSHIP_BENEFITS: Record<MembershipLevel, MembershipBenefit> = {
    free: {
        privateIntroductionQuota: 1,
        conciergePriority: false,
    },
    silver: {
        privateIntroductionQuota: 5,
        conciergePriority: false,
    },
    gold: {
        privateIntroductionQuota: 15,
        conciergePriority: false,
    },
    diamond: {
        privateIntroductionQuota: 30,
        conciergePriority: true,
    },
}

export const PRIVATE_INTRODUCTION_COOLDOWN_DAYS = 90
