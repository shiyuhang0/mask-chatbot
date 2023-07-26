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
import {redirect} from "next/navigation";
import {useState} from "react";
import {AddPrompt} from "@/app/actions";

async function add(act,prompt) {
  await AddPrompt(act,prompt)
  redirect('/')
}

export function AddPrompt() {
  const [act, setAct] = useState('');
  const [prompt, setPrompt] = useState('');

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
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="act" className="text-right">
                Name
              </Label>
              <Input id="act" onChange={e => setAct(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="prompt" className="text-right">
                Username
              </Label>
              <Input id="prompt" onChange={e => setPrompt(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={async () => await add(act, prompt)}>
              Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
