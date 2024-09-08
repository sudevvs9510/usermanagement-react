import React, { useState } from 'react';
import { emailValidation, passwordValidation } from '../../assets/Scripts/Validations';
import { useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {

   const [hide, setHide] = useState(true)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [emailErr, setEmailErr] = useState('')
   const [passwordErr, setPasswordErr] = useState('')
   const [error, setErr] =useState('Have an account');
   const Error = useSelector(state => state.reducer.adminError);

   const changeInData = (e)=>{
      const {name, value} = e.target;
      setErr('Have an account');
      switch(name){
         case 'email':
            setEmail(value)
            setEmailErr('')
            break;
         case 'password':
            setPassword(value)
            setPasswordErr('')
            break;
         default:
            break;
      }
   }


   const validate = async () =>{
      let check = true 
      if(!emailValidation(email, setEmailErr)){
         check = false
      }
      if(!passwordValidation(password, setPasswordErr)) {
         check = false
      }
      if(!check){
         return false;
      } 


      const response = await fetch (`http://localhost:5000/login`, {
         method: 'POST',
         headers: { 'Content-Type' : 'application/json' },
         body: JSON.stringify({ email, password})
      });


      if(response.status === 203) setErr('!! No user Found !!')
      if(response.status === 202) setErr('!! Incorrect Password !!')
      if(response.status === 201) setErr('!! Sorry user Blocked !!')
      if(response.status === 200){
         const res = await response.json()
         localStorage.setItem('payload', res.payload)
         window.location.reload()
      }
   };

   const imageUrl = '../../../public/main-img.png'

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center' style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover'}}>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
         <h1 className='text-3xl text-violet-500 text-center font-bold mb-6'>Login</h1>
         <form action="">
            <div className='mb-4'>
               <label htmlFor="email" className='block mb-1'>
                  Email
               </label>
               <input type="email" id="email" name="email"
               className="w-full p-2 border border-gray-300 rounded" 
               value={email} onChange={changeInData} required 
               />
               <center>
                  <span style={{color: 'red'}}>{emailErr}</span>
               </center>
            </div>

            <div className='mb-4 relative'>
               <label htmlFor="password" className='block mb-1'>
                  Password 
               </label>
               <div className='relative'>
                  <input 
                  type={hide ? 'password' : 'text'} 
                  id='password' name='password' 
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  value={password} onChange={changeInData} required
                  />
                  <div className='absolute top-3 right-3 cursor-pointer'
                     onClick={()=>setHide(!hide)} 
                  >
                    {hide ? (
                        <AiOutlineEyeInvisible size = {20} />
                     ) : (
                        <AiOutlineEye size={20} />
                     )}
                  </div>
               </div>
               <center>
                  <span style={{color:'red'}}>{passwordErr}</span>
               </center>
            </div>
            <button type='button' onClick={validate} className='bg-violet-500 text-white p-2 rounded w-full mb-4'>
               Login
            </button>
            <span className='text-base font-light'>
               Don't have an account? {' '}
               <a href='/register' className='text-violet-500 font-normal'>
                  Signup
               </a>
            </span>
             {/* <h6 className='mb-4 text-center text-danger'>{error}</h6> */}
         </form>
      </div>
    </div>
  )

};


export default Login
