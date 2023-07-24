import { UseChatHelpers } from 'ai/react'

import * as React from 'react'
import {SelectPrompt} from "@/components/prompt-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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
        <div className="mt-4 flex flex-col items-start space-y-2">
          {/*<Select onValueChange={(value)=>setInput(value)}>*/}
          {/*  <SelectTrigger className="w-[300px]">*/}
          {/*    <SelectValue placeholder="Act as"/>*/}
          {/*  </SelectTrigger>*/}
          {/*  <SelectContent>*/}
          {/*    <SelectGroup>*/}
          {/*      <SelectLabel>Act as</SelectLabel>*/}
          {/*      {prompts.map((item, index) => (*/}
          {/*          <SelectItem key={index} value={item.prompt}>*/}
          {/*              {item.act}*/}
          {/*          </SelectItem>*/}
          {/*      ))}*/}
          {/*    </SelectGroup>*/}
          {/*  </SelectContent>*/}
          {/*</Select>*/}
          <Select onValueChange={(value) => setInput(value)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Act as"/>
            </SelectTrigger>
            <SelectContent>
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
          {/*<React.Suspense fallback={<div className="flex-1 overflow-auto" />}>*/}
          {/*   /!*@ts-ignore *!/*/}
          {/*  <SelectPrompt setInput={setInput}/>*/}
          {/*</React.Suspense>*/}
        </div>
      </div>
    </div>
  )
}
