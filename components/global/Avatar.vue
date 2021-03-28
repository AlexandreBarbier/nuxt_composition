<template>

  <AvatarIcon v-if="!imageLoad || !url" :class="['bg-blue-700 p-0.5 rounded-full fill-current text-white', avatarSize]" />
  <img v-else @load="imageLoad" :src="url" :class="['rounded-full bg-white', avatarSize]">
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import AvatarIcon from '@/assets/icons/avatar_icon.svg'

export default defineComponent({
  components: {AvatarIcon},
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
    const imgLoaded = ref(false)
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
    return { avatarSize, imgLoaded }
  },
  methods: {
    imageLoad() {
      this.imgLoaded = true
    }
  }
})
</script>

<style scoped>

</style>
