import {computed, ref, watch, type Ref} from 'vue'
import {getFeaturedSelfProfiles, type FormatLocale} from '@/api/profiles'
import {useLatestRequest} from '@/hooks/common/useLatestRequest'
import type {Translate} from '@/i18n/types'
import {toSelfProfileCardViewModel} from '@/mappers/profile-card.mapper'
import type {ProfileCardListItem} from '@/types/profiles/card'

/** 首页精选会员数据 */
export function useHomeSelfProfiles(t: Translate, locale: Ref<FormatLocale>) {
    const latest = useLatestRequest()
    const items = ref<ProfileCardListItem[]>([])

    /** 语言变化时重新加载数据 */
    watch(locale, () => {
        void load()
    }, {immediate: true})

    /** 加载首页精选会员 */
    async function load() {
        const response = await latest.run(() => getFeaturedSelfProfiles())

        if (!response) return

        items.value = response.items.map(item => ({
            id: item.id,
            card: toSelfProfileCardViewModel(item, locale.value, t),
        }))
    }

    return {
        loading: latest.loading,
        error: latest.error,
        featuredProfiles: computed(() => items.value),
        refresh: load,
    }
}
