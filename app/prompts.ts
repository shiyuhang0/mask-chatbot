// import { PrismaClient } from '@prisma/client'
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
// const prisma = new PrismaClient()

// type Prompt = {
//   id: number
//   act: string
//   prompt: string
// }
//
// export const getServerSideProps: GetServerSideProps<{
//   prompt: Prompt
// }> = async () => {
//
//   const allPrompts = await prisma.prompts.findMany()
//
// }
//
// export default function Page({
//                                repo,
//                              }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return repo.stargazers_count
// }

export async function GetPrompts() {
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
