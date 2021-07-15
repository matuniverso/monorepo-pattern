import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'

type Request = {
  email: string
  password: string
}

const Home: FC = () => {
  const { signIn } = useContext(AuthContext)
  const { register, handleSubmit } = useForm()

  const onsubmit = handleSubmit(async (data: Request) => {
    await signIn(data)
  })

  return (
    <div className="grid w-screen h-screen bg-gray-100 place-items-center">
      <div className="px-10 py-16 bg-white rounded shadow-lg">
        <h1 className="mb-12 text-2xl text-center">Sign in</h1>

        <form onSubmit={onsubmit} className="flex flex-col">
          <div className="relative mb-8">
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="Email"
              className="px-2 py-1 placeholder-transparent transition-all rounded focus:ring-indigo-500 peer focus:outline-none ring"
              autoComplete="off"
              required
              autoFocus
            />
            <label
              htmlFor="email"
              className="absolute left-0 text-sm transition-all peer-placeholder-shown:text-base -top-6 peer-placeholder-shown:text-gray-500 cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:left-2">
              E-mail Address
            </label>
          </div>

          <div className="relative mb-6">
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="Password"
              className="px-2 py-1 placeholder-transparent transition-all rounded focus:ring-indigo-500 peer focus:outline-none ring"
              autoComplete="off"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 text-sm transition-all peer-placeholder-shown:text-base -top-6 peer-placeholder-shown:text-gray-500 cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:left-2">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="p-2 mb-4 font-semibold text-white bg-purple-500 rounded ring ring-purple-500">
            Sign in
          </button>
        </form>

        <div className="text-sm text-center">
          <span className="text-gray-500">Do not have an account?</span>
          <Link href="/register">
            <a className="ml-1">Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
