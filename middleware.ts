import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOG_ORIGIN = 'https://app.aeo.how';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The external blog app's own links use its real base path (/wtp-advisory/blog/*).
  // Redirect those back to the clean /blog/* URL so the address bar stays tidy.
  if (
    pathname === '/wtp-advisory/blog' ||
    pathname.startsWith('/wtp-advisory/blog/')
  ) {
    const cleanPath = pathname.replace('/wtp-advisory/blog', '/blog');
    return NextResponse.redirect(
      new URL(`${cleanPath}${request.nextUrl.search}`, request.url)
    );
  }

  // Transparently proxy /blog and /blog/* to the external blog app.
  if (pathname === '/blog' || pathname.startsWith('/blog/')) {
    const targetPath = pathname.replace('/blog', '/wtp-advisory/blog');
    return NextResponse.rewrite(
      new URL(`${BLOG_ORIGIN}${targetPath}${request.nextUrl.search}`)
    );
  }

  // When a /blog page requests its own static assets, serve them from the external app.
  const referer = request.headers.get('referer') || '';
  if (
    (pathname.startsWith('/_next/static/') || pathname.startsWith('/static/')) &&
    referer.includes('/blog')
  ) {
    return NextResponse.rewrite(new URL(`${BLOG_ORIGIN}${pathname}`));
  }
}

export const config = {
  matcher: [
    '/blog',
    '/blog/:path*',
    '/wtp-advisory/blog',
    '/wtp-advisory/blog/:path*',
    '/_next/static/:path*',
    '/static/:path*',
  ],
};
