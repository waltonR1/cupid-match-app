/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const themeTokens = require('./src/constants/theme-tokens.json')

const DEFAULT_THEME = 'dark'

const COLOR_ROOTS = new Set(['semantic', 'component'])
const EFFECT_ROOTS = new Set(['gradient', 'shadow'])

const THEME_NAMES = Object.keys(themeTokens.themes)
const baseThemeTokens = getMergedThemeTokens(DEFAULT_THEME)

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...buildTailwindColors(baseThemeTokens),
      },

      backgroundImage: {
        ...buildEffectUtilities('gradient', baseThemeTokens.effect?.gradient),
      },

      boxShadow: {
        ...buildEffectUtilities('shadow', baseThemeTokens.effect?.shadow),
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

function getMergedThemeTokens(themeName) {
  const theme = themeTokens.themes[themeName] || {}

  return {
    semantic: theme.semantic || {},
    component: theme.component || {},
    effect: theme.effect || {},
  }
}

function buildTailwindColors(tokens, path = []) {
  return Object.entries(tokens).reduce((acc, [key, value]) => {
    if (!COLOR_ROOTS.has(key) && path.length === 0) {
      return acc
    }

    const nextPath = [...path, key]

    if (typeof value === 'string') {
      const utilityKey = nextPath.join('-')

      if (isHexColor(value)) {
        acc[utilityKey] = `rgb(var(--color-${nextPath.join('-')}) / <alpha-value>)`
        return acc
      }

      acc[utilityKey] = `var(--raw-color-${nextPath.join('-')})`
      return acc
    }

    Object.assign(acc, buildTailwindColors(value, nextPath))
    return acc
  }, {})
}

function buildEffectUtilities(effectRoot, tokens = {}) {
  const tokenEntries = flattenTokenEntries(tokens)

  return Object.keys(tokenEntries).reduce((acc, key) => {
    const utilityKey = effectRoot === 'shadow' ? key : `${effectRoot}-${key}`
    acc[utilityKey] = `var(--${effectRoot}-${key})`
    return acc
  }, {})
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
      const root = nextPath[0]

      if (root === 'effect') {
        const [, effectType, ...rest] = nextPath
        if (EFFECT_ROOTS.has(effectType)) {
          variables[`--${effectType}-${rest.join('-')}`] = value
        }
        return
      }

      if (root === 'semantic' || root === 'component') {
        if (isHexColor(value)) {
          variables[`--color-${nextPath.join('-')}`] = hexToRgbChannels(value)
          return
        }

        variables[`--raw-color-${nextPath.join('-')}`] = value
      }

      return
    }

    flattenVariables(value, nextPath, variables)
  })
}

function buildThemeBaseStyles() {
  const styles = {
    ':root': {
      ...buildThemeVariableMap(DEFAULT_THEME),
    },
  }

  THEME_NAMES.forEach((themeName) => {
    const selector = `.theme-${themeName}, [data-theme="${themeName}"]`
    styles[selector] = {
      ...(styles[selector] || {}),
      ...buildThemeVariableMap(themeName),
    }
  })

  return styles
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
