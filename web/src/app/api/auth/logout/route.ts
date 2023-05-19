import { NextRequest, NextResponse } from 'next/server'

export async function GET({ url }: NextRequest) {
  const redirectURL = new URL('/', url)

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0`,
    },
  })
}
