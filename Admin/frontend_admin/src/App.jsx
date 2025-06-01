import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import Users from './pages/Users'
export const backendUrl ="https://e-commerce-website-backend-vjs4.onrender.com";
export const currency='$'
const App = () => {
  const initialToken = localStorage.getItem('token') || '';
  const [token,setToken]=useState(initialToken)
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {
        token === "" ? 
        <Login setToken={setToken} /> 
        : <>
        <NavBar setToken={setToken}></NavBar>
        <hr />
        <div className="flex w-full">
        <SideBar/>
        
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
        <Routes>
          <Route path='/admin' element={<Users token={token}/>}/>
          <Route path='/admin/add' element={<Add token={token}/>}/>
          <Route path='/admin/list' element={<List token={token}/>}/>
          <Route path='/admin/orders' element={<Orders token={token}/>}/>
        </Routes>
        </div>
        </div>
        </>
      }
    </div>
  )
}

export default App
