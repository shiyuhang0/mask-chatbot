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

function GetPrompts() {
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

export function SelectPrompt({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  let prompts = [
      {
        act: 'Default value',
        prompt: `What is a "serverless function"?`
      }
  ]
  return (
      <Select onValueChange={(value)=>setInput(value)} onOpenChange={() => prompts = GetPrompts()}>
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

