<template>
  <div class="z-50 flex">
    <ShadowedBox class="m-auto relative">
      <IconButton class="absolute right-0 top-0 mt-2 mr-2" @click.native="$nuxt.$emit('show-modal')">
        <Close />
      </IconButton>
      <h1 v-if="title" class="m-2 font-semibold text-lg">
        {{ title }}
      </h1>
      <slot name="content" />
    </ShadowedBox>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Close from '@/assets/icons/close.svg'

export default defineComponent({
  components: { Close },
  props: {
    title: {
      type: String,
      default: undefined,
    },
  },
  setup () {
    return { }
  },
})
</script>
