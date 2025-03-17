import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import {useSearchParams} from "react-router-dom"
import { useEffect } from 'react'
import axios from "axios"
import {toast} from "react-toastify"
const Verify = () => {
    const {navigate,token,setCartItem,backendUrl} =useContext(ShopContext)
    const[searchParams,setSearchParams]=useSearchParams();

    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');

    const verifyPayment=async ()=>{
        try {
            if(!token){
                return null
            }
            const response=await axios.post(`${backendUrl}/api/order/verifyStripe`,{success,orderId},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.data.success){
                setCartItem({})
                navigate('/orders')
            }
            else{
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            
        }
    }
    useEffect(()=>{verifyPayment()},[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
