const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const themeTokensPath = path.join(root, 'src/constants/theme-tokens.json')
const generatedDocsDir = path.join(root, 'docs/design-token/generated')
const auditDocPath = path.join(generatedDocsDir, 'token-usage-audit.md')
const styleDocPath = path.join(generatedDocsDir, 'style-token-usage.md')

const DEFAULT_THEME = 'dark'
const SOURCE_EXTS = new Set(['.vue', '.js', '.ts', '.jsx', '.tsx'])
const STANDARD_SHADOWS = new Set(['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'])

const themeTokens = JSON.parse(fs.readFileSync(themeTokensPath, 'utf8'))
const themes = themeTokens.themes || {}
const baseTheme = themes[DEFAULT_THEME]

if (!baseTheme) {
  throw new Error(`Missing theme: ${DEFAULT_THEME}`)
}

function flatten(obj, pathParts = [], out = {}) {
  Object.entries(obj || {}).forEach(([key, value]) => {
    const nextPath = [...pathParts, key]

    if (typeof value === 'string') {
      out[nextPath.join('.')] = value
      return
    }

    flatten(value, nextPath, out)
  })

  return out
}

function walk(dir, files = []) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'unpackage') {
      return
    }

    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      walk(full, files)
      return
    }

    if (SOURCE_EXTS.has(path.extname(entry.name))) {
      files.push(full)
    }
  })

  return files
}

function colorUtilityKey(tokenName) {
  return tokenName.replace(/\./g, '-')
}

function gradientUtilityKey(tokenName) {
  return `gradient-${tokenName.replace(/^effect\.gradient\./, '').replace(/\./g, '-')}`
}

function shadowUtilityKey(tokenName) {
  return tokenName.replace(/^effect\.shadow\./, '').replace(/\./g, '-')
}

function utilityExamples(def) {
  if (def.kind === 'color') {
    return [
      `bg-${def.utilityKey}`,
      `text-${def.utilityKey}`,
      `border-${def.utilityKey}`,
    ]
  }

  if (def.kind === 'gradient') {
    return [`bg-${def.utilityKey}`]
  }

  return [`shadow-${def.utilityKey}`]
}

function addUtilityUsage(tokenName, utility) {
  const usageMap = utilityUsageByToken.get(tokenName)
  usageMap.set(utility, (usageMap.get(utility) || 0) + 1)
}

function dedupe(items) {
  return [...new Map(items.map(item => [`${item.file}::${item.ref}`, item])).values()]
}

function filesList(files) {
  if (!files.length) return 'none'
  return files.map(file => `\`${file}\``).join(', ')
}

function renderUnknownSection(title, items) {
  if (!items.length) {
    return `## ${title}\n\n- none\n`
  }

  return `## ${title}\n\n${items.map(item => `- \`${item.file}\` -> \`${item.ref}\``).join('\n')}\n`
}

const colorDefinitions = [
  ...Object.keys(flatten(baseTheme.semantic || {}, ['semantic'])),
  ...Object.keys(flatten(baseTheme.component || {}, ['component'])),
].map(name => ({
  kind: 'color',
  name,
  utilityKey: colorUtilityKey(name),
}))

const gradientDefinitions = Object.keys(flatten(baseTheme.effect?.gradient || {}, ['effect', 'gradient']))
  .map(name => ({
    kind: 'gradient',
    name,
    utilityKey: gradientUtilityKey(name),
  }))

const shadowDefinitions = Object.keys(flatten(baseTheme.effect?.shadow || {}, ['effect', 'shadow']))
  .map(name => ({
    kind: 'shadow',
    name,
    utilityKey: shadowUtilityKey(name),
  }))

const definitions = [...colorDefinitions, ...gradientDefinitions, ...shadowDefinitions]
  .sort((a, b) => a.name.localeCompare(b.name))

const tokenByUtilityKey = new Map(definitions.map(def => [def.utilityKey, def.name]))
const usageByFile = new Map()
const usageByToken = new Map(definitions.map(def => [def.name, new Set()]))
const utilityUsageByToken = new Map(definitions.map(def => [def.name, new Map()]))
const unknownTokenRefs = []
const residualNextRefs = []
const opacityRefs = []

const sourceFiles = walk(path.join(root, 'src')).filter(file => file !== themeTokensPath)

for (const file of sourceFiles) {
  const rel = path.relative(root, file).replace(/\\/g, '/')
  const content = fs.readFileSync(file, 'utf8')
  const used = new Set()

  const residualNextRegex = /(?<![\w-])(?:[a-z]+:)*(?:bg|text|border|ring|divide|outline|decoration|caret|fill|stroke|from|via|to|shadow)-next-(?:semantic|component|gradient|shadow)-[a-z0-9-]+/g
  for (const match of content.matchAll(residualNextRegex)) {
    residualNextRefs.push({ file: rel, ref: match[0] })
  }

  const colorRegex = /(?<![\w-])(bg|text|border|ring|divide|outline|decoration|caret|fill|stroke|from|via|to)-((?:semantic|component)-[a-z0-9-]+)(\/[0-9]+)?/g
  for (const match of content.matchAll(colorRegex)) {
    const utility = `${match[1]}-${match[2]}${match[3] || ''}`
    const tokenName = tokenByUtilityKey.get(match[2])

    if (match[3]) {
      opacityRefs.push({ file: rel, ref: utility })
    }

    if (tokenName) {
      used.add(tokenName)
      usageByToken.get(tokenName).add(rel)
      addUtilityUsage(tokenName, utility)
      continue
    }

    unknownTokenRefs.push({ file: rel, ref: utility })
  }

  const gradientRegex = /(?<![\w-])bg-(gradient-[a-z0-9-]+)(\/[0-9]+)?/g
  for (const match of content.matchAll(gradientRegex)) {
    const utility = `bg-${match[1]}${match[2] || ''}`
    const tokenName = tokenByUtilityKey.get(match[1])

    if (match[2]) {
      opacityRefs.push({ file: rel, ref: utility })
    }

    if (tokenName) {
      used.add(tokenName)
      usageByToken.get(tokenName).add(rel)
      addUtilityUsage(tokenName, utility)
      continue
    }

    unknownTokenRefs.push({ file: rel, ref: utility })
  }

  const shadowRegex = /(?<![\w-])shadow-([a-z0-9-]+)(\/[0-9]+)?/g
  for (const match of content.matchAll(shadowRegex)) {
    const slug = match[1]
    if (STANDARD_SHADOWS.has(slug)) continue

    const utility = `shadow-${slug}${match[2] || ''}`
    const tokenName = tokenByUtilityKey.get(slug)

    if (match[2]) {
      opacityRefs.push({ file: rel, ref: utility })
    }

    if (tokenName) {
      used.add(tokenName)
      usageByToken.get(tokenName).add(rel)
      addUtilityUsage(tokenName, utility)
      continue
    }

    unknownTokenRefs.push({ file: rel, ref: utility })
  }

  if (used.size) {
    usageByFile.set(rel, [...used].sort())
  }
}

const unusedTokens = definitions.filter(def => usageByToken.get(def.name).size === 0).map(def => def.name)
const unknownRefs = dedupe(unknownTokenRefs)
const residualRefs = dedupe(residualNextRefs)
const opacitySuffixRefs = dedupe(opacityRefs)
const today = new Date().toISOString().slice(0, 10)

const styleLines = definitions.map((def) => {
  const usedUtilities = [...utilityUsageByToken.get(def.name).keys()]
  const examples = usedUtilities.length ? usedUtilities : utilityExamples(def)
  return `- \`${def.name}\`: ${def.kind}; utilities: ${examples.map(item => `\`${item}\``).join(', ')}`
})

const tokenSections = definitions.map((def) => {
  const files = [...usageByToken.get(def.name)].sort()
  const usedUtilities = [...utilityUsageByToken.get(def.name).keys()].sort()

  return [
    `### \`${def.name}\``,
    '',
    `- kind: \`${def.kind}\``,
    `- utilities: ${usedUtilities.length ? usedUtilities.map(item => `\`${item}\``).join(', ') : utilityExamples(def).map(item => `\`${item}\``).join(', ')}`,
    `- file count: \`${files.length}\``,
    `- files: ${filesList(files)}`,
    '',
  ].join('\n')
}).join('\n')

