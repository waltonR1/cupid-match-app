import type {ApiLocale, QueryRecord} from '../types/common.js'
import type {AccountRecord, Database, PrivateIntroductionRequestRecord} from '../types/database.js'
import type {
    DirectoryFacetOptionDTO,
    DirectorySort,
    FamilyProfileDetailDTO,
    FamilyProfileDirectoryFacetsDTO,
    FamilyProfileListItemDTO,
    IntentFacetDTO,
    NormalizedProfileQuery,
    ProfileRecord,
    ProfileWithDisplayName,
    SelfProfileDetailDTO,
    SelfProfileDirectoryFacetsDTO,
    SelfProfileListItemDTO,
} from '../types/profile.js'
import {
    PROFILE_FIELD_LOGIN_REQUIRED,
    PROFILE_FIELD_MEMBER_ONLY,
    SELF_PROFILE_GUEST_REQUIRED_FIELDS,
    SELF_PROFILE_LOGIN_REQUIRED_FIELDS,
    SELF_PROFILE_MEMBER_ONLY_FIELDS,
    type ProfileRestrictedFieldValue,
} from '../constants/profile-access.js'
import {MEMBERSHIP_BENEFITS, PRIVATE_INTRODUCTION_COOLDOWN_DAYS} from '../constants/membership.js'
import {buildPagination, paginate} from '../utils/pagination.js'
import {nextId} from '../utils/id.js'
import {resolveLocalizedText, resolveLocalizedTexts, withDisplayName} from '../utils/localized.js'
import {clamp, getString, toInt} from '../utils/string.js'

/** 标准化资料目录查询参数 */
export function normalizeProfileQuery(query: QueryRecord): NormalizedProfileQuery {
    return {
        page: toInt(query.page, 1),
        pageSize: toInt(query.pageSize, 6),
        sort: normalizeSort(getString(query.sort)),
        gender: getString(query.gender),
        ageRange: getString(query.ageRange),
        city: getString(query.city),
        heightRange: getString(query.heightRange),
        education: getString(query.education),
        datingIntentionCode: getString(query.datingIntentionCode),
        industry: getString(query.industry),
        occupation: getString(query.occupation),
        language: getString(query.language),
        verified: getString(query.verified),
        maritalStatus: getString(query.maritalStatus),
        hasChildren: getString(query.hasChildren),
        acceptsLongDistance: getString(query.acceptsLongDistance),
        familyMode: getString(query.familyMode),
    }
}

/** 构建个人资料筛选面板选项 */
export function buildSelfDirectoryFacets(locale: ApiLocale, items: ProfileWithDisplayName[]): SelfProfileDirectoryFacetsDTO {
    return {
        cities: uniqueLocalizedFacetOptions(locale, items.map((item) => item.city)),
        intents: uniqueIntentFacetOptions(locale, items),
        industries: uniqueLocalizedFacetOptions(locale, items.map((item) => item.industry)),
        occupations: uniqueLocalizedFacetOptions(locale, items.map((item) => item.occupation)),
        languages: Array.from(new Set(items.flatMap((item) => item.languages))).sort((left, right) => left.localeCompare(right)),
    }
}

/** 构建家庭资料筛选面板选项 */
export function buildFamilyDirectoryFacets(locale: ApiLocale, items: ProfileWithDisplayName[]): FamilyProfileDirectoryFacetsDTO {
    return {
        cities: uniqueLocalizedFacetOptions(locale, items.map((item) => item.city)),
        intents: uniqueIntentFacetOptions(locale, items),
        industries: uniqueLocalizedFacetOptions(locale, items.map((item) => item.industry)),
        occupations: uniqueLocalizedFacetOptions(locale, items.map((item) => item.occupation)),
    }
}

