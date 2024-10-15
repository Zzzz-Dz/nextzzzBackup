import { cookies } from "next/headers";

export async function GET(){
    if (cookies().get("Yaname")?.value){
        return new Response("have",{status:200, headers:{"Content-Type":"text/plain"}})
    }
    return new Response('',{status:200, headers:{"Content-Type":"text/plain"}})
}