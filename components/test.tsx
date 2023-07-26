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

async function add(input) {
  console.log('input')
  console.log('add')
  redirect('/')
}

export function DialogDemo() {
  const [input, setInput] = useState('');
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Prompt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Prompt</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="act" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="prompt" onChange={e => setInput(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="outline" onClick={async () => add(input)}>
              Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
