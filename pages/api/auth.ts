import initAuth from '@/lib/auth'
import { getUserByCookies } from '@/lib/user'
import { firestore } from 'firebase-admin'
import {
  NextApiRequest,
  NextApiResponse,
} from 'next'

initAuth()

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const user = await getUserByCookies(req)
  if (!user) {
    return res.status(200).json({ message: 'Unauthorized' })
  }

  const snapshot = await firestore().doc('users/' + user.id).get()

  return res.status(200).json({
    user: {
      ...user,
      ...snapshot?.data(),
    },
  })
}

export default handler
