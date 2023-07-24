import * as React from "react"
import { UseChatHelpers } from 'ai/react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Rows = {
  rows: Prompts[]
}

type Prompts = {
  act: string
  prompt: string
}

async function GetPrompts() {
  // const user = 'dOLWR0iB'
  // const password = '0b3b89c1-8b9a-4fea-95ed-ee40be076e3c'
  // const client = new DigestClient(user, password)
  // const url = 'https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-Abaflmck/endpoint/prompt'
  // const options = {}
  // const resp = await client.fetch(url, options)
  // const data = await resp.json()
  // const prompts: Prompts[] = JSON.parse(data).data.rows
  // return prompts
  // const prompts = [
  //   {
  //     act: 'Explain technical concepts',
  //     prompt: `What is a "serverless function"?`
  //   },
  //   {
  //     act: 'Summarize an article',
  //     prompt: 'Summarize the following article for a 2nd grader: \n'
  //   },
  //   {
  //     act: 'Draft an email',
  //     prompt: `Draft an email to my boss about the following: \n`
  //   }
  // ]
  // const p:Prompts[] = JSON.parse(JSON.stringify(prompts))
  // return p
  const res = await fetch('https://nextjs-chat-git-prompt-shiyuhang0.vercel.app/api/prompts')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function SelectPrompt({setInput}: Pick<UseChatHelpers, 'setInput'>) {
  const data = await GetPrompts()
  console.log(data)
  const rows: Rows = JSON.parse(data)
  console.log(rows)
  const prompts: Prompts[] = rows.rows
  console.log(prompts)
  return (
      <Select onValueChange={(value) => setInput(value)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Act as"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Act as</SelectLabel>
            {prompts.map((item, index) => (
                <SelectItem key={index} value={item.prompt}>
                  {item.act}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

