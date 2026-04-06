import type { AppMessageSchema } from '@/i18n/types'

export const myEventsMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Events',
      title: 'Mes inscriptions et mon rythme de participation',
      subtitle: 'Les evenements sont un point cle du parcours matrimonial. Cette page separe ce que la personne doit confirmer elle-meme et ce que la famille peut seulement accompagner.',
    },
    stats: {
      confirmed: 'Confirmees',
      waitlist: 'En attente',
      completed: 'Terminees',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'La personne choisit ses evenements',
        description: 'Le rythme d inscription et de participation doit rester une decision personnelle.',
        point1: 'Verifier si l evenement correspond vraiment a la phase actuelle',
        point2: 'Preparer aussi bien les confirmations que les listes d attente',
        point3: 'Le suivi apres evenement reste mene par la personne',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille n intervient qu en appui',
        description: 'La famille peut aider sur un salon parents ou sur du contexte, sans remplacer l inscription ni la participation.',
        point1: 'Surtout utile pour les scenes explicatives ou familiales',
        point2: 'Peut aider a clarifier les informations pratiques',
        point3: 'Ne remplace pas la presence ni le jugement de la personne',
      },
    },
    list: {
      eyebrow: 'Pipeline',
      title: 'Inscriptions actuelles',
      seats: 'Places prises',
      action: 'Voir l evenement',
    },
    support: {
      eyebrow: 'Support',
      title: 'Rappels de progression',
      point1: 'Verifier en avance le lieu, l horaire et les consignes des evenements confirmes.',
      point2: 'Garder une cadence souple pour les listes d attente.',
      point3: 'Les evenements termines servent surtout a relire le retour et le suivi.',
    },
    family: {
      eyebrow: 'Family',
      title: 'Ce qui peut etre partage avec la famille',
      point1: 'Le contexte des evenements et des salons parents peut etre partage.',
      point2: 'La personne garde la decision de poursuivre ou non.',
      point3: 'Si la famille ne doit pas intervenir, le cadre actuel suffit.',
    },
    status: {
      confirmed: 'Confirmee',
      waitlist: 'Attente',
      completed: 'Terminee',
    },
  }
