import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const[currentState,setCurrentState]=useState('Login')
  const {token,setToken,navigate,backendUrl} =useContext(ShopContext)
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const onSubmitHandler=async (e)=>{ 
    e.preventDefault()

    try {
      if(currentState==="Sign Up"){
        try {
          const response=await axios.post(`${backendUrl}/api/auth/signup`,{name,email,password});
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
            toast.success(response.data.message)
          }
          else{
            console.log(error)
            toast.error(response.data.message)  
          }
  
        } catch (error) {
          console.log(error)
          toast.error(error.response?.data?.message || 'An error occurred during sign up');
        }
      }
      else{
        try {
          const response =await axios.post(`${backendUrl}/api/auth/login`,{email,password})
          console.log(response)
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message || 'An error occurred during login');
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'An unexpected error occurred');   
    }

    
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

   
  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState==='Login'? '': <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required onChange={(e)=>setName(e.target.value)} value={name}/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
      
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {
          currentState==='Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create acoount</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login' ? 'Sign In' : "Sign Up"}</button>
      
    </form>
  )
}

export default Login
