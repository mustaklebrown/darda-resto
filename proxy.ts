import { auth } from '@/lib/auth';
import { type NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    // Redirect to login if no session
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check for admin role if the path starts with /admin
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    session.user.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
