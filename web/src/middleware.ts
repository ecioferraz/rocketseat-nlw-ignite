import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export default function middleware({ cookies, url }: NextRequest) {
  const token = cookies.get('token')?.value

  const headers = {
    'Set-Cookie': `redirectTo=${url}; Path=/; HttpOnly; max-age=20`,
  }

  return !token
    ? NextResponse.redirect(signInURL, { headers })
    : NextResponse.next()
}

export const config = { matcher: '/memories/:path*' }
