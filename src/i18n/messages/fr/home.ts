import type {AppMessageSchema} from '@/i18n/types'

export const homeMessages: AppMessageSchema = {
    hero: {
        meta: 'Paris · {year}',
        title: '相约巴黎',
        titleAccent: 'Rencontre à Paris',
        description: 'Une experience de rencontre plus exigeante pour des celibataires qui prennent la relation durable au serieux.',
        secondaryDescription: 'Des profils, des evenements et un accompagnement plus clairs pour avancer avec plus de mesure.',
        actions: {
            primary: 'Rejoindre maintenant',
            secondary: 'Voir les profils choisis',
        },
        quote: 'Redonner de la justesse, du rythme et du reel a la rencontre.',
        stats: {
            members: {value: '70k+', label: 'Profils membres qualifies'},
            events: {value: '300+', label: 'Evenements a Paris et en Europe'},
            connections: {value: '3000+', label: 'Mises en relation reelles'},
        },
    },
    vision: {
        eyebrow: 'Vision',
        title: 'Rencontre à Paris',
        titleAccent: 'Notre ligne',
        intro: 'Dans une ville ou style de vie et intention comptent autant que l attraction, nous cherchons une forme de rencontre plus credible.',
        description: 'Une relation qui merite de devenir reelle nait autant de la proximite des valeurs que de la premiere attirance.',
        secondaryDescription: 'Nous preferons une rencontre plus juste et plus lente a une abondance de contacts sans direction.',
        pointLabel: 'VISION POINT',
        points: {
            relationship: {
                title: 'Orientation relationnelle',
                desc: 'Des rencontres pensees pour aller vers le reel, pas pour distraire.',
            },
            values: {
                title: 'Proximite de valeurs',
                desc: 'Mode de vie, rythme et projections futures doivent pouvoir tenir ensemble.',
            },
            intention: {
                title: 'Clarite',
                desc: 'Plus de clarte dans les attentes, les limites et le rythme de progression.',
            },
        },
    },
    profiles: {
        eyebrow: 'Apercu profils',
        title: 'Avant de rencontrer',
        titleAccent: 'voir les profils',
        subtitle: 'Comprendre la structure des fiches avant de decider si un echange merite de continuer.',
        cta: 'Voir tous les profils',
    },
    family: {
        eyebrow: 'Participation familiale',
        title: 'Pas seulement',
        titleAccent: 'deux personnes',
        description: 'Une relation durable depend aussi de la facon dont les rythmes, les valeurs et les familles peuvent coexister.',
        secondary: 'La famille intervient au bon moment, sans prendre la place des deux personnes.',
        item1: {
            title: 'Transparence utile',
            desc: 'Apporter du contexte sans exposer ce qui doit rester prive.',
        },
        item2: {
            title: 'Soutien de communication',
            desc: 'Aider a clarifier les attentes quand la relation avance.',
        },
        item3: {
            title: 'Limites de rythme',
            desc: 'Intervenir apres les premiers discernements, pas des le debut.',
        },
        card1Label: 'Principe',
        card1: 'La proximite des valeurs familiales compte dans la stabilite d une relation.',
        card2Label: 'Notre approche',
        card2: 'La famille soutient, mais ne choisit pas a la place des personnes concernees.',
    },
    events: {
        eyebrow: 'Evenements',
        title: 'Rencontres reelles',
        titleAccent: 'hors ligne',
        subtitle: 'Des formats choisis pour faire entrer la rencontre dans des situations plus vraies.',
        cta: 'Voir tous les evenements',
    },
    features: {
        eyebrow: 'Services',
        title: 'Fonctions',
        titleAccent: 'et parcours',
        subtitle: 'Navigation de profils, interactions choisies, evenements hors ligne, participation familiale et accompagnement conseil.',
        ai: {
            title: 'Matching intelligent',
            desc: 'Des recommandations plus utiles selon le parcours, la ville, le rythme de vie et le projet relationnel.',
            label: 'MATCHING INTELLIGENCE',
        },
        message: {
            title: 'Interaction privee',
            desc: 'Favoris, interet et echanges directs dans un cadre plus calme.',
            label: 'PRIVATE CONNECTION',
        },
        event: {
            title: 'Evenements hors ligne',
            desc: 'Diners, salons et formats culturels pour verifier le reel.',
            label: 'OFFLINE EVENTS',
        },
        family: {
            title: 'Participation familiale',
            desc: 'Une place plus claire pour la famille, au bon moment et avec des limites nettes.',
            label: 'FAMILY PARTICIPATION',
        },
        vip: {
            title: 'Accompagnement conseil',
            desc: 'Un niveau d aide plus eleve pour les parcours plus exigeants.',
            label: 'PRIVATE ADVISORY',
        },
        story: {
            title: 'Histoires reelles',
            desc: 'Des cas reels pour montrer comment une rencontre peut vraiment avancer.',
            label: 'REAL STORIES',
        },
    },
    audience: {
        eyebrow: 'Pour qui',
        title: 'Pour qui',
        titleAccent: 'ce parcours',
        description: 'Pour des celibataires cultives, plus selectifs, qui veulent une relation durable sans perdre de temps dans le flou.',
        secondaryDescription: 'Pas besoin d aller vite, mais il faut savoir ce que lon souhaite construire et etre pret a entrer dans le reel.',
        tag1: {
            title: 'Orientation serieuse',
            desc: 'Une relation durable compte davantage qu une attention passagere.',
        },
        tag2: {
            title: 'Aisance interculturelle',
            desc: 'La capacite a comprendre des parcours differents avec respect et nuance.',
        },
        tag3: {
            title: 'Pret au reel',
            desc: 'Passer du profil a la rencontre, puis de la rencontre au discernement.',
        },
        card1Label: 'Meilleur fit',
        card1: 'Quand valeurs, rythme de vie et direction future se rapprochent, la relation tient mieux dans le reel.',
        card1Accent: 'Ce qui compte n est pas seulement l intensite, mais la possibilite d avancer ensemble.',
        card2Label: 'Notre position',
        card2: 'Nous ne valorisons ni le flou ni le compromis force, mais une intention claire et sincere.',
        card2Accent: 'Chaque rencontre doit commencer dans la clarte, le respect et la mesure.',
    },
    membership: {
        eyebrow: 'PRIVATE MEMBERSHIP',
        title: 'Adhesion privee',
        titleAccent: 'Niveaux et privileges',
        subtitle: 'Du premier acces a un accompagnement plus dense, puis a un parcours plus discret et plus selectif.',
        free: {
            badge: 'Accès essentiel',
              description: 'Pour comprendre la plateforme et son rythme avant d aller plus loin.',
            f3: 'Decouverte des formats d evenements et du service',
            button: 'Commencer',
        },
        vip: {
            cta: 'Parler a un conseiller prive',
            currentPlanCta: 'Formule actuelle',
            includedCta: 'Inclus',
            upgradeCta: 'Passer a cette formule',
            silver: {
                badge: 'SILVER ACCESS',
                  description: 'Pour un parcours plus structure et une premiere dynamique de rencontre.',
                f3: 'Un rythme mesure pour une premiere selection',
            },
            gold: {
                badge: 'GOLD SELECTION',
                  description: 'Pour augmenter la qualite des recommandations et les opportunites de rencontre reelle.',
                f3: 'Concu pour une progression relationnelle plus active',
            },
            diamond: {
                badge: 'PRIVATE DIAMOND',
                  description: 'Pour un parcours plus confidentiel avec un niveau d accompagnement plus eleve.',
                  accessLabel: 'Acces prive',
                f3: 'Ideal pour un parcours avec forte implication conseil',
            },
        },
    },
}
