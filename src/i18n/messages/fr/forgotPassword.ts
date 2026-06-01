import type { AppMessageSchema } from '@/i18n/types'

export const forgotPasswordMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Reset',
    title: 'Reinitialisez votre mot de passe',
    subtitle: 'Entrez votre email ou telephone enregistre pour recevoir un code de verification, puis definissez un nouveau mot de passe.',
  },
  form: {
    providerLabel: { email: 'Email', phone: 'Telephone' },
    identifierLabel: 'Email ou telephone',
    identifierPlaceholder: 'Entrez votre email ou telephone',
    sendCode: 'Envoyer le code',
    sending: 'Envoi...',
    step1Action: 'Retour a la connexion',
  },
  step2: {
    title: 'Saisissez le code et le nouveau mot de passe',
    codeLabel: 'Code de verification',
    codePlaceholder: 'Code a 6 chiffres',
    codeHint: 'Saisissez le code a 6 chiffres recu.',
    newPasswordLabel: 'Nouveau mot de passe',
    confirmPasswordLabel: 'Confirmer le nouveau mot de passe',
    action: 'Reinitialiser le mot de passe',
    loading: 'Reinitialisation...',
  },
  toasts: {
    codeSent: 'Code de verification envoye.',
    passwordReset: 'Mot de passe reinitialise avec succes.',
  },
  validation: {
    identifierRequired: 'Veuillez entrer votre email ou telephone enregistre.',
    codeRequired: 'Veuillez entrer le code de verification.',
    passwordsMismatch: 'Les mots de passe ne correspondent pas.',
    passwordInvalid: 'Le mot de passe doit contenir au moins 8 caracteres avec des lettres et des chiffres.',
  },
  error: {
    identityNotFound: 'Aucun compte trouve avec cet identifiant.',
    invalidCode: 'Code de verification invalide ou expire.',
    generic: 'Une erreur est survenue. Veuillez reessayer.',
  },
}
