<template>
  <div class="rounded-md bg-white flex shadow-md">
    <textarea
      ref="textInput"
      class="messageInput flex-grow block m-4"
      rows="1"
      @input="resizeText()"
    />
    <div class="flex self-end items-center mb-2 mr-2">
      <img v-if="placeholder !== ''" class="h-6" :src="placeholder" @click="removeFile()">
      <icon-button>
        <Send class="fill-current text-blue-900 h-6 " @click="send()" />
      </icon-button>
      <icon-button>
        <AttachFile class="fill-current text-blue-900 h-6 " @click="attachFileClick()" />
        <input ref="fileInput" class="hidden" type="file" @change="fileSelected">
      </icon-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Send from '@/assets/icons/send.svg'
import AttachFile from '@/assets/icons/attach_file.svg'
import useMessages from '@/composables/messages'
import useUsers from '@/composables/users'
import useConversations from '@/composables/conversations'
import useErrors from '@/composables/errors'

export default defineComponent({
  components: { Send, AttachFile },
  setup () {
    const { sendMessage } = useMessages()
    const { getCurrentUser } = useUsers()
    const { setError } = useErrors()
    const { currentConversation } = useConversations()

    const textInput = ref(Object())
    const placeholder = ref('')
    const fileInput = ref(Object())
    const selectedFile = ref()

    return { textInput, fileInput, placeholder, sendMessage, getCurrentUser, currentConversation, setError, selectedFile }
  },
  methods: {
    resizeText () {
      if (this.textInput.scrollHeight <= 200) {
        this.textInput.style.height = 'auto'
        this.textInput.style.height = `${this.textInput.scrollHeight}px`
      }
    },
    removeFile () {
      this.placeholder = ''
    },
    fileSelected () {
      const file = this.fileInput.files[0] as File
      this.selectedFile = file
      if (file && file.type.includes('image')) {
        const fileReader = new FileReader()
        const self = this
        fileReader.addEventListener('load', function () {
          // convert image to base64 encoded string
          self.placeholder = this.result as string
        })
        fileReader.readAsDataURL(file)
      }
    },
    attachFileClick () {
      (this.fileInput as any).click()
    },
    send () {
      this.textInput.disabled = true
      if (!this.currentConversation?.id) {
        this.setError({ name: 'inputError', message: 'no conversation selected' })
        return
      }
      const currentUser = this.getCurrentUser().value
      if (!currentUser?.id) {
        this.setError({ name: 'inputError', message: 'no user connected' })
        return
      }

      if (!this.textInput.value.trim().length) {
        this.textInput.value = ''
        return
      }

      this.sendMessage({
        text: this.textInput.value.trim(),
        createdAt: new Date().getTime(),
        unread: true
      }, this.currentConversation?.id, this.selectedFile).catch((err) => {
        this.setError(err)
      })
      this.textInput.style.height = 'auto'
      this.textInput.disabled = false
      this.textInput.focus()
      this.textInput.value = ''
      this.placeholder = ''
      this.selectedFile = undefined
    }
  }
})
</script>
