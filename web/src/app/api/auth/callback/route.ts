import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET({ url }: NextRequest) {
  const code = new URL(url).searchParams.get('code')

  const {
    data: { token },
  } = await api.post('/register', { code })

  const redirectURL = new URL('/', url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
