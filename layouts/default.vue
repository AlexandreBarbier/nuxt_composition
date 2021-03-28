<template>
  <div class="absolute inset-0 gap-x-8 text-black-900 grid grid-rows-1 grid-cols-12 h-full">
    <NavBar class="flex-none z-20 col-span-full row-end-1" />
    <client-only>
      <GlobalNotification class="fixed col-span-full mt-24 z-10" />
    </client-only>
    <Nuxt class="z-0 overflow-hidden col-span-full" />
    <transition name="open-modal">
      <component :is="modalComponentName" v-if="showModal" v-bind="modalProps" class="absolute inset-0" />
    </transition>
    <Footer class="col-span-full max-h-12 row-start-2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { ModalName } from '@/types/enum/modal'

export default defineComponent({
  setup (_, { root }) {
    const showModal = ref(false)
    const modalComponentName = ref('')
    const modalProps = ref('')

    root.$nuxt.$on('show-modal', (componentName: ModalName, props?: any) => {
      showModal.value = !showModal.value
      modalComponentName.value = componentName
      modalProps.value = props
    })
    return { showModal, modalComponentName, modalProps }
  },
})
</script>
