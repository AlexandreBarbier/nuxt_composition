<template>
  <Modal title="Liste utilisateurs">
    <template #content>
      <UserList :filter="filter" @select="selectUser" />
      <Button primary :disabled="selectedUser === undefined || currentUser.id === selectedUser" class="mt-4" title="Create conversation" @click.native="createConversationWithSelectedUser()" />
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import conversationsState from '@/composables/conversations'
import userState from '@/composables/users'
import { UserListFilters } from '@/types/enum/filters'

export default defineComponent({

  setup () {
    const { createConversation } = conversationsState()
    const selectedUser = ref<string | undefined>(undefined)
    const currentUser = userState().getCurrentUser()
    return { selectedUser, createConversation, currentUser, filter: UserListFilters.Availables }
  },
  methods: {
    selectUser (id: string) {
      this.selectedUser = id
    },

    createConversationWithSelectedUser () {
      if (this.currentUser?.id && this.selectedUser) {
        this.createConversation({ participants: [this.currentUser.id, this.selectedUser], messages: [], archivedBy: [] })
      }
    }
  }
})
</script>
