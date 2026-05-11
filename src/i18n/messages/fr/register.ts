import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Inscription',
    title: 'Creez votre compte et lancez votre parcours',
    subtitle: 'Commencez par une inscription de compte classique, puis poursuivez dans le parcours membre ou parent selon votre identite. Le profil detaille viendra ensuite.',
    selectedPath: 'Identite selectionnee',
    formTitle: 'Creation du compte',
    panelTitle: 'Ouvrir votre compte',
    panelHint: 'Utilisez votre email ou telephone, definissez un mot de passe et remplissez les informations essentielles pour creer votre compte.',
    submit: 'Creer mon compte',
    processTitle: 'Fonctionnement',
    agreementPrefix: 'J ai lu et j accepte les',
    agreementTerms: 'Conditions de la plateforme',
    agreementConnector: ' et la ',
    agreementPrivacy: 'Politique de confidentialite',
    agreementSuffix: '. Apres inscription, la plateforme peut utiliser les informations du compte pour les prises de contact necessaires au service et regler la visibilite selon votre parcours et vos regles de confidentialite.',
    formFootnote: 'Apres inscription, vous pourrez completer le profil, ajuster la visibilite et ajouter des informations relationnelles plus detaillees dans votre compte.',
  },
  paths: {
    self: {
      badge: 'Parcours membre',
      title: 'Inscription pour moi-meme',
      desc: 'Convient aux membres qui veulent creer eux-memes leur profil, exprimer clairement leurs preferences et avancer directement vers le matching.',
      note: 'Ce parcours met l accent sur la qualite du profil personnel, la clarte des preferences, l accompagnement conseiller et un rythme pilote par le membre.',
    },
    family: {
      badge: 'Parcours famille',
      title: 'Inscription comme parent',
      desc: 'Convient aux parents qui veulent comprendre le cadre, examiner les profils d abord et participer aux premiers echanges.',
      note: 'Ce parcours met l accent sur la participation familiale, le filtrage initial, les limites d intervention et la coordination autour de l enfant.',
    },
  },
  form: {
    accountName: { label: 'Votre nom', placeholder: 'Votre nom' },
    identifier: { label: 'Email ou telephone', placeholder: 'Email ou telephone' },
    city: { label: 'Ville', placeholder: 'Paris' },
    preferredLocale: {
      label: 'Langue preferee',
      options: { zh: '中文', fr: 'Francais', en: 'English' },
    },
    password: { label: 'Mot de passe', placeholder: 'Definir le mot de passe' },
    confirmPassword: { label: 'Confirmation', placeholder: 'Saisissez a nouveau le mot de passe' },
    error: { duplicate: 'Ce compte existe deja. Veuillez vous connecter.', mismatch: 'Les mots de passe ne correspondent pas', agreement: 'Veuillez accepter les conditions de la plateforme et la politique de confidentialite avant de creer votre compte.' },
  },
  process: {
    step1: {
      title: 'Creer le compte',
      desc: {
        self: 'Definissez votre methode de connexion et votre mot de passe pour ouvrir le compte membre.',
        parent: 'Definissez votre methode de connexion et votre mot de passe pour ouvrir le compte cote famille.',
      },
    },
    step2: {
      title: 'Ajouter les bases',
      desc: {
        self: 'Ajoutez d abord le nom du compte et votre ville, puis continuez dans le parcours membre.',
        parent: 'Ajoutez d abord le nom du compte cote parent et la ville, puis continuez dans le parcours famille.',
      },
    },
    step3: {
      title: 'Entrer dans le bon parcours',
      desc: {
        self: 'Apres l inscription, vous entrez dans le parcours membre pour la navigation, le profil detaille et le matching.',
        parent: 'Apres l inscription, vous entrez dans le parcours parent pour le tri, la coordination et la communication ulterieure.',
      },
    },
  },
}
