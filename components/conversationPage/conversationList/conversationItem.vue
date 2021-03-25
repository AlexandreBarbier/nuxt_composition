<template>
  <div v-if="conversation && participant" :class="['rounded-md p-4 shadow truncate', selected ? 'bg-selected-900 text-white' : 'hover:bg-selected-300 text-blue-900 bg-white' ]">
    <div class="flex">
      <Avatar size="small" class="mr-2 self-start" :url="participant.photoURL" />
      <div class="overflow-hidden flex-grow">
        <div class="font-semibold">
          {{ participant.username || participant.email }}
        </div>
        <div v-if="lastMessage" class="flex items-center justify-between">
          <span class="truncate text-sm text-ab_gray italic mr-2">{{ lastMessage.text }}</span>
          <img v-if="lastMessage.media" :src="lastMessage.media.url" class="h-4">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, useAsync, useFetch, watch, ref, Ref } from '@nuxtjs/composition-api'
import conversationsStore from '@/composables/conversations'
import userStore from '@/composables/users'
import messagesStore from '@/composables/messages'
import _ from 'lodash'
import { IMessage } from '~/types/message'

export default defineComponent({
  props: {
    conversationId: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  setup (props:any) {
    const conversation = conversationsStore().getConversation(props.conversationId)
    const { fetchLastMessageForConversation, getMessageForConversation, messages } = messagesStore()
    const { getCurrentUser } = userStore()
    const { watchMessagesUpdateForConversation } = messagesStore()
    watchMessagesUpdateForConversation(props.conversationId)

    const lastMessage: Ref<IMessage | undefined> = ref()
    const pId = conversation?.participants.find((x) => {
      return x !== getCurrentUser()?.value?.id
    })
    const participant = useAsync(async () => {
      return (await userStore().getUser(pId))!.value
    })
    useFetch(async () => {
      await fetchLastMessageForConversation(props.conversationId)
    })
    watch(messages, (next) => {
      if (next) {
        lastMessage.value = _.last(getMessageForConversation(props.conversationId))
      }
    }, { immediate: true, deep: true })

    return { conversation, participant, lastMessage }
  }
})
</script>
