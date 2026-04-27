export interface LoginPayload {
  identity: string
  password: string
}

export interface RegisterPayload {
  role: 'self' | 'parent'
  email: string
  password: string
  nickName: string
  city: string
}

export interface AuthUserDTO {
  id?: string
  displayName: string
  avatarUrl?: string
}

export interface AuthSessionDTO {
  token: string
  user: AuthUserDTO
}
