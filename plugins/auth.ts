import { onGlobalSetup, useContext } from '@nuxtjs/composition-api'
import userStore from '@/composables/users'

export default () => {
  onGlobalSetup(() => {
    const { $fire, redirect, route } = useContext()
    const { getCurrentUser, fetchUser } = userStore()

    $fire.auth.onAuthStateChanged(async (next) => {
      if (process.client) {
        if (next) {
          const user = getCurrentUser()
          if (user?.value) {
            await fetchUser(user.value.id)
          }
        } else if (route.value.name !== 'login') {
          redirect('/login')
        }
      }
    })
  })
}
