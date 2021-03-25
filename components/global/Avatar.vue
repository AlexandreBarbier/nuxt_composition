<template>
  <img v-if="url" :src="url" :class="['rounded-full', avatarSize]">
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    url: { type: String, default: undefined },
    size: {
      type: String,
      default: 'medium',
      validator: (x:string) => { return ['medium', 'large', 'small'].includes(x) }
    }
  },
  setup (props) {
    const avatarSize = ref('')
    switch (props.size) {
      case 'large':
        avatarSize.value = 'w-12 h-12'
        break
      case 'small':
        avatarSize.value = 'w-6 h-6'
        break
      default:
        avatarSize.value = 'w-8 h-8'
        break
    }
    return { avatarSize }
  }
})
</script>

<style scoped>

</style>