/** 判断个人资料是否匹配筛选条件 */
export function matchesSelfDirectory(profile: ProfileWithDisplayName, query: NormalizedProfileQuery): boolean {
    return [
        !query.gender || profile.gender === query.gender,
        matchAgeRange(profile.age, query.ageRange),
        !query.city || profile.city.en === query.city,
        matchHeightRange(profile.height, query.heightRange),
        !query.education || profile.degreeLevel === query.education,
        !query.datingIntentionCode || profile.datingIntentionCode === query.datingIntentionCode,
        !query.industry || profile.industry.en === query.industry,
        !query.occupation || profile.occupation.en === query.occupation,
        !query.language || profile.languages.includes(query.language),
        matchVerified(profile.isVerified, query.verified),
        !query.maritalStatus || profile.maritalStatus === query.maritalStatus,
        matchBooleanFlag(profile.hasChildren, query.hasChildren),
        matchBooleanFlag(profile.acceptsLongDistance, query.acceptsLongDistance),
    ].every(Boolean)
}

/** 判断家庭资料是否匹配筛选条件 */
export function matchesFamilyDirectory(profile: ProfileWithDisplayName, query: NormalizedProfileQuery): boolean {
    return [
        !query.gender || profile.gender === query.gender,
        matchAgeRange(profile.age, query.ageRange),
        !query.city || profile.city.en === query.city,
        !query.education || profile.degreeLevel === query.education,
        !query.datingIntentionCode || profile.datingIntentionCode === query.datingIntentionCode,
        matchFamilyMode(profile, query.familyMode),
        !query.occupation || profile.occupation.en === query.occupation,
        !query.industry || profile.industry.en === query.industry,
        !query.maritalStatus || profile.maritalStatus === query.maritalStatus,
        matchBooleanFlag(profile.hasChildren, query.hasChildren),
        matchBooleanFlag(profile.acceptsLongDistance, query.acceptsLongDistance),
    ].every(Boolean)
}

/** 排序个人资料 */
export function sortSelfProfiles(items: ProfileWithDisplayName[], sort: DirectorySort): ProfileWithDisplayName[] {
    const next = [...items]
    switch (sort) {
        case 'priorityFirst':
            return next.sort((left, right) => {
                const rankDiff = getSelfPriorityRank(left) - getSelfPriorityRank(right)
                if (rankDiff !== 0) {
                    return rankDiff
                }
                return compareRecentActive(left, right)
            })
        case 'ageAsc':
            return next.sort((left, right) => left.age - right.age)
        case 'ageDesc':
            return next.sort((left, right) => right.age - left.age)
        case 'recentActive':
        default:
            return next.sort(compareRecentActive)
    }
}

/** 排序家庭资料 */
export function sortFamilyProfiles(items: ProfileWithDisplayName[], sort: DirectorySort): ProfileWithDisplayName[] {
    const next = [...items]
    switch (sort) {
        case 'recentActive':
            return next.sort(compareRecentActive)
        case 'ageAsc':
            return next.sort((left, right) => left.age - right.age)
        case 'ageDesc':
            return next.sort((left, right) => right.age - left.age)
        case 'priorityFirst':
        default:
            return next.sort((left, right) => {
                const rankDiff = getFamilyPriorityRank(left) - getFamilyPriorityRank(right)
                if (rankDiff !== 0) {
                    return rankDiff
                }
                return compareRecentActive(left, right)
            })
    }
}

/** 获取首页精选个人资料 */
export function featuredProfiles(locale: ApiLocale, profiles: ProfileRecord[], rawPageSize: unknown): {
    items: SelfProfileListItemDTO[]
} {
    const pageSize = clamp(Number.parseInt(getString(rawPageSize) || '3', 10) || 3, 1, 12)
    const source = profiles.map(withDisplayName)
    const sorted = sortSelfProfiles(source, 'recentActive')

    return {
        items: paginate(sorted, 1, pageSize).map((profile) => toSelfProfileListItem(locale, profile)),
    }
}

