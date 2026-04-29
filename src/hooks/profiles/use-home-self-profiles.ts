import {computed, ref, watch, type Ref} from 'vue'
import {getFeaturedSelfProfiles, type FormatLocale, type SelfProfileCard} from '@/api/profiles/profiles'
import type {HomeProfilesItem} from '@/types/home/view'
import {formatProfileAge, formatProfileLanguages, localizeProfileText} from '@/utils/profile-format'

type Translate = (key: string) => string


/** 首页精选会员数据 */
export function useHomeSelfProfiles(t: Translate, locale: Ref<FormatLocale>) {
    const loading = ref(false)
    const error = ref<unknown>(null)
    const items = ref<HomeProfilesItem[]>([])
    let requestToken = 0

    watch(locale, () => {
        void load()
    }, {immediate: true})

    /** 加载首页精选会员 */
    async function load() {
        const currentToken = ++requestToken

        loading.value = true
        error.value = null

        try {
            const response = await getFeaturedSelfProfiles()

            if (currentToken !== requestToken) return

            items.value = response.items.map(profile => ({
                id: profile.id,
                card: toSelfProfileCard(profile, locale.value, t),
            }))
        } catch (requestError) {
            if (currentToken !== requestToken) return

            error.value = requestError
            items.value = []
        } finally {
            if (currentToken === requestToken) {
                loading.value = false
            }
        }
    }

    return {
        loading,
        error,
        featuredProfiles: computed(() => items.value),
        refresh: load,
    }
}

/** 转换为首页会员卡片数据 */
function toSelfProfileCard(profile: SelfProfileCard, locale: FormatLocale, t: Translate) {
    return {
        avatarUrl: profile.avatarUrl,
        avatarFallback: profile.displayName,
        displayName: profile.displayName,
        gender: profile.gender,
        meta: `${formatProfileAge(locale, profile.age)} / ${localizeProfileText(locale, profile.occupation)}`,
        badge: t(intentBadgeKey(profile.intentCode)),
        summary: localizeProfileText(locale, profile.summary),
        facts: [
            {label: t('fields.city'), value: localizeProfileText(locale, profile.city)},
            {label: t('fields.education'), value: localizeProfileText(locale, profile.education)},
            {label: t('fields.languages'), value: formatProfileLanguages(locale, profile.languages)},
        ],
        tags: profile.tags.slice(0, 3).map(item => localizeProfileText(locale, item)),
        footer: t(statusFooterKey(profile.status)),
    }
}

/** 匹配交友目标文案 */
function intentBadgeKey(intentCode: SelfProfileCard['intentCode']) {
    switch (intentCode) {
        case 'marriage':
            return 'card.goalMarriage'
        case 'exclusive':
            return 'card.goalExclusive'
        case 'cross_border':
            return 'card.goalCrossBorder'
        case 'serious':
        default:
            return 'card.goalSerious'
    }
}

/** 匹配卡片底部状态文案 */
function statusFooterKey(status: SelfProfileCard['status']) {
    switch (status) {
        case 'review':
            return 'card.labelReview'
        case 'vip':
            return 'card.labelPriority'
        case 'open':
        default:
            return 'card.labelSelected'
    }
}