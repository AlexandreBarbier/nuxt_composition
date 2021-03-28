<template>
  <div class="text-white font-bold text-lg rounded p-2 hover:bg-blue-700">
    {{ title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup () {
    return {}
  },
})
</script>

<style scoped>

</style>
