import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: 4000,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  const { searchParams } = new URL(request.url)
  let userId = searchParams.get('userId')
  if (userId === null) {
    userId = '0'
  }

  const [rows, fields] = await connection.execute('SELECT act,prompt FROM `prompts` where userId=0 or userId=? limit 300', [userId]);

  return NextResponse.json({ rows })
}

export async function POST(request: Request) {
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: 4000,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  const payload = await request.json()

  if (payload === null) {
    return NextResponse.json({ success: false })
  }

  const act = payload.act
  const prompt = payload.prompt
  let userId = payload.userId
  if (userId === null || userId === undefined) {
     userId = -1
  }

  await connection.execute('INSERT INTO `prompts` (act,prompt,userId) values (?,?,?)',[act,prompt,userId]);

  return NextResponse.json({ success: true })
}
