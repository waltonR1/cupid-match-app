import type {ProfileCardResponse} from '@/api/profiles/profiles'
import type {Translate} from '@/i18n/types'
import type {ProfileCardViewModel} from '@/types/profiles/card'

/** 将接口卡片响应转为组件可直接展示的数据 */
export function toProfileCardViewModel(card: ProfileCardResponse, t: Translate): ProfileCardViewModel {
    return {
        avatarUrl: card.avatarUrl,
        displayName: card.displayName,
        gender: card.gender,
        meta: card.meta,
        badge: t(card.badgeKey),
        summary: card.summary,
        facts: card.facts.map((fact) => ({
            label: t(fact.labelKey),
            value: fact.value,
        })),
        tags: card.tags,
        footer: t(card.footerKey),
    }
}
