import type { AppMessageSchema } from '@/i18n/types'

export const selfMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Member Directory',
      title: 'Member profiles',
      subtitle: 'Browse the open profile pool, filter first by core dating criteria, then decide which profiles deserve deeper attention.',
      tags: {
        first: 'Real profile directory',
        second: 'Browse then filter',
        third: 'Paged navigation',
      },
    },

    toolbar: {
      sortLabel: 'Sort',
    },

    loading: 'Loading...',
    error: { title: 'Failed to load', description: 'Check your connection and try again', retry: 'Retry' },
    directory: {
      title: 'Directory',
      resultPrefix: 'Current result:',
      resultSuffix: 'profiles',
      empty: 'No profiles match the current filters.',
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
      height: 'Height',
      education: 'Education',
      eduBachelor: 'Bachelor',
      eduMaster: 'Master',
      eduPhD: 'PhD',
      intent: 'Intent',
      industry: 'Industry',
      languages: 'Languages',
      verified: 'Verification',
      verifiedYes: 'Verified',
      verifiedNo: 'Unverified',
      maritalStatus: 'Marital status',
      maritalSingle: 'Single',
      maritalDivorced: 'Divorced',
      maritalWidowed: 'Widowed',
      children: 'Children',
      childrenYes: 'Has children',
      childrenNo: 'No children',
      longDistance: 'Long-distance',
      longDistanceYes: 'Open to long-distance',
      longDistanceNo: 'No long-distance',
    },

    sort: {
      recentActive: 'Recently active',
      priorityFirst: 'Priority profiles',
      ageAsc: 'Age: low to high',
      ageDesc: 'Age: high to low',
    },

    fields: {
      city: 'City',
      education: 'Education',
      languages: 'Languages',
    },

    card: {
      goalSerious: 'Serious relationship',
      goalMarriage: 'Marriage-oriented',
      goalExclusive: 'Long-term path',
      goalCrossBorder: 'Cross-city potential',
      labelSelected: 'Selected Profile',
      labelReview: 'Profile In Review',
      labelPriority: 'Priority Profile',
    },

    pagination: {
      prev: 'Previous',
      next: 'Next',
    },
  }
