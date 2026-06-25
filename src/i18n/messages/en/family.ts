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

    toolbar: {
      sortLabel: 'Sort',
    },

    loading: 'Loading...',
    error: { title: 'Failed to load', description: 'Check your connection and try again', retry: 'Retry' },
    directory: {
      title: 'Family screening',
      resultPrefix: 'Current shortlist:',
      resultSuffix: 'dossiers',
      empty: 'No family-facing dossiers match the current filters.',
      pagePrefix: 'Showing',
      favoriteFailed: 'Could not update favorite status.',
    },

    filters: {
      all: 'All',
      clear: 'Clear all',
      expand: 'Show filters',
      collapse: 'Collapse',
      gender: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      age: 'Age',
      ageUnder25: 'Under 25',
      age25to29: '25-29',
      age30to34: '30-34',
      age35to39: '35-39',
      age40plus: '40+',
      city: 'City',
      education: 'Education',
      eduBachelor: 'Bachelor',
      eduMaster: 'Master',
      eduPhD: 'PhD',
      intent: 'Relationship path',
      familyMode: 'Family mode',
      modeContextOnly: 'Context only',
      modeContactReady: 'Contact-ready',
      modePriority: 'Priority review',
      industry: 'Industry',
      maritalStatus: 'Marital status',
      maritalSingle: 'Single',
      maritalDivorced: 'Divorced',
      maritalWidowed: 'Widowed',
      children: 'Children',
      childrenYes: 'Has children',
      childrenNo: 'No children',
      longDistance: 'Long-distance',
      longDistanceYes: 'Open to long-distance',
      longDistanceNo: 'Prefers same city',
    },

    sort: {
      priorityFirst: 'Priority review',
      recentActive: 'Recently active',
      ageAsc: 'Age: low to high',
      ageDesc: 'Age: high to low',
    },

    fields: {
      city: 'City',
      education: 'Education',
      residencePlan: 'Residence plan',
    },

    tags: {
      maritalSingle: 'Single',
      maritalDivorced: 'Divorced',
      maritalWidowed: 'Widowed',
      childrenYes: 'Has children',
      childrenNo: 'No children',
      longDistanceYes: 'Open to long-distance',
    },

    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
  }
