import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import {GetPrompts} from "@/app/actions";

export const runtime = 'edge'

export default async function IndexPage() {
  const id = nanoid()
  const prompts = JSON.stringify(await GetPrompts())

  return <Chat id={id} prompts={prompts}/>
}
