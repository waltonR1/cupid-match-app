import type { AppMessages } from '@/i18n/types'
import { commonMessages } from '@/i18n/messages/zh/common'
import { homeMessages } from '@/i18n/messages/zh/home'
import { loginMessages } from '@/i18n/messages/zh/login'
import { aboutMessages } from '@/i18n/messages/zh/about'
import { accountMessages } from '@/i18n/messages/zh/account'
import { profilesMessages } from '@/i18n/messages/zh/profiles'
import { eventsMessages } from '@/i18n/messages/zh/events'
import { eventDetailMessages } from '@/i18n/messages/zh/event-detail'
import { favoritesMessages } from '@/i18n/messages/zh/favorites'
import { membershipMessages } from '@/i18n/messages/zh/membership'
import { messagesPageMessages } from '@/i18n/messages/zh/messages-page'
import { myEventsMessages } from '@/i18n/messages/zh/my-events'
import { myProfileMessages } from '@/i18n/messages/zh/my-profile'
import { familyMessages } from '@/i18n/messages/zh/family'
import { familyDetailMessages } from '@/i18n/messages/zh/family-detail'
import { privacyMessages } from '@/i18n/messages/zh/privacy'
import { profileDetailMessages } from '@/i18n/messages/zh/profile-detail'
import { registerMessages } from '@/i18n/messages/zh/register'
import { contactMessages } from '@/i18n/messages/zh/contact'
import { notFoundMessages } from '@/i18n/messages/zh/not-found'

export const zh: AppMessages['zh'] = {
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
