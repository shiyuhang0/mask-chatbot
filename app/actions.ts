'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import {type Chat, ChatRows} from '@/lib/types'

const useKV = process.env.USE_KV === 'true'

export async function GetPrompts() {
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/prompts`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function AddPrompts(act,prompt) {
  console.log(act)
  console.log(prompt)
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/prompts`,{
    method: 'POST',
    body: JSON.stringify({act,prompt})
  })
  if (!res.ok) {
    throw new Error('Failed to add data')
  }
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    if (!useKV) {
      const res = await fetch(`https://${process.env.VERCEL_URL}/api/chats?userId=${userId}`)
      if (!res.ok) {
        return []
      }
      const data = await res.json()
      const rows: ChatRows = JSON.parse(JSON.stringify(data))
      const result: Chat[] = rows.rows
      return result as Chat[]
    }else{
      const pipeline = kv.pipeline()
      const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
        rev: true
      })

      for (const chat of chats) {
        pipeline.hgetall(chat)
      }

      const results = await pipeline.exec()

      return results as Chat[]
    }
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {

  if (!useKV) {
    const res = await fetch(`https://${process.env.VERCEL_URL}/api/chats?userId=${userId}&id=${id}`)
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    const rows: ChatRows = JSON.parse(JSON.stringify(data))
    const result: Chat[] = rows.rows
    if (result.length === 0 || ((userId && result[0].userId !== userId))) {
      return null
    }
    return result[0] as Chat
  } else {
    const chat = await kv.hgetall<Chat>(`chat:${id}`)

    if (!chat || (userId && chat.userId !== userId)) {
      return null
    }
    return chat
  }
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  if (!useKV) {
    const uid = session?.user?.id
    if (!uid) {
      return {
        error: 'Unauthorized'
      }
    }
    await fetch(`https://${process.env.VERCEL_URL}/api/chats?userId=${uid}&id=${id}`,{
      method: 'DELETE'
    })
  } else{
    const uid = await kv.hget<string>(`chat:${id}`, 'userId')

    if (uid !== session?.user?.id) {
      return {
        error: 'Unauthorized'
      }
    }

    await kv.del(`chat:${id}`)
    await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)
  }

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  if (!useKV) {
    await fetch(`https://${process.env.VERCEL_URL}/api/chats?userId=${session.user.id}`,{
      method: 'DELETE'
    })
  }else{
    const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)

    if (!chats.length) {
    return redirect('/')
    }
    const pipeline = kv.pipeline()

    for (const chat of chats) {
      pipeline.del(chat)
      pipeline.zrem(`user:chat:${session.user.id}`, chat)
    }

    await pipeline.exec()
  }

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  if (!useKV) {
    const res = await fetch(`https://${process.env.VERCEL_URL}/api/chats?id=${id}`)
    if (!res.ok) {
      return null
    }
    const data = await res.json()
    const rows: ChatRows = JSON.parse(JSON.stringify(data))
    const result: Chat[] = rows.rows
    if (result.length === 0 || !result[0].sharePath) {
      return null
    }
    return result[0] as Chat
  }else{
    const chat = await kv.hgetall<Chat>(`chat:${id}`)
    if (!chat || !chat.sharePath) {
      return null
    }

    return chat
  }

}

export async function shareChat(chat: Chat) {
  const session = await auth()
  if (!session?.user?.id || session.user.id !== chat.userId) {
    return {
      error: 'Unauthorized'
    }
  }

  const sharePath = `/share/${chat.id}`
  const payload = {
    ...chat,
    sharePath: sharePath
  }

  if (!useKV){
    const body = {
      id: chat.id,
      sharePath: sharePath
    }
    await fetch(`https://${process.env.VERCEL_URL}/api/chats`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  } else {
    await kv.hmset(`chat:${chat.id}`, payload)
  }
  return payload
}
