import type { AppMessageSchema } from '@/i18n/types'

export const myProfileMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Profile',
      title: 'Mon profil et ses limites',
      subtitle: 'Cette page gere a la fois la qualite du profil et les limites de collaboration familiale. La personne choisit ce qui est visible et a quel moment.',
    },
    stats: {
      completion: 'Completion',
      visibility: 'Visible famille',
      highlights: 'Points forts',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: 'Le profil garde la voix de la personne',
        description: 'Presentation, intention relationnelle, langues et rythme de vie doivent d abord traduire la personne elle-meme.',
        point1: 'La solidite du profil passe avant la mise en scene',
        point2: 'Les informations utiles pour une relation serieuse restent prioritaires',
        point3: 'La personne decide du moment d ouverture a la famille',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: 'La famille ne voit qu une partie autorisee',
        description: 'La famille peut apporter du contexte, sans transformer le profil en espace d expression a sa place.',
        point1: 'Acces seulement apres ouverture explicite',
        point2: 'Aide a evaluer si une phase familiale est pertinente',
        point3: 'Ne remplace ni l intention ni les limites de la personne',
      },
    },
    basics: {
      eyebrow: 'Basics',
      title: 'Base du profil',
      city: 'Ville',
      education: 'Formation',
      occupation: 'Metier',
      intent: 'Intention',
      residence: 'Projet de residence',
      languages: 'Langues',
    },
    narrative: {
      eyebrow: 'Narrative',
      title: 'Presentation',
    },
    highlights: {
      eyebrow: 'Highlights',
      title: 'Points saillants',
      tagsTitle: 'Tags',
    },
    boundaries: {
      eyebrow: 'Boundaries',
      title: 'Cadre actuel',
      visibilityOn: 'Le profil autorise actuellement un contexte limite visible par la famille.',
      visibilityOff: 'Le profil reste pour l instant mene uniquement par la personne.',
      familyContactOn: 'La famille peut completer le contexte dans le cadre autorise.',
      familyContactOff: 'La famille ne peut pas intervenir directement dans le contact.',
      fieldsOpen: 'Des champs supplementaires sont deja ouverts pour une lecture plus fine.',
      fieldsClosed: 'Les champs detailles restent fermes a ce stade.',
    },
  }
