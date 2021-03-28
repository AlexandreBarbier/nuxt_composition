<template>
  <div>
    <transition name="slide-fade">
      <Menu v-show="menuOpen" />
    </transition>
    <div class="sticky flex bg-blue-900 h-24 shadow-md items-center justify-between">
      <span class="text-white m-auto ">
        Nuxt Composition Chat
      </span>
      <IconButton v-if="currentUser" class="mr-4 absolute right-0" @click.native="toggleMenu">
        <Close v-if="menuOpen" class="fill-current text-white w-8 h-8" />
        <Avatar v-else size="medium" :url="currentUser.photoURL" />
      </IconButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import usersStore from '@/composables/users'

import Close from '@/assets/icons/close.svg'

export default defineComponent({
  components: { Close },
  setup () {
    const menuOpen = ref(false)
    const { getCurrentUser } = usersStore()
    const currentUser = getCurrentUser()

    watch(currentUser, (next) => {
      if (!next) {
        menuOpen.value = false
      }
    })

    return { menuOpen, currentUser }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    },
  },
})

</script>
