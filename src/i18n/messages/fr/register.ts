import type { AppMessageSchema } from '@/i18n/types'

export const registerMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Registration',
      title: 'Choisissez d abord votre identite',
      subtitle: 'L inscription commence par un choix clair : pour soi-meme ou comme parent. Ensuite seulement, on entre dans le bon parcours.',
      selectedRole: 'Identite active',
      formTitle: 'Informations d inscription',
      submit: 'Envoyer cette demande',
      processTitle: 'Etapes',
      roleBenefitTitle: 'Priorite de cette inscription',
    },
    roles: {
      self: {
        badge: 'Parcours personnel',
        title: 'Inscription personnelle',
        desc: 'Pour les membres qui souhaitent construire eux-memes leur profil et avancer directement dans le matching.',
        note: 'Le systeme met davantage l accent sur le profil personnel, les preferences et le suivi individuel.',
      },
      parent: {
        badge: 'Parcours famille',
        title: 'Inscription parent',
        desc: 'Pour les parents qui souhaitent filtrer, comprendre le cadre et accompagner le rythme de contact.',
        note: 'Le systeme met davantage l accent sur la participation familiale, le cadre des echanges et l accompagnement du dossier enfant.',
      },
    },
    form: {
      name: { label: 'Nom', placeholder: 'Entrez votre nom' },
      city: { label: 'Ville', placeholder: 'Ex: Paris / Lyon / Bruxelles' },
      contact: { label: 'Email ou WeChat', placeholder: 'Pour le suivi conseiller' },
      intent: {
        label: 'Intention d inscription',
        placeholder: {
          self: 'Ex: relation serieuse / projet mariage / voir d abord les profils',
          parent: 'Ex: comprendre la plateforme pour mon enfant / echanger d abord entre parents / filtrer les familles',
        },
      },
    },
    process: {
      step1: {
        title: 'Confirmer l identite',
        desc: {
          self: 'Confirmer que vous entrez comme membre principal avant de lancer l inscription.',
          parent: 'Confirmer que vous entrez comme parent avant de lancer le parcours famille.',
        },
      },
      step2: {
        title: 'Laisser les informations de base',
        desc: {
          self: 'Donner vos coordonnees, votre ville et votre intention relationnelle pour lancer le suivi.',
          parent: 'Donner vos coordonnees parentales et la logique d accompagnement avant d ajouter les details de votre enfant.',
        },
      },
      step3: {
        title: 'Entrer dans le bon parcours',
        desc: {
          self: 'Ensuite, vous avancez vers le profil personnel, le matching, les recommandations et les rendez-vous.',
          parent: 'Ensuite, vous avancez vers la participation familiale, le tri, les autorisations et la coordination.',
        },
      },
    },
    roleBenefits: {
      self: {
        title: 'Inscription pour soi-meme',
        desc: 'Le parcours privilegie la presentation personnelle, les preferences et la prise de contact directe.',
      },
      parent: {
        title: 'Inscription comme parent',
        desc: 'Le parcours privilegie l evaluation familiale, le filtrage initial et l accompagnement avant mise en relation.',
      },
    },
  }
