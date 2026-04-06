import type { AppMessageSchema } from '@/i18n/types'

export const contactMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Contact',
      title: 'Contact',
      titleAccent: 'Us',
      description: 'Whether you want to learn about the platform, speak with an advisor, upgrade to VIP, ask about events, or discuss a partnership, you can reach us here.',
      secondaryDescription: 'We want every contact point to feel clear, respectful, and genuinely useful.',
      actions: {
        primary: 'Talk to an Advisor',
      },
      card1: 'Contact is not just a form. It is the entry point to the right service.',
      card2: 'From membership upgrades to events, each inquiry should be properly guided.',
    },
    info: {
      eyebrow: 'Contact Info',
      title: 'Contact',
      titleAccent: 'Information',
      subtitle: 'Choose the channel that best fits your need, and we will guide the next step according to your inquiry type.',
      cardLabel: 'Direct',
      card1: {
        title: 'Email',
        desc: 'Best for formal questions about the platform, partnerships, memberships, and events.',
        value: '{email}',
      },
      card2: {
        title: 'WeChat Advisor',
        desc: 'Best for direct communication about memberships, events, and early-stage advisor conversations.',
        value: 'RencontreParis',
      },
      card3: {
        title: 'Base City',
        desc: 'The brand starts from Paris, with offline development focused first on France and Europe.',
        value: 'Paris / France',
      },
    },
    cases: {
      eyebrow: 'Contact Scenarios',
      title: 'What you can',
      titleAccent: 'contact us about',
      subtitle: 'The contact page is not only for general questions. It is also a gateway into several real platform scenarios.',
      deskLabel: 'Concierge Desk',
      card1: {
        title: 'Platform introduction',
        desc: 'Learn about the platform s positioning, target users, multilingual support, and overall structure.',
      },
      card2: {
        title: 'Membership upgrade questions',
        desc: 'Understand the differences between VIP tiers and how upgrade handling works.',
      },
      card3: {
        title: 'Events and partnerships',
        desc: 'Ask about Paris and Europe events, themed gatherings, or potential collaborations.',
      },
      card4: {
        title: 'Advisor and matchmaking profiles',
        desc: 'Discuss deeper one-on-one advisor support or matchmaker-led introductions.',
      },
      card5: {
        title: 'Family Participation questions',
        desc: 'Families can ask about the rules, boundaries, and support formats for family participation.',
      },
      card6: {
        title: 'Brand and business cooperation',
        desc: 'For media, venue, event, partnership, or co-branding inquiries.',
      },
    },
    guide: {
      eyebrow: 'Guidance',
      title: 'We want to make',
      titleAccent: 'contact more effective',
      description: 'Different questions call for different forms of follow-up. The clearer your request is, the better we can guide you.',
      secondaryDescription: 'We also want communication to remain structured, respectful, and not unnecessarily repetitive.',
      flow1Label: 'Reply Flow 01',
      flow2Label: 'Reply Flow 02',
      tag1: {
        title: 'Clear request',
        desc: 'Helps us guide you faster',
      },
      tag2: {
        title: 'Layered service',
        desc: 'Different issues need different handling',
      },
      tag3: {
        title: 'Respectful boundaries',
        desc: 'The contact experience should stay refined',
      },
      card1: 'First understand the need, then move into the right service path.',
      card1Sub: 'Not every inquiry should enter the same layer of support.',
      card2: 'Clear and respectful communication is part of the platform experience.',
      card2Sub: 'That applies to advisors, events, and membership upgrades as well.',
    },
  }
