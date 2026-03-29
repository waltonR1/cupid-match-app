# 页面关系说明

## 结论

以“可浏览、可展示、可演示”的前台站点为目标，当前页面已经基本齐全，不缺关键页面。

当前这套结构已经覆盖了：

- 品牌入口
- 栏目浏览
- 列表到详情
- 注册演示
- 用户中心
- 用户常见辅助页

如果后面要继续补，优先级更高的是“真实业务能力”而不是“继续补页面”，例如登录、筛选、权限、支付、审核、消息交互等。

## 页面分组

### 1. 主栏目页

- `/pages/index/index`
  首页。站点总入口，承担品牌介绍、能力概览、会员体系入口、活动入口。
- `/pages/about/index`
  关于我们。承接品牌故事、目标用户、平台价值观。
- `/pages/profiles/index`
  会员资料。展示 mock 会员资料列表，并跳转会员详情。
- `/pages/parents/index`
  父母专区。展示家长可见资料、家长沙龙、协助项目，并跳转项目详情或会员详情。
- `/pages/events/index`
  活动日历。展示 mock 活动列表，并跳转活动详情。
- `/pages/membership/index`
  会员体系。展示免费会员与 VIP 层级，并跳转注册页。
- `/pages/contact/index`
  联系我们。展示联系方式、联系场景、服务分流入口。

### 2. 详情页

- `/pages/profile-detail/index`
  会员详情页。来源可以是会员资料页，也可以是父母专区。
- `/pages/event-detail/index`
  活动详情页。来源是活动日历页或首页 CTA。
- `/pages/parent-program-detail/index`
  家长项目详情页。来源是父母专区。

### 3. 用户页

- `/pages/register/index`
  注册演示页。当前承担“注册 / 选套餐 / 进入个人中心”的演示作用。
- `/pages/account/index`
  个人中心。用户页总入口。
- `/pages/my-profile/index`
  我的资料。
- `/pages/my-events/index`
  我的报名。
- `/pages/favorites/index`
  我的收藏。
- `/pages/messages/index`
  消息中心。
- `/pages/privacy/index`
  隐私设置。

### 4. 演示辅助页

- `/pages/empty-state/index`
  空状态 / 404 演示页。

## 导航关系

顶部和底部导航统一来自 `src/constants/nav.ts`：

- `common.nav.about` -> `/pages/about/index`
- `common.nav.profiles` -> `/pages/profiles/index`
- `common.nav.parents` -> `/pages/parents/index`
- `common.nav.events` -> `/pages/events/index`
- `common.nav.membership` -> `/pages/membership/index`
- `common.nav.contact` -> `/pages/contact/index`

导航跳转统一走 `src/utils/navigation.ts` 的 `navigateByNavKey()`。

## 主要浏览路径

### 路径 1：普通访客浏览站点

1. 首页
2. 关于我们 / 会员资料 / 活动日历 / 会员体系 / 联系我们
3. 从列表进入详情
4. 从 CTA 进入注册页

### 路径 2：会员资料浏览

1. 首页或导航进入会员资料
2. 浏览资料卡
3. 进入会员详情页
4. 从详情继续进入注册或个人中心相关动作

### 路径 3：活动浏览

1. 首页或导航进入活动日历
2. 浏览活动卡片
3. 进入活动详情页
4. 从详情进入注册或报名演示

### 路径 4：家长浏览

1. 首页或导航进入父母专区
2. 浏览家长可见资料或家长项目
3. 进入会员详情页或家长项目详情页
4. 从详情页进入联系或注册

### 路径 5：用户侧演示

1. 首页 / 会员体系 / 其它 CTA 进入注册页
2. 注册页进入个人中心
3. 从个人中心继续进入：
   - 我的资料
   - 我的报名
   - 我的收藏
   - 消息中心
   - 隐私设置
   - 空状态页

## 页面之间的实际跳转关系

### 全局入口

- Header / Footer -> 各主栏目页
- 各页 Register CTA -> `/pages/register/index`

### 首页

- 首页 CTA -> 注册页
- 首页 CTA -> 活动日历
- 首页功能卡 -> 会员资料 / 活动日历 / 父母专区 / 会员体系 / 关于我们

### 会员资料

- 会员资料列表 -> 会员详情页
- 家长协助资料列表 -> 会员详情页

### 父母专区

- 父母专区资料卡 -> 会员详情页
- 父母专区项目卡 -> 家长项目详情页

### 活动日历

- 活动列表 -> 活动详情页

### 会员体系

- 免费会员 CTA -> 注册页
- VIP 升级 CTA -> 注册页

### 注册与用户中心

- 注册页 -> 个人中心
- 个人中心 -> 我的资料
- 个人中心 -> 我的报名
- 个人中心 -> 我的收藏
- 个人中心 -> 消息中心
- 个人中心 -> 隐私设置
- 个人中心 -> 空状态页

## 当前阶段不缺，但后面可能会补的页面

这些不是展示站当前必须项，所以现在不算缺：

- 登录页
- 找回密码页
- 搜索结果页
- 高级筛选页
- 支付确认页
- 举报 / 拉黑页
- 审核后台页
- 单独的消息会话详情页

## 后续逐页修改建议

建议按下面顺序改，风险最低：

1. 首页
   先定整个站的视觉基调和 CTA 策略。
2. 会员资料页 + 会员详情页
   这是最核心的浏览链路。
3. 活动日历页 + 活动详情页
   第二核心链路。
4. 父母专区 + 家长项目详情页
   独立受众页，容易拉开差异。
5. 会员体系 + 注册页
   调整转化链路。
6. 个人中心及其子页
   最后统一用户侧风格和信息密度。

## 相关文件

- `src/pages.json`
- `src/constants/nav.ts`
- `src/utils/navigation.ts`
- `src/utils/demo-navigation.ts`
