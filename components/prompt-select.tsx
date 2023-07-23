import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectPrompt() {
  return (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Act as" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/*<SelectLabel>Fruits</SelectLabel>*/}
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

