import React from 'react'
import Register from './register'
import { useContext } from 'react'
import { userContext } from './userContext'
const Routes = () => {
    const {username} = useContext(userContext);
  return (
    <Register/>
  )
}

export default Routes
