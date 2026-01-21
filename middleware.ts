import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  console.log("Middleware executed. Token:", token);

  // Redirect authenticated users away from login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect /users and /services routes
  const protectedRoutes = ["/","/admin/users", "/admin/services"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Only run middleware on specific routes
export const config = {
  matcher: ["/","/users/:path*", "/services/:path*"], // protect these routes
};


