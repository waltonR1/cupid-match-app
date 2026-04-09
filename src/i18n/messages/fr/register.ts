import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
  hero: {
    eyebrow: 'Inscription',
    title: 'Creez votre compte et lancez votre parcours',
    subtitle: 'Commencez par une inscription de compte classique, puis poursuivez dans le parcours membre ou parent selon votre identite. Le profil detaille viendra ensuite.',
    selectedRole: 'Identite selectionnee',
    formTitle: 'Creation du compte',
    panelTitle: 'Ouvrir votre compte',
    panelHint: 'Utilisez votre email principal ou WeChat, definissez votre mot de passe, puis ajoutez les informations minimales necessaires pour ouvrir le compte et poursuivre dans le bon parcours.',
    submit: 'Creer mon compte',
    processTitle: 'Fonctionnement',
    agreementPrefix: 'J ai lu et j accepte les',
    agreementTerms: 'Conditions de la plateforme',
    agreementConnector: ' et la ',
    agreementPrivacy: 'Politique de confidentialite',
    agreementSuffix: '. Apres inscription, la plateforme peut utiliser les informations du compte pour les prises de contact necessaires au service et regler la visibilite selon votre parcours et vos regles de confidentialite.',
    formFootnote: 'Apres inscription, vous pourrez completer le profil, ajuster la visibilite et ajouter des informations relationnelles plus detaillees dans votre compte.',
  },
  roles: {
    self: {
      badge: 'Parcours membre',
      title: 'Inscription pour moi-meme',
      desc: 'Convient aux membres qui veulent creer eux-memes leur profil, exprimer clairement leurs preferences et avancer directement vers le matching.',
      note: 'Ce parcours met l accent sur la qualite du profil personnel, la clarte des preferences, l accompagnement conseiller et un rythme pilote par le membre.',
    },
    parent: {
      badge: 'Parcours famille',
      title: 'Inscription comme parent',
      desc: 'Convient aux parents qui veulent comprendre le cadre, examiner les profils d abord et participer aux premiers echanges.',
      note: 'Ce parcours met l accent sur la participation familiale, le filtrage initial, les limites d intervention et la coordination autour de l enfant.',
    },
  },
  form: {
    email: { label: 'Email ou WeChat', placeholder: 'Entrez votre email principal ou WeChat' },
    password: { label: 'Mot de passe', placeholder: 'Definissez votre mot de passe' },
    confirmPassword: { label: 'Confirmation du mot de passe', placeholder: 'Saisissez a nouveau le mot de passe' },
    name: { label: 'Nom ou surnom', placeholder: 'Entrez votre nom ou le nom a afficher' },
    city: { label: 'Ville', placeholder: 'Exemple : Paris / Lyon / Bruxelles' },
  },
  process: {
    step1: {
      title: 'Creer le compte',
      desc: {
        self: 'Commencez par definir votre email ou WeChat et votre mot de passe pour ouvrir le compte membre.',
        parent: 'Commencez par definir votre email ou WeChat et votre mot de passe pour ouvrir le compte cote famille.',
      },
    },
    step2: {
      title: 'Ajouter les bases',
      desc: {
        self: 'Ajoutez d abord votre nom et votre ville, puis completez le profil personnel plus en detail ensuite.',
        parent: 'Ajoutez d abord le nom et la ville cote parent, puis continuez vers la configuration familiale ensuite.',
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
