// @ts-check
import { config } from '@daotl/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  config(
    {
      unocss: true,
      formatters: true,
    },
  ),
)
