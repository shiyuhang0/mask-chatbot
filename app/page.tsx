import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export const runtime = 'edge'

async function GetPrompts() {
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/prompts`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function IndexPage() {
  const id = nanoid()
  const prompts = JSON.stringify(await GetPrompts())

  return <Chat id={id} prompts={prompts}/>
}
