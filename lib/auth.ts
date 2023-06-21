import { firebaseConfig } from '@/lib/firebase'
import {
  connectFirestoreEmulator,
  getFirestore,
} from '@firebase/firestore'
import { getApp } from 'firebase/app'
import { init } from 'next-firebase-auth'

if (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !process.env.CI) {
  if (!process.env.FBASE_PRIVATE_KEY) {
    throw new Error('FBASE_PRIVATE_KEY is not defined')
  }

  if (!process.env.COOKIE_SECRET) {
    throw new Error('COOKIE_SECRET is not defined')
  }
}

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000

const initAuth = () => {
  init({
    authPageURL: '/signin',
    appPageURL: '/dashboard',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    firebaseAuthEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    firebaseAdminInitConfig: {
      credential: {
        projectId: firebaseConfig.projectId,
        clientEmail: firebaseConfig.clientEmail,
        // Using JSON to handle newline problems when storing the
        // key as a secret in Vercel. See:
        // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
        privateKey: process.env.FBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FBASE_PRIVATE_KEY)
          : undefined,
      },
      databaseURL: firebaseConfig.databaseUrl,
    },
    firebaseClientInitConfig: {
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      databaseURL: firebaseConfig.databaseUrl,
      projectId: firebaseConfig.projectId,
    },
    cookies: {
      name: 'web_auth',
      keys: [
        process.env.COOKIE_SECRET,
      ],
      httpOnly: true,
      maxAge: TWELVE_DAYS_IN_MS,
      overwrite: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      signed: process.env.NODE_ENV === 'production',
    },
  })

  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    console.log('connecting to firestore emulator')
    connectFirestoreEmulator(getFirestore(getApp()), 'localhost', 8080)
  }
}
export default initAuth