/** 获取个人资料目录 */
export function listSelfProfiles(locale: ApiLocale, profiles: ProfileRecord[], query: QueryRecord): {
    items: SelfProfileListItemDTO[]
    pagination: ReturnType<typeof buildPagination>
    facets: SelfProfileDirectoryFacetsDTO
} {
    const normalizedQuery = normalizeProfileQuery(query)
    const source = profiles.map(withDisplayName)
    const filtered = source.filter((profile) => matchesSelfDirectory(profile, normalizedQuery))
    const sorted = sortSelfProfiles(filtered, normalizedQuery.sort)

    return {
        items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize).map((profile) => toSelfProfileListItem(locale, profile)),
        pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
        facets: buildSelfDirectoryFacets(locale, source),
    }
}

/** 获取家庭资料目录 */
export function listFamilyProfiles(locale: ApiLocale, profiles: ProfileRecord[], query: QueryRecord): {
    items: FamilyProfileListItemDTO[]
    pagination: ReturnType<typeof buildPagination>
    facets: FamilyProfileDirectoryFacetsDTO
} {
    const normalizedQuery = normalizeProfileQuery(query)
    const source = profiles.filter((profile) => profile.familyVisible).map(withDisplayName)
    const filtered = source.filter((profile) => matchesFamilyDirectory(profile, normalizedQuery))
    const sorted = sortFamilyProfiles(filtered, normalizedQuery.sort)

    return {
        items: paginate(sorted, normalizedQuery.page, normalizedQuery.pageSize).map((profile) => toFamilyProfileListItem(locale, profile)),
        pagination: buildPagination(sorted.length, normalizedQuery.page, normalizedQuery.pageSize),
        facets: buildFamilyDirectoryFacets(locale, source),
    }
}

/** 获取个人资料详情 */
export function selfProfileDetail(locale: ApiLocale, data: Database, id: string, accountId?: string): SelfProfileDetailDTO | null {
    const profile = data.profiles.find((item) => item.id === id)
    const account = accountId ? data.accounts.find((item) => item.id === accountId) ?? null : null

    if (!profile || (accountId && !account)) {
        return null
    }

    return toSelfProfileDetail(locale, withDisplayName(profile), account, data.private_introduction_requests)
}

/** 申请私人介绍 */
export function requestPrivateIntroduction(data: Database, profileId: string, accountId?: string) {
    const profile = data.profiles.find((item) => item.id === profileId)
    const account = accountId ? data.accounts.find((item) => item.id === accountId) ?? null : null

    if (!profile) return {status: 'not_found' as const}
    if (!account) return {status: 'login_required' as const}

    const introduction = resolvePrivateIntroduction(account, profileId, data.private_introduction_requests)

    if (!introduction.canRequest) {
        return {status: 'blocked' as const, introduction}
    }

    const now = new Date().toISOString()
    data.private_introduction_requests.push({
        id: nextId('intro', data.private_introduction_requests),
        accountId: account.id,
        profileId,
        status: 'requested',
        requestedAt: now,
    })

    return {
        status: 'created' as const,
        introduction: resolvePrivateIntroduction(account, profileId, data.private_introduction_requests),
    }
}

/** 获取家庭资料详情 */
export function familyProfileDetail(locale: ApiLocale, profiles: ProfileRecord[], id: string): FamilyProfileDetailDTO | null {
    const profile = profiles.find((item) => item.id === id && item.familyVisible)
    return profile ? toFamilyProfileDetail(locale, withDisplayName(profile)) : null
}

/** 转换为个人资料列表项 */
export function toSelfProfileListItem(locale: ApiLocale, profile: ProfileWithDisplayName): SelfProfileListItemDTO {
    return {
        id: profile.id,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        gender: profile.gender,
        age: profile.age,
        city: resolveLocalizedText(locale, profile.city),
        profileStatus: profile.profileStatus,
        education: resolveLocalizedText(locale, profile.education),
        occupation: resolveLocalizedText(locale, profile.occupation),
        industry: resolveLocalizedText(locale, profile.industry),
        datingIntentionCode: profile.datingIntentionCode,
        summary: resolveLocalizedText(locale, profile.summary),
        languages: profile.languages,
        tags: resolveLocalizedTexts(locale, profile.tags),
    }
}

