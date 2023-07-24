import * as React from "react"
import { UseChatHelpers } from 'ai/react'
import DigestClient from "digest-fetch"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import fetch from "node-fetch";

type Prompts = {
  act: string
  prompt: string
}

async function GetPrompts() {
  const user = 'dOLWR0iB'
  const password = '0b3b89c1-8b9a-4fea-95ed-ee40be076e3c'
  const client = new DigestClient(user, password)
  const url = 'https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-Abaflmck/endpoint/prompt'
  const options = {}
  const resp = await client.fetch(url, options)
  const data = await resp.json()
  const prompts: Prompts[] = JSON.parse(data).data.rows
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

