import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoArrowBack } from 'react-icons/io5'
import swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { nameValidation, usernameValidation } from '../../assets/Scripts/Validations'
import store, { setProfile } from '../../store'
import { BiSolidImageAdd } from 'react-icons/bi'



const Profile = ()=> {

   const userDetails = useSelector(state => state.reducer.userDetails);
   const [edit, setEdit] = useState(false)
   const [img, setImg] = useState(null)
   const [name, setName] = useState(userDetails.name)
   const [gender, setGender] = useState(userDetails.gender)
   const [username, setUsername] = useState(userDetails.username)
   const [nameError, setNameError] = useState('')
   const [usernameError, setUsernameError] = useState('');

   const handleFileChange = (e)=>{
      const selectedFile = e.target.files[0]
      const reader = new FileReader();
      reader.onload = function (event){
         const result = event.target.result;
         userDetails.image = result
         setImg(e.target.files[0]);
      }
      if(selectedFile){
         reader.readAsDataURL(selectedFile)
      }
   };

   const onImgUpdate = async () =>{
      const newFileName = userDetails._id + '.jpg';
      console.log(newFileName);
      const formData = new FormData()
      formData.append('image', img, newFileName)
      formData.append('id', userDetails._id)
      const response = await fetch('http://localhost:5000/uploadImage',{
         method: 'POST',
         body: formData
      })
      swal.fire({
         title:'Success',
         text: 'Profile Updated Successfully',
         icon: 'Success',
         showConfirmButton: false,
         timeer: 1500,
         timerProgressBar: true,
      })
      setImg(null)
   };


   const setDetails = (e) =>{
      const {name, value} = e.target;
      switch(name){
         case 'name':
            setNameError('')
            setName(value)
            break;
         case 'username':
            setUsernameError('')
            setUsername(value)
            break;
         case 'gender':
            setGender(value)
            break;
         default: 
            break;
      }
   }


   const exitUpdate = () =>{
      setEdit(false)
      setName(userDetails.name)
      setUsername(userDetails.username)
      setNameError('')
      setUsernameError('')
   } 
   
   const updateProfile = async () =>{
      let check = true;
      if(!nameValidation(name, setNameError)){
         check = false
      }
      if(!usernameValidation(username, setUsernameError)){
         check = false
      }
      if(!check){
         return false;
      }
      const data = {
         name, username, gender
      }
      store.dispatch(setProfile(data));
      const response = await fetch('http://localhost:5000/updateProfile',{
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name, username, gender, id: userDetails._id })
      });

      console.log(response);
      exitUpdate();
      swal.fire({
         title: 'Success',
         text: 'Profile Updated Successfully',
         icon: 'success',
         showConfirmButton: false,
         timer:1500,
      })
   }

   const imageUrl = '../../../public/main-img.png'


  return (
    <div className='min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${imageUrl})` , backgroundSize: 'cover' }}>
      <Link to='/'>
         <IoArrowBack className="absolute top-6 left-5 text-white text-2xl" />
      </Link>
      <div className="bg-opacity-50 bg-black p-8 rounded shadow-md w-full max-w-md">
         <div className='flex felx-col items-center justifty-center'>
            <img src={userDetails.image}
            alt=''
            className='w-32 h-32 rounded-full mx-auto mb-4 border-black'>
            </img>

            <label htmlFor="fileInput" className='rounded-circle flex flex-col items-center justify-center pr-3'>
               <BiSolidImageAdd className='rounded size-8 text-white transform scale-150' />
               <p className='text-white'>Upload Profile Picture</p>
               <input
               type='file' id='fileInput' hidden accept='image/*' onChange={handleFileChange} />
            </label>
            {img && img ? <button className='bg-violet-500 text-white p-2 my-2 rounded' onClick={onImgUpdate}>Update</button> : null }
         </div>
         <div className='mb-4'>
            <label htmlFor="name" className='block text-white font-bold mb-2'>
               Name :
            </label> 
            { edit ? (
            <input
            type='text' id='name' value={name} onChange={setDetails} 
            className='w-full p-2 border border-gray-300 rounded' />
            ): (
             <p className='text-violet-300'>{userDetails.name}</p>
            )}
            {nameError && <p className='text-red-500'> {nameError}</p>}
         </div>
         <div className="mb-4">
            <label htmlFor="username" className='block text-white font-bold mb-2'>
               Username: 
            </label>
            {edit ? (
               <input type="text"
               id='username'
               name='username' value={username}
               onChange={setDetails}
               className='shadow appearanc-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
               /> 
            ) : (
               <p className='text-violet-300'>{userDetails.username}</p>
            )}
            {usernameError && <p className='text-red-500'>{usernameError}</p>}
         </div>
         <div className="mb-4">
          <label htmlFor="name" className="block text-white font-bold mb-2">
            Email:
          </label>
            <p className="text-violet-300">{userDetails.email}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-white font-bold mb-2">
            Gender:
          </label>
          {edit ? (
            <div className="btn-group btn-group-toggle ml-5" data-toggle="buttons">
            <label className={`btn btn-secondary ${gender === 'Male' ? 'active' : ''} text-white`}>
              <input className="h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400 mr-2"
                type="radio"
                name="gender"
                onClick={setDetails}
                value={'Male'}
                id="option1"
                autoComplete="off"
              />
              Male
            </label>
            <label className={`btn btn-secondary ${gender === 'Female' ? 'active' : ''} text-white`}>
              <input className="ml-4 h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400 mr-2"
                type="radio"
                name="gender"
                onClick={setDetails}
                value={'Female'}
                id="option2"
                autoComplete="off"
              />
              Female
            </label>
          </div>
          ) : (
            <p className="text-violet-300">{userDetails.gender}</p>
          )}
        </div>
        <div className="text-center">
          {edit ? (
            <>
              <button
                className="bg-violet-500 text-white p-2 mx-2 rounded"
                onClick={updateProfile}
                disabled={nameError || usernameError}
              >
                Save
              </button>
              <button className="bg-red-500 text-white p-2 rounded" onClick={exitUpdate}>
                Cancel
              </button>
            </>
          ) : (
            <button className="bg-violet-500 text-white p-2 my-2 rounded" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;