const fileSections = [...usageByFile.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([file, tokens]) => [
    `### \`${file}\``,
    '',
    `- tokens: ${tokens.map(token => `\`${token}\``).join(', ')}`,
    '',
  ].join('\n'))
  .join('\n')

const styleContent = `# Style Token Usage

Generated by \`npm run generate:token-docs\` on \`${today}\`.

## Source Of Truth

- Token data: \`src/constants/theme-tokens.json\`
- Tailwind mapping: \`tailwind.config.js\`
- Active root: \`root\`
- Default theme used for utility generation: \`${DEFAULT_THEME}\`

## Rules

- Page and component code must use \`semantic\`, \`component\`, or \`effect\` utilities.
- Legacy and next-prefixed token utilities are not generated.
- Opacity suffixes on token utilities are not allowed.
- Shadow utilities use final Tailwind names such as \`shadow-panel\`, not \`shadow-shadow-panel\`.

## Token Utilities

${styleLines.join('\n')}
`

const auditContent = `# Token Usage Audit

Generated by \`npm run generate:token-docs\` on \`${today}\`.

## Summary

- scanned files: \`${sourceFiles.length}\`
- files using tokens: \`${usageByFile.size}\`
- token definitions: \`${definitions.length}\`
- unused token definitions: \`${unusedTokens.length}\`
- unknown token utility references: \`${unknownRefs.length}\`
- residual next-prefixed token references: \`${residualRefs.length}\`
- token opacity suffix references: \`${opacitySuffixRefs.length}\`

## Unused Tokens

${unusedTokens.length ? unusedTokens.map(token => `- \`${token}\``).join('\n') : '- none'}

${renderUnknownSection('Unknown Token Utility References', unknownRefs)}
${renderUnknownSection('Residual Next-Prefixed Token References', residualRefs)}
${renderUnknownSection('Token Opacity Suffix References', opacitySuffixRefs)}
## Usage By Token

${tokenSections}
## Usage By File

${fileSections}
`

fs.mkdirSync(generatedDocsDir, { recursive: true })
fs.writeFileSync(styleDocPath, `${styleContent.trimEnd()}\n`, 'utf8')
fs.writeFileSync(auditDocPath, `${auditContent.trimEnd()}\n`, 'utf8')

console.log(JSON.stringify({
  updated: ['docs/design-token/generated/style-token-usage.md', 'docs/design-token/generated/token-usage-audit.md'],
  tokenCount: definitions.length,
  unusedCount: unusedTokens.length,
  unknownCount: unknownRefs.length,
  residualNextCount: residualRefs.length,
  opacitySuffixCount: opacitySuffixRefs.length,
}, null, 2))