/** 转换为家庭资料列表项 */
export function toFamilyProfileListItem(locale: ApiLocale, profile: ProfileWithDisplayName): FamilyProfileListItemDTO {
    return {
        id: profile.id,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        gender: profile.gender,
        age: profile.age,
        city: resolveLocalizedText(locale, profile.city),
        profileStatus: profile.profileStatus,
        education: resolveLocalizedText(locale, profile.education),
        occupation: resolveLocalizedText(locale, profile.occupation),
        industry: resolveLocalizedText(locale, profile.industry),
        maritalStatus: profile.maritalStatus,
        hasChildren: profile.hasChildren,
        acceptsLongDistance: profile.acceptsLongDistance,
        relationshipPlan: resolveLocalizedText(locale, profile.relationshipPlan),
        residencePlan: resolveLocalizedText(locale, profile.residencePlan),
        tags: resolveLocalizedTexts(locale, profile.tags),
        allowFamilyContact: profile.allowFamilyContact,
        familyPriority: profile.familyPriority,
    }
}

/** 转换为个人资料详情 */
export function toSelfProfileDetail(
    locale: ApiLocale,
    profile: ProfileWithDisplayName,
    account: AccountRecord | null,
    introductionRequests: PrivateIntroductionRequestRecord[] = [],
): SelfProfileDetailDTO {
    return applySelfProfileAccess({
        id: profile.id,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        photos: profile.photos.map((photo) => ({
            ...photo,
            caption: resolveLocalizedText(locale, photo.caption),
        })),
        gender: profile.gender,
        age: profile.age,
        height: profile.height,
        city: resolveLocalizedText(locale, profile.city),
        country: resolveLocalizedText(locale, profile.country),
        languages: profile.languages,
        profileStatus: profile.profileStatus,
        isVerified: profile.isVerified,
        education: resolveLocalizedText(locale, profile.education),
        industry: resolveLocalizedText(locale, profile.industry),
        maritalStatus: profile.maritalStatus,
        hasChildren: profile.hasChildren,
        wantsChildren: profile.wantsChildren,
        acceptsLongDistance: profile.acceptsLongDistance,
        datingIntentionCode: profile.datingIntentionCode,
        datingIntentionLabel: resolveLocalizedText(locale, profile.datingIntentionLabel),
        relationshipPlan: resolveLocalizedText(locale, profile.relationshipPlan),
        residencePlan: resolveLocalizedText(locale, profile.residencePlan),
        relocationWillingness: resolveLocalizedText(locale, profile.relocationWillingness),
        values: resolveLocalizedTexts(locale, profile.values),
        preferredAgeMin: profile.preferredAgeMin,
        preferredAgeMax: profile.preferredAgeMax,
        locationScope: resolveLocalizedText(locale, profile.locationScope),
        preferredEducation: resolveLocalizedText(locale, profile.preferredEducation),
        familyPlan: resolveLocalizedText(locale, profile.familyPlan),
        dealBreakers: resolveLocalizedTexts(locale, profile.dealBreakers),
        smoking: profile.smoking,
        drinking: profile.drinking,
        exercise: resolveLocalizedText(locale, profile.exercise),
        activityLevel: resolveLocalizedText(locale, profile.activityLevel),
        weekendStyle: resolveLocalizedText(locale, profile.weekendStyle),
        pets: resolveLocalizedText(locale, profile.pets),
        personalityTraits: resolveLocalizedTexts(locale, profile.personalityTraits),
        interests: resolveLocalizedTexts(locale, profile.interests),
        communicationStyle: resolveLocalizedText(locale, profile.communicationStyle),
        summary: resolveLocalizedText(locale, profile.summary),
        tags: resolveLocalizedTexts(locale, profile.tags),
        prompts: profile.prompts.map((prompt) => ({
            ...prompt,
            prompt: resolveLocalizedText(locale, prompt.prompt),
            answer: resolveLocalizedText(locale, prompt.answer),
        })),
        privateIntroduction: resolvePrivateIntroduction(account, profile.id, introductionRequests),
    }, resolveSelfProfileAccessLevel(account))
}

