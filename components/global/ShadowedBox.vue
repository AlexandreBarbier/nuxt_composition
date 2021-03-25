<template>
  <div class="flex flex-col m-auto shadow-md py-8 px-10 bg-white rounded-3xl">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>
