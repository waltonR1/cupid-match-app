import type { AppMessageSchema } from '@/i18n/types'

export const favoritesMessages: AppMessageSchema = {
    hero: {
      eyebrow: 'Favorites',
      title: '收藏与筛选记录',
      subtitle: '收藏页区分完全由你本人保留的意向对象，以及允许家长共同了解的资料。这样既能保留私密筛选，也能让家庭在合适阶段参与。',
    },
    stats: {
      saved: '已收藏',
      shared: '家长可见',
      private: '仅本人可见',
    },
    perspective: {
      user: {
        eyebrow: 'User-led',
        title: '收藏首先服务本人判断',
        description: '收藏是你个人的筛选过程，不需要一开始就把所有意向对象暴露给家庭或顾问。',
        point1: '先保存值得继续观察的对象',
        point2: '通过备注记录你真正关心的匹配点',
        point3: '只有准备进入下一阶段时再开放家庭协同',
      },
      family: {
        eyebrow: 'Family-assisted',
        title: '家长只看你愿意共享的部分',
        description: '家长协同更适合发生在关系推进更明确之后，而不是替代你的早期筛选。',
        point1: '仅 family-visible 收藏会进入家长视角',
        point2: '更适合需要背景辅助判断的对象',
        point3: '家长不能替你决定是否继续接触',
      },
    },
    sections: {
      privateEyebrow: 'Private',
      privateTitle: '仅本人可见的收藏',
      privateSubtitle: '这部分更适合保留你自己的初步判断和观察备注。',
      sharedEyebrow: 'Family-visible',
      sharedTitle: '可与家长共看的收藏',
      sharedSubtitle: '这部分资料已经允许进入家庭协同视角，可用于后续补充背景和沟通建议。',
      openUser: '查看本人详情',
      openFamily: '查看家长视角',
      savedAt: '收藏时间',
      emptyTitle: '当前没有内容',
      emptyDescription: '这一组暂时还没有收藏资料，后续在发现页保存后会出现在这里。',
      familyBadge: '家长可见',
      privateBadge: '本人筛选',
    },
  }
