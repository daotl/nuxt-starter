import locales from './locales/index'

console.warn(JSON.stringify(locales))

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: locales,
  customBlocks: {
    defaultSFCLang: 'yaml',
  },
}))
