import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-700 text-white flex flex-col justify-center items-center'>
        <div className="logo font-bold text-white text-2xl"> <span className='text-green-400'>&lt;</span>vis
                   <span className='text-green-400'>Pass&gt;</span>
                </div>
        <div className='flex justify-center items-center'>
      Created with<img className='w-8 mx-2' src="icons/heart.png" alt="" />love by Vishal Jagdale
    </div>
    </div>
  )
}

export default Footer
