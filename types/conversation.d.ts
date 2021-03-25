export interface IConversation {
  id?: string,
  participants: string[],
  messages: string[],
  archivedBy: string[],
}
