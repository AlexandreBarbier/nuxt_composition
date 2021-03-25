<template>
  <button :disabled="disabled" :class="['btn sm:text-xs', `btn-${primary ? 'primary' : 'secondary'}`]">
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})

</script>
