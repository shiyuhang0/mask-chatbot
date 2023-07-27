'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
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

export function InsertPrompt(id: number) {
  const [act, setAct] = useState('');
  const [prompt, setPrompt] = useState('');
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Prompt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Prompt</DialogTitle>
            <DialogDescription>
              <p className="leading-normal text-muted-foreground">
                Customize your prompt and click save to store them.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="act" className="text-center">
                Act
              </Label>
              <Input id="act" onChange={e => setAct(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4 justify-center">
              <Label htmlFor="prompt" className="text-center">
                Prompt
              </Label>
              <Textarea id="prompt" onChange={e => setPrompt(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
              <Button type="submit" onClick={async () => {
                await AddPrompt(act, prompt, id)
                setOpen(false)
                router.refresh()
                router.push('/')
              }}>
                Save </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
