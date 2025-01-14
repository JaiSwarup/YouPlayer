import { auth as getSession } from '@/lib/auth'
import { NextResponse, type NextRequest } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    const session = await getSession();

    // Redirect logic for protected routes
    const protectedRoutes = ["/dashboard", "/profile"]; // Add your protected routes here
    const isProtected = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    if (isProtected && !session) {
      // Redirect to sign-in if user is not authenticated
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect logged-in users away from the public pages
    if (request.nextUrl.pathname === "/" && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error("Error in NextAuth middleware:", error);

    // Default response if something goes wrong
    return NextResponse.next();
  }
};
