'use client'

import * as React from 'react'
import {UseChatHelpers} from 'ai/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import EmojiPicker from 'emoji-picker-react';


interface IconButtonProps extends ButtonProps, Pick<UseChatHelpers, 'setInput'> {
  act: string
  prompt: string
}

export function IconButton({
                              act,
                              prompt,
                              className,
                              setInput,
                              ...props
                            }: IconButtonProps) {
  return (
      <Button
          variant="outline"
          onClick={() => {setInput(prompt)}}
          className={cn(className)}
          {...props}
      >
        <EmojiPicker />
        {act}
      </Button>
  )
}
