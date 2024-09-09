<script setup lang="ts">
const online = useOnline()
// import TestFormily from './formily/TestFormily.vue';
</script>

<template>
  <div>
    <Logos mb-6 />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />

    <!-- 测试formily请放开 -->
    <!-- <TestFormily /> -->
  </div>
</template>
