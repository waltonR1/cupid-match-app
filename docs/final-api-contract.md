# Final API Contract

鏈枃瀹氫箟鏈€缁堢洰鏍囦笅鍓嶇 API 灞傚簲闈㈠鐨?endpoint銆乹uery銆乸ayload 鍜?DTO 瀛楁銆傚畠涓嶆弿杩版暟鎹簱瀛樺偍缁嗚妭锛屼篃涓嶆弿杩伴〉闈㈠浣曟帓鐗堛€?
閰嶅鏂囨。锛?
- `docs/final-database-schema.md`锛氭渶缁堟暟鎹簱瀛楁銆?- `docs/final-page-fields.md`锛氭渶缁堥〉闈?ViewModel 瀛楁銆?- `docs/final-data-flow-contract.md`锛氭暟鎹簱銆丄PI銆乵apper銆侀〉闈箣闂寸殑鏁版嵁娴佸姩銆?- `docs/implementation-roadmap.md`锛氬垎闃舵鎵ц椤哄簭銆?
## Global Rules

- API 鏂囦欢鎷ユ湁 HTTP 杈圭晫鍜?DTO 绫诲瀷锛岄〉闈笉鐩存帴璋冪敤 HTTP銆?- API 鍒板墠绔殑涓氬姟瀛楁灏介噺鎵佸钩銆?- 鍚庣涓嶈繑鍥?i18n key锛涜繑鍥?code 鎴栧凡鎸?locale 鏈湴鍖栧悗鐨勬枃妗堛€?- DTO 鍙互鍖呭惈娲剧敓瀛楁锛屼緥濡?`displayName`銆乣avatarUrl`銆乣age`銆乣memberOnly`銆乣registeredCount`銆?- DTO 涓嶈繑鍥炴暟鎹簱 Record銆?- DTO 涓嶈繑鍥?profile 鑱旂郴鏂瑰紡鍊硷紱鑱旂郴鏂瑰紡鍙厑璁搁€氳繃 private introduction / inbox flow 鐨勭嫭绔嬫帴鍙ｅ紑鏀俱€?- `X-User-Id` 鍙綔涓?mock request context锛涙寮忛壌鏉?token 绛栫暐鍚庣画鍗曠嫭瀹氫箟銆?- 鎵€鏈夊垪琛ㄦ帴鍙ｇ粺涓€杩斿洖 `items + pagination + facets?`銆?- 鎵€鏈夊啓鎿嶄綔杩斿洖鍙樻洿鍚庣殑棰嗗煙鐘舵€?DTO锛屼笉瑕佹眰鍓嶇鑷鎷肩姸鎬併€?
## Common Types

```ts
type LocaleCode = 'zh' | 'fr' | 'en'
type RegisterProvider = 'email' | 'phone'
type RegisterPath = 'self' | 'family'
type LegalDocumentType = 'terms' | 'privacy'
type ViewerRole = 'guest' | 'free_user' | 'member' | 'owner' | 'staff'
type MembershipTier = 'free' | 'silver' | 'gold' | 'diamond'
type IntroductionStatus = 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired'
type ProfileAccessLevel = 'visitor' | 'registered' | 'premium' | 'owner' | 'staff'
type ProfileFieldLockCode = '__LOGIN_REQUIRED__' | '__MEMBER_ONLY__' | '__INTRODUCTION_REQUIRED__' | '__HIDDEN__'
type RestrictedProfileField<T> = T | ProfileFieldLockCode
type EntitlementCode = 'private_introduction' | 'event_priority' | 'staff_review' | 'profile_detail_access'
type ProfileVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
type ProfileReviewStatus = 'unreviewed' | 'pending' | 'approved' | 'rejected'
type PreferredContactChannel = 'email' | 'phone' | 'wechat'
type ProfileFieldCode =
  | 'photos'
  | 'country'
  | 'nationality'
  | 'languages'
  | 'industry'
  | 'careerDirection'
  | 'maritalStatus'
  | 'hasChildren'
  | 'childrenPlan'
  | 'acceptsLongDistance'
  | 'relationshipGoal'
  | 'residencePlan'
  | 'relocation'
  | 'relationshipValues'
  | 'preferredAgeMin'
  | 'preferredAgeMax'
  | 'preferredLocation'
  | 'preferredEducation'
  | 'familyLife'
  | 'dealBreakers'
  | 'smoking'
  | 'drinking'
  | 'exercise'
  | 'activityLevel'
  | 'weekendStyle'
  | 'pets'
  | 'personalityTraits'
  | 'interests'
  | 'communicationStyle'
  | 'contact'

interface PaginationDTO {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface ApiErrorDTO {
  code: string
  message: string
}
```

## Endpoint Overview

