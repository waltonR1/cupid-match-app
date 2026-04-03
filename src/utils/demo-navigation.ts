export function openRegisterPage(plan?: string) {
  const query = plan ? `?plan=${encodeURIComponent(plan)}` : ''

  uni.navigateTo({
    url: `/pages/register${query}`,
  })
}

export function openProfileDetail(id: string) {
  uni.navigateTo({
    url: `/pages/profiles/detail?id=${encodeURIComponent(id)}`,
  })
}

export function openFamilyProfileDetail(id: string) {
  uni.navigateTo({
    url: `/pages/family/detail?id=${encodeURIComponent(id)}`,
  })
}

export function openEventDetail(id: string) {
  uni.navigateTo({
    url: `/pages/events/detail?id=${encodeURIComponent(id)}`,
  })
}

export function openAccountPage() {
  uni.navigateTo({
    url: '/pages/user/index',
  })
}

export function openMyProfilePage() {
  uni.navigateTo({
    url: '/pages/user/profile',
  })
}

export function openMyEventsPage() {
  uni.navigateTo({
    url: '/pages/user/events',
  })
}

export function openFavoritesPage() {
  uni.navigateTo({
    url: '/pages/user/favorites',
  })
}

export function openMessagesPage() {
  uni.navigateTo({
    url: '/pages/user/messages',
  })
}

export function openPrivacyPage() {
  uni.navigateTo({
    url: '/pages/user/privacy',
  })
}
