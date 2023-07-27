import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import {getChat, GetPrompts} from '@/app/actions'
import { Chat } from '@/components/chat'

export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id, session.user.id)
  const prompts = JSON.stringify(await GetPrompts(session.user.id))

  console.log("get chat")
  console.log(chat)


  if (!chat) {
    notFound()
  }

  const id1 = chat?.userId
  const id2 = session?.user?.id
  console.log(id1)
  console.log(id2)
  console.log(typeof id1)
  console.log(typeof id2)

  if (chat?.userId !== session?.user?.id) {
    console.log("not found")
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} prompts={prompts}/>
}
