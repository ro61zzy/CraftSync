// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  const { pathname } = req.nextUrl;
  
  // If the user is not an admin, prevent access to admin routes
  if (pathname.startsWith('/dashboard/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));  // Redirect to general dashboard
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],  // Apply middleware to dashboard routes
};
