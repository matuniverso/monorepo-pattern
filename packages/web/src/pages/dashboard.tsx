import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

const Dashboard: FC = () => {
  const { user, signOut } = useContext(AuthContext)
  const { handleSubmit } = useForm()

  const onsubmit = handleSubmit(async () => {
    await signOut()
  })

  return (
    <div className="grid w-screen h-screen bg-gray-100">
      <div className="text-center place-self-center">
        <h1 className="text-xl">
          Hello <span className="font-semibold">{user?.name}!</span>
        </h1>
        <h2>You are logged in :)</h2>
        <form onSubmit={onsubmit}>
          <button type="submit" className="font-bold">
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'AUTH-TOKEN': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Dashboard
