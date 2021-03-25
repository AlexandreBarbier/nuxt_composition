<template>
  <div>
    <transition name="slide-fade">
      <Menu v-show="menuOpen" />
    </transition>
    <div class="sticky flex bg-blue-900 h-24 shadow-md items-center justify-between">
      <span class="text-white m-auto ">
        Nuxt Composition Chat
      </span>
      <IconButton v-if="currentUser" class="mr-4 absolute right-0" @click.native="openMenu">
        <Close v-if="menuOpen" class="fill-current text-white w-8 h-8" />
        <Avatar v-else-if="currentUser.photoURL" size="medium" :url="currentUser.photoURL" />
        <AvatarIcon v-else class="fill-current text-white w-8 h-8" />
      </IconButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import usersStore from '@/composables/users'
import AvatarIcon from '@/assets/icons/avatar_icon.svg'
import Close from '@/assets/icons/close.svg'

export default defineComponent({
  components: { AvatarIcon, Close },
  setup () {
    const menuOpen = ref(false)
    const { getCurrentUser } = usersStore()
    const currentUser = getCurrentUser()

    return { menuOpen, currentUser }
  },
  methods: {
    openMenu () {
      this.menuOpen = !this.menuOpen
    },
    closeMenu () {
      if (this.menuOpen) {
        this.menuOpen = false
      }
    }
  }
})

</script>