/** 转换为家庭资料详情 */
export function toFamilyProfileDetail(locale: ApiLocale, profile: ProfileWithDisplayName): FamilyProfileDetailDTO {
    return {
        id: profile.id,
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        gender: profile.gender,
        age: profile.age,
        city: resolveLocalizedText(locale, profile.city),
        country: resolveLocalizedText(locale, profile.country),
        nationality: resolveLocalizedText(locale, profile.nationality),
        languages: profile.languages,
        isVerified: profile.isVerified,
        lastActiveAt: profile.lastActiveAt,
        joinedAt: profile.joinedAt,
        familyVisible: profile.familyVisible,
        allowFamilyContact: profile.allowFamilyContact,
        familyPriority: profile.familyPriority,
        education: resolveLocalizedText(locale, profile.education),
        occupation: resolveLocalizedText(locale, profile.occupation),
        industry: resolveLocalizedText(locale, profile.industry),
        incomeRange: resolveLocalizedText(locale, profile.incomeRange),
        maritalStatus: profile.maritalStatus,
        hasChildren: profile.hasChildren,
        wantsChildren: profile.wantsChildren,
        acceptsLongDistance: profile.acceptsLongDistance,
        datingIntentionLabel: resolveLocalizedText(locale, profile.datingIntentionLabel),
        relationshipPlan: resolveLocalizedText(locale, profile.relationshipPlan),
        residencePlan: resolveLocalizedText(locale, profile.residencePlan),
        smoking: profile.smoking,
        drinking: profile.drinking,
        exercise: resolveLocalizedText(locale, profile.exercise),
        summary: resolveLocalizedText(locale, profile.summary),
        tags: resolveLocalizedTexts(locale, profile.tags),
    }
}

/** 标准化排序字段 */
function normalizeSort(value: string): DirectorySort {
    if (value === 'priorityFirst' || value === 'ageAsc' || value === 'ageDesc' || value === 'recentActive') {
        return value
    }

    return 'recentActive'
}

/** 去重并生成本地化筛选项 */
function uniqueLocalizedFacetOptions(locale: ApiLocale, items: ProfileRecord['city'][]): DirectoryFacetOptionDTO[] {
    const seen = new Set<string>()
    return items
        .filter((item) => {
            if (seen.has(item.en)) {
                return false
            }
            seen.add(item.en)
            return true
        })
        .sort((left, right) => left.en.localeCompare(right.en))
        .map((item) => ({
            value: item.en,
            label: resolveLocalizedText(locale, item),
        }))
}

/** 去重并生成意向筛选项 */
function uniqueIntentFacetOptions(locale: ApiLocale, items: ProfileWithDisplayName[]): IntentFacetDTO[] {
    const seen = new Set<string>()
    return items
        .map((item) => ({code: item.datingIntentionCode, label: item.datingIntentionLabel}))
        .filter((item) => {
            if (seen.has(item.code)) {
                return false
            }
            seen.add(item.code)
            return true
        })
        .map((item) => ({
            code: item.code,
            label: resolveLocalizedText(locale, item.label),
        }))
}

type SelfProfileAccessLevel = 'guest' | 'free' | 'member'

/** 按访问层级收敛个人详情字段 */
function applySelfProfileAccess(detail: SelfProfileDetailDTO, accessLevel: SelfProfileAccessLevel): SelfProfileDetailDTO {
    const next = {...detail}

    if (accessLevel === 'guest') {
        SELF_PROFILE_GUEST_REQUIRED_FIELDS.forEach((field) => {
            assignRestrictedField(next, field, PROFILE_FIELD_LOGIN_REQUIRED)
        })
        return next
    }

    if (accessLevel === 'free') {
        SELF_PROFILE_MEMBER_ONLY_FIELDS.forEach((field) => {
            assignRestrictedField(next, field, PROFILE_FIELD_MEMBER_ONLY)
        })
    }

    return next
}

