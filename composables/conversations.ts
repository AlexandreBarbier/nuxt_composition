import { useContext, ssrRef, useRouter } from '@nuxtjs/composition-api'
import _ from 'lodash'
import { IConversation } from '~/types/conversation'

const conversationsMap = new Map<String, IConversation>()
const conversations = ssrRef<IConversation[]>([])
const currentConversation = ssrRef<IConversation | undefined>(undefined)

export default () => {
  const { $fire } = useContext()
  const router = useRouter()
  const conversationCollection = $fire.firestore.collection('conversations')
  const updateConversations = () => {
    conversations.value = Array.from(conversationsMap.values())
  }

  const fetchConversations = async (userId: string) => {
    const refs = await conversationCollection.where('participants', 'array-contains', userId).get()

    refs.docs.forEach((doc) => {
      const conversation = doc.data() as IConversation
      if (conversation.id) {
        conversationsMap.set(conversation.id, conversation)
      }
    })
    updateConversations()
  }

  const watchUpdateForConversation = (conversationId: string) => {
    conversationCollection.doc(conversationId).onSnapshot({
      next: (_) => {
        // console.log(snapshot.data())
      },
    })
  }

  const setMessages = (conversationId: string, messages: string[]) => {
    const conversation = conversationsMap.get(conversationId)
    if (conversation) {
      conversation.messages = _.uniq([...conversation.messages || [], ...messages])
      conversationsMap.set(conversationId, conversation)
      updateConversations()
    }
    if (currentConversation.value && currentConversation.value.id === conversationId) {
      const res = currentConversation.value.messages || []
      currentConversation.value = { ...currentConversation.value, messages: [...res, ...messages] }
    }
  }

  const getConversation = (conversationId: String): IConversation | undefined => {
    return conversationsMap.get(conversationId)
  }

  const selectConversation = (conversationId: string | undefined) => {
    if (conversationId) {
      currentConversation.value = conversationsMap.get(conversationId)
      router.push({ name: 'chat-conversations-id', params: { id: conversationId } })
      return
    }
    currentConversation.value = undefined
  }

  const createConversation = async (conversation: IConversation) => {
    const convRef = conversationCollection.doc()
    conversation.id = convRef.id
    await convRef.set(conversation)

    conversationsMap.set(conversation.id, conversation)
    updateConversations()
  }

  return {
    conversations,
    fetchConversations,
    watchUpdateForConversation,
    getConversation,
    createConversation,
    currentConversation,
    selectConversation,
    setMessages,
  }
}
