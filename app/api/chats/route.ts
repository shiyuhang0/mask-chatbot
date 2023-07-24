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
  console.log(id, title, userId, createdAt, path, messages)

  await connection.execute('INSERT INTO `chats` (id, title, userId, createdAt, path, messages) VALUES (?, ?, ?, ?, ?, ?)', [id, title, userId, createdAt, path, messages]);

  return NextResponse.json({ success: true })
}
