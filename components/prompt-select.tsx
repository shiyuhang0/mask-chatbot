import * as React from "react"
import { UseChatHelpers } from 'ai/react'
import DigestClient from "digest-fetch"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import mysql from 'mysql2'

type Prompts = {
  act: string
  prompt: string
}

async function GetPrompts() {
  // const user = 'dOLWR0iB'
  // const password = '0b3b89c1-8b9a-4fea-95ed-ee40be076e3c'
  // const client = new DigestClient(user, password)
  // const url = 'https://eu-central-1.data.tidbcloud.com/api/v1beta/app/dataapp-Abaflmck/endpoint/prompt'
  // const options = {}
  // const resp = await client.fetch(url, options)
  // const data = await resp.json()
  // const prompts: Prompts[] = JSON.parse(data).data.rows
  // return prompts

  // // use digest auth
  // const resp = await fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: c
  //   }
  // })
  // const data = await resp.json()
  // const prompts: Prompts[] = JSON.parse(data).data.rows
  // return prompts

  // get the client

  let prompts: Prompts[]
// create the connection to database
  const connection = mysql.createConnection({
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '2MrUVkjqnTdnTJ5.vu-mV5Mto5d',
    password: 'ddQvQ8jmk5cOX!55QqMGCsCf9dXm0FZVAmQS',
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

// simple query
  connection.query(
      'SELECT act,prompt FROM `prompts` limit 10',
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        prompts = JSON.parse(JSON.stringify(results))
      }
  );
  return prompts
}

export async function SelectPrompt({setInput}: Pick<UseChatHelpers, 'setInput'>) {
  const prompts: Prompts[] = await GetPrompts()
  return (
      <Select onValueChange={(value) => setInput(value)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Act as"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Act as</SelectLabel>
            {prompts.map((item, index) => (
                <SelectItem key={index} value={item.prompt}>
                  {item.act}
                </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

