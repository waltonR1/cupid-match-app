import type { AppMessageSchema } from '@/i18n/types'

export const forgotPasswordMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Reset',
    title: 'Reset your password',
    subtitle: 'Enter your registered email or phone to receive a verification code, then set a new password.',
  },
  form: {
    providerLabel: { email: 'Email', phone: 'Phone' },
    identifierLabel: 'Email or phone',
    identifierPlaceholder: 'Enter your registered email or phone',
    sendCode: 'Send code',
    sending: 'Sending...',
    step1Action: 'Back to login',
  },
  step2: {
    title: 'Enter code and new password',
    codeLabel: 'Verification code',
    codePlaceholder: '6-digit code',
    codeHint: 'Enter the 6-digit code you received.',
    newPasswordLabel: 'New password',
    confirmPasswordLabel: 'Confirm new password',
    action: 'Reset password',
    loading: 'Resetting...',
  },
  toasts: {
    codeSent: 'Verification code sent.',
    passwordReset: 'Password reset successfully.',
  },
  validation: {
    identifierRequired: 'Please enter your registered email or phone.',
    codeRequired: 'Please enter the verification code.',
    passwordsMismatch: 'Passwords do not match.',
    passwordInvalid: 'Password must be at least 8 characters with letters and digits.',
  },
  error: {
    identityNotFound: 'No account found with that identifier.',
    invalidCode: 'Invalid or expired verification code.',
    generic: 'Something went wrong. Please try again.',
  },
}
