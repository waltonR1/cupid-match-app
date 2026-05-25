export const PROFILE_FIELD_MEMBER_ONLY = '__MEMBER_ONLY__'
export const PROFILE_FIELD_LOGIN_REQUIRED = '__LOGIN_REQUIRED__'
export const PROFILE_FIELD_HIDDEN = '__HIDDEN__'

export type ProfileRestrictedFieldValue =
    | typeof PROFILE_FIELD_MEMBER_ONLY
    | typeof PROFILE_FIELD_LOGIN_REQUIRED
    | typeof PROFILE_FIELD_HIDDEN

export const SELF_PROFILE_LOGIN_REQUIRED_FIELDS = [
    'country',
    'languages',
    'maritalStatus',
    'acceptsLongDistance',
    'relationshipGoal',
    'relationshipValues',
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
    'childrenPlan',
    'residencePlan',
    'relocation',
    'preferredAgeMin',
    'preferredAgeMax',
    'preferredLocation',
    'preferredEducation',
    'familyLife',
    'dealBreakers',
    'personalityTraits',
    'communicationStyle',
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
    'relationshipGoal',
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
    'childrenPlan',
    'residencePlan',
    'relocation',
    'relationshipValues',
    'preferredAgeMin',
    'preferredAgeMax',
    'preferredLocation',
    'preferredEducation',
    'familyLife',
    'dealBreakers',
    'personalityTraits',
    'communicationStyle',
] as const

export const FAMILY_PROFILE_GUEST_REQUIRED_FIELDS = [
    ...FAMILY_PROFILE_LOGIN_REQUIRED_FIELDS,
    ...FAMILY_PROFILE_MEMBER_ONLY_FIELDS,
] as const
