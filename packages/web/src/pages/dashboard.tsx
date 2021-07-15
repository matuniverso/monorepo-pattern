import React, { FC, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Dashboard: FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="grid place-items-center">
        <h1 className="text-xl">Hello {user?.name}</h1>
        <h2>You are logged in!</h2>
      </div>
    </div>
  )
}

export default Dashboard
