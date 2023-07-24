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

type Prompts = {
  Rows
}

async function GetPrompts() {
  const prompts = [
    {
      act: 'Explain technical concepts',
      prompt: `What is a "serverless function"?`
    },
    {
      act: 'Summarize an article',
      prompt: 'Summarize the following article for a 2nd grader: \n'
    },
    {
      act: 'Draft an email',
      prompt: `Draft an email to my boss about the following: \n`
    }
  ]
  return prompts
}

export async function SelectPrompt({setInput}: Pick<UseChatHelpers, 'setInput'>) {
  const prompts = await GetPrompts()
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