| Domain | Method | Endpoint | Purpose |
| --- | --- | --- | --- |
| Auth | `POST` | `/api/auth/register` | 鍒涘缓璐︽埛锛屾敞鍐屽叆鍙ｈ矾寰勫彧鐢ㄤ簬鍓嶇娉ㄥ唽鍚庤惤鐐广€?|
| Auth | `POST` | `/api/auth/login` | 鐧诲綍骞惰繑鍥?session銆?|
| Legal | `GET` | `/api/legal/documents/:type` | 鑾峰彇褰撳墠鐢熸晥鏈嶅姟鏉℃鎴栭殣绉佽鏄庛€?|
| Profiles | `GET` | `/api/profiles/self` | self 璧勬枡鐩綍銆?|
| Profiles | `GET` | `/api/profiles/family` | family 璧勬枡鐩綍銆?|
| Profiles | `GET` | `/api/profiles/self/:id` | self 璧勬枡璇︽儏銆?|
| Profiles | `GET` | `/api/profiles/family/:id` | family 璧勬枡璇︽儏銆?|
| Profiles | `POST` | `/api/profiles/self` | 鍒涘缓 self profile銆?|
| Profiles | `POST` | `/api/profiles/family` | 鍒涘缓 family profile銆?|
| Profiles | `POST` | `/api/profiles/self/:id` | 鏇存柊 self profile銆?|
| Profiles | `POST` | `/api/profiles/family/:id` | 鏇存柊 family profile銆?|
| Profiles | `POST` | `/api/profiles/self/:id/photos` | 鏂板 self profile 鐓х墖銆?|
| Profiles | `POST` | `/api/profiles/family/:id/photos` | 鏂板 family profile 鐓х墖銆?|
| Profiles | `POST` | `/api/profiles/self/:id/photos/:photoId` | 鏇存柊 self profile 鐓х墖銆?|
| Profiles | `POST` | `/api/profiles/family/:id/photos/:photoId` | 鏇存柊 family profile 鐓х墖銆?|
| Favorites | `POST` | `/api/favorites/:profileId` | 鏀惰棌 profile銆?|
| Favorites | `DELETE` | `/api/favorites/:profileId` | 鍙栨秷鏀惰棌銆?|
| Private Introductions | `POST` | `/api/profiles/self/:id/private-introduction` | 浠?self detail 鐢宠绉佷汉浠嬬粛銆?|
| Private Introductions | `POST` | `/api/profiles/family/:id/private-introduction` | 浠?family detail 鐢宠绉佷汉浠嬬粛銆?|
| Account | `GET` | `/api/account/private-introductions/:requestId/contact` | accepted 绉佷汉浠嬬粛鍚庣殑鑱旂郴鏂瑰紡寮€鏀俱€?|
| Inbox | `GET` | `/api/inbox/threads` | 娑堟伅涓績绾跨▼鍒楄〃銆?|
| Inbox | `GET` | `/api/inbox/threads/:id` | 鏌ョ湅娑堟伅涓績绾跨▼璇︽儏銆?|
| Inbox | `POST` | `/api/inbox/threads/:id/messages` | 鍦ㄥ厑璁哥殑鍙楁帶绾跨▼涓彂閫佹秷鎭€?|
| Inbox | `POST` | `/api/inbox/threads/:id/read` | 鏍囪绾跨▼宸茶銆?|
| Events | `GET` | `/api/events` | 娲诲姩鐩綍銆?|
| Events | `GET` | `/api/events/:id` | 娲诲姩璇︽儏銆?|
| Events | `POST` | `/api/events/:id/register` | 鎶ュ悕娲诲姩銆?|
| Events | `POST` | `/api/events/:id/cancel` | 鍙栨秷娲诲姩鎶ュ悕銆?|
| Account | `GET` | `/api/account/me` | 褰撳墠璐︽埛韬唤銆?|
| Account | `GET` | `/api/account/dashboard` | 璐︽埛棣栭〉闃舵寮曞涓庡姩鎬佹憳瑕併€?|
| Account | `GET` | `/api/account/profiles` | 鐢ㄦ埛绠＄悊鐨?profiles 涓庤璇佹憳瑕併€?|
| Account | `GET` | `/api/account/profiles/:profileId` | 鍗曚唤鍙鐞?profile 鐨勫畬鏁磋鎯呫€佽璇佸拰瀛楁鍙鎬с€?|
| Account | `GET` | `/api/account/membership` | 褰撳墠浼氬憳銆佹潈鐩婂拰鍙崌绾у椁愩€?|
| Account | `GET` | `/api/account/favorites` | 鏀惰棌鍒楄〃銆?|
| Account | `GET` | `/api/account/events` | 娲诲姩鎶ュ悕銆?|
| Account | `GET` | `/api/account/private-introductions` | 绉佷汉浠嬬粛鐢宠銆?|
| Account | `GET` | `/api/account/private-introductions/:requestId/contact` | accepted 私人介绍后的联系方式开放。 |
| Account | `GET` | `/api/account/inbox-summary` | 璐︽埛鍏ュ彛浣跨敤鐨勬秷鎭腑蹇冩憳瑕併€?|
| Account | `GET` | `/api/account/settings` | 璐︽埛鍋忓ソ璁剧疆銆?|
| Account | `POST` | `/api/account/profiles/save` | 鏂板缓鎴栦繚瀛樺彲绠＄悊 profile 鐨勪富浣撳瓧娈点€佸綊灞炲叧绯汇€佸彈鎺ц仈绯绘柟寮忓拰鐓х墖鑽夌銆?|
| Account | `POST` | `/api/account/profiles/:profileId/archive` | 灏嗘弧瓒宠鍒欑殑鍙鐞?profile 褰掓。閫€鍑轰笟鍔°€?|
| Account | `POST` | `/api/account/profiles/:profileId/privacy-preferences` | 鏇存柊鍙鐞?profile 鐨勫崐鏁忔劅瀛楁闅愯棌鍋忓ソ銆?|
| Account | `POST` | `/api/account/me` | 鏇存柊璐︽埛鍩虹淇℃伅銆?|
| Account | `POST` | `/api/account/settings/preferences` | 鏇存柊璐︽埛鍋忓ソ銆?|
| Account | `POST` | `/api/account/membership/upgrade` | 鍙戣捣浼氬憳鍗囩骇銆?|
| Debug | `GET` | `/api/debug/private-introductions` | 璋冭瘯绉佷汉浠嬬粛鐢宠銆?|
| Debug | `POST` | `/api/debug/private-introductions/:id/accept` | 璋冭瘯鎺ュ彈鐢宠銆?|
| Debug | `POST` | `/api/debug/private-introductions/:id/decline` | 璋冭瘯鎷掔粷鐢宠銆?|

