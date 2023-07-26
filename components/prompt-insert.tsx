'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";
import {AddPrompt} from "@/app/actions";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";

export function InsertPrompt() {
  const [act, setAct] = useState('');
  const [prompt, setPrompt] = useState('');
  const router = useRouter()

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Prompt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Prompt</DialogTitle>
            <DialogDescription>
              Add prompt here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="act" className="text-right">
                Act
              </Label>
              <Input id="act" onChange={e => setAct(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prompt" className="text-right">
                Prompt
              </Label>
              <Textarea id="prompt" onChange={e => setPrompt(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={async () => {
                await AddPrompt(act, prompt)
                router.refresh()
                router.push('/')
              }}>
                Save </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
