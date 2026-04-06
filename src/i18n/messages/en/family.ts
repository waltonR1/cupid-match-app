import type { AppMessageSchema } from '@/i18n/types'

export const familyMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Family Participation',
      title: 'Family participation',
      subtitle: 'This page handles the family participation review stage and only shows dossiers explicitly authorized for early family-side review.',
      tags: {
        first: 'Review dossiers first',
        second: 'Filter before acting',
        third: 'Judge fit first',
      },
    },

    stats: {
      visibleProfiles: 'Visible dossiers',
      priorityProfiles: 'Priority review',
      contactReady: 'Contact-ready',
    },

    toolbar: {
      sortLabel: 'Sort',
    },

    directory: {
      title: 'Family screening',
      resultPrefix: 'Current shortlist:',
      resultSuffix: 'dossiers',
      empty: 'No family-facing dossiers match the current filters.',
      pagePrefix: 'Showing',
    },

    filters: {
      clear: 'Clear all',
      expand: 'Show filters',
      collapse: 'Collapse',
      gender: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      age: 'Age',
      city: 'City',
      education: 'Education',
      intent: 'Relationship path',
      familyMode: 'Family mode',
      occupation: 'Occupation',
      industry: 'Industry',
      maritalStatus: 'Marital status',
      children: 'Children',
      longDistance: 'Long-distance',
    },

    fields: {
      city: 'City',
      education: 'Education',
      residencePlan: 'Residence plan',
      job: 'Occupation',
    },

    modes: {
      contextOnly: 'Context only',
      contactReady: 'Family contact ready',
      priority: 'Priority family review',
    },

    tags: {
      maritalSingle: 'Single',
      maritalDivorced: 'Divorced',
      maritalWidowed: 'Widowed',
      childrenYes: 'Has children',
      childrenNo: 'No children',
      longDistanceYes: 'Open to long-distance',
      longDistanceNo: 'Prefers same city',
    },

    card: {
      labelObserve: 'Worth family review first',
      labelContactReady: 'Ready for family discussion',
      labelReview: 'Profile still under review',
      labelPriority: 'Ready to move forward',
    },

    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
  }
