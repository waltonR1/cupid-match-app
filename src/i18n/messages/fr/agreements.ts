import type { AppMessageSchema } from '@/i18n/types'

export const agreementsMessages: AppMessageSchema = {
  kicker: 'Accord',
  close: 'Fermer',
  terms: {
    title: 'Conditions de la plateforme',
    p1: 'La creation du compte signifie que vous utilisez la plateforme avec une identite reelle et joignable. Le surnom du compte, la ville et les coordonnees du compte doivent rester globalement exacts et ne doivent pas usurper une autre personne.',
    p2: 'La plateforme propose un service de mise en relation, de coordination conseiller et de consultation des profils. Elle ne garantit ni resultat de matching, ni introduction reussie, ni evolution d une recommandation ou d un evenement vers une relation formelle.',
    p3: 'En cas de harcelement, de fausse declaration, d abus de confidentialite ou de contournement du parcours de service pour un detournement prive, la plateforme peut limiter l acces, suspendre le service ou arreter la cooperation ulterieure.',
  },
  privacy: {
    title: 'Politique de confidentialite',
    p1: 'Votre email, WeChat, ville et les informations de profil ajoutees ensuite sont utilises pour la creation du compte, le suivi conseiller, la verification d identite et les besoins de base du matching. Ils ne sont pas destines a une diffusion sans rapport.',
    p2: 'La plateforme regle la visibilite selon votre parcours, votre niveau d abonnement et vos regles de confidentialite, y compris l acces conseiller, les champs visibles et les limites de participation familiale.',
    p3: 'La plateforme traite les informations du compte et du profil uniquement dans le cadre necessaire au service ; la visibilite du profil, l acces conseiller et les limites de participation familiale suivent vos reglages et autorisations actifs.',
  },
}
