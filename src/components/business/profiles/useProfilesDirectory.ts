import { computed, ref } from 'vue'
import { useLocaleBridge } from '@/i18n/use-locale-bridge'
import {
    localized,
    mockProfiles,
    getLocalizedIntentOptions,
    getLocalizedLanguageOptions,
    getLocalizedProfileOptions,
} from '@/mock/business'
import type { MockProfile } from '@/mock/business'
import type {
    DirectoryOption,
    ProfilesDirectoryFilters,
    ProfilesSortKey,
    UseProfilesDirectoryResult,
} from './profiles.types'

const DEFAULT_FILTERS: ProfilesDirectoryFilters = {
    ageRange: '',
    city: '',
    heightRange: '',
    education: '',
    intentCode: '',

    industry: '',
    occupation: '',
    language: '',
    verified: '',
    maritalStatus: '',
    hasChildren: '',
    acceptLongDistance: '',
}

function toTimestamp(dateText?: string) {
    if (!dateText) return 0
    const value = new Date(dateText).getTime()
    return Number.isNaN(value) ? 0 : value
}

function buildBaseAllOption(label: string): DirectoryOption {
    return {
        label,
        value: '',
    }
}

function matchAgeRange(age: number, range: string) {
    if (!range) return true

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

function matchHeightRange(height: number, range: string) {
    if (!range) return true

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

function matchEducation(profile: MockProfile, education: string) {
    if (!education) return true

    switch (education) {
        case 'bachelor':
            return profile.degreeLevel === 'bachelor'
        case 'master':
            return profile.degreeLevel === 'master'
        case 'phd':
            return profile.degreeLevel === 'phd'
        default:
            return true
    }
}

function matchVerified(isVerified: boolean, value: string) {
    if (!value) return true

    switch (value) {
        case 'verified':
            return isVerified === true
        case 'unverified':
            return isVerified === false
        default:
            return true
    }
}

function matchHasChildren(hasChildren: boolean, value: string) {
    if (!value) return true

    switch (value) {
        case 'yes':
            return hasChildren === true
        case 'no':
            return hasChildren === false
        default:
            return true
    }
}

function matchAcceptLongDistance(acceptLongDistance: boolean, value: string) {
    if (!value) return true

    switch (value) {
        case 'yes':
            return acceptLongDistance === true
        case 'no':
            return acceptLongDistance === false
        default:
            return true
    }
}

export function useProfilesDirectory(): UseProfilesDirectoryResult<MockProfile> {
    const { locale } = useLocaleBridge()

    const filters = ref<ProfilesDirectoryFilters>({ ...DEFAULT_FILTERS })
    const sortKey = ref<ProfilesSortKey>('recentActive')
    const page = ref(1)
    const pageSize = ref(6)

    const allLabel = computed(() => {
        return localized('全部', 'Tous', 'All')[locale.value]
    })

    const ageOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: localized('25岁以下', 'Moins de 25 ans', 'Under 25')[locale.value],
            value: 'under25',
        },
        {
            label: localized('25-29岁', '25-29 ans', '25-29')[locale.value],
            value: '25to29',
        },
        {
            label: localized('30-34岁', '30-34 ans', '30-34')[locale.value],
            value: '30to34',
        },
        {
            label: localized('35-39岁', '35-39 ans', '35-39')[locale.value],
            value: '35to39',
        },
        {
            label: localized('40岁以上', '40 ans et plus', '40+')[locale.value],
            value: '40plus',
        },
    ])

    const heightOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: '165cm-',
            value: 'under165',
        },
        {
            label: '165-169cm',
            value: '165to169',
        },
        {
            label: '170-174cm',
            value: '170to174',
        },
        {
            label: '175-179cm',
            value: '175to179',
        },
        {
            label: '180cm+',
            value: '180plus',
        },
    ])

    const educationOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: localized('本科', 'Licence', 'Bachelor')[locale.value],
            value: 'bachelor',
        },
        {
            label: localized('硕士', 'Master', 'Master')[locale.value],
            value: 'master',
        },
        {
            label: localized('博士', 'Doctorat', 'PhD')[locale.value],
            value: 'phd',
        },
    ])

    const verifiedOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: localized('已认证', 'Verifie', 'Verified')[locale.value],
            value: 'verified',
        },
        {
            label: localized('未认证', 'Non verifie', 'Unverified')[locale.value],
            value: 'unverified',
        },
    ])

    const childrenOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: localized('有孩子', 'Avec enfants', 'Has children')[locale.value],
            value: 'yes',
        },
        {
            label: localized('无孩子', 'Sans enfant', 'No children')[locale.value],
            value: 'no',
        },
    ])

    const longDistanceOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: localized('接受异地', 'Ouvert a distance', 'Open to long-distance')[locale.value],
            value: 'yes',
        },
        {
            label: localized('不接受异地', 'Pas de distance', 'No long-distance')[locale.value],
            value: 'no',
        },
    ])

    const cityOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        ...getLocalizedProfileOptions(locale.value, profile => profile.city).map(value => ({
            label: value,
            value,
        })),
    ])

    const industryOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        ...getLocalizedProfileOptions(locale.value, profile => profile.industry).map(value => ({
            label: value,
            value,
        })),
    ])

    const occupationOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        ...getLocalizedProfileOptions(locale.value, profile => profile.occupation).map(value => ({
            label: value,
            value,
        })),
    ])

    const intentOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        ...getLocalizedIntentOptions(locale.value).map(item => ({
            label: item.label,
            value: item.code,
        })),
    ])

    const maritalStatusOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        {
            label: localized('未婚', 'Celibataire', 'Single')[locale.value],
            value: 'single',
        },
        {
            label: localized('离异', 'Divorce', 'Divorced')[locale.value],
            value: 'divorced',
        },
        {
            label: localized('丧偶', 'Veuf / veuve', 'Widowed')[locale.value],
            value: 'widowed',
        },
    ])

    const languageOptions = computed<DirectoryOption[]>(() => [
        buildBaseAllOption(allLabel.value),
        ...getLocalizedLanguageOptions().map(value => ({
            label: value,
            value,
        })),
    ])

    const sortOptions = computed<DirectoryOption[]>(() => [
        {
            label: localized('最近活跃', 'Activite recente', 'Recently active')[locale.value],
            value: 'recentActive',
        },
        {
            label: localized('优先资料', 'Profils prioritaires', 'Priority profiles')[locale.value],
            value: 'verifiedFirst',
        },
        {
            label: localized('年龄从低到高', 'Age croissant', 'Age: low to high')[locale.value],
            value: 'ageAsc',
        },
        {
            label: localized('年龄从高到低', 'Age decroissant', 'Age: high to low')[locale.value],
            value: 'ageDesc',
        },
    ])

    const filteredItems = computed<MockProfile[]>(() => {
        return mockProfiles.filter(profile => {
            const localizedCity = profile.city[locale.value]
            const localizedIndustry = profile.industry[locale.value]
            const localizedOccupation = profile.occupation[locale.value]

            const passedAge = matchAgeRange(profile.age, filters.value.ageRange)
            const passedCity = !filters.value.city || localizedCity === filters.value.city
            const passedHeight = matchHeightRange(profile.height, filters.value.heightRange)
            const passedEducation = matchEducation(profile, filters.value.education)
            const passedIntent = !filters.value.intentCode || profile.intentCode === filters.value.intentCode
            const passedIndustry = !filters.value.industry || localizedIndustry === filters.value.industry
            const passedOccupation = !filters.value.occupation || localizedOccupation === filters.value.occupation
            const passedLanguage = !filters.value.language || profile.languages.includes(filters.value.language)
            const passedVerified = matchVerified(profile.isVerified, filters.value.verified)
            const passedMaritalStatus =
                !filters.value.maritalStatus || profile.maritalStatus === filters.value.maritalStatus
            const passedHasChildren = matchHasChildren(profile.hasChildren, filters.value.hasChildren)
            const passedLongDistance = matchAcceptLongDistance(
                profile.acceptLongDistance,
                filters.value.acceptLongDistance,
            )

            return [
                passedAge,
                passedCity,
                passedHeight,
                passedEducation,
                passedIntent,
                passedIndustry,
                passedOccupation,
                passedLanguage,
                passedVerified,
                passedMaritalStatus,
                passedHasChildren,
                passedLongDistance,
            ].every(Boolean)
        })
    })

    const sortedItems = computed<MockProfile[]>(() => {
        const list = [...filteredItems.value]

        switch (sortKey.value) {
            case 'recentActive':
                return list.sort((a, b) => toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt))

            case 'verifiedFirst':
                return list.sort((a, b) => {
                    if (a.isVerified === b.isVerified) {
                        return toTimestamp(b.lastActiveAt) - toTimestamp(a.lastActiveAt)
                    }
                    return a.isVerified ? -1 : 1
                })

            case 'ageAsc':
                return list.sort((a, b) => a.age - b.age)

            case 'ageDesc':
                return list.sort((a, b) => b.age - a.age)

            default:
                return list
        }
    })

    const total = computed(() => sortedItems.value.length)

    const totalPages = computed(() => {
        if (!total.value) return 1
        return Math.ceil(total.value / pageSize.value)
    })

    const pagedItems = computed<MockProfile[]>(() => {
        const start = (page.value - 1) * pageSize.value
        const end = start + pageSize.value
        return sortedItems.value.slice(start, end)
    })

    const pageStart = computed(() => {
        if (!total.value) return 0
        return (page.value - 1) * pageSize.value + 1
    })

    const pageEnd = computed(() => {
        if (!total.value) return 0
        return Math.min(page.value * pageSize.value, total.value)
    })

    function updateFilters(nextFilters: Partial<ProfilesDirectoryFilters>) {
        filters.value = {
            ...filters.value,
            ...nextFilters,
        }
        page.value = 1
    }

    function resetFilters() {
        filters.value = { ...DEFAULT_FILTERS }
        sortKey.value = 'recentActive'
        page.value = 1
    }

    function updateSort(nextSortKey: string) {
        const allowed: ProfilesSortKey[] = [
            'recentActive',
            'verifiedFirst',
            'ageAsc',
            'ageDesc',
        ]

        if (!allowed.includes(nextSortKey as ProfilesSortKey)) return

        sortKey.value = nextSortKey as ProfilesSortKey
        page.value = 1
    }

    function changePage(nextPage: number) {
        if (nextPage < 1 || nextPage > totalPages.value) return
        page.value = nextPage
    }

    return {
        filters,
        sortKey,
        page,
        pageSize,

        total,
        totalPages,
        filteredItems,
        sortedItems,
        pagedItems,
        pageStart,
        pageEnd,

        ageOptions,
        cityOptions,
        heightOptions,
        educationOptions,
        intentOptions,
        industryOptions,
        occupationOptions,
        languageOptions,
        verifiedOptions,
        maritalStatusOptions,
        childrenOptions,
        longDistanceOptions,
        sortOptions,

        updateFilters,
        resetFilters,
        updateSort,
        changePage,
    }
}