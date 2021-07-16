import { useRouter } from 'next/dist/client/router'
import { parseCookies, setCookie } from 'nookies'
import React, { createContext, FC, useEffect, useState } from 'react'
import api from '../services/api'

type User = {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

type Request = {
  email: string
  password: string
}

type RegisterRequest = {
  name: string
  email: string
  password: string
}

type Response = {
  token: string
  user: User
}

type T = {
  user: User | null
  isAuthenticated: boolean
  signIn: (data: Request) => Promise<void>
  signUp: (data: RegisterRequest) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as T)

export const AuthProvider: FC = ({ children }) => {
  const route = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const { 'AUTH-TOKEN': token } = parseCookies()

  const isAuthenticated = !!token

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/api/user').then((response) => {
        setUser(response.data)
      })
    }
  }, [])

  async function doAuthentication(
    target: string,
    data: Request | RegisterRequest
  ) {
    const response = await api.post(target, data)
    const { token, user }: Response = response.data

    setCookie(undefined, 'AUTH-TOKEN', token, {
      maxAge: 60 * 60 * 1,
      sameSite: 'lax'
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    route.push('/dashboard')
  }

  async function signIn(data: Request) {
    await doAuthentication('/api/login', data)
  }

  async function signUp(data: RegisterRequest) {
    await doAuthentication('/api/register', data)
  }

  async function signOut() {
    if (isAuthenticated) {
      await api.post('/api/logout').then(() => {
        setCookie(undefined, 'AUTH-TOKEN', '', {
          maxAge: 0,
          sameSite: 'lax'
        })

        setUser(null)

        route.push('/')
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
