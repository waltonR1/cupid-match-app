import type { AppMessages } from '@/i18n/types'
import { commonMessages } from '@/i18n/messages/en/common'
import { homeMessages } from '@/i18n/messages/en/home'
import { loginMessages } from '@/i18n/messages/en/login'
import { aboutMessages } from '@/i18n/messages/en/about'
import { accountMessages } from '@/i18n/messages/en/account'
import { profilesMessages } from '@/i18n/messages/en/profiles'
import { eventsMessages } from '@/i18n/messages/en/events'
import { eventDetailMessages } from '@/i18n/messages/en/event-detail'
import { favoritesMessages } from '@/i18n/messages/en/favorites'
import { membershipMessages } from '@/i18n/messages/en/membership'
import { messagesPageMessages } from '@/i18n/messages/en/messages-page'
import { myEventsMessages } from '@/i18n/messages/en/my-events'
import { myProfileMessages } from '@/i18n/messages/en/my-profile'
import { familyMessages } from '@/i18n/messages/en/family'
import { familyDetailMessages } from '@/i18n/messages/en/family-detail'
import { privacyMessages } from '@/i18n/messages/en/privacy'
import { profileDetailMessages } from '@/i18n/messages/en/profile-detail'
import { registerMessages } from '@/i18n/messages/en/register'
import { contactMessages } from '@/i18n/messages/en/contact'
import { notFoundMessages } from '@/i18n/messages/en/not-found'

export const en: AppMessages['en'] = {
  common: commonMessages,
  home: homeMessages,
  login: loginMessages,
  about: aboutMessages,
  account: accountMessages,
  profiles: profilesMessages,
  events: eventsMessages,
  eventDetail: eventDetailMessages,
  favorites: favoritesMessages,
  membership: membershipMessages,
  messages: messagesPageMessages,
  myEvents: myEventsMessages,
  myProfile: myProfileMessages,
  family: familyMessages,
  familyDetail: familyDetailMessages,
  privacy: privacyMessages,
  profileDetail: profileDetailMessages,
  register: registerMessages,
  contact: contactMessages,
  notFound: notFoundMessages,
}
