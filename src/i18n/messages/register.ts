import type { AppLocaleMessages } from '@/i18n/types'

export const registerMessages: AppLocaleMessages = {
  zh: {
    hero: {
      eyebrow: 'Registration',
      title: '先选身份，再进入注册',
      subtitle: '注册页先确认你是本人使用，还是作为家长参与。之后再进入对应的注册与顾问跟进流程。',
      selectedRole: '当前身份',
      formTitle: '注册信息',
      submit: '提交当前申请',
      processTitle: '流程说明',
      roleBenefitTitle: '该身份下的注册重点',
    },
    roles: {
      self: {
        badge: '本人路径',
        title: '本人注册',
        desc: '适合由本人直接建立资料、表达择偶意向，并推进后续匹配与沟通。',
        note: '系统会更强调个人资料、偏好表达、顾问建议与本人节奏。',
      },
      parent: {
        badge: '家长路径',
        title: '家长注册',
        desc: '适合先从家庭视角了解平台、筛选资料，并参与初步沟通节奏。',
        note: '系统会更强调家庭参与、授权边界、资料把关与对子女档案的辅助管理。',
      },
    },
    form: {
      name: { label: '姓名', placeholder: '请输入你的姓名' },
      city: { label: '所在城市', placeholder: '例如：巴黎 / 里昂 / 布鲁塞尔' },
      contact: { label: '邮箱或微信', placeholder: '用于后续顾问联系' },
      intent: {
        label: '注册意向',
        placeholder: {
          self: '例如：认真交往 / 婚姻导向 / 希望先了解资料库',
          parent: '例如：为子女了解平台 / 希望先由家长沟通 / 先筛选合适家庭',
        },
      },
    },
    process: {
      step1: {
        title: '确认身份',
        desc: {
          self: '先确认你以本人身份进入，再开始后续注册与资料建立。',
          parent: '先确认你以家长身份进入，再开始家庭参与与后续代际协助流程。',
        },
      },
      step2: {
        title: '提交基础信息',
        desc: {
          self: '填写个人联系信息、所在城市与关系意向，进入资料完善与顾问回访。',
          parent: '填写家长侧联系信息与代办意向，后续可补充子女资料与家庭关注重点。',
        },
      },
      step3: {
        title: '进入对应路径',
        desc: {
          self: '后续进入个人资料、匹配浏览、顾问建议与活动安排路径。',
          parent: '后续进入家庭参与、资料把关、沟通授权与家长协助路径。',
        },
      },
    },
    roleBenefits: {
      self: {
        title: '以本人身份注册',
        desc: '更适合展示个人信息、表达择偶偏好，并由你本人决定后续沟通与见面节奏。',
      },
      parent: {
        title: '以家长身份注册',
        desc: '更适合先做家庭层面的把关与初筛，再逐步推动子女进入正式接触流程。',
      },
    },
  },

  fr: {
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
  },

  en: {
    hero: {
      eyebrow: 'Registration',
      title: 'Choose identity before signup',
      subtitle: 'Registration now begins with a clear choice: are you joining for yourself, or as a parent participating in the process?',
      selectedRole: 'Active identity',
      formTitle: 'Registration details',
      submit: 'Submit this request',
      processTitle: 'Process',
      roleBenefitTitle: 'What this registration focuses on',
    },
    roles: {
      self: {
        badge: 'Member path',
        title: 'Register for myself',
        desc: 'For members who want to build their own profile and move directly into the matching journey.',
        note: 'This path emphasizes the personal profile, preferences, advisor guidance, and member-led communication.',
      },
      parent: {
        badge: 'Family path',
        title: 'Register as a parent',
        desc: 'For parents who want to screen first, understand the process, and help guide the next step.',
        note: 'This path emphasizes family participation, communication boundaries, and assisted profile progression.',
      },
    },
    form: {
      name: { label: 'Name', placeholder: 'Enter your name' },
      city: { label: 'City', placeholder: 'Example: Paris / Lyon / Brussels' },
      contact: { label: 'Email or WeChat', placeholder: 'Used for advisor follow-up' },
      intent: {
        label: 'Registration intent',
        placeholder: {
          self: 'Example: serious dating / marriage-minded / want to explore the profile library first',
          parent: 'Example: exploring for my child / parent-first communication / screening suitable families first',
        },
      },
    },
    process: {
      step1: {
        title: 'Confirm identity',
        desc: {
          self: 'Confirm that you are joining as the member yourself before starting the registration flow.',
          parent: 'Confirm that you are joining as a parent before starting the family-side flow.',
        },
      },
      step2: {
        title: 'Submit your basic details',
        desc: {
          self: 'Share your core contact details, city, and relationship intent to begin profile completion and advisor follow-up.',
          parent: 'Share the parent-side contact details and support intent before adding more child and family context later.',
        },
      },
      step3: {
        title: 'Move into the right flow',
        desc: {
          self: 'From there, the journey continues into personal profile building, browsing, advisor guidance, and meetings.',
          parent: 'From there, the journey continues into family participation, screening, authorization, and coordination.',
        },
      },
    },
    roleBenefits: {
      self: {
        title: 'Registering as the member',
        desc: 'This path works best when the member wants to present themselves directly and lead the pace of contact.',
      },
      parent: {
        title: 'Registering as the parent',
        desc: 'This path works best when the family wants to screen and coordinate first before the formal member introduction.',
      },
    },
  },
}