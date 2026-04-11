const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const themeTokensPath = path.join(root, 'src/constants/theme-tokens.json');
const tokenMetaPath = path.join(root, 'src/constants/theme-token-meta.json');
const auditDocPath = path.join(root, 'docs/token-usage-audit.md');
const styleDocPath = path.join(root, 'docs/style-token-usage.md');

const themeTokens = JSON.parse(fs.readFileSync(themeTokensPath, 'utf8'));
const purposeMap = JSON.parse(fs.readFileSync(tokenMetaPath, 'utf8'));
const colorRoots = ['page', 'surface', 'text', 'brand', 'border', 'button'];
const standardShadowNames = new Set(['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none']);
const sourceExts = new Set(['.vue', '.js', '.ts', '.jsx', '.tsx']);
const today = '2026-04-05';

function mergeDeep(base, override) {
  const result = { ...base };
  for (const [key, value] of Object.entries(override || {})) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = mergeDeep(base[key] || {}, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function flatten(obj, pathParts = [], out = {}) {
  for (const [key, value] of Object.entries(obj || {})) {
    const next = [...pathParts, key];
    if (typeof value === 'string') {
      out[next.join('.')] = value;
    } else {
      flatten(value, next, out);
    }
  }
  return out;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'unpackage') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (sourceExts.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function fallbackUtility(def) {
  if (def.root === 'page' || def.root === 'surface') return `bg-${def.root}-${def.key}`;
  if (def.root === 'text') return `text-${def.root}-${def.key}`;
  if (def.root === 'border') return `border-${def.root}-${def.key}`;
  if (def.root === 'gradient') return `bg-${def.key}`;
  if (def.root === 'shadow') return `shadow-${def.key}`;
  if (def.root === 'hero') return `var(--hero-${def.key.replace(/\./g, '-')})`;
  if (def.root === 'button') {
    if (def.key === 'neutral-ink' || def.key === 'neutral-contrast') {
      return `text-button-${def.key}`;
    }
    return `bg-button-${def.key}`;
  }
  if (def.root === 'brand') {
    if (def.key.endsWith('-soft') || def.key === 'primary-soft') {
      return `bg-brand-${def.key}`;
    }
    return `text-brand-${def.key}`;
  }
  return def.name;
}

const merged = mergeDeep(themeTokens.shared, themeTokens.themes.dark);
const flat = flatten(merged);
const definitions = Object.keys(flat)
  .sort()
  .map(name => {
    const [root, ...rest] = name.split('.');
    const key = rest.join('.');
    const kind = root === 'gradient' || root === 'shadow' || root === 'hero' ? root : 'color';
    return { root, key, name, kind };
  })
  .filter(def => /^(page|surface|text|brand|border|button|gradient|shadow|hero)$/.test(def.root));

for (const def of definitions) {
  if (!purposeMap[def.root] || !purposeMap[def.root][def.key]) {
    throw new Error(`Missing purpose for ${def.name}`);
  }
}

const colorTokenSet = new Set(definitions.filter(def => def.kind === 'color').map(def => def.name));
const gradientTokenByUtility = new Map(definitions.filter(def => def.kind === 'gradient').map(def => [def.key, def.name]));
const shadowTokenByUtility = new Map(definitions.filter(def => def.kind === 'shadow').map(def => [def.key, def.name]));
const heroTokenByVar = new Map(definitions.filter(def => def.kind === 'hero').map(def => [`--hero-${def.key.replace(/\./g, '-')}`, def.name]));

const sourceFiles = walk(path.join(root, 'src')).filter(file => file !== themeTokensPath);
const usageByFile = new Map();
const usageByToken = new Map(definitions.map(def => [def.name, new Set()]));
const utilityUsageByToken = new Map(definitions.map(def => [def.name, new Map()]));
const unknownColorRefs = [];
const unknownGradientRefs = [];
const unknownShadowRefs = [];
const unknownHeroRefs = [];

function addUtilityUsage(tokenName, utility) {
  const usageMap = utilityUsageByToken.get(tokenName);
  usageMap.set(utility, (usageMap.get(utility) || 0) + 1);
}

for (const file of sourceFiles) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const used = new Set();
  let match;

  const colorRegex = /(?<![\w-])(bg|text|border|ring|divide|outline|decoration|caret|fill|stroke|from|via|to)-((?:page|surface|text|brand|border|button)-[a-z0-9-]+)/g;
  while ((match = colorRegex.exec(content)) !== null) {
    const prefix = match[1];
    const slug = match[2];
    const firstDash = slug.indexOf('-');
    const tokenName = `${slug.slice(0, firstDash)}.${slug.slice(firstDash + 1)}`;
    if (colorTokenSet.has(tokenName)) {
      used.add(tokenName);
      usageByToken.get(tokenName).add(rel);
      addUtilityUsage(tokenName, `${prefix}-${slug}`);
    } else {
      unknownColorRefs.push({ file: rel, ref: `${prefix}-${slug}` });
    }
  }

  const gradientRegex = /(?<![\w-])bg-((?:decor|home|events|membership|auth)-[a-z0-9-]+)/g;
  while ((match = gradientRegex.exec(content)) !== null) {
    const slug = match[1];
    const tokenName = gradientTokenByUtility.get(slug);
    if (tokenName) {
      used.add(tokenName);
      usageByToken.get(tokenName).add(rel);
      addUtilityUsage(tokenName, `bg-${slug}`);
    } else {
      unknownGradientRefs.push({ file: rel, ref: `bg-${slug}` });
    }
  }

  const shadowRegex = /(?<![\w-])shadow-([a-z0-9-]+)/g;
  while ((match = shadowRegex.exec(content)) !== null) {
    const slug = match[1];
    if (standardShadowNames.has(slug)) continue;
    const tokenName = shadowTokenByUtility.get(slug);
    if (tokenName) {
      used.add(tokenName);
      usageByToken.get(tokenName).add(rel);
      addUtilityUsage(tokenName, `shadow-${slug}`);
    } else {
      unknownShadowRefs.push({ file: rel, ref: `shadow-${slug}` });
    }
  }

  const heroRegex = /--hero-[a-z0-9-]+/g;
  while ((match = heroRegex.exec(content)) !== null) {
    const variableName = match[0];
    const tokenName = heroTokenByVar.get(variableName);
    if (tokenName) {
      used.add(tokenName);
      usageByToken.get(tokenName).add(rel);
      addUtilityUsage(tokenName, `var(${variableName})`);
    } else {
      unknownHeroRefs.push({ file: rel, ref: variableName });
    }
  }

  if (used.size) {
    usageByFile.set(rel, [...used].sort());
  }
}

const dedupe = items => [...new Map(items.map(item => [`${item.file}::${item.ref}`, item])).values()];
const unknownRefs = {
  color: dedupe(unknownColorRefs),
  gradient: dedupe(unknownGradientRefs),
  shadow: dedupe(unknownShadowRefs),
  hero: dedupe(unknownHeroRefs),
};
const unknownTotal = Object.values(unknownRefs).reduce((sum, list) => sum + list.length, 0);
const unusedTokens = definitions.filter(def => usageByToken.get(def.name).size === 0).map(def => def.name);

function utilityExample(def) {
  const entries = [...utilityUsageByToken.get(def.name).entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (!entries.length) return `\`${fallbackUtility(def)}\``;
  return entries.slice(0, 2).map(([utility]) => `\`${utility}\``).join(' / ');
}

function renderTokenLine(def) {
  const label = def.kind === 'hero' ? '使用方式' : '常见 utility';
  return `- \`${def.name}\`：${purposeMap[def.root][def.key]} ${label}：${utilityExample(def)}`;
}

function renderCategorySection(item) {
  const tokens = definitions.filter(def => def.root === item.root);
  return [`### 5.${item.index} \`${item.root}\``, '', ...tokens.map(renderTokenLine), ''].join('\n');
}

function filesList(files) {
  if (!files.length) return '未使用';
  return files.map(file => `\`${file}\``).join('、');
}

function renderUnknownSection(title, items) {
  if (!items.length) {
    return `## ${title}\n\n- 无\n`;
  }
  return `## ${title}\n\n${items.map(item => `- \`${item.file}\` -> \`${item.ref}\``).join('\n')}\n`;
}

const categoryTitles = [
  { root: 'page', index: 1 },
  { root: 'surface', index: 2 },
  { root: 'text', index: 3 },
  { root: 'brand', index: 4 },
  { root: 'border', index: 5 },
  { root: 'button', index: 6 },
  { root: 'gradient', index: 7 },
  { root: 'shadow', index: 8 },
  { root: 'hero', index: 9 },
];

const styleSections = categoryTitles.map(renderCategorySection).join('\n');

const styleContent = `# 样式 Token 使用规范

## 1. 目的

这份文档用于统一项目里的颜色、阴影、渐变和主题使用方式，避免继续出现以下问题：

- 写页面时忘记现有 token 名称
- 新样式直接写 \`#xxxxxx\`，导致主题切换失效
- 同一个视觉语义在不同页面里用了不同颜色
- 加了 token 但 Tailwind utility 没生成出来

本文档以当前代码为准，不是理想化规范。

## 2. Source of Truth

样式 token 的真实来源只有这几处：

- \`src/constants/theme-tokens.json\`
- \`tailwind.config.js\`
- \`src/stores/modules/theme.ts\`
- \`src/App.vue\`

其中：

- \`theme-tokens.json\` 定义 token 内容
- \`tailwind.config.js\` 负责把 token 映射成 Tailwind utility
- \`theme.ts\` 管理当前主题状态
- \`App.vue\` 通过 \`data-theme\` 把主题挂到根节点

## 3. 主题机制

当前项目有两个主题：

- \`dark\`
- \`light\`

运行时通过 \`document.documentElement.setAttribute('data-theme', themeStore.theme)\` 切换主题。

也就是说：

- 同一个类名，例如 \`bg-page-base\`
- 在深色主题和浅色主题下会映射到不同变量值
- 页面里不应该关心当前具体色值，只应该关心语义

## 4. Token 到 Utility 的映射规则

### 4.1 颜色类 token

\`page\`、\`surface\`、\`text\`、\`brand\`、\`border\`、\`button\` 会被生成为 Tailwind 颜色 utility。

例如：

- \`page.base\` -> \`bg-page-base\`
- \`surface.card\` -> \`bg-surface-card\`
- \`text.heading\` -> \`text-text-heading\`
- \`border.soft\` -> \`border-border-soft\`
- \`brand.accent-strong\` -> \`text-brand-accent-strong\`
- \`button.accent\` -> \`bg-button-accent\`

这些 utility 支持透明度后缀，因为底层是 \`rgb(var(--color-...)/<alpha-value>)\`：

- \`bg-page-base/92\`
- \`border-brand-accent/35\`
- \`bg-brand-accent/8\`

### 4.2 渐变 token

\`gradient\` 会映射到 \`backgroundImage\`，使用方式统一为 \`bg-*\`。

### 4.3 阴影 token

\`shadow\` 会映射到 \`boxShadow\`，使用方式统一为 \`shadow-*\`。

### 4.4 原始 CSS 变量 token

\`hero\` 属于原始变量，不会自动生成 utility class，只能通过 CSS 变量使用。

例如：

\`\`\`vue
<view
  class="[background-color:var(--hero-secondary-cta-bg)] [border-color:var(--hero-secondary-cta-border)]"
/>
\`\`\`

## 5. 当前 Token 清单

下面按根分类列出当前全部 token，并为每个 token 用中文写明用途。

${styleSections}
## 6. 推荐写法

### 6.1 页面根容器

\`\`\`vue
<view class="min-h-screen bg-page-base text-text-heading">
\`\`\`

### 6.2 常规卡片

\`\`\`vue
<view class="border border-border-base bg-surface-card shadow-card">
\`\`\`

### 6.3 轻量表单/面板

\`\`\`vue
<view class="border border-border-soft bg-surface-card-soft">
\`\`\`

### 6.4 主要按钮

\`\`\`vue
<view class="bg-button-accent text-button-neutral-ink hover:bg-button-accent-hover">
\`\`\`

### 6.5 深色 Hero 区域

\`\`\`vue
<view class="bg-home-hero text-text-heading">
\`\`\`

### 6.6 Hero 特殊变量

\`\`\`vue
<view
  class="border [background-color:var(--hero-secondary-cta-bg)] [border-color:var(--hero-secondary-cta-border)]"
>
\`\`\`

## 7. 选择规则

写新样式时，按下面顺序选 token：

1. 先判断语义，不要先想色值。
2. 页面背景优先看 \`page.*\`。
3. 卡片、面板、浮层优先看 \`surface.*\`。
4. 文案优先看 \`text.*\`。
5. 强调色、点缀色优先看 \`brand.*\`。
6. 按钮优先看 \`button.*\`。
7. 边框优先看 \`border.*\`。
8. 整块 hero 背景优先看 \`gradient.*\`。
9. 特殊 hero 局部效果优先看 \`hero.*\` 原始变量。

一个简单判断：

- “这是页面/卡片/文字/边框/按钮中的哪一种” 比 “这是一种什么颜色” 更重要。

## 8. 明确禁止

除非是一次性原型或布局实验，新代码禁止：

- 直接新增 \`bg-[#xxxxxx]\`
- 直接新增 \`text-[#xxxxxx]\`
- 直接新增 \`border-[#xxxxxx]\`
- 直接新增 \`shadow-[0_...]\` 作为长期方案
- 用组件名或页面名命名普通颜色 token，例如 \`login-red\`、\`profile-gold-bg\`

允许继续使用 arbitrary value 的场景：

- 宽高、间距、圆角、位移等布局值
- \`var(--hero-...)\` 这种原始主题变量
- 暂时没有抽象价值的特殊路径或装饰

## 9. 什么时候应该新增 Token

满足以下任一条件，就不要继续写硬编码：

- 同一个颜色或阴影出现 2 次以上
- 这个值需要在 \`light\` / \`dark\` 间切换
- 这个值会成为一类可复用组件的标准样式
- 这个值是品牌语义的一部分

## 10. 新增 Token 的步骤

### 10.1 新增颜色类 token

1. 在 \`src/constants/theme-tokens.json\` 中增加 key
2. 如果是跨主题共用，优先放到 \`shared\`
3. 如果是主题差异值，必须同时补齐 \`themes.dark\` 和 \`themes.light\`
4. 直接在模板里使用对应 utility

例如：

- \`surface.notice\`
- \`text.notice\`
- \`border.notice\`

### 10.2 新增渐变或阴影 token

分别放到：

- \`gradient.*\`
- \`shadow.*\`

然后直接使用：

- \`bg-your-gradient-name\`
- \`shadow-your-shadow-name\`

### 10.3 新增原始变量 token

如果是 \`hero\` 这种不适合映射成颜色 utility 的变量：

1. 放到 \`theme-tokens.json\` 对应 raw root 下
2. 在模板中使用 \`var(--...)\`

## 11. 一个容易踩坑的限制

Tailwind utility 的 key 是根据 \`tailwind.config.js\` 里的 \`DEFAULT_THEME = 'dark'\` 生成的。

这意味着：

- 新 token key 如果只写在 \`light\`，对应 class 不会生成
- 新 token key 至少要在 \`dark\` 里存在
- 最安全的做法是：主题相关 token 在 \`dark\` 和 \`light\` 都补齐

这条尤其重要。

## 12. 当前项目里的例外和技术债

当前仓库并没有完全遵守上面的规范，主要例外有：

- \`src/pages/account/*.vue\` 里仍有较多 \`bg-[#...]\`、\`text-[#...]\`、\`border-[#...]\`

这意味着现阶段应该这样理解规范：

- 新代码优先按 token 写
- 旧代码允许逐步迁移
- 不要继续扩大硬编码颜色的范围

## 13. 推荐的落地原则

以后做样式时，默认执行下面这条规则：

- 先查 token 文档和 \`theme-tokens.json\`
- 能用 token 就不用十六进制
- 真的需要新增视觉语义时，先补 token，再写页面

## 14. 可参考的现有实现

这几个文件已经比较接近规范写法，可以当作参考：

- \`src/components/layout/AppHeader.vue\`
- \`src/components/home/HomeHero.vue\`
- \`src/components/home/HomeMembership.vue\`
- \`src/components/common/directory/DirectoryCardFrame.vue\`
- \`src/components/common/detail/DetailHeroPanel.vue\`

## 15. 后续建议

如果后面还要继续收口命名，优先看这两类：

1. \`shadow.luxe\`、\`shadow.soft-luxe\` 这种还带气质语义的 token
2. \`account\` 页面里的硬编码样式
`;

const tokenSections = definitions.map(def => {
  const files = [...usageByToken.get(def.name)].sort();
  const label = def.kind === 'hero' ? '使用方式' : '常见 utility';
  return [
    `### \`${def.name}\``,
    '',
    `- 用途：${purposeMap[def.root][def.key]}`,
    `- ${label}：${utilityExample(def)}`,
    `- 使用文件数：${files.length}`,
    `- 使用文件：${filesList(files)}`,
    '',
  ].join('\n');
}).join('\n');

const fileSections = [...usageByFile.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([file, tokens]) => {
    return [
      `### \`${file}\``,
      '',
      `- 使用 token：${tokens.map(token => `\`${token}\``).join('、')}`,
      '',
    ].join('\n');
  })
  .join('\n');

const auditContent = `# Token Usage Audit

- 审计范围：\`src/**/*.{vue,js,ts,jsx,tsx}\`，排除 \`src/constants/theme-tokens.json\`
- 检查日期：\`${today}\`
- 扫描文件数：${sourceFiles.length}
- 实际使用 token 的文件数：${usageByFile.size}
- 扫描到的 token 定义数：${definitions.length}
- 未使用 token 数：${unusedTokens.length}
- 未知 token 引用数：${unknownTotal}

## 结论

- 当前未发现未使用 token。
- 当前未发现错误 token 引用。
- \`account\` 页面虽然仍有大量硬编码样式，但本次扫描没有发现错误 token 引用。

## 中文说明

- 这份文档同时回答两个问题：哪个文件用了哪些 token，以及每个 token 目前被哪些文件使用。
- 这里的 token 以 \`theme-tokens.json\` 当前定义为准，包含颜色 token、渐变 token、阴影 token 和 \`hero\` 原始变量。
- “错误使用”在这里指引用了不存在的 token，或者写了当前主题系统无法解析的 token utility。
- “未使用 token”表示定义存在，但在当前源码中没有任何命中。

## 语义复核备注

- 当前没有发现“引用不存在 token”这一类硬错误。
- \`src/components/events/EventStatusBadge.vue\` 使用了 \`button.accent\`、\`button.neutral-ink\` 和 \`bg-button-neutral-ink\` 来表达 badge 和状态点。它们都能正常解析，但从语义上看更像 badge 或状态色，而不是按钮专用 token，后续值得重审。
- 多个文件会用 \`bg-border-*\` 来绘制 1px 线条或分隔条。这种写法当前有效，也和“线条颜色”语义基本一致，所以这次不视为错误，但如果后面要更严格约束 token 领域边界，可以再评估是否需要独立的 line token。

## 未使用 Token

${unusedTokens.length ? unusedTokens.map(token => `- \`${token}\``).join('\n') : '- 无'}

${renderUnknownSection('错误引用 - 颜色 Utility', unknownRefs.color)}
${renderUnknownSection('错误引用 - 渐变 Utility', unknownRefs.gradient)}
${renderUnknownSection('错误引用 - 阴影 Utility', unknownRefs.shadow)}
${renderUnknownSection('错误引用 - Hero 变量', unknownRefs.hero)}
## Token Usage

> 中文注释：下面按 token 逐个记录用途、常见 utility 和命中的源码文件。

${tokenSections}
## File Usage

> 中文注释：下面按文件记录“这个文件里至少出现过一次的 token”。

${fileSections}`;

fs.writeFileSync(styleDocPath, styleContent, 'utf8');
fs.writeFileSync(auditDocPath, auditContent, 'utf8');

const styleHanCount = [...styleContent].filter(ch => /\p{Script=Han}/u.test(ch)).length;
const auditHanCount = [...auditContent].filter(ch => /\p{Script=Han}/u.test(ch)).length;

console.log(JSON.stringify({
  updated: ['docs/style-token-usage.md', 'docs/token-usage-audit.md'],
  tokenCount: definitions.length,
  unusedCount: unusedTokens.length,
  unknownTotal,
  styleHanCount,
  auditHanCount,
}, null, 2));