function assignRestrictedField(
    detail: SelfProfileDetailDTO,
    field:
        | (typeof SELF_PROFILE_GUEST_REQUIRED_FIELDS)[number]
        | (typeof SELF_PROFILE_LOGIN_REQUIRED_FIELDS)[number]
        | (typeof SELF_PROFILE_MEMBER_ONLY_FIELDS)[number],
    value: ProfileRestrictedFieldValue,
) {
    ;(detail as unknown as Record<string, unknown>)[field] = value
}

function resolveSelfProfileAccessLevel(account: AccountRecord | null): SelfProfileAccessLevel {
    if (!account) return 'guest'
    return account.membership === 'free' ? 'free' : 'member'
}

/** 计算私人介绍状态 */
function resolvePrivateIntroduction(
    account: AccountRecord | null,
    profileId: string,
    requests: PrivateIntroductionRequestRecord[],
): SelfProfileDetailDTO['privateIntroduction'] {
    if (!account) {
        return {
            status: 'login_required',
            membership: 'guest',
            quotaTotal: 0,
            quotaRemaining: 0,
            alreadyRequested: false,
            canRequest: false,
        }
    }

    const benefit = MEMBERSHIP_BENEFITS[account.membership]
    const relatedRequests = requests.filter((item) => item.accountId === account.id)
    const profileRequest = latestProfileIntroductionRequest(relatedRequests, profileId)
    const quotaUsed = relatedRequests
        .filter((item) => isCurrentMonthIntroduction(item))
        .filter((item) => isQuotaConsumingIntroduction(item))
        .length
    const quotaRemaining = Math.max(0, benefit.privateIntroductionQuota - quotaUsed)

    if (profileRequest && isBlockingProfileIntroduction(profileRequest)) {
        const blockingRequest = profileRequest.status === 'declined'
            ? resolveDeclinedCooldown(profileRequest)
            : profileRequest

        return {
            status: resolveBlockingIntroductionStatus(blockingRequest),
            membership: account.membership,
            quotaTotal: benefit.privateIntroductionQuota,
            quotaRemaining,
            alreadyRequested: true,
            canRequest: false,
            cooldownUntil: blockingRequest.cooldownUntil,
        }
    }

    if (quotaRemaining <= 0) {
        return {
            status: 'quota_exhausted',
            membership: account.membership,
            quotaTotal: benefit.privateIntroductionQuota,
            quotaRemaining,
            alreadyRequested: false,
            canRequest: false,
        }
    }

    return {
        status: 'available',
        membership: account.membership,
        quotaTotal: benefit.privateIntroductionQuota,
        quotaRemaining,
        alreadyRequested: false,
        canRequest: true,
    }
}

/** 判断私人介绍是否占用额度 */
function isQuotaConsumingIntroduction(request: PrivateIntroductionRequestRecord): boolean {
    return request.status === 'requested'
        || request.status === 'accepted'
        || request.status === 'cooldown'
}

/** 获取当前资料最近一次私人介绍请求 */
function latestProfileIntroductionRequest(
    requests: PrivateIntroductionRequestRecord[],
    profileId: string,
): PrivateIntroductionRequestRecord | null {
    const profileRequests = requests
        .filter((item) => item.profileId === profileId)
        .sort((left, right) => toTimestamp(right.requestedAt) - toTimestamp(left.requestedAt))

    return profileRequests[0] ?? null
}

/** 判断请求是否属于本月额度 */
function isCurrentMonthIntroduction(request: PrivateIntroductionRequestRecord): boolean {
    const requestedAt = new Date(request.requestedAt)
    const now = new Date()

    return requestedAt.getUTCFullYear() === now.getUTCFullYear()
        && requestedAt.getUTCMonth() === now.getUTCMonth()
}

