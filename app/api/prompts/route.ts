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

  const [rows, fields] = await connection.execute('SELECT act,prompt FROM `prompts` limit 50');

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

  await connection.execute('INSERT INTO `prompts` values (?,?)',[act,prompt]);

  return NextResponse.json({ success: true })
}
