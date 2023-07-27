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
import {IconButton} from "@/components/icon-button";

const ExamplePrompts: Prompts[] = [
  { act: "Linux Terminal", prompt: "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is pwd" },
  { act: "Travel Guide", prompt: "I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is \"I am in Istanbul/Beyoğlu and I want to visit only museums.\"" },
  { act: "Movie Critic", prompt: "I want you to act as a movie critic. You will develop an engaging and creative movie review. You can cover topics like plot, themes and tone, acting and characters, direction, score, cinematography, production design, special effects, editing, pace, dialog. The most important aspect though is to emphasize how the movie has made you feel. What has really resonated with you. You can also be critical about the movie. Please avoid spoilers. My first request is \"I need to write a movie review for the movie Interstellar\"" },
  { act: "Career Counselor", prompt: "I want you to act as a career counselor. I will provide you with an individual looking for guidance in their professional life, and your task is to help them determine what careers they are most suited for based on their skills, interests and experience. You should also conduct research into the various options available, explain the job market trends in different industries and advice on which qualifications would be beneficial for pursuing particular fields. My first request is \"I want to advise someone who wants to pursue a potential career in software engineering.\"" },
  { act: "Investment Manager", prompt: "Seeking guidance from experienced staff with expertise on financial markets , incorporating factors such as inflation rate or return estimates along with tracking stock prices over lengthy period ultimately helping customer understand sector then suggesting safest possible options available where he/she can allocate funds depending upon their requirement & interests ! Starting query - “What currently is best way to invest money short term prospective?”" },
  { act: "Essay Writer", prompt: "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is “I need help writing a persuasive essay about the importance of reducing plastic waste in our environment”." }
]

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
          <div className="mt-4 flex flex-col items-start space-y-2 justify-center" >
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
          {/*<div className="mt-4 flex flex-col items-start space-y-2">*/}
          <div className="mt-4 grid grid-cols-3 gap-4">
            { ExamplePrompts.map((prompt,index) => (
                < IconButton key={index} id={'1f638'} act={prompt.act} prompt={prompt.prompt} setInput={setInput} />
            ))}
          </div>
        </div>
      </div>
  )
}
