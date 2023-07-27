import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import {GetPrompts} from "@/app/actions";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export const runtime = 'edge'

export default async function IndexPage() {
  const id = nanoid()
  const session = await auth()
  if (!session?.user) {
    redirect(`/`)
  }
  const prompts = JSON.stringify(await GetPrompts(session.user.id))

  return <Chat id={id} prompts={prompts}/>
}
