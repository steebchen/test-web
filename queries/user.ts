import { AuthUser } from 'next-firebase-auth'

export interface User extends AuthUser {
  entitlement: string
}

export async function getUser(): Promise<{ user?: User }> {
  const res = await fetch('/api/auth', {
    credentials: 'include',
  })
  return await res.json()
}
