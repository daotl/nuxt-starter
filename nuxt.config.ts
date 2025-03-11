import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

const apiBase = '' // '/nuxt-starter'
const runtimeConfig = {
  // The private keys which are only available within server-side
  apiSecret: '123',
  // Keys within public, will be also exposed to the client-side
  public: {

    title: '@daotl/nuxt-starter',
    // When adding apiBase to the runtimeConfig.public, Nuxt adds it to each page payload. We can universally access apiBase in both server and browser.
    // apiBase,
    backends: {
      restApiBaseUrl: `${apiBase}/api`,
      wsApiBaseUrl: `${apiBase}/ws`,
    },
  },
}

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
  ],

  devtools: {
    enabled: true,
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

  colorMode: {
    classSuffix: '',
  },

  runtimeConfig,

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

  nitro: {
    // Enable multi-core handling: https://nitro.unjs.io/deploy/node#cluster-mode
    preset: 'node-cluster',
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
    // Proxy backend APIs
    // devProxy: {
    //   '/api': {
    //     target: 'http://local.dev:8080/api',
    //     changeOrigin: true,
    //   },
    // },
  },

  typescript: {
    strict: true,
    typeCheck: true,
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
