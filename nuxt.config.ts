import process from 'node:process'

import type { NuxtPage } from '@nuxt/schema'

import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

const apiBase = '' // '/nuxt-starter'
const runtimeConfig = {
  // The private keys which are only available within server-side
  apiSecret: '123',
  // Keys within public, will be also exposed to the client-side
  public: {
    // When adding apiBase to the runtimeConfig.public, Nuxt adds it to each page payload. We can universally access apiBase in both server and browser.
    // apiBase,
    backends: {
      restApiBaseUrl: `${apiBase}/api`,
      wsApiBaseUrl: `${apiBase}/ws`,
    },
  },
}

// const lifecycle = process.env.npm_lifecycle_event
const autoImportOpts = {
  // global imports to register
  imports: [
    // presets
    'pinia',
    'vue-i18n',
    // custom
    {},
  ],
  dts: '../generated/auto-imports.d.ts',
  vueTemplate: true,
}

export default defineNuxtConfig({
  runtimeConfig,
  // Without this option, `rootDir` was incorrectly set to `web/frontend/web-frontend` because of pnpm workspace
  // rootDir: '.',
  /**
   * Used to set the modules directories for path resolving (for example, webpack's `resolveLoading`, `nodeExternals` and `postcss`).
   * The configuration path is relative to `options.rootDir` (default is current working directory).
   * Setting this field may be necessary if your project is organized as a yarn workspace-styled mono-repository.
   * default: ["/<rootDir>/node_modules","/home/pooya/Code/framework/packages/schema/node_modules"]
   */
  // modulesDir: ['/<rootDir>/node_modules', '../../node_modules'],
  // ssr: false,
  // sourcemap: false,
  nitro: {
    // Enable multi core handling: https://nitro.unjs.io/deploy/node#cluster-mode
    preset: 'node-cluster',
    // Proxy backend APIs
    // devProxy: {
    //   '/api': {
    //     target: 'http://local.dev:8080/api',
    //     changeOrigin: true,
    //   },
    // },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
    //   esbuild: {
    //     options: {
    //       minify: false,
    //     },
    //   },
  },
  // alias: {
  //   '@common': path.resolve(__dirname, '../common/src'),
  //   '@backend': path.resolve(__dirname, '../backend/src'),
  // },
  imports: {
    dirs: ['generated/typed-router'],
  },
  modules: [
    'nuxt-typed-router',
    // https://github.com/antfu/unplugin-auto-import
    ['unplugin-auto-import/nuxt', autoImportOpts],
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',

    // Temporary workaround for `*.ts` files in `pages/` causing errors related to auto route generation
    // https://github.com/nuxt/framework/issues/6920#issuecomment-1232596227
    (_, nuxt): void => {
      if (process.env.NODE_ENV === 'development') {
        nuxt.options.extensions = nuxt.options.extensions.filter(
          ext => ext !== '.ts',
        )
      }
    },
  ],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  vue: {
    compilerOptions: {
      directiveTransforms: {
        loading: () => ({
          props: [],
          needRuntime: true,
        }),
      },
    },
  },

  devtools: {
    enabled: true,
  },

  build: {
    transpile: [
      // Fix error: "[nuxt] [request error] [unhandled] [500] Cannot find module './internal/Observable'"
      // https://github.com/nuxt/framework/discussions/7772#discussioncomment-3970252
      'rxjs',
    ],
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  compatibilityDate: '2024-08-14',

  css: ['~/styles/index.scss', '@unocss/reset/tailwind.css'],
  unocss: {
    attributify: true,
    icons: true,
    // https://github.com/unocss/unocss/issues/932
    // @unocss/reset/tailwind.css is inserted after the Element UI style, causing button background to be transparent
    // preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  pwa,
})
