import type {
    ProfileBadgeCode,
    ProfileCardResponse,
    ProfileFactCode,
    ProfileFooterCode,
    ProfileTagCode,
} from '@/api/profiles/profiles'
import type {Translate} from '@/i18n/types'
import type {ProfileCardViewModel} from '@/types/profiles/card'

/** 将接口卡片响应转为组件可直接展示的数据 */
export function toProfileCardViewModel(card: ProfileCardResponse, t: Translate): ProfileCardViewModel {
    return {
        avatarUrl: card.avatarUrl,
        displayName: card.displayName,
        gender: card.gender,
        meta: card.meta,
        badge: t(resolveBadgeTextKey(card.badgeCode)),
        summary: card.summary,
        facts: card.facts.map((fact) => ({
            label: t(resolveFactLabelKey(fact.code)),
            value: fact.value,
        })),
        tags: [...card.tags, ...card.tagCodes.map((code) => t(resolveTagTextKey(code)))].slice(0, 3),
        footer: t(resolveFooterTextKey(card.footerCode)),
    }
}

function resolveFactLabelKey(code: ProfileFactCode): string {
    switch (code) {
        case 'education':
            return 'fields.education'
        case 'languages':
            return 'fields.languages'
        case 'residencePlan':
            return 'fields.residencePlan'
        case 'city':
        default:
            return 'fields.city'
    }
}

function resolveBadgeTextKey(code: ProfileBadgeCode): string {
    switch (code) {
        case 'marriage':
            return 'card.goalMarriage'
        case 'exclusive':
            return 'card.goalExclusive'
        case 'cross_border':
            return 'card.goalCrossBorder'
        case 'priority':
            return 'modes.priority'
        case 'contact_ready':
            return 'modes.contactReady'
        case 'context_only':
            return 'modes.contextOnly'
        case 'serious':
        default:
            return 'card.goalSerious'
    }
}

function resolveTagTextKey(code: ProfileTagCode): string {
    switch (code) {
        case 'marital_divorced':
            return 'tags.maritalDivorced'
        case 'marital_widowed':
            return 'tags.maritalWidowed'
        case 'accept_long_distance':
            return 'tags.longDistanceYes'
        case 'has_children':
            return 'tags.childrenYes'
        case 'no_children':
            return 'tags.childrenNo'
        case 'marital_single':
        default:
            return 'tags.maritalSingle'
    }
}

function resolveFooterTextKey(code: ProfileFooterCode): string {
    switch (code) {
        case 'review':
            return 'card.labelReview'
        case 'vip':
        case 'priority':
            return 'card.labelPriority'
        case 'contact_ready':
            return 'card.labelContactReady'
        case 'observe':
            return 'card.labelObserve'
        case 'open':
        default:
            return 'card.labelSelected'
    }
}
