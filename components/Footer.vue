<script setup lang="ts">
const { setLocale, locale } = useI18n()
</script>

<template>
  <div text="xl gray4" m-5 flex justify-center gap-3>
    <NuxtLink i-carbon-campsite to="/" />
    <a
      i-carbon-logo-github
      href="https://github.com/daotl/nuxt-starter"
      target="_blank"
    />
    <DarkToggle />
    <el-button @click="setLocale(locale === 'en' ? 'zh-CN' : 'en')">
      en / zh-CN
    </el-button>
  </div>
</template>
