import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nameValidation, usernameValidation } from '../../assets/Scripts/Validations'
import swal from 'sweetalert2'
import { BiSolidImageAdd } from 'react-icons/bi';
import { useSelector } from 'react-redux';


function AdminHome() {
  const userDetails = useSelector(state => state.reducer.adminDetails)

   const [edit, setEdit] = useState(null)
   const [users, setUsers] = useState([])
   const [img, setImg] = useState(null)
   const [show, setShow] = useState(null)
   const [nameError, setNameError] = useState('')
   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const [userNameError, setUserNameError] = useState('')

  

   const navigate = useNavigate();

   const fetchData = async () =>{
      const response = await fetch('http://localhost:5000/admin/home',{
         method: 'GET',
      })

      if(response.status === 200){
         const res = await response.json()
         setUsers(res.users)
      }
   }
   useEffect(()=>{
      fetchData()
   },[])

   const handleFileChange = (e) =>{
      const selectedFile = e.target.files[0]
      const reader = new FileReader();

      setImg(e.target.files[0]);

      reader.onload = function(event){
         const result = event.target.result;
         setShow(result)
      }
      if(selectedFile){
         reader.readAsDataURL(selectedFile)
      }
   }

   const handleInput = (e) =>{
      const {name, value } = e.target 
      switch (name){
         case 'name':
            setNameError('')
            setEdit({ ...edit, name: value })
            break;
         case 'username':
            setUserNameError('')
            setEdit({ ...edit, username: value })
            break;
         default:
            break;
      }
   }

   const onImgUpdate = async () =>{
      const newFileName = edit._id + '.jpg';
      console.log(newFileName);
  
      const formData = new FormData();
      formData.append('image', img, newFileName);
      formData.append('id', edit._id)

      const response = await fetch('http://localhost:5000/uploadImage',{
         method: 'POST',
         body: formData,
      })
      console.log(response);
      
      return response
   }

   const logOut = () =>{
      localStorage.removeItem('Admin')
      window.location.href = '/admin/login'
   }

   const cancelUpdate = () =>{
      setEdit(null)
      setShow(null)
      setImg(null)
   }

   const updateUser = async () =>{
      let check = true
      if(!nameValidation(edit.name, setNameError)) check = false
      if(!usernameValidation(edit.username, setUserNameError)) check = false
      if(!check) return false
      if(img) await onImgUpdate()
      const response = await fetch('http://localhost:5000/updateProfile',{
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name: edit.name , username: edit.username, id: edit._id, gender: edit.gender })
      })
      if( response.status === 200) {
         swal.fire({
            title: 'Success',
            text: 'Profile Updated Successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
         })
         await fetchData()
         cancelUpdate()
   }
  }

  

   const blockUser = async (id, index) =>{
      const response = await fetch('http://localhost:5000/admin/blockUser',{
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id })
      })
      if(response.status === 200) {
         setUsers([...users.slice(0,index), { ...users[index], status: !users[index].status }, ...users.slice(index +1)])
      }
   }

   const deleteUser = async (id, index ) =>{
      const response = await fetch('http://localhost:5000/admin/deleteUser',{
         method: 'POST',
         headers: { 'Content-Type' : 'application/json'},
         body: JSON.stringify({ id })
      })
      if( response.status === 200) {
         setUsers([...users.splice(0,index)])
      }
   }


   const makeAdmin = async (id, index) =>{
      const response = await fetch('http://localhost:5000/admin/makeAdmin',{
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({ id })
      })
      if(response.status === 200){
         setUsers([...users.slice(0,index), { ...users[index], admin: !users[index].admin }, ...users.slice(index + 1)])
      }
   }

   const imageUrl = '../../../public/main-img.png'
  return (
    <div className='   ' style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover'}}>
      <nav className=" text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">
          </div>
          <div className="flex items-center">
            <button className="navbar-toggler block lg:hidden" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="flex items-center">
              <button className="inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-violet-500 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
               onClick={()=>navigate('/admin/createUser')}>Create User</button>
              <button className='mx-10 inline-block bg-red-600  rounded border-2 border-red-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-black focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10' 
              id="profileBtn" onClick={logOut} >Logout</button>
            </div>
          </div>
        </div>
      </div>
   </nav>
   <div id="wrapper" className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4">
          {!edit ? (
            <>
              <header id="header" className="flex-grow pb-5">
                <h1 className="text-center text-3xl text-white">
                  <strong>Welcome <span className='text-violet-300'>{userDetails.name}</span></strong>
                </h1>
              </header>
              <div className="flex flex-col items-center border rounded justify-center mx-8">
        
              <table className="w-full divide-y divide-violet-300">
                <thead className="bg-violet-50">
                  <tr>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Sl No</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked</th>
                    <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
                  </tr>
                </thead>
                <tbody className="bg-violet-50 divide-y divide-violet-200">
                  {users && users.length > 0 && users.map((user, index) => (
                    <tr key={user.id}>
                      <td className='px-4 py-2 text-center'>{index + 1}</td>
                      <td className='px-4 py-2 text-center'> <img src={user.profile? 'http://localhost:5000/' + 'Profile/' + user.profile: 'http://localhost:5000/' + 'Profile/' + 'download.jpg'} className="h-10 w-10" alt="DP" /> </td>
                      <td className='px-4 py-2 text-center' id={'name_' + user._id}>{user.name}</td>
                      <td className='px-4 py-2 text-center' id={'email_' + user._id}>{user.email}</td>
                      <td className='px-4 py-2 text-center'><button className= 'bg-indigo-600 indigo-600 text-white p-2 m-auto rounded w-auto' onClick={() => makeAdmin(user._id, index)}>{user.admin ? 'Remove' : 'Add'}</button></td>
                      <td className='px-4 py-2 text-center'>{user.status ? 'No' : 'Yes'}</td>
                      <td className='px-4 py-2 text-center'>
                        <div className="flex justify-center">
                          <button className='bg-green-500 text-white p-2 px-4 m-auto rounded w-auto' onClick={() => { setEdit(users[index]) }} >Edit</button>
                          <button className='bg-orange-500 text-white p-2 m-auto rounded w-auto' onClick={() => blockUser(user._id, index)}>{user.status ? 'Block' : 'Unblock'}</button>
                          <button className='bg-red-600 text-white p-2 m-auto rounded w-auto' onClick={() => deleteUser(user._id, index)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
            </>
          ) : (
    <div className="flex-grow flex items-center justify-center">
        <div className="bg-opacity-40 bg-slate-50 p-8 rounded shadow-md w-full max-w-md">
          <div className="flex items-center justify-center mb-4">
            <img src={show ? show : ('http://localhost:5000/' + 'Profile/' + edit.profile)} className="h-24 w-24 rounded-full object-cover mr-4 " alt="" />
            <label htmlFor="fileInput" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full">
            <BiSolidImageAdd   className="rounded text-black transform scale-150" />
              <input
                type="file"
                id="fileInput"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              className='w-full p-2 border border-gray-300 rounded'
              defaultValue={edit && users.length > 0 ? edit.name : ''}
              onChange={handleInput}
            />
            <p>{nameError}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name='username'
              className='w-full p-2 border border-gray-300 rounded'
              defaultValue={edit.username}
              placeholder='Enter username'
              onChange={handleInput}
            />
            <p>{userNameError}</p>
          </div>
          <div className="flex justify-end">
            <button className='bg-violet-500 text-white p-2 rounded' onClick={updateUser}>Update</button>
            <button className='bg-red-600 text-white p-2 rounded ml-4' onClick={cancelUpdate} >Cancel</button>
          </div>
        </div>
      </div>
          )}
        </div>
      </div>
    </div>
    );
};


export default AdminHome
