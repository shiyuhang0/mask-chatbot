import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from 'fs';
import csvParser from 'csv-parser';

export async function main() {
  const p = await prisma.prompts.findFirst()
  if (p) {
    console.log("Already seeded 🌱")
    return
  }
  const datas = await parseCSV("./prisma/prompts.csv")
  console.log("[Start seed "+datas.length+ " datas] 🎸")
  await prisma.prompts.createMany({data: datas})
  console.log("Done 🎉")
}

type CSVData = {
  act: string;
  prompt: string;
};

function parseCSV(filePath: string): Promise<CSVData[]> {
  return new Promise((resolve, reject) => {
    const results: CSVData[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: any) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
}

main()
