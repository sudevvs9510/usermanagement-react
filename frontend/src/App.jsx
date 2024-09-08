import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import { Provider } from 'react-redux'
import store from './store'
import { verifyAdmin, verifyUser } from './assets/Scripts/Verification'
import AdminLogin from './Components/Admin/Login';
import AdminHome from './Components/Admin/AdminHome'
import CreateUser from './Components/Admin/CreateUser'



function App() {

  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)


  function Routing () {
    useEffect (()=>{
      const fetchData = async () =>{
        try {
          const response = await verifyUser();
          setUser(response);
        } catch (error) {
          console.log('Error fetching user data:', error);
        } finally{
          setLoading(false)
        }
      };

      fetchData();
    },[]);
    if(loading){
      return null
    }


  

  const path = window.location.pathname;
  if(path === '/login'){
    return !user ? <Login /> : <Navigate to= '/' />
  }
  if(path === '/register'){
    return !user ? <Signup /> : <Navigate to='/' />
  }
  if(path === '/'){
    return user ? <Home /> : <Navigate to='/login' />
  }
  if(path === '/profile'){
    return user ? <Profile /> : <Navigate to='/login' />
  }
  
}


function AdminRouting (){
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await verifyAdmin()
        setAdmin(response);
      } catch (e){
        console.log(e);
      } finally{
        setLoading(false)
      }
    }
    fetchData()
  },[])
  if(loading){
    return null
  }
  const path = window.location.pathname;
  if(path === '/admin/home'){
    return admin ? <AdminHome /> : <Navigate to='/admin/login' />;
  }
  if(path === '/admin/login'){
    return !admin ? <AdminLogin /> : <Navigate to='/admin/home' />
  }
  if(path === '/admin/createUser'){
    return admin ? <CreateUser /> : <Navigate to='/admin/login' />
  }
}


function Logout(){
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.removeItem('payload')
    setUser(false)
    navigate('/login')
  },[])
}


  return (
    <>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/register' element={<Routing />} />
        <Route path='/login' element={<Routing />} />
        <Route path='/' element={<Routing />} />
        <Route path='/profile' element={<Routing />} />
        <Route path='/logout' element={<Logout />} />

        <Route path='/admin/login' element={<AdminRouting />} />
        <Route path='/admin/home' element={<AdminRouting />} />
        <Route path='/admin/createuser' element={<AdminRouting />} />
      </Routes>
    </Router>    
    </Provider>
    </>
  )
}

export default App
