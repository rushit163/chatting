import React from 'react'
import Register from './register'
import { useContext } from 'react'
import { userContext } from './userContext'
import Chat from './Chat'
const Routes = () => {
    const {username} = useContext(userContext);
    if(username){
     return <Chat/>
    }
  return (
    <Register/>
  )
}

export default Routes
