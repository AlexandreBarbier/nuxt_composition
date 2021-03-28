<template>
  <div class="flex h-full">
    <messagesList class="bg-black-600 flex-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import messagesList from '~/components/conversationPage/messagesList/messagesList.vue'

export default defineComponent({
  components: { messagesList },
  setup () {
    return {}
  },
})
</script>
