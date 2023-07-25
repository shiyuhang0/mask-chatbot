import { UseChatHelpers } from 'ai/react'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {PromptAdd} from "@/components/prompt-add";

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export interface PromptProps
    extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export interface EmptyScreenProps extends Pick<UseChatHelpers, 'setInput'> {
  prompts: string
}

type Rows = {
  rows: Prompts[]
}

type Prompts = {
  act: string
  prompt: string
}

export function EmptyScreen({ setInput,prompts }: EmptyScreenProps) {
  const rows: Rows = JSON.parse(prompts)
  const myPrompts : Prompts[] = rows.rows
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welcome to AI Chatbot!
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app with awesome prompts, helping you be a better prompt engineer.
        </p>
        <p className="leading-normal text-muted-foreground">
          You can select a role and we will generate the best prompt for you:
        </p>
        <div className="mt-4 flex flex-row items-start space-x-2">
          <div className="w-2/3">
            <Select onValueChange={(value) => setInput(value)}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Act as"/>
              </SelectTrigger>
              <SelectContent hideWhenDetached={true}>
                <SelectGroup>
                  <SelectLabel>Act as</SelectLabel>
                  {myPrompts.map((item, index) => (
                      <SelectItem key={index} value={item.prompt}>
                        {item.act}
                      </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/3 items-start">
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">+</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col space-y-2">
                  <PromptAdd />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
