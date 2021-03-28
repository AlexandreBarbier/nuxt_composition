<template>
  <div :class="['rounded-md p-4 flex items-center', selected ? 'bg-selected-900 text-white': 'hover:bg-selected-300 bg-gray-200']">
    <Avatar size="small" :url="user.photoURL" />
    <span class="truncate ml-2">{{ user.email }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IUser } from '@/types/user'

export default defineComponent({
  props: {
    user: {
      type: Object as () => IUser,
      default: () => {},
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    return {}
  },
})
</script>
