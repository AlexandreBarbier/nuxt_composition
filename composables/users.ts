import { useContext, ssrRef, Ref } from '@nuxtjs/composition-api'
import { UserRoles } from '@/types/enum/userRoles'
import useError from './errors'
import { IUser } from '~/types/user'
import { UserListFilters } from '~/types/enum/filters'

const usersMap = new Map<String, Ref<IUser>>()
const users = ssrRef<Ref<IUser>[]>([])
const localUser: Ref<IUser | undefined> = Array.from(usersMap.values()).find((x) => { return x.value.loggedIn || false }) || ssrRef(undefined)

export default () => {
  const { $fire } = useContext()
  const { setError } = useError()
  const usersCollection = $fire.firestore.collection('users')
  const updateUsersArray = () => {
    users.value = Array.from(usersMap.values())
  }

  const uploadAvatar = async (file: File) => {
    if (!$fire.auth.currentUser) {
      setError({ name: 'unauthorized', message: 'You must be logged in to perform this action' })
      return
    }
    const ref = $fire.storage.ref(`avatars/${$fire.auth.currentUser.uid}`)
    await ref.put(file)
    const photoURL = await ref.getDownloadURL()
    $fire.auth.currentUser?.updateProfile({
      photoURL
    })
    const currentUser = await usersCollection.doc($fire.auth.currentUser.uid)
    await currentUser.update({ photoURL })
    if (localUser?.value) {
      localUser.value.photoURL = photoURL
    }
  }

  const getUser = async (userId: string | undefined) => {
    if (!userId) {
      return
    }
    const user = usersMap.get(userId)

    if (!user || !user.value?.email) {
      usersMap.set(userId, ssrRef({ id: userId } as IUser))
      await fetchUser(userId)
      updateUsersArray()
    }
    const usr = usersMap.get(userId)!
    return usr
  }

  const fetchUser = async (userId: string) => {
    const doc = await usersCollection.doc(userId).get()
    const user = doc.data() || {}

    user.id = userId
    delete user.uid
    await getPhotoForUser(user as IUser)
    const usr = usersMap.get(userId)!
    if (!usr) {
      usersMap.set(userId, ssrRef(user as IUser))
      updateUsersArray()
    } else {
      usr.value = user as IUser
    }
  }

  const fetchUsers = async () => {
    const doc = await usersCollection.get()
    const usr = doc.docs.map(x => x.data())
    try {
      for (let i = 0; i < usr.length; ++i) {
        const user = usr[i]
        await getPhotoForUser(user as IUser)
        usersMap.set(user.id || 'undefined', ssrRef(user as IUser))
      }
      updateUsersArray()
    } catch (error) {
      setError(error)
    }
  }

  const createUser = async (user: IUser) => {
    const userRef = usersCollection.doc(user.id)
    try {
      await userRef.set({ id: userRef.id, email: user.email })
      user.id = userRef.id

      usersMap.set(user.id || 'undefined', ssrRef(user))
      updateUsersArray()
    } catch (error) {
      setError(error)
    }
  }

  const getFilteredUsers = (filter: UserListFilters) => {
    switch (filter) {
      case UserListFilters.All:
        return users

      case UserListFilters.ExceptMe:
        return ssrRef(users.value.filter((u) => { return u.value.id !== localUser?.value?.id }))

      case UserListFilters.Availables:
        return ssrRef(users.value.filter((u) => { return u.value.id !== localUser?.value?.id }))
    }
  }

  const updateUser = async (user: IUser) => {
    const userRef = usersCollection.doc(user.id)
    try {
      await userRef.update(user)
      const usr = usersMap.get(user.id)!
      usr.value = user
      updateUsersArray()
    } catch (error) {
      setError(error)
    }
  }

  const getPhotoForUser = async (user: IUser) => {
    if (user?.photoURL) {
      const photoURL = user?.photoURL ? await $fire.storage.refFromURL(user?.photoURL).getDownloadURL() : undefined
      user.photoURL = photoURL
    }
  }

  const getCurrentUser = () => {
    const fireUser = $fire.auth.currentUser
    if (fireUser?.uid) {
      if (!localUser?.value) {
        const user = { id: fireUser.uid, email: fireUser.email, loggedIn: true, photoURL: fireUser.photoURL, role: UserRoles.USER, username: fireUser.displayName } as IUser
        const lUser = usersMap.get(user.id)?.value

        usersMap.set(user.id || 'undefined', ssrRef({ ...user, ...lUser }))
        updateUsersArray()
        localUser.value = usersMap.get(user.id)?.value
        return localUser
      }
    }
    return localUser
  }

  return {
    users,
    fetchUser,
    getFilteredUsers,
    fetchUsers,
    updateUser,
    getUser,
    createUser,
    getCurrentUser,
    uploadAvatar
  }
}
