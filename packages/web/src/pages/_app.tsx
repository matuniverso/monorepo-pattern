import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import 'tailwindcss/tailwind.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
