<template>
  <div class="flex" />
</template>

<script lang="ts">
import { useAsync, defineComponent } from '@nuxtjs/composition-api'
import userState from '@/composables/users'

export default defineComponent({
  setup () {
    const { fetchUsers, users } = userState()

    useAsync(() => {
      fetchUsers()
    })

    return {
      users
    }
  }
})
</script>
