import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET({ cookies, url }: NextRequest) {
  const code = new URL(url).searchParams.get('code')

  const redirectTo = cookies.get('redirectTo')?.value

  const {
    data: { token },
  } = await api.post('/register', { code })

  const redirectURL = redirectTo ?? new URL('/', url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
