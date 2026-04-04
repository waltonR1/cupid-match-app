/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const themeTokens = require('./src/constants/theme-tokens.json')

const DEFAULT_THEME = 'dark'
const RAW_TOKEN_ROOTS = new Set(['gradient', 'shadow', 'hero'])
const THEME_NAMES = Object.keys(themeTokens.themes)
const sharedTokens = themeTokens.shared
const themeOverrides = themeTokens.themes
const baseThemeTokens = getMergedThemeTokens(DEFAULT_THEME)

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: buildTailwindColors(baseThemeTokens),
      backgroundImage: buildRawTokenUtilities('gradient', baseThemeTokens.gradient),
      boxShadow: buildRawTokenUtilities('shadow', baseThemeTokens.shadow),
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

function buildTailwindColors(tokens, path = []) {
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    if (isRawTokenRoot(key)) {
      return acc
    }

    const nextPath = [...path, key]

    if (typeof value === 'string') {
      acc[key] = `rgb(var(--color-${nextPath.join('-')}) / <alpha-value>)`
      return acc
    }

    acc[key] = buildTailwindColors(value, nextPath)
    return acc
  }, {})
}

function buildThemeBaseStyles() {
  return THEME_NAMES.reduce((styles, themeName) => {
    styles[`.theme-${themeName}, [data-theme="${themeName}"]`] = buildThemeVariableMap(themeName)
    return styles
  }, {
    ':root': buildThemeVariableMap(DEFAULT_THEME),
  })
}

function buildRawTokenUtilities(tokenRoot, tokens) {
  const tokenEntries = flattenTokenEntries(tokens)

  return Object.keys(tokenEntries).reduce((acc, key) => {
    acc[key] = `var(--${tokenRoot}-${key})`
    return acc
  }, {})
}

function getMergedThemeTokens(themeName) {
  return mergeDeep(sharedTokens, themeOverrides[themeName])
}

function buildThemeVariableMap(themeName) {
  const mergedTokens = getMergedThemeTokens(themeName)
  const variables = {}

  flattenVariables(mergedTokens, [], variables)

  return variables
}

function flattenVariables(tokens, path, variables) {
  Object.entries(tokens).forEach(([key, value]) => {
    const nextPath = [...path, key]

    if (typeof value === 'string') {
      if (isRawTokenPath(path)) {
        variables[`--${nextPath.join('-')}`] = value
        return
      }

      variables[`--color-${nextPath.join('-')}`] = hexToRgbChannels(value)
      return
    }

    flattenVariables(value, nextPath, variables)
  })
}

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

function isRawTokenRoot(key) {
  return RAW_TOKEN_ROOTS.has(key)
}

function isRawTokenPath(path) {
  return RAW_TOKEN_ROOTS.has(path[0])
}

function mergeDeep(base, override) {
  const result = { ...base }

  Object.entries(override).forEach(([key, value]) => {
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
    ? normalized.split('').map(char => `${char}${char}`).join('')
    : normalized

  const value = Number.parseInt(full, 16)
  const red = (value >> 16) & 255
  const green = (value >> 8) & 255
  const blue = value & 255

  return `${red} ${green} ${blue}`
}
