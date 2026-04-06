import type { AppMessageSchema } from '@/i18n/types'

export const favoritesMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Favorites',
      title: 'Saved profiles and filtering',
      subtitle: 'This page separates profiles kept only for the user s own evaluation from the ones that can be shared with family at the right stage.',
    },
    stats: {
      saved: 'Saved',
      shared: 'Family-visible',
      private: 'Private',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Favorites first serve personal judgment',
        description: 'Saving a profile is part of the user s own filtering process and does not need to be exposed to family from the start.',
        point1: 'Keep profiles worth watching more closely',
        point2: 'Use notes to record the real matching signals',
        point3: 'Open family collaboration only when the stage calls for it',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family only sees what is intentionally shared',
        description: 'Family collaboration makes more sense after the direction is clearer, not as a substitute for the user s early filtering.',
        point1: 'Only family-visible saves move into the family lens',
        point2: 'Useful when extra background context may help',
        point3: 'Family does not decide whether contact continues',
      },
    },
    sections: {
      privateEyebrow: 'Private',
      privateTitle: 'Favorites visible only to the user',
      privateSubtitle: 'This set is better for early judgment and personal notes.',
      sharedEyebrow: 'Family-visible',
      sharedTitle: 'Favorites that can be shared with family',
      sharedSubtitle: 'These profiles can enter the family-assisted lens for limited background review and follow-up input.',
      openUser: 'Open user detail',
      openFamily: 'Open family detail',
      savedAt: 'Saved on',
      emptyTitle: 'Nothing here yet',
      emptyDescription: 'This section has no saved profiles yet.',
      familyBadge: 'Family-visible',
      privateBadge: 'User-led',
    },
  }
