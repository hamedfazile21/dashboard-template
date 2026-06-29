import { Settings } from 'lucide-react'
import React from 'react'

const Setting = () => {
  return (
    <button className='fixed px-5 py-2 bg-blue-500 top-1/2 right-0 rounded-l-xl'>
      <Settings className='text-white animate-spin [animation-duration:2s]' />
    </button>
  )
}

export default Setting
