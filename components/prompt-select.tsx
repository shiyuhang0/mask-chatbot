import * as React from "react"
import {GetPrompts} from "@/app/prompts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export async function SelectPrompt({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  const prompt = await GetPrompts()
  const [value, setValue] = React.useState('');
  return (
      <Select value={value} onValueChange={(value)=>setInput(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Act as"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Act as</SelectLabel>
            {prompt.map((item, index) => (
                <SelectItem key={index} value={item.act}>
                  {item.act}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

