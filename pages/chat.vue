<template>
  <div class="flex h-full flex-1">
    <div :class="['conversation-list relative max-w-xs', menuHidden ? 'w-0' : 'w-80']">
      <conversation-list class="bg-black-300 h-full overflow-hidden" />
      <IconButton class="absolute top-0 right-0 mt-4 -mr-12" @click.native="menuHidden = !menuHidden">
        <MenuIcon v-if="menuHidden" />
        <MenuOpen v-else />
      </IconButton>
    </div>
    <NuxtChild class="bg-black-600 flex-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, watch, ref } from '@nuxtjs/composition-api'
import conversationState from '@/composables/conversations'
import MenuOpen from '@/assets/icons/menu_open.svg'
import MenuIcon from '@/assets/icons/menuIcon.svg'

export default defineComponent({
  components: { MenuOpen, MenuIcon },
  setup () {
    const { route } = useContext()
    const { selectConversation, conversations } = conversationState()
    watch(conversations, (next) => {
      if (next.length && route.value.name === 'chat-conversations-id') {
        selectConversation(route.value.params.id)
      }
    })
    return { menuHidden: ref(false) }
  }
})

</script>
