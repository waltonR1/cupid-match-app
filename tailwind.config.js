/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const themeTokens = require('./src/constants/theme-tokens.json')

const DEFAULT_THEME = 'dark'

const LEGACY_RAW_TOKEN_ROOTS = new Set(['gradient', 'shadow', 'hero'])
const NEXT_COLOR_ROOTS = new Set(['semantic', 'component'])
const NEXT_EFFECT_ROOTS = new Set(['gradient', 'shadow'])

const LEGACY_THEME_NAMES = Object.keys(themeTokens.legacy.themes)
const NEXT_THEME_NAMES = Object.keys(themeTokens.next.themes)

const legacySharedTokens = themeTokens.legacy.shared
const legacyThemeOverrides = themeTokens.legacy.themes
const legacyBaseThemeTokens = getMergedLegacyThemeTokens(DEFAULT_THEME)

const nextBaseThemeTokens = getMergedNextThemeTokens(DEFAULT_THEME)

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...buildLegacyTailwindColors(legacyBaseThemeTokens),
        ...buildNextTailwindColors(nextBaseThemeTokens),
      },

      backgroundImage: {
        ...buildLegacyRawTokenUtilities('gradient', legacyBaseThemeTokens.gradient),
        ...buildNextEffectUtilities('gradient', nextBaseThemeTokens.effect?.gradient),
      },

      boxShadow: {
        ...buildLegacyRawTokenUtilities('shadow', legacyBaseThemeTokens.shadow),
        ...buildNextEffectUtilities('shadow', nextBaseThemeTokens.effect?.shadow),
      },

      minWidth: {
        'btn-cta': '190px',
      },

      spacing: {
        'btn-cta-x': '1.5rem',
        'btn-cta-y': '1rem',
      },

      borderRadius: {
        button: '2px',
      },

      keyframes: {
        dropdownFade: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -6px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, 0)',
          },
        },
      },

      animation: {
        dropdown: 'dropdownFade 0.18s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },

  plugins: [
    plugin(({ addBase }) => {
      addBase(buildThemeBaseStyles())
    }),
  ],
}

// ==============================
// legacy
// ==============================

function getMergedLegacyThemeTokens(themeName) {
  return mergeDeep(legacySharedTokens, legacyThemeOverrides[themeName])
}

function buildLegacyTailwindColors(tokens, path = []) {
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    if (isLegacyRawTokenRoot(key)) {
      return acc
    }

    const nextPath = [...path, key]

    if (typeof value === 'string') {
      acc[key] = `rgb(var(--color-${nextPath.join('-')}) / <alpha-value>)`
      return acc
    }

    acc[key] = buildLegacyTailwindColors(value, nextPath)
    return acc
  }, {})
}

function buildLegacyRawTokenUtilities(tokenRoot, tokens) {
  const tokenEntries = flattenTokenEntries(tokens)

  return Object.keys(tokenEntries).reduce((acc, key) => {
    acc[key] = `var(--${tokenRoot}-${key})`
    return acc
  }, {})
}

function buildLegacyThemeVariableMap(themeName) {
  const mergedTokens = getMergedLegacyThemeTokens(themeName)
  const variables = {}

  flattenLegacyVariables(mergedTokens, [], variables)

  return variables
}

function flattenLegacyVariables(tokens, path, variables) {
  Object.entries(tokens).forEach(([key, value]) => {
    const nextPath = [...path, key]

    if (typeof value === 'string') {
      if (isLegacyRawTokenPath(path)) {
        variables[`--${nextPath.join('-')}`] = value
        return
      }

      variables[`--color-${nextPath.join('-')}`] = hexToRgbChannels(value)
      return
    }

    flattenLegacyVariables(value, nextPath, variables)
  })
}

function isLegacyRawTokenRoot(key) {
  return LEGACY_RAW_TOKEN_ROOTS.has(key)
}

function isLegacyRawTokenPath(path) {
  return LEGACY_RAW_TOKEN_ROOTS.has(path[0])
}

// ==============================
// next
// ==============================

