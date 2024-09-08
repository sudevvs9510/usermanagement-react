import React, { useState } from 'react'
import { emailValidation, nameValidation, passwordValidation } from '../../assets/Scripts/Validations';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


const Signup = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [nameError, setNameError] = useState('')
   const [emailError, setEmailError] = useState('')
   const [passwordError, setPasswordError] = useState('')
   const [confirmPasswordError, setConfirmPasswordError] = useState('')
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const changeInData = (e) =>{
      const {name, value} = e.target;
      switch (name) {
         case 'name':
            setName(value);
            setNameError('')
            break;
         case 'email':
            setEmail(value);
            setEmailError('');
            break;
         case 'password':
            setPassword(value);
            setPasswordError('')
            break;
         case 'confirmPassword':
            setConfirmPassword(value);
            setConfirmPasswordError('')
            break;
         default: 
         break;
      }
   }

   const validate = async () =>{
      let check = true
      if(!nameValidation(name, setNameError)){
         check = false;
      }

      if(!emailValidation(email, setEmailError)){
         check = false;
      }
      if(password !== confirmPassword || confirmPassword === ''){
         setPasswordError('Confirm password properly')
         check = false;
      }
      if(!passwordValidation(password, setPasswordError)){
         check = false 
      }
      if(!check){
         return false
      }

   const response = await fetch(`http://localhost:5000/register`,{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ email, password, name }),
   });

   if(response.status === 201) {
      setEmailError('!! Account already exists !!');
   } else if(response.status === 200){
      window.location.href = '/login'
   } else {
      alert('error');
   }
}

   const imageUrl = '../../../public/main-img.png'
  return (
    <div className='min-h-screen flex items-center justify-center'style={{backgroundImage : `url(${imageUrl})` , backgroundSize: 'cover'}}>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
         <h1 className='text-3xl text-center text-violet-500  font-bold mb-6'>Signup</h1>
         <form action=''>
            
            <div className='mb-4'>
               <label htmlFor="name" className='block mb-1'>Name</label>
               <input type='text' id='name' name='name'
               className='w-full p-2 border border-gray-300 rounded'
               value={name}
               onChange={changeInData}
               required 
               />
               {nameError && (
                  <span className='text-red-500 txt-sm'>{nameError}</span>
               )}
            </div>
            
            <div className='mb-4'>
               <label htmlFor="email" className='block mb-1'>Email</label>
               <input type='email' id='email' name='email' className='w-full p-2 border -gray-300 rounded'
               value={email}
               onChange={changeInData}
               required
                />
                {emailError && (
                  <span className='text-red-200 text-sm'>{emailError}</span>
                )}
            </div>

            <div className='mb-4 relative'>
               <label htmlFor='password' className='block mb-1'>Password</label>
               <div className='relative flex items-center'>
                  <input type={showPassword ? 'text' : 'password'} 
                  id='password' name='password'
                  className='w-full p-2 border border-gray-300 rounded pr-10'
                  value={password} onChange={changeInData}
                  required
                  />
                  <div className='absolute top-0 right-0 cursor-pointer mr-2 mt-5'
                  onClick={()=> setShowPassword(!showPassword)}
                  >
                     {showPassword ? (
                        <AiOutlineEyeInvisible size = {20} />
                     ) : (
                        <AiOutlineEye size={20} />
                     )}
                  </div>
               </div>
               {password && (
                  <span className='text-red-500 text-sm'>{passwordError}</span>
               )}
            </div>

            <div className='mb-4 relative'>
               <label htmlFor="confirmpassword" className='block mb-1'>
                  Confirm Password
               </label>
              <div className="relative flex items-center">
               <input type={showConfirmPassword ? 'text' : 'password'}
               id='confirmPassword' name='confirmPassword'
               className='w-full p-2 border border-gray-300 rounded pr-10'
               value={confirmPassword}  onChange={changeInData}
               required  
               />
               <div className='absolute top-0 right-0 cursor-pointer mr-2 mt-3'
               onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
               >
                  {showConfirmPassword ? (
                     <AiOutlineEyeInvisible size={20} />
                  ) : (
                     <AiOutlineEye size={20} />
                  )}
               </div>
              </div>
              {confirmPasswordError && (
               <span className='text-red-500 text-sm'>
                  {confirmPasswordError}
               </span>
              )}

            </div>
            <button type='button' onClick={validate} className='bg-violet-500 text-white p-2 rounded w-full'>
               Sign up
            </button>
         </form>
      </div>
    </div>
  )
}

export default Signup
