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
  { act: "Position Interviewer", prompt: "I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the `position` position. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers. My first sentence is \"Hi\"" },
  { act: "Prompt Generator", prompt: "I want you to act as a prompt generator. Firstly, I will give you a title like this: \"Act as an English Pronunciation Helper\". Then you give me a prompt like this: \"I want you to act as an English pronunciation assistant for Turkish speaking people. I will write your sentences, and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentences but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is \"how the weather is in Istanbul?\".\" (You should adapt the sample prompt according to the title I gave. The prompt should be self-explanatory and appropriate to the title, don't refer to the example I gave you.). My first title is \"Act as a Code Review Helper\" (Give me prompt only)" },
  { act: "Essay Writer", prompt: "I want you to act as an essay writer. You will need to research a given topic, formulate a thesis statement, and create a persuasive piece of work that is both informative and engaging. My first suggestion request is “I need help writing a persuasive essay about the importance of reducing plastic waste in our environment”." },
  { act: "Python Interpreter", prompt: "Act as a Python interpreter. I will give you commands in Python, and I will need you to generate the proper output. Only say the output. But if there is none, say nothing, and don't give me an explanation. If I need to say something, I will do so through comments. My first command is \"print('Hello World').\""},
  { act: "Legal Advisor", prompt: "I want you to act as my legal advisor. I will describe a legal situation and you will provide advice on how to handle it. You should only reply with your advice, and nothing else. Do not write explanations. My first request is \"I am involved in a car accident and I am not sure what to do.\""},
  { act: "Math Teacher", prompt: "I want you to act as a math teacher. I will provide some mathematical equations or concepts, and it will be your job to explain them in easy-to-understand terms. This could include providing step-by-step instructions for solving a problem, demonstrating various techniques with visuals or suggesting online resources for further study. My first request is \"I need help understanding how probability works.\""},
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
            Mask AI Chatbot!
          </h1>
          <p className="mb-2 leading-normal text-muted-foreground">
            This Mask AI chatbot helps you generate the most suitable prompt, makes you a junior prompt engineer.
          </p>
          {/*<p className="leading-normal text-muted-foreground">*/}
          {/*  Select a role and we will generate the best prompt for you:*/}
          {/*</p>*/}
          <div className="mt-4 flex space-y-2 justify-center" >
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
          <div className="mt-4 grid grid-cols-3 gap-4">
            { ExamplePrompts.map((prompt,index) => (
                < IconButton key={index} id={'1f638'} act={prompt.act} prompt={prompt.prompt} setInput={setInput} />
            ))}
          </div>
        </div>
      </div>
  )
}
