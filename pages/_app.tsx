import initAuth from '@/lib/auth'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

initAuth()

const inter = Inter({ subsets: ['latin'] })

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          TestWeb
        </title>
      </Head>

      <div className={`h-full ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </>
  )
}
