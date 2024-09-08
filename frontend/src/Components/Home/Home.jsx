import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () =>{
   const navigate = useNavigate()
   const userDetails = useSelector((state) =>state.reducer.userDetails)
   const handleLogout = ()=>{
      navigate('/logout')
   }

   const imageUrl = '../../../public/home.png'
  return (
    <div className='min-h-screen br-gray-100 flex items-center justify-center' style={{ backgroundImage: `url(${imageUrl})`}}>
      <div className='bg-opacity-60 bg-black p-8 rounded shadow-md w-full max-w-md'>
         <div className='mb-6'>
            <h1 className='text-2xl font-bold text-center text-white text-opacity-90'>
               Welcome, <span className='text-violet-300'>{userDetails.name}</span>
            </h1>
         </div>
         <img src={userDetails.image}
            alt=''
            className='w-25 h-32 rounded-full mx-auto mb-4 border-black'>
            </img>
         <div className='flex justify-center'>
            <Link to='/profile' className='bg-violet-500 text-white p-2 rounded mr-4'>
               Profile
            </Link>
            <button
            className='bg-red-500 text-white p-2 rounded'
            onClick={handleLogout}>
               Logout
            </button>
         </div>
      </div>
    </div>
  )
};

export default Home
