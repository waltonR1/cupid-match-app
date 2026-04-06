import type { AppMessageSchema } from '@/i18n/types'

export const myProfileMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Profile',
      title: 'My profile and boundaries',
      subtitle: 'This page manages both profile quality and the boundary of family collaboration. The user should control what is visible, to whom, and at which stage.',
    },
    stats: {
      completion: 'Completion',
      visibility: 'Family visibility',
      highlights: 'Highlights',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'The profile keeps the user s voice',
        description: 'The introduction, relationship intent, languages, and life rhythm should reflect how the user wants to be understood.',
        point1: 'Accuracy and stability matter more than decorative polish',
        point2: 'Prioritize the information needed for serious long-term matching',
        point3: 'The user decides when family involvement begins',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'Family only sees the authorized slice',
        description: 'Family may add limited context, but the page should never become a place where they speak for the user.',
        point1: 'Access opens only after explicit permission',
        point2: 'Family can help judge whether collaboration is timely',
        point3: 'They do not replace the user s intent or boundaries',
      },
    },
    basics: {
      eyebrow: 'Basics',
      title: 'Profile foundation',
      city: 'City',
      education: 'Education',
      occupation: 'Occupation',
      intent: 'Intent',
      residence: 'Residence plan',
      languages: 'Languages',
    },
    narrative: {
      eyebrow: 'Narrative',
      title: 'About this profile',
    },
    highlights: {
      eyebrow: 'Highlights',
      title: 'Key highlights',
      tagsTitle: 'Profile tags',
    },
    boundaries: {
      eyebrow: 'Boundaries',
      title: 'Current permission boundary',
      visibilityOn: 'This profile currently allows limited background visibility for family.',
      visibilityOff: 'This profile is still being advanced primarily by the user alone.',
      familyContactOn: 'Family may add limited background context within the authorized scope.',
      familyContactOff: 'Family cannot directly step into contact or messaging right now.',
      fieldsOpen: 'Additional profile fields are already open for deeper evaluation.',
      fieldsClosed: 'Detailed fields remain closed for now to preserve stage-based boundaries.',
    },
  }