## Auth API

### Register

```ts
interface RegisterPayload {
  path: RegisterPath
  provider: RegisterProvider
  identifier: string
  password: string
  accountName: string
  preferredLocale: LocaleCode
}

interface AuthSessionDTO {
  token: string
  user: AuthUserDTO
  membership: AuthSessionMembershipDTO | null
}

interface AuthSessionMembershipDTO {
  tier: MembershipTier
  status: 'active' | 'expired' | 'cancelled' | 'paused'
}

interface AuthUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
}

```

- 娉ㄥ唽 payload 涓嶅寘鍚?`city`銆?- 娉ㄥ唽涓嶅垱寤?profile銆?- `RegisterPayload.path` 鍙〃绀烘湰娆℃敞鍐屽叆鍙ｏ紝鐢ㄤ簬鍓嶇娉ㄥ唽鎴愬姛鍚庤烦杞?self 鎴?family 鐩綍锛涘悗绔笉鎸佷箙鍖?onboarding 鐘舵€併€?- 鎴愬姛娉ㄥ唽 / 鎴愬姛鐧诲綍鍗宠〃绀虹敤鎴锋帴鍙楀綋鍓?active 鏈嶅姟鏉℃涓庨殣绉佽鏄庯紱鍚庣鑷姩鍐欏叆 `user_agreement_acceptances`锛坲psert by userId + documentType锛夛紝鐗堟湰涓嶅彉鍒欒烦杩囥€?- 娉ㄥ唽椤典笉灞曠ず `preferredLocale` 鎵嬪姩閫夋嫨鍣紱鍓嶇鐢ㄥ綋鍓嶉〉闈?locale 鑷姩濉厖 `RegisterPayload.preferredLocale`銆?- 鐧诲綍鍜屾敞鍐岄兘杩斿洖 `AuthUserDTO.preferredLocale`锛涘墠绔櫥褰曟垚鍔熷悗鐢ㄥ畠鍚屾 locale store锛岀‘淇濊法璁惧鐧诲綍鏃朵娇鐢ㄨ处鎴烽粯璁よ瑷€銆?- 褰撳墠娉ㄥ唽鍙紑鏀?`email`銆乣phone`锛沗wechat`銆乣google` 鏄渶缁?`auth_identities` 棰勭暀 provider銆?- `token` 褰撳墠鍙互浣滀负 mock 鍗犱綅锛涙寮?Authorization 琛屼负鍚庣画鍗曠嫭瀹氫箟銆?
### Login

```ts
interface LoginPayload {
  identifier: string
  password: string
}
```

杩斿洖 `AuthSessionDTO`銆?
## Legal API

### Get Legal Document

```text
GET /api/legal/documents/:type?lang=zh
```

`:type` 涓?`terms` 鎴?`privacy`銆?
鑻ョ洰鏍?`lang` 鏆傛棤 active 鏂囨。锛宮ock 鍚庣鍙洖閫€鍒?`zh` active 鏂囨。锛屾寮忓簱搴旇ˉ榻愪笁璇█鐗堟湰銆?
```ts
interface LegalDocumentDTO {
  type: LegalDocumentType
  version: string
  locale: LocaleCode
  title: string
  sections: LegalDocumentSectionDTO[]
  effectiveAt: string
}

interface LegalDocumentSectionDTO {
  heading: string
  clauses: LegalDocumentClauseDTO[]
}

interface LegalDocumentClauseDTO {
  number: string
  body: string
}
```

- 杩斿洖褰撳墠 locale 涓?active 鐨勬寚瀹氱被鍨嬫枃妗ｃ€?- 鍓嶇 `AgreementDialog` 鎵撳紑鏃舵寜闇€璋冪敤锛屼笉棰勫姞杞姐€?- `sections` 涓哄崗璁鏂囩粨鏋勶紱鍓嶇鎸?section heading 涓?clause 瀛楁娓叉煋锛屼笉瑙ｆ瀽 Markdown銆?
## Profiles API

### Profile Directory

Profile 鐩綍 API 褰撳墠鎸夊叆鍙ｆ媶鍒嗭紝涓嶄娇鐢?`view` query锛?
```text
GET /api/profiles/self
GET /api/profiles/family
```

```ts
interface SelfProfileDirectoryQuery {
  page: number
  pageSize: number
  sort?: 'recentActive' | 'priorityFirst' | 'ageAsc' | 'ageDesc'
  gender?: string
  ageRange?: string
  heightRange?: string
  city?: string
  education?: string
  industry?: string
  language?: string
  verified?: string
  maritalStatus?: string
  hasChildren?: string
  acceptsLongDistance?: string
  datingIntentionCode?: string
}

interface FamilyProfileDirectoryQuery {
  page: number
  pageSize: number
  sort?: 'priorityFirst' | 'recentActive' | 'ageAsc' | 'ageDesc'
  gender?: string
  ageRange?: string
  city?: string
  education?: string
  datingIntentionCode?: string
  familyMode?: 'priority' | 'contact_ready' | 'context_only'
  industry?: string
  maritalStatus?: string
  hasChildren?: string
  acceptsLongDistance?: string
}

