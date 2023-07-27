'use client'

import * as React from 'react'
import {UseChatHelpers} from 'ai/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import EmojiPicker, {Emoji,EmojiStyle} from 'emoji-picker-react';

export function EmojiAvatar(props: { avatar: string; size?: number }) {
  return (
      <Emoji
          unified={props.avatar}
          size={props.size ?? 18}
      />
  );
}

interface IconButtonProps extends ButtonProps, Pick<UseChatHelpers, 'setInput'> {
  act: string
  prompt: string
  id: string
}

export function IconButton({
                              act,
                              prompt,
                              id,
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
        {/*<div className="ml-1">*/}
        {/*  {<EmojiAvatar avatar={id} />}*/}
        {/*</div>*/}
        {act}
      </Button>
  )
}