/** 判断资料请求是否阻止再次申请 */
function isBlockingProfileIntroduction(request: PrivateIntroductionRequestRecord): boolean {
    if (request.status === 'requested' || request.status === 'accepted') return true
    if (request.status === 'cooldown') return !isCooldownExpired(request)
    if (request.status === 'declined') return !isCooldownExpired(resolveDeclinedCooldown(request))

    return false
}

/** 解析阻塞状态 */
function resolveBlockingIntroductionStatus(request: PrivateIntroductionRequestRecord): SelfProfileDetailDTO['privateIntroduction']['status'] {
    if (request.status === 'declined') return 'cooldown'
    return request.status
}

/** 为拒绝状态补齐 90 天冷静期 */
function resolveDeclinedCooldown(request: PrivateIntroductionRequestRecord): PrivateIntroductionRequestRecord {
    if (request.cooldownUntil) return request

    const baseDate = request.respondedAt ?? request.requestedAt
    const cooldownUntil = new Date(toTimestamp(baseDate) + PRIVATE_INTRODUCTION_COOLDOWN_DAYS * 24 * 60 * 60 * 1000).toISOString()

    return {
        ...request,
        cooldownUntil,
    }
}

/** 判断冷静期是否结束 */
function isCooldownExpired(request: PrivateIntroductionRequestRecord): boolean {
    if (!request.cooldownUntil) return false
    return toTimestamp(request.cooldownUntil) <= Date.now()
}

/** 公开资料年龄段 */
/** 比较最近活跃时间 */
function compareRecentActive(left: ProfileWithDisplayName, right: ProfileWithDisplayName): number {
    return toTimestamp(right.lastActiveAt) - toTimestamp(left.lastActiveAt)
}

/** 转换为时间戳 */
function toTimestamp(value: string): number {
    const next = new Date(value).getTime()
    return Number.isNaN(next) ? 0 : next
}

/** 获取个人资料优先级 */
function getSelfPriorityRank(profile: ProfileWithDisplayName): number {
    return profile.profileStatus === 'vip' ? 0 : 1
}

/** 获取家庭资料优先级 */
function getFamilyPriorityRank(profile: ProfileWithDisplayName): number {
    if (profile.familyPriority) {
        return 0
    }
    if (profile.allowFamilyContact) {
        return 1
    }
    return 2
}

/** 匹配年龄区间 */
function matchAgeRange(age: number, range: string): boolean {
    if (!range) {
        return true
    }

    switch (range) {
        case 'under25':
            return age < 25
        case '25to29':
            return age >= 25 && age <= 29
        case '30to34':
            return age >= 30 && age <= 34
        case '35to39':
            return age >= 35 && age <= 39
        case '40plus':
            return age >= 40
        default:
            return true
    }
}

/** 匹配身高区间 */
function matchHeightRange(height: number, range: string): boolean {
    if (!range) {
        return true
    }

    switch (range) {
        case 'under165':
            return height < 165
        case '165to169':
            return height >= 165 && height <= 169
        case '170to174':
            return height >= 170 && height <= 174
        case '175to179':
            return height >= 175 && height <= 179
        case '180plus':
            return height >= 180
        default:
            return true
    }
}

/** 匹配认证状态 */
function matchVerified(isVerified: boolean, value: string): boolean {
    if (!value) {
        return true
    }
    if (value === 'verified') {
        return isVerified
    }
    if (value === 'unverified') {
        return !isVerified
    }
    return true
}

/** 匹配布尔筛选条件 */
function matchBooleanFlag(source: boolean, value: string): boolean {
    if (!value) {
        return true
    }
    if (value === 'yes') {
        return source
    }
    if (value === 'no') {
        return !source
    }
    return true
}

/** 匹配家庭展示模式 */
function matchFamilyMode(profile: ProfileWithDisplayName, value: string): boolean {
    if (!value) {
        return true
    }

    switch (value) {
        case 'context_only':
            return profile.familyVisible && !profile.allowFamilyContact && !profile.familyPriority
        case 'contact_ready':
            return profile.allowFamilyContact
        case 'priority':
            return profile.familyPriority
        default:
            return true
    }
}
