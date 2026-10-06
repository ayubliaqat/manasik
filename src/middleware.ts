import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((request) => {
  const { pathname } = request.nextUrl

  const isProtectedRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/")

  if (isProtectedRoute && !request.auth) {
    const loginUrl = new URL("/login", request.nextUrl.origin)

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname + request.nextUrl.search
    )

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ],
}
