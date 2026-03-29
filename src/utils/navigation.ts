import type { NavItem } from '@/constants/nav'

export function navigateByNavKey(key: string, navList: NavItem[]) {
    const target = navList.find(item => item.key === key)
    if (!target?.path) return

    uni.navigateTo({
        url: target.path
    })
}