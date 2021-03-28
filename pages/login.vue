<template>
  <div class="flex flex-col bg-black-300">
    <ShadowedBox>
      <p class="font-bold text-2xl text-center mb-12">
        Login
      </p>
      <form>
        <Input v-model="email" :class="['mb-2', {'sqweeze': emailError } ]" type="email" placeholder="email" />
        <Input v-model="password" type="password" :class="[{'sqweeze': passwordError }]" placeholder="password" />
        <Input v-model="username" type="text" placeholder="username" class="mt-8" />
      </form>
      <Button title="Se connecter" primary class="mt-16" @click.native="connect()" />
    </ShadowedBox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useError from '@/composables/errors'
import userStore from '@/composables/users'
import { UserRoles } from '@/types/enum/userRoles'

export default defineComponent({

  setup () {
    const email = ref('')
    const password = ref('')
    const username = ref('')
    const emailError = ref(false)
    const passwordError = ref(false)
    const { setError } = useError()
    const { createUser, fetchUser } = userStore()

    return { email, password, passwordError, setError, emailError, createUser, fetchUser, username }
  },
  methods: {
    connect () {
      try {
        this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password).then(async (response) => {
          if (response.user?.uid && response.user?.email) {
            await this.createUser({ email: response.user.email, id: response.user.uid, username: this.username, loggedIn: true, role: UserRoles.USER })
            this.$router.push('chat')
          }
        }).catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.$fire.auth.signInWithEmailAndPassword(this.email, this.password).then(async (response) => {
                if (response.user?.uid) {
                  await this.fetchUser(response.user.uid)
                  this.$router.push('chat')
                }
              }).catch((error) => {
                this.setError(error)
              })
              break
            case 'auth/invalid-email':
              this.emailError = true
              this.setError(error)
              break
            case 'auth/weak-password':
              this.passwordError = true
              this.setError(error)
              break
            default:
              this.setError(error)
              break
          }

          setTimeout(() => {
            this.emailError = false
            this.passwordError = false
          }, 1200)
        })
      } catch (error) {
        this.setError(error)
      }
    },
  },
})
</script>
