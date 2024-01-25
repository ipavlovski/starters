import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // presets for customization
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'amber',
      grayColor: 'sand',
      borderRadius: 'sm',
    }),
  ],

  // setup global CSS 
  globalCss: {
    body: {
      margin: 0,
      padding: 0,
      // backgroundColor: 'slate.900',
      // backgroundColor: '#0f172a',
      // color: 'white',
    },
  },

  // Useful for theme customization
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
      semanticTokens: {
        colors: {

        },
      },
      tokens: {
        fonts: {
          jakarta: { value: 'Plus Jakarta Sans, sans-serif' },
          pacifico: { value: 'Pacifico, cursive;' },
        },
      },
    },
  },

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './main.tsx'],

  // Files to exclude
  exclude: [],

  // hash classnames for devtools readability
  hash: { cssVar: false, className: true },

  // enable codegen components
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
})
