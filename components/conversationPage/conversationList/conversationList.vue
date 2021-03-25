<template>
  <div class="flex flex-col">
    <ConversationHeader />
    <div class="flex flex-col justify-between flex-grow overflow-hidden">
      <div class="py-8 overflow-y-scroll px-4">
        <div v-if="conversations.length" class="grid grid-cols-1 grid-flow-row gap-2">
          <ConversationItem
            v-for="c in conversations"
            :key="c.id"
            :conversation-id="c.id"
            :selected="currentConversation && currentConversation.id === c.id"
            @click.native="selectConversation(c.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, useFetch } from '@nuxtjs/composition-api'
import conversationsState from '@/composables/conversations'
import userState from '@/composables/users'

import { IConversation } from '~/types/conversation'

export default defineComponent({

  setup () {
    const { conversations, fetchConversations, selectConversation, currentConversation } = conversationsState()
    const currentUser = userState().getCurrentUser()
    const { fetchUser } = userState()
    const { fetch } = useFetch(async () => {
      if (currentUser.value) {
        await fetchConversations(currentUser.value.id)
      }
    })
    watch(() => currentUser.value, (next) => {
      if (next) {
        fetch()
      }
    }, { immediate: true })
    watch(() => conversations.value, (next) => {
      if (next) {
        next.forEach((x: IConversation) => {
          const other = x.participants.find(id => id !== currentUser.value?.id)
          if (other) {
            fetchUser(other)
          }
        })
      }
    }, { immediate: true })
    return { conversations, currentUser, selectConversation, currentConversation }
  }
})
</script>