interface SelfProfileDirectoryResponseDTO {
  items: SelfProfileDirectoryItemDTO[]
  pagination: PaginationDTO
  facets: SelfProfileDirectoryFacetsDTO
}

interface FamilyProfileDirectoryResponseDTO {
  items: FamilyProfileDirectoryItemDTO[]
  pagination: PaginationDTO
  facets: FamilyProfileDirectoryFacetsDTO
}

interface ProfileDirectoryBaseItemDTO {
  id: string
  displayName: string
  avatarUrl: string
  gender: 'male' | 'female'
  age: number
  city: string
  profileStatus: 'open' | 'review'
  education: string
  industry: string
  datingIntentionCode: string
  datingIntentionLabel: string
  tags: string[]
  summary: string
}

interface SelfProfileDirectoryItemDTO extends ProfileDirectoryBaseItemDTO {
  languages: string[]
}

interface FamilyProfileDirectoryItemDTO extends ProfileDirectoryBaseItemDTO {
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  acceptsLongDistance: boolean
  relationshipGoal: string
  residencePlan: string
}

interface SelfProfileDirectoryFacetsDTO {
  gender: ProfileFacetOptionDTO[]
  cities: ProfileFacetOptionDTO[]
  education: ProfileFacetOptionDTO[]
  industries: ProfileFacetOptionDTO[]
  intents: ProfileIntentFacetDTO[]
  languages: string[]
}

interface FamilyProfileDirectoryFacetsDTO {
  gender: ProfileFacetOptionDTO[]
  cities: ProfileFacetOptionDTO[]
  education: ProfileFacetOptionDTO[]
  industries: ProfileFacetOptionDTO[]
  intents: ProfileIntentFacetDTO[]
}

interface ProfileFacetOptionDTO {
  value: string
  label: string
  count: number
}

interface ProfileIntentFacetDTO {
  code: string
  label: string
}
```

### Profile Detail

Profile detail API 褰撳墠鎸夊叆鍙ｆ媶鍒嗭紝涓嶄娇鐢ㄧ粺涓€鐨?`/api/profiles/:id`锛?
```text
GET /api/profiles/self/:id
GET /api/profiles/family/:id
```

```ts
interface ProfileDetailBaseDTO {
  id: string
  displayName: string
  avatarUrl: string
  photos: RestrictedProfileField<ProfilePhotoDTO[]>
  gender: 'male' | 'female'
  age: RestrictedProfileField<number>
  height: number
  city: string
  country: RestrictedProfileField<string>
  nationality: RestrictedProfileField<string>
  languages: RestrictedProfileField<string[]>
  profileStatus: 'open' | 'review'
  isVerified: boolean
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: string
  industry: RestrictedProfileField<string>
  careerDirection?: RestrictedProfileField<string>
  maritalStatus: RestrictedProfileField<'never_married' | 'divorced' | 'widowed'>
  hasChildren: RestrictedProfileField<boolean>
  childrenPlan: RestrictedProfileField<'wants' | 'open_to_discuss' | 'does_not_want'>
  acceptsLongDistance: RestrictedProfileField<boolean>
  datingIntentionCode: string
  datingIntentionLabel: string
  relationshipGoal: RestrictedProfileField<string>
  residencePlan: RestrictedProfileField<string>
  relocation: RelocationCode
  relationshipValues: RelationshipValueCode[]
  preferredAgeMin: RestrictedProfileField<number>
  preferredAgeMax: RestrictedProfileField<number>
  preferredLocation: LocationScopeCode
  preferredEducation: RestrictedProfileField<string>
  familyLife: RestrictedProfileField<string>
  dealBreakers: RestrictedProfileField<string[]>
  smoking: RestrictedProfileField<'never' | 'social' | 'often'>
  drinking: RestrictedProfileField<'never' | 'social' | 'often'>
  exercise: RestrictedProfileField<string>
  activityLevel: ActivityLevelCode
  weekendStyle: WeekendStyleCode
  pets: PetCode
  personalityTraits: RestrictedProfileField<string[]>
  interests: RestrictedProfileField<string[]>
  communicationStyle: CommunicationStyleCode
  summary: string
  tags: string[]
  familyVisible: boolean
  access: ProfileAccessDTO
  favorite?: FavoriteStateDTO
  privateIntroduction: ProfilePrivateIntroductionDTO
}

interface SelfProfileDetailDTO extends ProfileDetailBaseDTO {
}

interface FamilyProfileDetailDTO extends ProfileDetailBaseDTO {}

interface ProfileAccessDTO {
  viewerRole: ViewerRole
  accessLevel: ProfileAccessLevel
  canViewFullProfile: boolean
  canViewFamilySection: boolean
  canRequestIntroduction: boolean
  lockedFields: ProfileFieldLockDTO[]
  hiddenFields: string[]
}

interface ProfileFieldLockDTO {
  fieldCode: ProfileFieldCode
  reason: 'login' | 'member' | 'introduction' | 'staff' | 'hidden'
}

interface ProfilePhotoDTO {
  id: string
  url: string
  isPrimary: boolean
  sortOrder: number
}


interface FavoriteStateDTO {
  isFavorite: boolean
  favoriteId?: string
}

