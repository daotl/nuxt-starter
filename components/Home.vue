<script setup lang="ts">
const { data, fetching, error } = usePersonQuery({
  variables: {
    personInput: {
      name: 'Phil Xu',
    },
  },
})
</script>

<template>
  <div>
    <div>
      <h3 text-2xl font-500>Graphql Api</h3>
      <div v-show="fetching">
        {{ $t('ssrLoading') }}
      </div>
      <div v-if="data && data.person">
        {{ $t('ssrMode') }}: {{ $t(data.person.name) }}
      </div>
      <div v-else-if="error">
        {{ error }}
      </div>

      <div>
        <NuxtLink class="btn m-3 text-sm" to="/restful/page-view">
          RESTful Api
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<i18n lang="yml">
en:
  ssrLoading: Loading when jump from other landing page
  ssrMode: Prefetch on SSR Mode
zh-CN:
  ssrLoading: 从其他落地页跳转加载中效果
  ssrMode: SSR模式预加载数据
</i18n>
