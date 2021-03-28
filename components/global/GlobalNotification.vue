<template>
  <transition name="slide-fade">
    <p v-if="error" class="w-full text-center bg-ab_error text-white">
      {{ error.message }}
    </p>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useError from '@/composables/errors'
export default defineComponent({
  setup () {
    const { resetError, error } = useError()

    return {
      error,
      resetError,
    }
  },
})
</script>
