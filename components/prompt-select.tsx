import * as React from "react"
import { UseChatHelpers } from 'ai/react'
import DigestClient from "digest-fetch"
import fetch from 'node-fetch'
globalThis.fetch = fetch

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Prompts = {
  act: string
  prompt: string
}

async function GetPrompts() {
  const user = process.env.TIDB_PUBLIC_KEY
  const password = process.env.TIDB_PRIVATE_KEY
  const client = new DigestClient(user, password)
  const url = 'https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-Abaflmck/endpoint/prompt'
  const options = {}
  const resp = await client.fetch(url, options)
  const data = await resp.json()
  const prompts: Prompts[] = JSON.parse(data).data.rows
  // // Recommendation: handle errors
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  //
  // return res.json()
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
  return prompts
}

export async function SelectPrompt({setInput}: Pick<UseChatHelpers, 'setInput'>) {
  const prompts: Prompts[] = await GetPrompts()
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

