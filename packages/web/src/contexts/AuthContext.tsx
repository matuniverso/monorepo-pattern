import { useRouter } from 'next/dist/client/router'
import { setCookie } from 'nookies'
import React, { createContext, FC, useState } from 'react'
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
}

export const AuthContext = createContext({} as T)

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const route = useRouter()

  const isAuthenticated = !!user

  async function signIn(data: Request) {
    const { token, user }: Response = await api.post('/api/login', data)

    setUser(user)

    setCookie(undefined, 'AUTH-TOKEN', token, {
      maxAge: 60 * 60 * 1, // 1h
      sameSite: 'lax'
    })

    route.push('/dashboard')
  }

  async function signUp(data: RegisterRequest) {
    const { token, user }: Response = await api.post('/api/register', data)

    setUser(user)

    setCookie(undefined, 'AUTH-TOKEN', token, {
      maxAge: 60 * 60 * 1, // 1h
      sameSite: 'lax'
    })

    route.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
