import type {ApiLocale} from '../types/common.js'
import type {AccountRecord, Database, MembershipLevel} from '../types/database.js'
import type {FamilyProfileDetailDTO, SelfProfileDetailDTO} from '../types/profile.js'
import {toFamilyProfileDetail, toSelfProfileDetail} from './profile.service.js'
import {withDisplayName} from '../utils/localized.js'

export type ProfileAccessDebugType = 'self' | 'family'
export type ProfileAccessDebugMode = 'backend' | 'guest' | 'free' | 'member'

export type ProfileAccessDebugDetailDTO = SelfProfileDetailDTO | FamilyProfileDetailDTO

export function getProfileAccessDebugPreview(
    locale: ApiLocale,
    data: Database,
    profileType: ProfileAccessDebugType,
    profileId: string,
    mode: ProfileAccessDebugMode,
    accountId?: string,
): ProfileAccessDebugDetailDTO | null {
    const profile = data.profiles.find((item) => item.id === profileId)
    if (!profile) return null
    if (profileType === 'family' && !profile.familyVisible) return null

    const account = resolvePreviewAccount(data, profileId, mode, accountId)

    if (profileType === 'family') {
        return toFamilyProfileDetail(locale, withDisplayName(profile), account, data.private_introduction_requests)
    }

    return toSelfProfileDetail(locale, withDisplayName(profile), account, data.private_introduction_requests)
}

function resolvePreviewAccount(
    data: Database,
    profileId: string,
    mode: ProfileAccessDebugMode,
    accountId?: string,
): AccountRecord | null {
    if (mode === 'guest') return null

    if (mode === 'backend') {
        return accountId ? data.accounts.find((item) => item.id === accountId) ?? null : null
    }

    return createPreviewAccount(profileId, mode === 'free' ? 'free' : 'silver')
}

function createPreviewAccount(profileId: string, membership: MembershipLevel): AccountRecord {
    const emptyText = {zh: '', fr: '', en: ''}

    return {
        id: `debug-${membership}`,
        role: 'self',
        realName: 'Debug Preview',
        nickName: 'Debug Preview',
        avatarUrl: '',
        city: emptyText,
        joinedAt: new Date(0).toISOString(),
        profileId,
        completion: 100,
        membership,
        bio: emptyText,
    }
}
