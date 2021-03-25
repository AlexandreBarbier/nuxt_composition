import { useContext, ssrRef } from '@nuxtjs/composition-api'
import conversationState from '@/composables/conversations'
import errorState from '@/composables/errors'

import _ from 'lodash'
import { IMessage } from '~/types/message'

const messagesMap = new Map<String, IMessage>()
const messages = ssrRef<IMessage[] | undefined>(undefined)
export default () => {
  const { $fire } = useContext()
  const { setError } = errorState()
  const { setMessages, getConversation } = conversationState()
  const conversationCollection = $fire.firestore.collection('conversations')

  const updateMessages = () => {
    messages.value = Array.from(messagesMap.values())
  }

  const fetchLastMessageForConversation = async (conversationId: string) => {
    const docs = await conversationCollection.doc(conversationId).collection('messages').orderBy('createdAt').limitToLast(1).get()
    const messages: string[] = []
    docs.forEach((doc) => {
      const message = doc.data() as IMessage
      if (message.id) {
        messagesMap.set(message.id, message)
        messages.push(message.id)
      }
    })
    setMessages(conversationId, messages)
    updateMessages()
  }

  const fetchMessagesForConversations = async (conversationId: string) => {
    const docs = await conversationCollection.doc(conversationId).collection('messages').get()
    const messages: string[] = []
    docs.forEach((doc) => {
      const message = doc.data() as IMessage
      if (message.id) {
        messagesMap.set(message.id, message)
        messages.push(message.id)
      }
    })
    setMessages(conversationId, messages)
    updateMessages()
  }
  const getMessageForConversation = (conversationId: string): IMessage[] => {
    const conversation = getConversation(conversationId)
    if (conversation?.messages) {
      return _.orderBy(_.filter(Array.from(messagesMap.values()), x => x.id ? conversation.messages.includes(x.id) : false), ['createdAt']) || []
    }
    return []
  }

  const watchMessagesUpdateForConversation = (conversationId: string) => {
    conversationCollection.doc(conversationId).collection('messages').onSnapshot({
      next: (snapshot) => {
        const docs = snapshot.docChanges()
        const messages: string[] = []
        docs.forEach((docChange) => {
          const message = docChange.doc.data() as IMessage

          if (message.id) {
            messagesMap.set(message.id, message)
            messages.push(message.id)
          }
        })

        setMessages(conversationId, messages)
        updateMessages()
      },
      error: (error) => {
        setError(error)
      },
      complete: () => {
      }
    })
  }

  const sendMessage = async (message: IMessage, conversationId:string, file?: File) => {
    const conversationRef = conversationCollection.doc(conversationId)
    const messageRef = conversationRef.collection('messages').doc()
    message.id = messageRef.id
    message.conversation = conversationRef
    try {
      message.author = $fire.firestore.collection('users').doc($fire.auth.currentUser?.uid)
      if (file) {
        const ref = $fire.storage.ref(`media/${conversationId}/${file.name}_${Date.now()}`)
        await ref.put(file)
        const fileUrl = await ref.getDownloadURL()
        message.media = { url: fileUrl, type: file.type, name: file.name }
      }
      messagesMap.set(message.id, message)
      setMessages(conversationId, [message.id])
      updateMessages()
      await messageRef.set(message)
    } catch (error) {

    }
  }

  return {
    messages,
    fetchMessagesForConversations,
    fetchLastMessageForConversation,
    sendMessage,
    getMessageForConversation,
    watchMessagesUpdateForConversation
  }
}
