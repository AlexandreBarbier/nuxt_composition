<template>
  <div class="flex flex-col">
    <span v-for="user in users" :key="user.id">{{ user.id }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import userState from '@/composables/users'

export default defineComponent({
  setup () {
    const { users } = userState()

    return { users }
  },
})
</script>
