<script setup lang="ts">
const { setLocale, locale } = useI18n()
</script>

<template>
  <div text="xl gray4" m-5 flex="~ gap3" justify-center>
    <NuxtLink i-carbon-campsite to="/" />
    <a i-carbon-logo-github href="https://github.com/antfu/vitesse-nuxt3" target="_blank" />
    <DarkToggle />
    <button @click="setLocale(locale === 'en' ? 'zh-CN' : 'en')">
      English/简体中文
    </button>
  </div>
</template>
