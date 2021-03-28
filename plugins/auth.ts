import { onGlobalSetup, useContext } from '@nuxtjs/composition-api'
import userStore from '@/composables/users'

export default () => {
  onGlobalSetup(() => {
    const { $fire, redirect, route } = useContext()
    const { getCurrentUser, fetchUser, logoutUser } = userStore()

    $fire.auth.onAuthStateChanged(async (next) => {
      if (next) {
        const user = getCurrentUser()
        if (user?.value) {
          await fetchUser(user.value.id)
        }
      } else if (route.value.name !== 'login') {
        logoutUser()
        redirect('/login')
      }
    })
  })
}
