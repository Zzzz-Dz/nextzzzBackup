export async function GET() {
  const data = {message:"hello"}
 
  return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}})
}
