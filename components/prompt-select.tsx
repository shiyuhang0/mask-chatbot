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

const prompt = GetPrompts()

export function SelectPrompt() {
  return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Act as" />
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

