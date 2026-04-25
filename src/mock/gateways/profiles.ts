import { getDisplayName } from '@/utils/display-name'
import { mockProfiles, type MockProfile } from '@/mock/data/profiles'
import { localized, pickLocalized, type LocalizedText, type MockLocale } from '@/mock/shared'

const PROFILE_LANGUAGE_LABELS: Record<string, LocalizedText> = {
  FR: localized('法语', 'Francais', 'French'),
  EN: localized('英语', 'Anglais', 'English'),
  ZH: localized('中文', 'Chinois', 'Chinese'),
  NL: localized('荷兰语', 'Neerlandais', 'Dutch'),
  IT: localized('意大利语', 'Italien', 'Italian'),
  DE: localized('德语', 'Allemand', 'German'),
}

export type ProfileRecord = MockProfile & {
  displayName: string
}
export type ProfileDirectoryMode = 'self' | 'family'
export type ProfileOptionGetter = (profile: ProfileRecord) => LocalizedText
export type { LocalizedText, MockLocale }

export interface LocalizedChoiceOption {
  label: string
  value: string
}

/**
 * 资料卡片资源 (Semantic Resource)
 * 业界通用做法：返回语义化 Code 和标准 Schema，不包含 UI 翻译路径
 */
export interface ProfileCard {
  id: string
  displayName: string
  avatarUrl: string
  gender: MockProfile['gender']
  age: number
  occupation: string // 已本地化的文本
  city: string       // 已本地化的文本
  
  // 业务语义 Code
  intentCode: MockProfile['intentCode']
  statusCode: MockProfile['status']
  
  // 视角特有语义
  familyMode?: 'CONTEXT_ONLY' | 'CONTACT_READY' | 'PRIORITY'
  maritalStatus?: MockProfile['maritalStatus']
  hasChildren?: boolean
  acceptLongDistance?: boolean

  // 基础数据
  summary: string
  education: string
  languages?: string
  residencePlan?: string
  tags: string[]
}

export function listProfileRecords(mode: ProfileDirectoryMode = 'self') {
  const profiles = mode === 'family'
    ? mockProfiles.filter(profile => profile.familyVisible)
    : mockProfiles

  return profiles.map(withDisplayName)
}

export function getProfileRecord(id: string) {
  const profile = mockProfiles.find(item => item.id === id)
  return profile ? withDisplayName(profile) : null
}

export function getProfileLanguageLabel(locale: MockLocale, language: string) {
  const label = PROFILE_LANGUAGE_LABELS[String(language || '').trim()]
  if (!label) return String(language || '').trim()
  return pickLocalized(locale, label)
}

/**
 * 构造资料卡片资源
 * Gateway 只负责提供标准的、结构化的业务数据
 */
export function getLocalizedProfileCard(
  locale: MockLocale,
  profile: ProfileRecord,
  mode: ProfileDirectoryMode = 'self'
): ProfileCard {
  const isFamily = mode === 'family'

  // 视角特有语义转换
  let familyMode: ProfileCard['familyMode']
  if (isFamily) {
    familyMode = profile.familyPriority
      ? 'PRIORITY'
      : profile.allowFamilyContact
        ? 'CONTACT_READY'
        : 'CONTEXT_ONLY'
  }

  return {
    id: profile.id,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    gender: profile.gender,
    age: profile.age,
    occupation: pickLocalized(locale, profile.occupation),
    city: pickLocalized(locale, profile.city),
    
    // 业务语义
    intentCode: profile.intentCode,
    statusCode: profile.status,
    
    // 家庭视角特有
    familyMode,
    maritalStatus: isFamily ? profile.maritalStatus : undefined,
    hasChildren: isFamily ? profile.hasChildren : undefined,
    acceptLongDistance: isFamily ? profile.acceptLongDistance : undefined,

    // 基础数据
    summary: pickLocalized(locale, isFamily ? (profile.maritalPlan || profile.summary) : profile.summary),
    education: pickLocalized(locale, profile.education),
    languages: isFamily ? undefined : formatProfileDirectoryLanguages(locale, profile.languages),
    residencePlan: isFamily ? pickLocalized(locale, profile.residencePlan) : undefined,
    
    // Tags 处理：Data 中的内容仍然返回本地化文本
    tags: (profile.tags || []).slice(0, 3).map(item => pickLocalized(locale, item))
  }
}

export {
  localized,
  pickLocalized,
}

function withDisplayName(profile: MockProfile): ProfileRecord {
  return {
    ...profile,
    displayName: getDisplayName(profile),
  }
}

function formatProfileDirectoryMeta(locale: MockLocale, profile: MockProfile) {
  const occupation = pickLocalized(locale, profile.occupation)

  if (locale === 'zh') return `${profile.age}岁 / ${occupation}`
  if (locale === 'fr') return `${profile.age} ans / ${occupation}`
  return `${profile.age} / ${occupation}`
}

function formatProfileDirectoryLanguages(locale: MockLocale, languages: string[]) {
  return languages.map(language => getProfileLanguageLabel(locale, language)).join(' / ')
}
