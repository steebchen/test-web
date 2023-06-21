import { getUser } from '@/queries/user'
import { withAuthUser } from 'next-firebase-auth'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'

const Home = () => {
  const { data } = useQuery('user', getUser)

  return (
    <div className="h-full isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC"/>
              <stop offset={1} stopColor="#FF80B5"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">TestWeb</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href={data?.user?.id ? '/dashboard' : '/signin'}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <span>
                Signin <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </nav>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <Link
                href={data?.user?.id ? '/dashboard' : '/signin'}
                className="rounded-md bg-indigo-600 px-8 py-3 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-lg focus-visible:outline-indigo-600"
              >
                Get TestWeb ➔
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withAuthUser()(Home)
