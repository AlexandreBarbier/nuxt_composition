<template>
  <div class="rounded-b-md md:max-w-sm w-full md:h-auto h-full bg-blue-900 absolute right-0 mt-24 p-4 top-0">
    <div v-show="isSubMenu" class="flex items-center" @click="closeSubMenu()">
      <IconButton class="self-start mr-2" hover-color="bg-blue-700">
        <ArrowBack class="fill-current text-white" />
      </IconButton>
      <span class="text-white font-extrabold text-2xl">{{ currentMenu.title }}</span>
    </div>
    <MenuEntry v-for="(entry, index) in currentMenu.entries" :key="index" :title="entry.title" @click.native="selectEntry(entry.action)" />
    <div v-if="showInput">
      <Input v-model="username" type="text" placeholder="username" class="mt-8" />
      <Button title="Validate" @click.native="updateUsername()" />
    </div>
    <input
      ref="image"
      type="file"
      class="hidden"
      accept="image/*"
      @change="imageSelected"
    >
  </div>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import { defineComponent, useFetch, useContext, ref, watch } from '@nuxtjs/composition-api'
import ArrowBack from '@/assets/icons/arrow_back.svg'
import usersStore from '@/composables/users'
import MenuEntry from './MenuEntry.vue'

export default defineComponent({
  components: { MenuEntry, ArrowBack },

  setup () {
    const { $content } = useContext()
    const { uploadAvatar, updateUser, getCurrentUser } = usersStore()
    const defaultMenu = ref({})
    const accountMenu = ref({})
    const settingsMenu = ref({})
    const currentMenu = ref({})
    const username = ref('')
    const image = ref(Object())

    useFetch(async () => {
      const menuContent = await $content('menu').fetch() as IContentDocument
      defaultMenu.value = menuContent.default
      accountMenu.value = menuContent.account
      settingsMenu.value = menuContent.settings
      currentMenu.value = defaultMenu.value
    })

    watch(getCurrentUser(), (next) => {
      username.value = next?.username || ''
    })

    return { defaultMenu, currentMenu, updateUser, accountMenu, getCurrentUser, settingsMenu, isSubMenu: ref(false), showInput: ref(false), image, uploadAvatar, username }
  },
  methods: {
    logout () {
      this.$fire.auth.signOut()
    },

    closeSubMenu () {
      this.isSubMenu = false
      this.currentMenu = this.defaultMenu
      this.showInput = false
    },
    imageSelected () {
      const file = this.image.files[0]
      this.uploadAvatar(file)
    },
    updateUsername () {
      const user = this.getCurrentUser()

      if (user.value) {
        user.value.username = this.username
        this.updateUser(user.value)
      }
    },
    selectEntry (action: string) {
      switch (action) {
        case 'logout':
          this.logout()
          break
        case 'showAccount':
          this.currentMenu = this.accountMenu
          this.isSubMenu = true
          break
        case 'showSettings':
          this.currentMenu = this.settingsMenu
          this.isSubMenu = true
          break
        case 'setAvatar':
          (this.image as any).click()
          break
        case 'setUsername':
          this.showInput = true
          break
        default:
          break
      }
    },
  },

})
</script>

<style scoped>

</style>
