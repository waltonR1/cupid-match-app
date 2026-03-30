import { createI18n } from 'vue-i18n'
import { readLocale, FALLBACK_LOCALE } from '@/i18n/locale'
import { aboutMessages } from '@/i18n/messages/about'
import { accountMessages } from '@/i18n/messages/account'
import { commonMessages } from '@/i18n/messages/common'
import { contactMessages } from '@/i18n/messages/contact'
import { emptyStateMessages } from '@/i18n/messages/empty-state'
import { eventDetailMessages } from '@/i18n/messages/event-detail'
import { eventsMessages } from '@/i18n/messages/events'
import { favoritesMessages } from '@/i18n/messages/favorites'
import { homeMessages } from '@/i18n/messages/home'
import { messagesPageMessages } from '@/i18n/messages/messages-page'
import { membershipMessages } from '@/i18n/messages/membership'
import { myEventsMessages } from '@/i18n/messages/my-events'
import { myProfileMessages } from '@/i18n/messages/my-profile'
import { familyProgramDetailMessages } from '@/i18n/messages/family-program-detail'
import { familyMessages } from '@/i18n/messages/family'
import { privacyMessages } from '@/i18n/messages/privacy'
import { profileDetailMessages } from '@/i18n/messages/profile-detail'
import { registerMessages } from '@/i18n/messages/register'
import { profilesMessages } from '@/i18n/messages/profiles'
import type { AppMessages } from '@/i18n/types'

export const messages: AppMessages = {
  zh: {
    common: commonMessages.zh,
    home: homeMessages.zh,
    about: aboutMessages.zh,
    account: accountMessages.zh,
    profiles: profilesMessages.zh,
    events: eventsMessages.zh,
    eventDetail: eventDetailMessages.zh,
    favorites: favoritesMessages.zh,
    membership: membershipMessages.zh,
    messages: messagesPageMessages.zh,
    myEvents: myEventsMessages.zh,
    myProfile: myProfileMessages.zh,
    familyProgramDetail: familyProgramDetailMessages.zh,
    family: familyMessages.zh,
    privacy: privacyMessages.zh,
    profileDetail: profileDetailMessages.zh,
    register: registerMessages.zh,
    contact: contactMessages.zh,
    emptyState: emptyStateMessages.zh,
  },
  fr: {
    common: commonMessages.fr,
    home: homeMessages.fr,
    about: aboutMessages.fr,
    account: accountMessages.fr,
    profiles: profilesMessages.fr,
    events: eventsMessages.fr,
    eventDetail: eventDetailMessages.fr,
    favorites: favoritesMessages.fr,
    membership: membershipMessages.fr,
    messages: messagesPageMessages.fr,
    myEvents: myEventsMessages.fr,
    myProfile: myProfileMessages.fr,
    familyProgramDetail: familyProgramDetailMessages.fr,
    family: familyMessages.fr,
    privacy: privacyMessages.fr,
    profileDetail: profileDetailMessages.fr,
    register: registerMessages.fr,
    contact: contactMessages.fr,
    emptyState: emptyStateMessages.fr,
  },
  en: {
    common: commonMessages.en,
    home: homeMessages.en,
    about: aboutMessages.en,
    account: accountMessages.en,
    profiles: profilesMessages.en,
    events: eventsMessages.en,
    eventDetail: eventDetailMessages.en,
    favorites: favoritesMessages.en,
    membership: membershipMessages.en,
    messages: messagesPageMessages.en,
    myEvents: myEventsMessages.en,
    myProfile: myProfileMessages.en,
    familyProgramDetail: familyProgramDetailMessages.en,
    family: familyMessages.en,
    privacy: privacyMessages.en,
    profileDetail: profileDetailMessages.en,
    register: registerMessages.en,
    contact: contactMessages.en,
    emptyState: emptyStateMessages.en,
  },
}

export const i18n = createI18n({
  legacy: false,
  locale: readLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages,
})
