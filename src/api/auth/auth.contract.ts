import type { AuthSessionDTO, LoginPayload, RegisterPayload } from './auth.types'

export interface AuthApiClient {
  login(payload: LoginPayload): Promise<AuthSessionDTO>
  register(payload: RegisterPayload): Promise<AuthSessionDTO>
}
