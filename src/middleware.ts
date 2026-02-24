import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  const token = request.cookies.get('accessToken')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  //jodi token na thake dashboard e jauyar try kore
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if user already logged in and again wants to go login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// middleware work on these route
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}