interface ProfilePrivateIntroductionDTO {
  status: 'available' | 'login_required' | 'membership_required' | 'quota_exhausted' | 'requested' | 'accepted' | 'declined' | 'expired' | 'cooldown'
  requestId?: string
  membership: MembershipTier | 'guest'
  quotaTotal: number
  quotaRemaining: number
  alreadyRequested: boolean
  canRequest: boolean
  expiresAt?: string
  cooldownUntil?: string
}
```

- `ProfileDetailBaseDTO` / `SelfProfileDetailDTO` / `FamilyProfileDetailDTO` 淇濇寔鎵佸钩瀛楁锛涢〉闈?section 鐢卞墠绔?mapper 缁勮銆?- 鍙楅檺瀛楁杩斿洖 `ProfileFieldLockCode`锛屽墠绔笉鏍规嵁浼氬憳鐘舵€佽嚜琛屽垽鏂師濮嬪瓧娈垫槸鍚﹀彲瑙併€?- `privateIntroduction` 鍙〃杈剧敵璇风姸鎬佸拰棰濆害锛屼笉鍖呭惈 phone / email / wechat銆?
绂佹杩斿洖锛?
```text
ProfileRecord
phone
email
wechat
legalName
profiles.displayName
profiles.avatarUrl
profiles.age
profiles.datingIntentionLabel
profiles.occupation
profiles.nickname
profiles.wantsChildren
profiles.pronouns
profiles.sexuality
profiles.interestedIn
profiles.hometown
profiles.livingSituation
profiles.zodiac
profiles.funFacts
profiles.highlights
profiles.conversationStarters
profiles.dateIdeas
profiles.compatibilityDimensions
profiles.photos
```

### Favorite Actions

```ts
interface FavoriteActionResponseDTO {
  favorite: FavoriteStateDTO
}
```

### Profile Create / Update

```ts
interface ProfileCreatePayload {
  gender: 'male' | 'female'
  birthYear: number
  height: number
  city: string
  country: string
  nationality: string
  languages: string[]
  degreeLevel: 'bachelor' | 'master' | 'phd'
  education: string
  industry: string
  careerDirection?: string
  maritalStatus: 'never_married' | 'divorced' | 'widowed'
  hasChildren: boolean
  childrenPlan: 'wants' | 'open_to_discuss' | 'does_not_want'
  acceptsLongDistance: boolean
  datingIntentionCode: string
  relationshipGoal: string
  residencePlan: string
  relocation: RelocationCode
  relationshipValues: RelationshipValueCode[]
  preferredAgeMin: number
  preferredAgeMax: number
  preferredLocation: LocationScopeCode
  preferredEducation: string
  familyLife: string
  dealBreakers: string[]
  smoking: 'never' | 'social' | 'often'
  drinking: 'never' | 'social' | 'often'
  exercise: string
  activityLevel: ActivityLevelCode
  weekendStyle: WeekendStyleCode
  pets: PetCode
  personalityTraits: string[]
  interests: string[]
  communicationStyle: CommunicationStyleCode
  summary: string
  tags: string[]
  familyVisible: boolean
}

type ProfileUpdatePayload = Partial<ProfileCreatePayload>

interface ProfileMutationResponseDTO {
  profile: SelfProfileDetailDTO | FamilyProfileDetailDTO
}

```

- 鍒涘缓 / 鏇存柊 payload 浣跨敤鍓嶇杈撳叆鍊硷紱鍚庣璐熻矗淇濆瓨涓烘渶缁堟暟鎹簱缁撴瀯鍜屾湰鍦板寲瀛楁銆?- `ProfileCreatePayload` / `ProfileUpdatePayload` 涓殑鍗曡瑷€瀛楃涓叉寜璇锋眰 locale 鍐欏叆 `LocalizedText` 鐨勫搴旇瑷€锛涘綋鍓?locale 淇濆瓨涓?`manual / human / ready`锛屽叾浠栭潪浜哄伐 locale 淇濆瓨涓虹┖瀛楃涓?`machine / null / pending`锛岀敱鍚庡彴銆乻taff 鎴栧悗缁炕璇戞祦绋嬭ˉ榻愩€?- public profile API 浣跨敤甯?fallback 鐨勬湰鍦板寲瑙ｆ瀽锛岃烦杩囩┖瀛楃涓插拰 pending 鍊硷紱account profile detail 缂栬緫 API 浣跨敤褰撳墠 `lang` 妲戒綅鍘熷€硷紝涓嶅仛 fallback銆?- 鍒涘缓 profile 鏃跺悓姝ュ垱寤烘垨鏇存柊 `profile_ownerships`銆?
## Private Introduction API

```ts
interface PrivateIntroductionDTO {
  requestId: string
  requesterUserId: string
  requesterProfileId?: string
  targetProfileId: string
  status: IntroductionStatus | 'cooldown' | 'quota_exhausted'
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
  quotaRemaining?: number
}
```

- self/family detail 缁х画浣跨敤鍒嗗紑鐨勭敵璇峰叆鍙ｏ細`POST /api/profiles/self/:id/private-introduction` 鍜?`POST /api/profiles/family/:id/private-introduction`銆?- `:id` 灏辨槸 target profile id锛屽墠绔笉鍦?body 閲岄噸澶嶄紶 `targetProfileId`銆?- 鍚庣妫€鏌?ownership銆乵embership entitlement銆乹uota 鍜?cooldown銆?- `cooldown` 鏄?DTO 娲剧敓鐘舵€侊紝鏁版嵁搴撲娇鐢?`declined + cooldownUntil`銆?- `expired` 鏄?DTO 娲剧敓鐘舵€侊紝鏁版嵁搴撲娇鐢?`requested + expiresAt < now`锛涜繃鏈熷悗鏄惁杩涘叆 cooldown 鐢辨湇鍔＄瓥鐣ュ喅瀹氥€?- 棰濆害涓嶈冻鏃惰繑鍥?`quota_exhausted` 鐘舵€侊紝涓嶈姹傚墠绔妸鏅€氶敊璇浆鎹㈡垚涓氬姟鐘舵€併€?
### Contact Reveal After Accepted Introduction

```ts
interface AccountPrivateIntroductionContactDTO {
  requestId: string
  targetProfileId: string
  preferredChannel?: 'phone' | 'email' | 'wechat'
  phone?: string
  email?: string
  wechat?: string
  unavailableReason?: 'not_accepted' | 'contact_disabled' | 'owner_only' | 'not_found'
}
```

Rules:

- `GET /api/account/private-introductions/:requestId/contact` only serves the requester of that private introduction request.
- Contact values are returned only when the request is accepted and `profile_contacts.visibility === 'after_introduction'`.
- `owner_only` and `disabled` do not expose contact values to the requester; return an unavailable reason instead.
- Profile detail DTOs must not expose contact values.

## Inbox API

```ts
interface InboxThreadSummaryDTO {
  threadId: string
  type: 'system' | 'private_introduction' | 'event' | 'profile_review' | 'membership' | 'staff'
  subjectType?: 'profile' | 'event' | 'private_introduction_request' | 'membership' | 'legal_document'
  subjectId?: string
  title: string
  preview: string
  status: 'open' | 'closed' | 'archived'
  unread: boolean
  updatedAt: string
}

