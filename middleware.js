import { NextResponse } from 'next/server'


// 重定向  使用new URL无效，因为request.url是相对路径
// return NextResponse.redirect(new URL('/:path', request.url))将传入请求重定向到其他URL
// return NextResponse.rewrite(new URL('/:path', request.url)) 通过显示给定的URL重写响应
 
// This function can be marked `async` if using `await` inside

export function middleware(request) {
  if (request.nextUrl.pathname === "/"){
    return NextResponse.redirect(new URL('/Home', request.url))
}
  if (request.nextUrl.pathname === "/ReadNovel"){
    return null
}
  
}

 
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径,除了以下开头的路径:
     * - api (API 路由)
     * - _next/static (静态文件)
     * - _next/image (图像优化文件)
     * - favicon.ico (网站图标文件)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};