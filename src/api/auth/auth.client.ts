import type { AuthApiClient } from './auth.contract'
import { createHttpAuthApiClient } from './auth.http'
import type {
  AuthSessionDTO,
  AuthUserDTO,
  LoginPayload,
  RegisterPayload,
} from './auth.types'

const authApiClient = createHttpAuthApiClient()

export type { AuthApiClient }
export type {
  AuthSessionDTO,
  AuthUserDTO,
  LoginPayload,
  RegisterPayload,
} from './auth.types'

export function getAuthApiClient() {
  return authApiClient
}

export function login(payload: LoginPayload): Promise<AuthSessionDTO> {
  return authApiClient.login(payload)
}

export function register(payload: RegisterPayload): Promise<AuthSessionDTO> {
  return authApiClient.register(payload)
}
