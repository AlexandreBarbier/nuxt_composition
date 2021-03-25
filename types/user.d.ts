import { UserRoles } from './enum/userRoles'

export interface IUserSettings {
  available: boolean
  maxMentoree: number

}

export interface IUser {
  id: string
  email: string
  role: UserRoles
  username: string
  displayName?: string
  loggedIn?: boolean
  photoURL?: string
  description?: string
  conversations?: string[]
}
