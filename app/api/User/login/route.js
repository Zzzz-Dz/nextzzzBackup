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
    // 登录账户，验证密码,返回token

    if (!username || !password) throw new Error('username and password required');

    const userdata = await sql`select password from users where username=${username}`
    
    if (userdata.rowCount === 0){
      return NextResponse.json({code:"502" , msg: "用户不存在" , data: "数据库中未找到该用户" },{ status: 200 })
    }
    
    if (userdata.rows[0].password === password) {
      cookieStore.set({
        name: "Yaname",
        value: "allow",
        httpOnly: true,
        path: "/",
        maxAge: 604800
      });
      return NextResponse.json({ code:"201" , msg: "用户登录成功"},{ status: 200 })
  }
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
  return NextResponse.json({ code: "501" , msg: "用户密码错误" , data: "用户密码错误" },{ status: 200 })
}