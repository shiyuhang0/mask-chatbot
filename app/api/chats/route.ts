import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: 4000,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PSWD,
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  const payload = await request.json()
  console.log(payload)

  if (payload === null) {
    return NextResponse.json({ success: false })
  }

  const id = payload.id
  const title = payload.title
  const userId = payload.userId
  const createdAt = payload.createdAt
  const path = payload.path
  const messages = JSON.stringify(payload.messages)

  await connection.execute('INSERT INTO `chats` (id, title, userId, createdAt, path, messages) VALUES (?, ?, ?, ?, ?, ?)', [id, title, userId, createdAt, path, messages]);

  return NextResponse.json({ success: true })
}

export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: 4000,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PSWD,
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  const { searchParams } = new URL(request.url)

  // get userId from url
  // const query = Object.fromEntries(new URLSearchParams(url.split('?')[1]))
  // console.log(query)
  // const userId = query.userId
  // const id = query.id

  const userId = searchParams.get('userId')
  const id = searchParams.get('id')

  console.log(userId)
  console.log(id)

  if (userId !== null) {
    const [rows, fields] =  await connection.execute('SELECT * FROM `chats` where userId=?', [userId]);
    return NextResponse.json({ rows })
  }

  if (id !== null) {
    const [rows, fields] =  await connection.execute('SELECT * FROM `chats` where userId=?', [userId]);
    return NextResponse.json({ rows })
  }

  return  NextResponse.json({ success: false })
}
