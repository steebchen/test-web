import { NextApiRequest } from 'next'
import {
  AuthUser,
  getUserFromCookies,
  verifyIdToken,
} from 'next-firebase-auth'

export async function getUserByToken(req: NextApiRequest): Promise<AuthUser | null> {
  if (!req.headers.authorization) {
    return null
  }

  let user: AuthUser
  try {
    user = await verifyIdToken(req.headers.authorization)
  } catch (e) {
    console.error(e)
    return null
  }

  if (!user.id) {
    return null
  }

  return user
}

export async function getUserByCookies(req: NextApiRequest): Promise<AuthUser | null> {
  let user: AuthUser
  try {
    user = await getUserFromCookies({
      req,
      includeToken: true,
    })
  } catch (e) {
    console.error(e)
    return null
  }

  if (!user.id) {
    return null
  }

  return user
}
