import type { AppMessageSchema } from '@/i18n/types'

export const privacyMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Privacy',
      title: 'Privacy permissions and family scope',
      subtitle: 'This page is not a set of abstract toggles. It defines who can see what, who may contact the user, and how far family assistance is allowed to go.',
    },
    stats: {
      enabled: 'Enabled',
      disabled: 'Disabled',
      familyAssist: 'Family assist',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Permissions should first protect user control',
        description: 'These settings exist to protect the user s own boundaries, not to bring more actors into the flow by default.',
        point1: 'Decide who may contact the user and when',
        point2: 'Decide which profile fields can open further',
        point3: 'Keep the narrowest permission set when collaboration is unnecessary',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family access must be explicitly granted',
        description: 'Family participation is not a default path but a permission that the user opens only when it fits the stage.',
        point1: 'Family only enters the areas explicitly authorized',
        point2: 'Better suited for context and pacing, not decision replacement',
        point3: 'The permission can remain off or be withdrawn later',
      },
    },
    sections: {
      userEyebrow: 'User control',
      userTitle: 'Directly controlled by the user',
      userSubtitle: 'These settings define how the platform, advisors, and profile fields operate around the user.',
      familyEyebrow: 'Family scope',
      familyTitle: 'Family assistance scope',
      familySubtitle: 'Family collaboration should only enter the account flow after it is opened here.',
      statusEnabled: 'Enabled',
      statusDisabled: 'Disabled',
    },
    notes: {
      eyebrow: 'Notes',
      title: 'Current principles',
      point1: 'Advisor contact is service coordination, not family participation.',
      point2: 'Family assistance makes more sense once direction is clearer.',
      point3: 'Before opening more fields, confirm that it truly helps progression.',
    },
  }
