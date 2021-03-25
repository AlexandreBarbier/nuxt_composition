<template>
  <div
    :disabled="disabled"
    :class="['rounded-full p-1 lg:p-2 ', hColor()]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    hoverBackground: {
      type: Boolean,
      default: true
    },
    hoverColor: {
      type: String,
      default: 'bg-blue-700'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return { }
  },
  methods: {
    hColor () {
      return this.hoverBackground && !this.disabled ? `hover:${this.hoverColor}` : ''
    }
  }
})
</script>
