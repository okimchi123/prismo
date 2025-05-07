import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

const publicRoutes = ['/', '/register'];
const privateRoutes = ['/dashboard', '/friends']
export async function middleware(request) {
  console.log("running middleware")
  const token = request.cookies.get('token')?.value
  const user = await verifyToken(token)
  const urlPath = request.nextUrl.pathname;

    console.log(urlPath)
  if (user && publicRoutes.includes(urlPath)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!user && privateRoutes.some(route => urlPath.startsWith(route))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
    matcher: ['/', '/register', '/dashboard', '/friends'],
  };
  