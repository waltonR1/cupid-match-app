export function openRegisterPage(plan?: string) {
  const query = plan ? `?plan=${encodeURIComponent(plan)}` : ''

  uni.navigateTo({
    url: `/pages/register/index${query}`,
  })
}

export function openProfileDetail(id: string, source: 'member' | 'parent' = 'member') {
  uni.navigateTo({
    url: `/pages/profile-detail/index?id=${encodeURIComponent(id)}&source=${encodeURIComponent(source)}`,
  })
}

export function openEventDetail(id: string) {
  uni.navigateTo({
    url: `/pages/event-detail/index?id=${encodeURIComponent(id)}`,
  })
}

export function openParentProgramDetail(id: string) {
  uni.navigateTo({
    url: `/pages/parent-program-detail/index?id=${encodeURIComponent(id)}`,
  })
}

export function openAccountPage() {
  uni.navigateTo({
    url: '/pages/account/index',
  })
}

export function openMyProfilePage() {
  uni.navigateTo({
    url: '/pages/my-profile/index',
  })
}

export function openMyEventsPage() {
  uni.navigateTo({
    url: '/pages/my-events/index',
  })
}

export function openFavoritesPage() {
  uni.navigateTo({
    url: '/pages/favorites/index',
  })
}

export function openMessagesPage() {
  uni.navigateTo({
    url: '/pages/messages/index',
  })
}

export function openPrivacyPage() {
  uni.navigateTo({
    url: '/pages/privacy/index',
  })
}

export function openEmptyStatePage() {
  uni.navigateTo({
    url: '/pages/empty-state/index',
  })
}
