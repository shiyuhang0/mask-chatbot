import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { UseChatHelpers } from 'ai/react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js label",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit label",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js label",
//   },
//   {
//     value: "remix",
//     label: "Remix ",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]

export interface ComboboxProp extends Pick<UseChatHelpers, 'setInput'> {
  prompts: string
}

type Rows = {
  rows: Prompts[]
}

type Prompts = {
  act: string
  prompt: string
}

export function Combobox({ setInput,prompts }: ComboboxProp) {
  const rows: Rows = JSON.parse(prompts)
  const frameworks : Prompts[] = rows.rows
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  // const [prompt, setPrompt] = React.useState("")

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
          >
            {value
                ? frameworks.find((framework) => framework.act === value)?.act
                : "Select framework..."}
            {/*{prompt*/}
            {/*    ? frameworks.find((framework) => framework.act === value)?.prompt*/}
            {/*    : "Select framework..."}*/}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                  <CommandItem
                      key={framework.act}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        // setPrompt(framework.prompt)
                      }}
                  >
                    <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.act ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {framework.act}
                  </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
  )
}
