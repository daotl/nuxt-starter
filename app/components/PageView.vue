<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgoI18n(() => data.value?.startAt || 0)

const { t } = useI18n({
  useScope: 'local',
})
</script>

<template>
  <div text-gray:80>
    <span text-gray>{{ t('visited', { count: data?.pageview, time }) }}</span>
  </div>
</template>

<i18n lang="yaml">
en:
  visited: '{count} page views since {time}'
zh-CN:
  visited: '{time}以来访问了{count}次'
</i18n>
