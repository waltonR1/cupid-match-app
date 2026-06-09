import type {ApiLocale} from '../types/common.js'
import type {Database, MembershipPlanRecord} from '../types/database.js'
import {resolveLocalizedText} from '../utils/localized.js'

export interface MembershipPlanDTO {
    id: string
    tier: MembershipPlanRecord['tier']
    name: string
    description: string
    priceCents: number
    currency: MembershipPlanRecord['currency']
    cnyPriceCents: number
    billingType: MembershipPlanRecord['billingType']
    billingPeriod?: MembershipPlanRecord['billingPeriod']
    validityMonths?: number
    privateIntroductionQuota: number
    privateIntroductionPeriod: MembershipPlanRecord['privateIntroductionPeriod']
    eventQuota: number
    eventPriorityEnabled: boolean
    staffReviewEnabled: boolean
    profileDetailAccessLevel: MembershipPlanRecord['profileDetailAccessLevel']
    conciergePriority: boolean
    staffSupportLevel: MembershipPlanRecord['staffSupportLevel']
    sortOrder: number
    featured: boolean
}

export function getMembershipCatalog(locale: ApiLocale, data: Database) {
    return {
        plans: data.membership_plans
            .filter((item) => item.isActive)
            .sort((left, right) => left.sortOrder - right.sortOrder)
            .map((item) => toMembershipPlanDTO(locale, item)),
    }
}

export function toMembershipPlanDTO(locale: ApiLocale, plan: MembershipPlanRecord): MembershipPlanDTO {
    return {
        id: plan.id,
        tier: plan.tier,
        name: resolveLocalizedText(locale, plan.name),
        description: resolveLocalizedText(locale, plan.description),
        priceCents: plan.priceCents,
        currency: plan.currency,
        cnyPriceCents: plan.cnyPriceCents,
        billingType: plan.billingType,
        billingPeriod: plan.billingPeriod,
        validityMonths: plan.validityMonths,
        privateIntroductionQuota: plan.privateIntroductionQuota,
        privateIntroductionPeriod: plan.privateIntroductionPeriod,
        eventQuota: plan.eventQuota,
        eventPriorityEnabled: plan.eventPriorityEnabled,
        staffReviewEnabled: plan.staffReviewEnabled,
        profileDetailAccessLevel: plan.profileDetailAccessLevel,
        conciergePriority: plan.conciergePriority,
        staffSupportLevel: plan.staffSupportLevel,
        sortOrder: plan.sortOrder,
        featured: plan.featured,
    }
}
