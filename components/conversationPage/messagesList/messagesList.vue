<template>
  <div class="flex">
    <div class="flex flex-col w-full justify-between">
      <div class="flex flex-col flex-1 w-2/3 self-center overflow-hidden">
        <div ref="messageList" class="flex flex-col flex-grow py-8 overflow-y-scroll">
          <MessageItem v-for="message in messages" :key="message.id" :reverse="currentUser.id === message.author.id" :message="message" @image-loaded="imgLoaded" />
        </div>
        <MessageInput class="sticky mb-8 mt-2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, Ref, useContext } from '@nuxtjs/composition-api'
import conversationState from '@/composables/conversations'
import messagesState from '@/composables/messages'
import userState from '@/composables/users'
import Vue from 'vue'
import MessageInput from '../messageInput.vue'
import MessageItem from './messageItem.vue'
import { IMessage } from '~/types/message'

export default defineComponent({
  components: { MessageItem, MessageInput },
  setup () {
    const { currentConversation } = conversationState()
    const currentUser = userState().getCurrentUser()
    const { fetchMessagesForConversations, getMessageForConversation } = messagesState()
    const messages: Ref<IMessage[]> = ref([])
    const messageList = ref(Object())
    if (useContext().route.value.name === 'conversations') {
      useContext().redirect('/chat')
      return {}
    }
    const updateScroll = async () => {
      await Vue.nextTick()
      messageList.value.scrollTop = messageList.value.scrollHeight + messageList.value.offsetHeight
    }
    watch(currentConversation, async (next) => {
      if (next?.id) {
        if (!next.messages.length) {
          await fetchMessagesForConversations(next.id)
        }
        if (next?.messages.length !== messages.value.length) {
          const conversationMessages = getMessageForConversation(next.id)
          messages.value = conversationMessages
          await updateScroll()
        }
      } else {
        useContext().redirect('/chat')
      }
    }, { immediate: true })

    return { getMessageForConversation, currentConversation, currentUser, messages, messageList, updateScroll }
  },
  methods: {
    async imgLoaded () {
      await this.updateScroll!()
    }
  }
})
</script>
