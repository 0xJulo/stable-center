import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/my-investments']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Check for wallet auth in cookies or headers
    // Note: Since wallet connection is client-side, we'll check for a session cookie
    // that gets set when the user connects their wallet
    const authCookie = request.cookies.get('wallet-connected')
    
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to homepage if not authenticated
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('auth-required', 'true')
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}