/**
 * ---------------------
 * 🚗🚦 Generated by nuxt-typed-router. Do not modify !
 * ---------------------
 * */

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const routesList = { all: 'all', hiId: 'hi-id', index: 'index' }

  return {
    provide: {
      typedRouter: router,
      routesList,
    },
  }
})
