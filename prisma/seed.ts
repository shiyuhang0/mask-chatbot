import { PrismaClient } from "@prisma/client";
import quotes from "./prompts.json"
const prisma = new PrismaClient();

export async function main() {
  console.log("[Elevator Music Cue] 🎸")
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