function getMergedNextThemeTokens(themeName) {
  const theme = themeTokens.next.themes[themeName] || {}

  return {
    semantic: theme.semantic || {},
    component: theme.component || {},
    effect: theme.effect || {},
  }
}

function buildNextTailwindColors(tokens, path = []) {
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    if (!NEXT_COLOR_ROOTS.has(key) && path.length === 0) {
      return acc
    }

    const nextPath = [...path, key]

    if (typeof value === 'string') {
      const utilityKey = `next-${nextPath.join('-')}`

      if (isHexColor(value)) {
        acc[utilityKey] = `rgb(var(--next-color-${nextPath.join('-')}) / <alpha-value>)`
        return acc
      }

      acc[utilityKey] = `var(--next-raw-color-${nextPath.join('-')})`
      return acc
    }

    Object.assign(acc, buildNextTailwindColors(value, nextPath))
    return acc
  }, {})
}

function buildNextEffectUtilities(effectRoot, tokens = {}) {
  const tokenEntries = flattenTokenEntries(tokens)

  return Object.keys(tokenEntries).reduce((acc, key) => {
    acc[`next-${effectRoot}-${key}`] = `var(--next-${effectRoot}-${key})`
    return acc
  }, {})
}

function buildNextThemeVariableMap(themeName) {
  const mergedTokens = getMergedNextThemeTokens(themeName)
  const variables = {}

  flattenNextVariables(mergedTokens, [], variables)

  return variables
}

function flattenNextVariables(tokens, path, variables) {
  Object.entries(tokens).forEach(([key, value]) => {
    const nextPath = [...path, key]

    if (typeof value === 'string') {
      const root = nextPath[0]

      if (root === 'effect') {
        const [, effectType, ...rest] = nextPath
        if (NEXT_EFFECT_ROOTS.has(effectType)) {
          variables[`--next-${effectType}-${rest.join('-')}`] = value
        }
        return
      }

      if (root === 'semantic' || root === 'component') {
        if (isHexColor(value)) {
          variables[`--next-color-${nextPath.join('-')}`] = hexToRgbChannels(value)
          return
        }

        variables[`--next-raw-color-${nextPath.join('-')}`] = value
        return
      }

      return
    }

    flattenNextVariables(value, nextPath, variables)
  })
}

// ==============================
// base styles
// ==============================

function buildThemeBaseStyles() {
  const styles = {
    ':root': {
      ...buildLegacyThemeVariableMap(DEFAULT_THEME),
      ...buildNextThemeVariableMap(DEFAULT_THEME),
    },
  }

  LEGACY_THEME_NAMES.forEach((themeName) => {
    const selector = `.theme-${themeName}, [data-theme="${themeName}"]`
    styles[selector] = {
      ...(styles[selector] || {}),
      ...buildLegacyThemeVariableMap(themeName),
    }
  })

  NEXT_THEME_NAMES.forEach((themeName) => {
    const selector = `.theme-${themeName}, [data-theme="${themeName}"]`
    styles[selector] = {
      ...(styles[selector] || {}),
      ...buildNextThemeVariableMap(themeName),
    }
  })

  return styles
}

// ==============================
// shared utils
// ==============================

function flattenTokenEntries(tokens, path = [], result = {}) {
  Object.entries(tokens || {}).forEach(([key, value]) => {
    const nextPath = [...path, key]

    if (typeof value === 'string') {
      result[nextPath.join('-')] = value
      return
    }

    flattenTokenEntries(value, nextPath, result)
  })

  return result
}

function mergeDeep(base, override) {
  const result = { ...base }

  Object.entries(override || {}).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = mergeDeep(base[key] || {}, value)
      return
    }

    result[key] = value
  })

  return result
}

function hexToRgbChannels(hex) {
  const normalized = hex.replace('#', '')
  const full = normalized.length === 3
      ? normalized.split('').map((char) => `${char}${char}`).join('')
      : normalized

  const value = Number.parseInt(full, 16)
  const red = (value >> 16) & 255
  const green = (value >> 8) & 255
  const blue = value & 255

  return `${red} ${green} ${blue}`
}

function isHexColor(value) {
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
}
