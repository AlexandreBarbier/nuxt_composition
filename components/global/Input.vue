<template>
  <div class="Input">
    <input v-model="input" class="w-full" :placeholder="placeholder" :type="type" :autocomplete="getAutocomplete">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (x:string) => { return ['text', 'email', 'password'].includes(x) }
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'placeholder'
    }
  },
  computed: {
    input: {
      get () : String {
        return this.value
      },
      set (val: String) {
        this.$emit('input', val)
      }
    },
    getAutocomplete () : String {
      switch (this.type) {
        case 'email':
          return 'email'
        case 'password':
          return 'current-password'
        default:
          return ''
      }
    }
  }
})
</script>
