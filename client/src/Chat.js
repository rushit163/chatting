import React from 'react'
import { useEffect } from 'react'
const Chat = () => {
  useEffect(()=>{
    new WebSocket('ws://localhost:5000')
  },[])
  return (
    <div className='flex h-screen '>
        <div className='bg-blue-100 w-1/3'>Constacts</div>
        <div className='bg-blue-50 flex flex-col w-2/3 p-2'>
        <div className='flex-grow'>Message with selected Person</div>
        <div className='flex gap-2'>
            <input type='text' placeholder='type yout message here'  className='border p-2 bg-white flex-grow'/>
            <button className='bg-blue-500 p-2 text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            </button>
        </div>
        </div>
    </div>
  )
}

export default Chat
