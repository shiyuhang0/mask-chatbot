import { PrismaClient } from "@prisma/client";
import quotes from "./prompts.json"
const prisma = new PrismaClient();

export async function main() {
  const p = await prisma.prompts.findFirst()
  if (p) {
    console.log("Already seeded 🌱")
    return
  }
  console.log("[Start seed] 🎸")
  for (let quote of quotes) {
    await prisma.prompts.create({
      data: {
        act: quote.act,
        prompt: quote.prompt
      }
    })
  }
  console.log("Done 🎉")
}

main()
