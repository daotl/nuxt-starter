import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import locales from './locales'

// const lifecycle = process.env.npm_lifecycle_event

const elementPlusResolver = ElementPlusResolver({
  ssr: true,
  directives: false,
})

const autoImportOpts = {
  // global imports to register
  imports: [
    // presets
    'pinia',
    // custom
    {},
  ],
  resolvers: [elementPlusResolver],
  dts: './generated/auto-imports.d.ts',
  vueTemplate: true,
}

const vueComponentsOpts = {
  resolvers: [elementPlusResolver],
  dts: './generated/vue-components.d.ts',
}

export default defineNuxtConfig({
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
  // nitro: {
  //   esbuild: {
  //     options: {
  //       minify: false,
  //     },
  //   },
  // },
  // alias: {
  //   '@common': path.resolve(__dirname, '../common/src'),
  //   '@backend': path.resolve(__dirname, '../backend/src'),
  // },
  imports: {
    dirs: [
      'generated/typed-router',
      'graphql/generated/ops/queries',
      'graphql/generated/ops/mutations',
      'graphql/generated/ops/subscriptions',
    ],
  },
  modules: [
    'nuxt-typed-router',
    // https://github.com/antfu/unplugin-auto-import
    ['unplugin-auto-import/nuxt', autoImportOpts],
    ['unplugin-vue-components/nuxt', vueComponentsOpts],
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    // 'nuxt-graphql-codegen'
  ],
  build: {
    transpile: [
      // https://github.com/element-plus/element-plus-nuxt-starter/commit/09c84c050fae55600957cd89dba143ba8363fed0#diff-5977891bf10802cdd3cde62f0355105a1662e65b02ae4fb404a27bb0f5f53a07
      'element-plus/es',
      // Fix error: "[nuxt] [request error] [unhandled] [500] Cannot find module './internal/Observable'"
      // https://github.com/nuxt/framework/discussions/7772#discussioncomment-3970252
      'rxjs',
    ],
  },
  experimental: {
    reactivityTransform: true,
    // May disable for error:
    // https://github.com/antfu/vitesse-nuxt3/issues/42#issuecomment-1126377430
    // viteNode: false,
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  ignore: [
    'graphql/generated/**',
    'generated/typed-router',
    ...(process.env.NODE_ENV !== 'development'
      ? ['pages/**/*.ts', 'pages/**/components']
      : []),
  ],
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
  // https://github.com/victorgarciaesgi/nuxt-typed-router
  nuxtTypedRouter: {
    // Output directory where you cant the files to be saved
    outDir: './generated/typed-router',
    // Name of the routesNames object
    // routesObjectName: 'routerPagesNames',
  },
  i18n: {
    vueI18n: {
      legacy: false,
      globalInjection: true,
      locale: 'zh-CN',
      fallbackLocale: 'en',
      messages: locales,
    },
  },
  css: ['~/styles/index.scss'],
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  // vite: {
  //   server: {
  //     proxy: {
  //       // https://github.com/nuxt/framework/discussions/1223#discussioncomment-3113141
  //       '/api': {
  //         target: 'http://local.dev:8080', // process.env.API_URL,
  //         changeOrigin: true,
  //         rewrite: (path) => path,
  //       },
  //     },
  //   },
  //   plugins: [],
  // },

  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
  },
})
