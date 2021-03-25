import { DocumentReference } from '@firebase/firestore-types'
export interface IMedia {
  name: string,
  url: String,
  type: String,
}

export interface IMessage {
  id?: string,
  author?: DocumentReference,
  text: string,
  createdAt: Number,
  conversation?: DocumentReference,
  media?: IMedia,
  unread: boolean

}
