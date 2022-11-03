import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    messages,
  })

  vueApp.use(i18n)
})
