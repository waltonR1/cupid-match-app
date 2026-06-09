import type {AppMessageSchema} from '@/i18n/types'

export const homeMessages: AppMessageSchema = {
    hero: {
        meta: 'Paris · {year}',
        title: 'Meet in Paris',
        titleAccent: 'Rencontre à Paris',
        description: 'A more selective dating experience for educated singles who take long-term relationships seriously.',
        secondaryDescription: 'Profiles, events, and advisory support designed to move real connections forward with more clarity.',
        actions: {
            primary: 'Join Now',
            secondary: 'View Featured Profiles',
        },
        quote: 'Bring dating back to reality, pace, and lasting intent.',
        stats: {
            members: {value: '70k+', label: 'Qualified member profiles'},
            events: {value: '300+', label: 'Paris and Europe events'},
            connections: {value: '3000+', label: 'Real introductions'},
        },
    },
    vision: {
        eyebrow: 'Vision',
        title: 'Meet in Paris',
        titleAccent: 'Our Direction',
        intro: 'In a city where style, intention, and social rhythm all matter, we want a more credible way to meet.',
        description: 'A relationship worth entering in real life is built not only on attraction, but also on shared values, daily rhythm, and future direction.',
        secondaryDescription: 'We prefer a slower and more grounded encounter over endless volume without direction.',
        pointLabel: 'VISION POINT',
        points: {
            relationship: {
                title: 'Relationship First',
                desc: 'Built for people who want something real, not temporary attention.',
            },
            values: {
                title: 'Shared Values',
                desc: 'Lifestyle, pace, and long-term outlook need room to align.',
            },
            intention: {
                title: 'Clarity',
                desc: 'Clearer signals, clearer boundaries, and a steadier pace of progress.',
            },
        },
    },
    profiles: {
        eyebrow: 'Profile Preview',
        title: 'Before You Meet',
        titleAccent: 'Read the Profile',
        subtitle: 'Understand the structure first, then decide whether a connection deserves to move forward.',
        cta: 'View All Profiles',
    },
    family: {
        eyebrow: 'Family Participation',
        title: 'Not Only',
        titleAccent: 'Two People',
        description: 'A lasting relationship depends not only on two people, but also on how values, rhythm, and family context can coexist.',
        secondary: 'Family enters at the right stage, not as a force that replaces individual judgment.',
        item1: {
            title: 'Useful Transparency',
            desc: 'Adding context without overexposing what should remain private.',
        },
        item2: {
            title: 'Communication Support',
            desc: 'Helping clarify expectations once the relationship begins to move.',
        },
        item3: {
            title: 'Pace Boundaries',
            desc: 'Involvement after real judgment starts to form, not from the first step.',
        },
        card1Label: 'Principle',
        card1: 'Family values and long-term lifestyle compatibility matter in relationship stability.',
        card2Label: 'Our Approach',
        card2: 'Family can support the process, but should not replace personal judgment.',
    },
    events: {
        eyebrow: 'Events',
        title: 'Real Encounters',
        titleAccent: 'Offline',
        subtitle: 'Carefully designed formats that move connection into more realistic situations.',
        cta: 'View All Events',
    },
    features: {
        eyebrow: 'Services',
        title: 'Core Features',
        titleAccent: 'and Paths',
        subtitle: 'Profile discovery, interest signals, offline events, family participation, and advisory support in one more structured journey.',
        ai: {
            title: 'Smart Matching',
            desc: 'Recommendations shaped by background, city, lifestyle pace, and relationship intent.',
            label: 'MATCHING INTELLIGENCE',
        },
        message: {
            title: 'Private Interaction',
            desc: 'Favorites, interest signals, and follow-up messaging in a calmer setting.',
            label: 'PRIVATE CONNECTION',
        },
        event: {
            title: 'Offline Events',
            desc: 'Dinners, salons, and cultural formats that return dating to real situations.',
            label: 'OFFLINE EVENTS',
        },
        family: {
            title: 'Family Participation',
            desc: 'A clearer role for family when the relationship stage makes sense.',
            label: 'FAMILY PARTICIPATION',
        },
        vip: {
            title: 'Advisory Support',
            desc: 'More involved guidance for members with clearer and higher-intent needs.',
            label: 'PRIVATE ADVISORY',
        },
        story: {
            title: 'Real Stories',
            desc: 'Real examples that show what a higher-quality introduction can look like.',
            label: 'REAL STORIES',
        },
    },
    audience: {
        eyebrow: 'Who It Fits',
        title: 'Who Should',
        titleAccent: 'Join',
        description: 'For educated, internationally minded singles who want a more grounded path toward a serious relationship.',
        secondaryDescription: 'You do not need to move fast, but you do need to know what kind of relationship you want to enter.',
        tag1: {
            title: 'Serious Intent',
            desc: 'Long-term direction matters more than short-term excitement.',
        },
        tag2: {
            title: 'Cross-Cultural Ease',
            desc: 'The ability to navigate differences with respect, nuance, and restraint.',
        },
        tag3: {
            title: 'Ready for Real Meetings',
            desc: 'Willing to move from profile interest into real-world judgment.',
        },
        card1Label: 'Best Fit',
        card1: 'When values, lifestyle rhythm, and future direction align, a relationship holds more naturally in real life.',
        card1Accent: 'What matters is not only chemistry, but the ability to live forward together.',
        card2Label: 'Our Position',
        card2: 'We do not reward ambiguity or settling, only clearer and more sincere intent.',
        card2Accent: 'Every encounter should begin with clarity, respect, and measured pace.',
    },
    membership: {
        eyebrow: 'PRIVATE MEMBERSHIP',
        title: 'Private Membership',
        titleAccent: 'Levels and Access',
        subtitle: 'From essential access to deeper advisory support and more confidential matching paths.',
        free: {
            badge: 'Essential Access',
              description: 'For members who want to understand the platform before going further.',
            f3: 'Understand the event and membership structure',
            button: 'Start Now',
        },
        vip: {
            cta: 'Speak with a Private Advisor',
            silver: {
                badge: 'SILVER ACCESS',
                  description: 'For a more structured first layer of browsing and interaction.',
                f3: 'A measured first stage of selection',
            },
            gold: {
                badge: 'GOLD SELECTION',
                  description: 'For members who want stronger recommendation priority and more real-world opportunities.',
                f3: 'Built for active relationship progression',
            },
            diamond: {
                badge: 'PRIVATE DIAMOND',
                  description: 'For a more confidential path with deeper advisory involvement.',
                  accessLabel: 'Private Access',
                f3: 'Ideal for members who want high-touch guidance',
            },
        },
    },
}
