import {UseChatHelpers} from 'ai/react'

import * as React from 'react'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {InsertPrompt} from "@/components/prompt-insert";

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

export function EmptyScreen({setInput, prompts}: EmptyScreenProps) {
  const rows: Rows = JSON.parse(prompts)
  const myPrompts: Prompts[] = rows.rows
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-lg border bg-background p-8">
          <h1 className="mb-2 text-lg font-semibold">
            Welcome to AI Chatbot!
          </h1>
          <p className="mb-2 leading-normal text-muted-foreground">
            This is an open source AI chatbot app with awesome prompts, helping you be a better
            prompt engineer.
          </p>
          <p className="leading-normal text-muted-foreground">
            You can select a role and we will generate the best prompt for you:
          </p>
          <div className="mt-4 flex flex-col items-start space-y-2 justify-items-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit justify-between"
                >
                  {value
                      ? value
                      : "Act as..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command className="w-[250px]">
                  <CommandInput placeholder="Search ..."/>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <ScrollArea className='h-screen max-h-[60vh] overflow-auto'>
                    <div className="items-center self-center space-x-6 pl-4">
                      <InsertPrompt />
                    </div>
                    <CommandGroup>
                      {myPrompts.map((prompt) => (
                          <CommandItem
                              key={prompt.act}
                              onSelect={(currentValue) => {
                                setValue(currentValue)
                                setInput(prompt.prompt)
                                setOpen(false)
                              }}
                              value={prompt.act}
                          >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === prompt.act ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {prompt.act}
                          </CommandItem>
                      ))}
                    </CommandGroup>
                  </ScrollArea>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
  )
}
