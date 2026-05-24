import type {LocalizedText} from '../types/common.js'
import type {
    DatingIntentionCode,
    ProfilePhotoRecord,
    ProfileRecord,
    ProfileVerificationRecord,
} from '../types/profile.js'
import {localized} from './localized.js'

const DEFAULT_PROFILE_AVATAR = ''

const DATING_INTENTION_LABELS: Record<DatingIntentionCode, LocalizedText> = {
    serious: localized('认真关系', 'Relation serieuse', 'Serious relationship'),
    marriage: localized('婚姻导向', 'Projet de mariage', 'Marriage-minded'),
    exclusive: localized('稳定专属关系', 'Relation exclusive', 'Exclusive relationship'),
    cross_border: localized('跨境发展', 'Relation internationale', 'Cross-border relationship'),
}

/** 生成稳定的前台匿名展示名 */
export function deriveProfileDisplayName(profileId: string): string {
    let hash = 0
    for (const char of profileId) {
        hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0
    }

    const suffix = Math.abs(hash).toString(36).toUpperCase().padStart(6, '0').slice(0, 6)
    return `CM-${suffix}`
}

/** 从出生年份派生当前年龄 */
export function deriveProfileAge(profile: ProfileRecord): number {
    if (!profile.birthYear) return 0
    return new Date().getFullYear() - profile.birthYear
}

/** 从主图派生头像地址 */
export function deriveProfileAvatarUrl(photos: ProfilePhotoRecord[]): string {
    return photos.find((photo) => photo.isPrimary)?.url ?? photos[0]?.url ?? DEFAULT_PROFILE_AVATAR
}

/** 判断资料认证是否已经完成 */
export function deriveProfileVerified(verifications: ProfileVerificationRecord[]): boolean {
    return verifications.some((item) => {
        return item.identityStatus === 'verified' && item.reviewStatus === 'approved'
    })
}

/** 从意向 code 派生多语言展示文案 */
export function deriveDatingIntentionLabel(code: DatingIntentionCode): LocalizedText {
    return DATING_INTENTION_LABELS[code] ?? DATING_INTENTION_LABELS.serious
}
