import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GetPrompts() {
  const allPrompts = await prisma.prompts.findMany()
  console.log(allPrompts)
  const exampleMessages = [
    {
      act: 'Explain technical concepts',
      prompt: `What is a "serverless function"?`
    },
    {
      act: 'Summarize an article',
      prompt: 'Summarize the following article for a 2nd grader: \n'
    },
    {
      act: 'Draft an email',
      prompt: `Draft an email to my boss about the following: \n`
    }
  ]
  return exampleMessages
}
