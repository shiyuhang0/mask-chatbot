"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {redirect} from "next/navigation";
import {Input} from "@/components/ui/input";

const FormSchema = z.object({
  RoleName: z
  .string({
    required_error: "Please enter role name.",
  }),
  Prompt: z.string({
    required_error: "Please enter prompt.",
  })
})

export function PromptAdd() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
     console.log(data)
     redirect('/')
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
              control={form.control}
              name="RoleName"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>RoleName</FormLabel>
                      <FormControl>
                        <Input placeholder="the role name" {...field} />
                      </FormControl>
                    <FormDescription>
                      Please enter the role name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="Prompt"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input placeholder="the prompt name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )
}
