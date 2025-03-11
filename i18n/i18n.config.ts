import en from './locales/en'
import zhCN from './locales/zh-cn'

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: { en, 'zh-CN': zhCN },
  customBlocks: {
    defaultSFCLang: 'yaml',
  },
}))
