const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()
const srcRoot = path.join(projectRoot, 'src')
const localeDirs = ['zh', 'en', 'fr']
const localeBundles = {}

function walk(dir, predicate, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, predicate, out)
      continue
    }

    if (predicate(fullPath)) {
      out.push(fullPath)
    }
  }

  return out
}

function toNamespace(fileName) {
  return fileName.replace(/\.ts$/, '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

function parseMessageFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const match = source.match(/export const\s+\w+\s*:[^=]+= \s*(\{[\s\S]*\})\s*$/m)
    || source.match(/export const\s+\w+\s*=\s*(\{[\s\S]*\})\s*$/m)

  if (!match) {
    throw new Error(`Unable to parse message file: ${filePath}`)
  }

  return Function(`return (${match[1]})`)()
}

function flattenKeys(value, prefix = '', out = new Set()) {
  if (typeof value === 'string') {
    out.add(prefix)
    return out
  }

  for (const [key, child] of Object.entries(value || {})) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key
    flattenKeys(child, nextPrefix, out)
  }

  return out
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildTemplateRegex(templateKey) {
  const parts = templateKey.split(/\$\{[^}]+\}/g).map(part => escapeRegex(part))
  return new RegExp(`^${parts.join('[^.]+')}$`)
}

function getTranslatorBindings(source) {
  const bindings = []
  const pagePattern = /const\s*\{\s*([^}]+)\s*\}\s*=\s*usePageI18n\('([^']+)'\)/g
  const globalPattern = /const\s*\{\s*([^}]+)\s*\}\s*=\s*(useAppI18n|useLocaleBridge)\(\)/g

  for (const match of source.matchAll(pagePattern)) {
    const aliasMatch = match[1].match(/\bt\s*(?::\s*(\w+))?/)
    if (!aliasMatch) continue

    bindings.push({
      alias: aliasMatch[1] || 't',
      namespace: match[2],
    })
  }

  for (const match of source.matchAll(globalPattern)) {
    const aliasMatch = match[1].match(/\bt\s*(?::\s*(\w+))?/)
    if (!aliasMatch) continue

    bindings.push({
      alias: aliasMatch[1] || 't',
      namespace: '',
    })
  }

  return bindings
}

function getCallKeys(source, alias) {
  const calls = []
  const literalPattern = new RegExp(`\\b${alias}\\(\\s*(['"])(.*?)\\1`, 'g')
  const templatePattern = new RegExp(`\\b${alias}\\(\\s*\`([^\\\`]+)\``, 'g')

  for (const match of source.matchAll(literalPattern)) {
    calls.push({ type: 'literal', key: match[2] })
  }

  for (const match of source.matchAll(templatePattern)) {
    calls.push({ type: 'template', key: match[1] })
  }

  return calls
}

for (const locale of localeDirs) {
  const localeDir = path.join(srcRoot, 'i18n', 'messages', locale)
  const bundle = {}
  const files = walk(localeDir, filePath => filePath.endsWith('.ts') && !filePath.endsWith(`${path.sep}index.ts`))

  for (const filePath of files) {
    const namespace = toNamespace(path.basename(filePath))
    bundle[namespace] = parseMessageFile(filePath)
  }

  localeBundles[locale] = flattenKeys(bundle)
}

const sourceFiles = walk(
  srcRoot,
  filePath =>
    (filePath.endsWith('.vue') || filePath.endsWith('.ts'))
    && !filePath.includes(`${path.sep}i18n${path.sep}`)
)

const missing = []

for (const filePath of sourceFiles) {
  const source = fs.readFileSync(filePath, 'utf8')
  const bindings = getTranslatorBindings(source)

  for (const binding of bindings) {
    const calls = getCallKeys(source, binding.alias)

    for (const call of calls) {
      const fullKey = binding.namespace ? `${binding.namespace}.${call.key}` : call.key

      if (call.type === 'literal') {
        for (const locale of localeDirs) {
          if (!localeBundles[locale].has(fullKey)) {
            missing.push(`${locale} :: ${fullKey} :: ${path.relative(projectRoot, filePath)}`)
          }
        }

        continue
      }

      const matcher = buildTemplateRegex(fullKey)

      for (const locale of localeDirs) {
        const hasMatch = Array.from(localeBundles[locale]).some(key => matcher.test(key))

        if (!hasMatch) {
          missing.push(`${locale} :: ${fullKey} :: ${path.relative(projectRoot, filePath)}`)
        }
      }
    }
  }
}

if (missing.length) {
  console.error(missing.join('\n'))
  process.exit(1)
}

console.log('NO_MISSING_KEYS')
