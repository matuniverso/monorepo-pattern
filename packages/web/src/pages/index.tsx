import React, { FC } from 'react'
import { useForm } from 'react-hook-form'

const Home: FC = () => {
  const { register, handleSubmit } = useForm()

  const onsubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="grid w-screen h-screen place-items-center">
      <div className="px-10 py-16 bg-white rounded shadow-lg">
        <form onSubmit={onsubmit} className="flex flex-col">
          <div className="relative mb-7">
            <input
              {...register('email')}
              type="text"
              id="email"
              placeholder="Email"
              className="px-2 py-1 placeholder-transparent transition-all rounded focus:ring-indigo-500 peer focus:outline-none ring"
              autoComplete="off"
            />
            <label
              htmlFor="email"
              className="absolute left-0 text-sm transition-all peer-placeholder-shown:text-base -top-6 peer-placeholder-shown:text-gray-500 cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:left-2">
              E-mail Address
            </label>
          </div>

          <div className="relative mb-3">
            <input
              {...register('password')}
              type="password"
              id="password"
              placeholder="Password"
              className="px-2 py-1 placeholder-transparent transition-all rounded focus:ring-indigo-500 peer focus:outline-none ring"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="absolute left-0 text-sm transition-all peer-placeholder-shown:text-base -top-6 peer-placeholder-shown:text-gray-500 cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:left-2">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="p-2 font-semibold text-white bg-purple-500 rounded ring ring-purple-500">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
