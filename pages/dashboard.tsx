import { getUser } from '@/queries/user'
import {
  AuthAction,
  withAuthUser,
} from 'next-firebase-auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'


const Dashboard = () => {
  const router = useRouter()
  const { data, isLoading } = useQuery('user', getUser)

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  // this is crucial as user might be null after loading, which means the user is unauthenticated
  if (!data?.user) {
    // TODO report error here, this should never occur as withAuthUser should handle it
    // this might only occur on weird occasions
    console.log('AJJAJAAJAJAJAAJAJAJAJAJJ data', data)
    router.push('/signin')
    return <></>
  }

  return (
    <div className="container mx-auto p-4">
      <p>Your email is {data.user.email || 'unknown'}.</p>

      {data.user.entitlement ? (
        <span>You are on the pro plan!</span>
      ) : (
        <Link href="/api/checkout?price=price_1NK1x2HswoEj4ONTLeBs7Zni">
          Upgrade now for only $67!
        </Link>
      )}
    </div>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard)
