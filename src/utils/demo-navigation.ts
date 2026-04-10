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

export function openSelfDetail(id: string) {
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
    url: '/pages/account/profile',
  })
}

export function openMyProfilePage() {
  uni.navigateTo({
    url: '/pages/account/profile',
  })
}

export function openActivityPage() {
  uni.navigateTo({
    url: '/pages/account/activity',
  })
}

export function openMessagesPage() {
  uni.navigateTo({
    url: '/pages/account/messages',
  })
}

export function openVerificationPage() {
  uni.navigateTo({
    url: '/pages/account/verification',
  })
}

export function openConnectionsPage() {
  uni.navigateTo({
    url: '/pages/account/connections',
  })
}

export function openSafetyPage() {
  uni.navigateTo({
    url: '/pages/account/safety',
  })
}

export function openMembershipPage() {
  uni.navigateTo({
    url: '/pages/account/membership',
  })
}
