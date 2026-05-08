export const PROFILE_FIELD_MEMBER_ONLY = '__MEMBER_ONLY__'
export const PROFILE_FIELD_LOGIN_REQUIRED = '__LOGIN_REQUIRED__'

export type ProfileRestrictedFieldValue =
    | typeof PROFILE_FIELD_MEMBER_ONLY
    | typeof PROFILE_FIELD_LOGIN_REQUIRED

export const SELF_PROFILE_LOGIN_REQUIRED_FIELDS = [
    'country',
    'languages',
    'maritalStatus',
    'acceptsLongDistance',
    'relationshipPlan',
    'values',
    'smoking',
    'drinking',
    'exercise',
    'activityLevel',
    'weekendStyle',
    'pets',
    'interests',
] as const

export const SELF_PROFILE_MEMBER_ONLY_FIELDS = [
    'hasChildren',
    'wantsChildren',
    'residencePlan',
    'relocationWillingness',
    'preferredAgeMin',
    'preferredAgeMax',
    'locationScope',
    'preferredEducation',
    'familyPlan',
    'dealBreakers',
    'personalityTraits',
    'communicationStyle',
    'prompts',
] as const

export const SELF_PROFILE_GUEST_REQUIRED_FIELDS = [
    ...SELF_PROFILE_LOGIN_REQUIRED_FIELDS,
    ...SELF_PROFILE_MEMBER_ONLY_FIELDS,
] as const

export const FAMILY_PROFILE_LOGIN_REQUIRED_FIELDS = [
    'country',
    'nationality',
    'languages',
    'maritalStatus',
    'relationshipPlan',
    'acceptsLongDistance',
    'smoking',
    'drinking',
    'exercise',
    'activityLevel',
    'weekendStyle',
    'pets',
] as const

export const FAMILY_PROFILE_MEMBER_ONLY_FIELDS = [
    'hasChildren',
    'wantsChildren',
    'residencePlan',
    'relocationWillingness',
    'values',
    'preferredAgeMin',
    'preferredAgeMax',
    'locationScope',
    'preferredEducation',
    'familyPlan',
    'dealBreakers',
    'personalityTraits',
    'communicationStyle',
] as const

export const FAMILY_PROFILE_GUEST_REQUIRED_FIELDS = [
    ...FAMILY_PROFILE_LOGIN_REQUIRED_FIELDS,
    ...FAMILY_PROFILE_MEMBER_ONLY_FIELDS,
] as const