interface InboxThreadDetailDTO {
  thread: InboxThreadSummaryDTO
  messages: InboxMessageDTO[]
  messagePage: InboxMessagePageDTO
  composer?: InboxComposerDTO
}

interface InboxMessageDTO {
  messageId: string
  senderType: 'system' | 'staff' | 'user'
  senderUserId?: string
  messageType: 'text' | 'status_update' | 'action_prompt'
  body: string
  actionType?: string
  actionPayload?: unknown
  createdAt: string
}

interface SendInboxMessagePayload {
  body: string
}

interface InboxComposerDTO {
  enabled: boolean
  disabledReason?: 'closed' | 'staff_only' | 'rate_limited'
}

interface InboxMessagePageDTO {
  limit: number
  hasMore: boolean
  nextBefore?: string
}
```

Rules:

- Phase 5.6 only needs `GET /api/inbox/threads` and `POST /api/inbox/threads/:id/read` for system-notification placeholders.
- `GET /api/inbox/threads/:id/messages?before=&limit=` and `POST /api/inbox/threads/:id/messages` stay in the final contract for later message detail and controlled conversation work.
- Accepted private introductions do not automatically create chat rooms in Phase 5.6; requester contact reveal is handled by `GET /api/account/private-introductions/:requestId/contact`.
- Future user-visible event, profile review, legal document, membership, and staff notices should enter inbox threads/messages instead of a separate notifications table.

## Events API

### Event Directory

```ts
interface EventDirectoryQuery {
  page: number
  pageSize: number
  city?: string
  status?: string
  visibility?: 'public' | 'registered' | 'member'
  month?: string
}

interface EventDirectoryResponseDTO {
  items: EventDirectoryItemDTO[]
  pagination: PaginationDTO
  facets: EventDirectoryFacetsDTO
}

interface EventDirectoryItemDTO {
  id: string
  slug: string
  status: 'open' | 'waitlist' | 'closed' | 'completed'
  title: string
  summary: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  format: string
  audience: string
  relationshipFocus: string[]
  capacity: number
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
  memberOnly: boolean
  coverImageUrl: string
}

interface EventDirectoryFacetsDTO {
  city: EventFacetOptionDTO[]
  status: EventFacetOptionDTO[]
  visibility: EventFacetOptionDTO[]
  month: EventFacetOptionDTO[]
}

interface EventFacetOptionDTO {
  value: string
  label: string
  count: number
}
```

`memberOnly` 鐢?`visibility === 'member'` 娲剧敓銆?
### Event Detail

```ts
interface EventDetailDTO extends EventDirectoryItemDTO {
  address?: string
  addressVisible: boolean
  addressLockReason?: 'login_required' | 'registration_required' | 'confirmation_required'
  languageCodes: string[]
  curatorNote: string
  agendaItems: EventAgendaItemDTO[]
  registration: EventRegistrationStateDTO
}

interface EventAgendaItemDTO {
  id: string
  time: string
  title: string
  desc: string
  sortOrder: number
}

interface EventRegistrationStateDTO {
  status: 'guest' | 'available' | 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended' | 'closed' | 'member_required'
  registrationId?: string
}
```

`venue` 鏄彲鍏紑灞曠ず鐨勫湴鐐瑰悕绉帮紱`address` 鏄簿纭湴鍧€锛屽彧鍦ㄥ悗绔垽鏂綋鍓?viewer 婊¤冻鍦板潃鍙瑙勫垯鏃惰繑鍥炪€傛椿鍔ㄥ垪琛ㄤ笉杩斿洖绮剧‘鍦板潃锛岄伩鍏嶆湭鐧诲綍鐢ㄦ埛浠庡垪琛ㄤ竴娆℃€х湅鍒扮嚎涓嬪湴鍧€銆?
### Event Registration

```ts
interface EventRegistrationResponseDTO {
  registration: EventRegistrationStateDTO
  registeredCount: number
  waitlistCount: number
  remainingSeats: number
}
```

## Account API

Account API 涓嶅簲缁х画鐢ㄤ竴涓繃澶х殑 legacy overview 鍙嶅悜鍐冲畾鏁版嵁搴撶粨鏋勩€傚彲浠ヤ繚鐣?`dashboard` 浣滀负椤甸潰鑱氬悎 DTO锛屼絾 source of truth 鏉ヨ嚜鐙珛闆嗗悎銆?
### Account Me

```ts
interface AccountMeDTO {
  user: AccountUserDTO
}

