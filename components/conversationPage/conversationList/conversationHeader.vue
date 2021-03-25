<template>
  <div class="bg-black-300 text-xl font-bold justify-between text-center p-4 flex items-center">
    <span>Conversations</span>
    <IconButton @click.native="createConversationClick()">
      <Add />
    </IconButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Add from '@/assets/icons/add.svg'
import userState from '@/composables/users'
import { ModalName } from '~/types/enum/modal'
export default defineComponent({
  components: { Add },
  setup () {
    const currentUser = userState().getCurrentUser()
    return { currentUser }
  },
  methods: {
    createConversationClick () {
      // if (this.currentUser) {
      this.$nuxt.$emit('show-modal', ModalName.UserListModal)
      // }
    }
  }
})
</script>
