'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner } from '@/components/ui/icons'

interface IconButtonProps extends ButtonProps {
  act?: string
  prompt?: string
}

export function IconButton({
                              act = 'Login with GitHub',
                              className,
                              ...props
                            }: IconButtonProps) {
  return (
      <Button
          variant="outline"
          onClick={() => {}}
          className={cn(className)}
          {...props}
      >
        <IconGitHub className="mr-2" />
        {act}
      </Button>
  )
}