interface AccountUserDTO {
  id: string
  accountName: string
  avatarUrl: string
  preferredLocale: LocaleCode
  status: 'active' | 'paused' | 'banned'
}
```

### Account Dashboard

```ts
interface AccountDashboardDTO {
  user: AccountUserDTO
  profiles: ManagedProfileSummaryDTO[]
  membership: AccountMembershipDTO
  entitlements: AccountEntitlementBalanceDTO[]
  upcomingEvents: AccountEventRegistrationDTO[]
  recentIntroductions: AccountIntroductionSummaryDTO[]
  favoriteCount: number
}
```

### Account Profiles

```ts
interface AccountProfilesDTO {
  profiles: ManagedProfileSummaryDTO[]
}

interface AccountProfileDetailDTO {
  profileId: string
  profileType: 'self' | 'family'
  profileName: string
  avatarUrl: string
  ownership: {
    relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
    permission: 'owner' | 'manager'
    status: 'pending' | 'active' | 'revoked'
    invitedByUserId?: string
    acceptedAt?: string
    revokedAt?: string
  }
  verification: AccountProfileVerificationDTO
  privacyPreferences: AccountProfilePrivacyPreferencesDTO
  localizedMeta: AccountProfileLocalizedMetaDTO
  contact: AccountProfileContactDTO
  photos: Array<{ id: string; url: string; isPrimary: boolean; sortOrder: number; status: 'review' | 'approved' | 'hidden' }>
  // 鍏朵綑涓氬姟瀛楁涓庡綋鍓?profile 涓昏〃瀛楁淇濇寔鎵佸钩涓€鑷?}

interface AccountProfileLocalizedMetaDTO {
  editLocale: 'zh' | 'fr' | 'en'
  fields: Record<string, EditableLocalizedFieldMetaDTO | EditableLocalizedFieldMetaDTO[]>
}

interface EditableLocalizedFieldMetaDTO {
  locale: 'zh' | 'fr' | 'en'
  source: 'manual' | 'machine' | null
  provider: 'human' | 'translation_api' | null
  status: 'ready' | 'pending' | 'failed' | 'stale' | 'missing'
  updatedAt?: string
  hasValue: boolean
}

interface ManagedProfileSummaryDTO {
  profileId: string
  profileType: 'self' | 'family'
  profileName: string
  avatarUrl: string
  age: number
  city: string
  relationshipToProfile: 'self' | 'father' | 'mother' | 'relative'
  permission: 'owner' | 'manager'
  ownershipStatus: 'pending' | 'active' | 'revoked'
  profileStatus: 'draft' | 'review' | 'open' | 'paused' | 'hidden'
  verification: AccountProfileVerificationDTO
}

interface AccountProfileVerificationDTO {
  legalName?: string
  dateOfBirth?: string
  identityStatus: ProfileVerificationStatus
  educationStatus: ProfileVerificationStatus
  incomeStatus: ProfileVerificationStatus
  maritalStatus: ProfileVerificationStatus
  reviewStatus: ProfileReviewStatus
  verifiedByUserId?: string
}
```

### Account Membership

```ts
interface AccountMembershipDTO {
  tier: MembershipTier
  name: string
  status: 'active' | 'expired' | 'cancelled' | 'paused'
  startedAt: string
  expiresAt?: string
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  conciergePriority: boolean
}

interface MembershipPlanDTO {
  id: string
  tier: MembershipTier
  name: string
  description: string
  priceCents?: number
  currency?: string
  billingPeriod?: string
  privateIntroductionQuota: number
  privateIntroductionPeriod: 'monthly' | 'quarterly' | 'yearly'
  eventPriorityEnabled: boolean
  staffReviewEnabled: boolean
  profileDetailAccessLevel: 'registered' | 'premium'
  staffSupportLevel: 'none' | 'standard' | 'priority' | 'concierge'
  conciergePriority: boolean
  featured: boolean
  sortOrder: number
}

interface AccountEntitlementBalanceDTO {
  code: EntitlementCode
  quotaTotal: number
  quotaUsed: number
  quotaRemaining: number
  periodStartedAt: string
  periodEndsAt: string
}
```

### Account Lists

```ts
interface FavoriteProfileSummaryDTO {
  favoriteId: string
  profileId: string
  profileType: 'self' | 'family'
  displayName: string
  avatarUrl: string
  age: number
  city: string
  education: string
  industry: string
  summary: string
  tags: string[]
  createdAt: string
}

interface AccountEventRegistrationDTO {
  registrationId: string
  eventId: string
  title: string
  coverImageUrl: string
  city: string
  venue: string
  date: string
  startTime: string
  endTime: string
  status: 'requested' | 'confirmed' | 'declined' | 'waitlist' | 'cancelled' | 'attended'
}

interface AccountIntroductionSummaryDTO {
  requestId: string
  targetProfileId: string
  targetDisplayName: string
  targetAvatarUrl: string
  status: 'requested' | 'accepted' | 'declined' | 'cancelled' | 'expired' | 'cooldown'
  requestedAt: string
  expiresAt?: string
  respondedAt?: string
  cooldownUntil?: string
}

interface AccountInboxSummaryDTO {
  unreadCount: number
  latestThreads: InboxThreadSummaryDTO[]
}
```

### Account Preferences

### Account Settings

```ts
interface AccountPreferencesDTO {
  preferredCity?: string
  preferredContactChannel?: PreferredContactChannel
  staffContactEnabled: boolean
  familyAssistEnabled: boolean
  introductionUpdatesEnabled: boolean
  eventRemindersEnabled: boolean
  serviceAnnouncementsEnabled: boolean
  marketingEmailsEnabled: boolean
  analyticsConsentEnabled: boolean
}

interface AccountSettingsDTO {
  account: {
    id: string
    accountName: string
    avatarUrl: string
    preferredLocale: string
    status: string
    createdAt: string
    updatedAt: string
  }
  identities: AccountAuthIdentityDTO[]
  password: AccountPasswordSecurityDTO
  preferences: AccountPreferencesDTO
}

interface AccountAuthIdentityDTO {
  id: string
  provider: 'email' | 'phone' | 'wechat' | 'google'
  identifier: string
  verifiedAt?: string
}

interface AccountPasswordSecurityDTO {
  isSet: boolean
  lastChangedAt?: string
  canReset: boolean
  requiresMfa: boolean
}

interface AccountProfilePrivacyPreferencesDTO {
  hideMaritalStatus: boolean
  hideHasChildren: boolean
  hideChildrenPlan: boolean
  hideAcceptsLongDistance: boolean
  hideSmoking: boolean
  hideDrinking: boolean
}

type AccountProfilePrivacyPreferencesUpdatePayload = Partial<AccountProfilePrivacyPreferencesDTO>

type AccountProfileCreatePayload = ProfileCreatePayload

type AccountProfileUpdatePayload = Partial<AccountProfileCreatePayload>

interface AccountProfilePhotoSavePayload {
  id?: string
  url: string
  isPrimary: boolean
  sortOrder: number
  delete?: boolean
}

interface AccountProfileDetailSavePayload {
  profileId?: string
  profileType: 'self' | 'family'
  ownership: AccountProfileOwnershipUpdatePayload
  profile: AccountProfileUpdatePayload
  contact: AccountProfileContactUpdatePayload
  verification: AccountProfileVerificationUpdatePayload
  photos: AccountProfilePhotoSavePayload[]
}

interface AccountProfileVerificationUpdatePayload {
  legalName?: string
  dateOfBirth?: string
}

interface AccountProfileContactDTO {
  phone?: string
  email?: string
  wechat?: string
  preferredChannel?: 'phone' | 'email' | 'wechat'
  visibility: 'after_introduction' | 'owner_only' | 'disabled'
}

interface AccountProfileContactUpdatePayload {
  phone?: string
  email?: string
  wechat?: string
  preferredChannel?: 'phone' | 'email' | 'wechat'
  visibility?: 'after_introduction' | 'owner_only' | 'disabled'
}

interface AccountProfileArchiveResultDTO {
  profileId: string
  archivedAt: string
}

interface AccountPreferenceUpdatePayload {
  preferences: Partial<AccountPreferencesDTO>
}

interface AccountMeUpdatePayload {
  accountName?: string
  avatarUrl?: string
  preferredLocale?: LocaleCode
}

interface AccountMembershipUpgradePayload {
  tier: 'free' | 'silver' | 'gold' | 'diamond'
}

interface AccountMembershipUpgradeResultDTO {
  status: 'pending_external_flow'
  requestedTier: 'free' | 'silver' | 'gold' | 'diamond'
}
```

Write rules:

- `POST /api/account/profiles/save` is the primary owner-side save boundary for profile detail. It upserts the managed profile, writes user-editable profile fields, updates owner relation defaults, upserts `profile_contacts`, reconciles `profile_photos`, updates user-submitted `profile_verifications.legalName/dateOfBirth`, and returns the rebuilt detail DTO.
- `POST /api/account/profiles/:profileId/archive` is owner-only, rejects unsafe archive when active formal flows still exist, and returns a typed archive result.
- `POST /api/account/profiles/:profileId/privacy-preferences` 鍙洿鏂?profile 鎵€鏈変汉鍙帶鍒剁殑鍗婃晱鎰熷瓧娈甸殣钘忓亸濂斤紝骞惰繑鍥炴渶鏂板亸濂藉璞°€?- `POST /api/account/me` updates account display basics and the account default language preference; auth identities and status are out of scope.
- `POST /api/account/settings/preferences` updates the single typed `user_preferences` row for the current user.
- `POST /api/account/membership/upgrade` is a placeholder entry point; formal payment or staff confirmation happens before future membership state changes.

绂佹鍦?account DTO 涓繑鍥炶繖浜?legacy 瀛楁锛?
```text
realName
nickName
profileType as profile identity
completion
profile phone/email/wechat
privacy setting title/desc from DB
message_threads as final source
```

## Debug API

Debug API 鍙湇鍔℃湰鍦伴獙璇侊紝涓嶄綔涓烘寮忓墠绔骇鍝佸叆鍙ｃ€?
```ts
interface DebugPrivateIntroductionItemDTO {
  requestId: string
  requesterUserId: string
  targetProfileId: string
  status: string
  requestedAt: string
  respondedAt?: string
}
```

Debug 椤甸潰鍙互璋冪敤 accept / decline 宸ュ叿锛屼絾鐢熶骇 account / profile 椤甸潰鍙兘娑堣垂姝ｅ紡 private introduction 鐘舵€併€?
