import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GetPrompts() {
  const allPrompts = await prisma.prompts.findMany()
  return ['a','b','c']
}
