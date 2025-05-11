import { NextResponse } from "next/server";

const privateRoutes = ["/dashboard", "/friends"];
const publicRoutes = ["/", "/register"];

export function middleware(request) {
  const token = request.cookies.get("__session")?.value;
  const urlPath = request.nextUrl.pathname;

  const isProtectedRoute = privateRoutes.some((route) =>
    urlPath.startsWith(route)
  );

  const isPublicRoute = publicRoutes.includes(urlPath);

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/friends/:path*",
    "/register",
    "/",
  ],
};
