import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-700 text-white'>
            <div className='mycontainer flex justify-between items-center py-5 px-4 h-14'>
                <div className="logo font-bold text-white text-2xl"> <span className='text-green-400'>&lt;</span>vis
                   <span className='text-green-400'>Pass&gt;</span>
                </div>
                <ul>
                    {/* <li className='flex gap-4'>
                        <a className='hover:font-bold' href="/">Home</a>
                        <a className='hover:font-bold' href="#">About</a>
                        <a className='hover:font-bold' href="#">Contact</a>


                    </li> */}
                </ul>
                <button className='text-white bg-green-850 my-4 rounded-full flex gap-2 justify-between items-center ring-white'>
                 
                    <img  className='invert w-10 p-1.5'src="icons/github.png" alt="github logo" />
                    <span className='font-bold px-1 '>GitHub</span>
                    </button>
                </div>
           
          
        </nav>
    )
}

export default Navbar
