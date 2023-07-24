import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '2MrUVkjqnTdnTJ5.vu-mV5Mto5d',
    password: 'ddQvQ8jmk5cOX!55QqMGCsCf9dXm0FZVAmQS',
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  const [rows, fields] = await connection.execute('SELECT act,prompt FROM `prompts` limit 10');

  return NextResponse.json({ rows })
}
