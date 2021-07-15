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
  const [user, setUser] = useState<User | null>(null)
  const route = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'AUTH-TOKEN': token } = parseCookies()

    if (token) {
      api.get('/api/user').then((response) => {
        setUser(response.data)
      })
    }
  }, [])

  async function signIn(data: Request) {
    const response = await api.post('/api/login', data)
    const { token, user }: Response = response.data

    setCookie(undefined, 'AUTH-TOKEN', token, {
      maxAge: 60 * 60 * 1,
      sameSite: 'lax',
      secure: true
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    route.push('/dashboard')
  }

  async function signUp(data: RegisterRequest) {
    const response = await api.post('/api/register', data)
    const { token, user }: Response = response.data

    setCookie(undefined, 'AUTH-TOKEN', token, {
      maxAge: 60 * 60 * 1,
      sameSite: 'lax',
      secure: true
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    route.push('/dashboard')
  }

  async function signOut() {
    if (isAuthenticated) {
      await api.post('/api/logout').then(() => {
        setUser(null)

        setCookie(undefined, 'AUTH-TOKEN', '', {
          maxAge: 0,
          sameSite: 'lax',
          secure: true
        })

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
