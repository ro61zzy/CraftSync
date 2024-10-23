// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req });
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));  // Redirect to sign-in page if not authenticated
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],  // Apply middleware to dashboard routes
};
