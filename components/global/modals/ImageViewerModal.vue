<template>
  <Modal>
    <template #content>
      <img v-if="imageSource" :src="imageSource" class="lg:max-w-6xl">
      <video v-if="videoSource" :src="videoSource" class="lg:max-w-6xl" controls autoplay />
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    imageSource: {
      type: String,
      default: undefined,
    },
    videoSource: {
      type: String,
      default: undefined,
    },
  },
  setup () {
    return {}
  },
})
</script>

<style scoped>

</style>
