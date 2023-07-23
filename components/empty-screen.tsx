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
import {GetServerSideProps} from "next";
import {Prompt} from "next/dist/compiled/@next/font/dist/google";

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

type Prompt = {
  act: string
  prompt: string
}

export async function getServerSideProps(){
  const p = [
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
  const prompts: Prompt[] = JSON.parse(JSON.stringify(p))
  return {
    props: { prompts }
  }
}

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>,{ prompts }:Prompt[]) {
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
        {/*<div className="mt-4 flex flex-col items-start space-y-2">*/}
        {/*  {exampleMessages.map((message, index) => (*/}
        {/*    <Button*/}
        {/*      key={index}*/}
        {/*      variant="link"*/}
        {/*      className="h-auto p-0 text-base"*/}
        {/*      onClick={() => setInput(message.message)}*/}
        {/*    >*/}
        {/*      <IconArrowRight className="mr-2 text-muted-foreground" />*/}
        {/*      {message.heading}*/}
        {/*    </Button>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <div className="mt-4 flex flex-col items-start space-y-2">
          <Select onValueChange={(value)=>setInput(value)}>
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
          {/*<React.Suspense fallback={<div className="flex-1 overflow-auto" />}>*/}
          {/*  /!* @ts-ignore *!/*/}
          {/*  <SelectPrompt />*/}
          {/*</React.Suspense>*/}
        </div>
      </div>
    </div>
  )
}
