import StyledFirebaseAuth from '@/components/auth'
import { getUser } from '@/queries/user'
import { getFirestore } from '@firebase/firestore'
import { getApp } from 'firebase/app'
import {
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth'
import firebaseui from 'firebaseui'
import {
  AuthAction,
  withAuthUser,
} from 'next-firebase-auth'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import '../firebase'

// Configure FirebaseUI.
const uiConfig: firebaseui.auth.Config = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    GoogleAuthProvider.PROVIDER_ID,
    'apple.com',
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

function SignInScreen() {
  const fs = getFirestore(getApp())
  const auth = getAuth(getApp())
  const router = useRouter()
  const { refetch } = useQuery('user', getUser)

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      if (user) {
        refetch()
      }
    })
    return () => unregisterAuthObserver()
  }, [auth, fs, refetch, router])

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to TestWeb
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(SignInScreen)
