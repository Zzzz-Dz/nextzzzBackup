import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
 
export async function POST(request) {
  const params = await request.json()
  const map_params = new Map(Object.entries(params))
  const cookieStore = cookies();
  const username = map_params.get('username')
  const password = map_params.get('password')
 
  try {
    
    if (!username || !password) throw new Error('username and password required');
    await sql`INSERT INTO users (username, password) VALUES (${username}, ${password});`;

  } catch (error) {
    return NextResponse.json({ code: "502" , msg: "该用户已存在" , data: error }, { status: 200 });
  }
  cookieStore.set({
    name: "Yaname",
    value: "allow",
    httpOnly: true,
    path: "/",
    maxAge: 604800
  });
  return NextResponse.json({ code: "201" , msg: "用户注册成功" }, { status: 200 });
}