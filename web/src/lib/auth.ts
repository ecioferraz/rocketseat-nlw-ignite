import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  avatarUrl: string
  name: string
  sub: string
}

export default function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) throw new Error('Unauthenticated.')

  return jwtDecode(token)
}
