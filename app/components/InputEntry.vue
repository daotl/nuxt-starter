<script setup lang="ts">
const conf = useAppConfig()
const name = ref(conf.name)

const router = useRouter()
function go() {
  if (name.value) {
    updateAppConfig({ ...conf, name: name.value })
    router.push(`/hi/${encodeURIComponent(conf.name)}`)
  }
}
</script>

<template>
  <div>
    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="off"
      p="x-4 y-2" m="t-5" w="250px"
      text="center" bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <div>
      <button
        text-sm m-3 btn
        :disabled="!name"
        @click="go"
      >
        GO
      </button>
    </div>
  </div>
</template>
