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
    <div className="w-screen h-screen bg-gray-100">
      <div className="grid place-items-center">
        <h1 className="text-xl">Hello {user?.name}</h1>
        <h2>You are logged in!</h2>
        <form onSubmit={onsubmit}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['AUTH-TOKEN']: token } = parseCookies(ctx)

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
