<template>
  <div :class="['flex my-2 ', reverse ? 'self-end' : 'self-start']">
    <div :class="['m-auto max-w-md flex items-center', reverse ? 'flex-row-reverse' : '' ]">
      <Avatar v-if="author && author.value" size="medium" :url="author.value.photoURL" class="m-2 self-start shadow-md" />
      <div :class="['rounded py-2 px-4', reverse ? 'bg-blue-900 text-white shadow-lg' : 'bg-white']">
        <span>{{ message.text }}</span>
        <div v-if="message.media" class="mt-2 text-gray-300">
          <img
            v-if="message.media.type.includes('image')"
            class="m-auto"
            :src="message.media.url"
            @load="onImgLoad"
            @click="enlargeImage"
          >
          <video
            v-else-if="message.media.type.includes('video')"
            class="m-auto"
            controls
            :src="message.media.url"
            @click="enlargeVideo"
          />
          <a v-else :href="message.media.url" class="flex items-center" target="blank">
            <AttachFile class="mr-1 fill-current text-gray-300 h-4" />{{ message.media.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import { IMessage } from '@/types/message'
import userState from '@/composables/users'
import AttachFile from '@/assets/icons/attach_file.svg'
import { ModalName } from '~/types/enum/modal'

export default defineComponent({
  components: { AttachFile },
  props: {
    message: {
      type: Object as () => IMessage,
      default: () => {},
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const author = useAsync(() => {
      return userState().getUser(props.message?.author?.id)
    })
    return { author }
  },
  methods: {
    enlargeImage () {
      this.$nuxt.$emit('show-modal', ModalName.ImageViewerModal, { imageSource: this.message.media?.url })
    },
    enlargeVideo () {
      this.$nuxt.$emit('show-modal', ModalName.ImageViewerModal, { videoSource: this.message.media?.url })
    },
    onImgLoad () {
      this.$emit('image-loaded')
    },

  },

})
</script>
<style scoped>
span {
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
