export function openLoginPage() {
  uni.navigateTo({
    url: '/pages/auth/login',
  })
}

export function openRegisterPage(plan?: string) {
  const query = plan ? `?plan=${encodeURIComponent(plan)}` : ''

  uni.navigateTo({
    url: `/pages/auth/register${query}`,
  })
}

export function openProfileDetail(id: string) {
  uni.navigateTo({
    url: `/pages/discovery/self/detail?id=${encodeURIComponent(id)}`,
  })
}

export function openFamilyProfileDetail(id: string) {
  uni.navigateTo({
    url: `/pages/discovery/family/detail?id=${encodeURIComponent(id)}`,
  })
}

export function openEventDetail(id: string) {
  uni.navigateTo({
    url: `/pages/events/detail?id=${encodeURIComponent(id)}`,
  })
}

export function openAccountPage() {
  uni.navigateTo({
    url: '/pages/account/index',
  })
}

export function openMyProfilePage() {
  uni.navigateTo({
    url: '/pages/account/profile',
  })
}

export function openMyEventsPage() {
  uni.navigateTo({
    url: '/pages/account/events',
  })
}

export function openFavoritesPage() {
  uni.navigateTo({
    url: '/pages/account/favorites',
  })
}

export function openMessagesPage() {
  uni.navigateTo({
    url: '/pages/account/messages',
  })
}

export function openPrivacyPage() {
  uni.navigateTo({
    url: '/pages/account/privacy',
  })
}
