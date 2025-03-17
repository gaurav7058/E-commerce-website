import React, { useEffect, useState } from 'react'
import { createContext } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import axios from "axios"
export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const currency='$'
    const delivery_fee=10
    const backendUrl="http://localhost:8000"
    const[search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false)
    const[products,setProducts]=useState([])
    const[cartItem,setCartItem]=useState({});
    const[token,setToken]=useState('')
    const navigate=useNavigate()

    const addToCart=async(itemId,size)=>{
        if(!size){
            toast.error("Please select the size");
            return
        }
        let cardData=structuredClone(cartItem);
        if(cardData[itemId]){
            if(cardData[itemId][size]){
                cardData[itemId][size]+=1
            }
            else{
                cardData[itemId][size]=1
            }
        }
        else{
            cardData[itemId]={};
            cardData[itemId][size]=1
        }
        setCartItem(cardData)

        if(token){
            try {
                const response=await axios.post(`${backendUrl}/api/cart/add`,{itemId,size},{
                    headers:{
                        'Authorization':`Bearer ${token}` 
                    }
                })
                
            } catch (error) {
                toast.error(error.response.data.message)
                
            }
        }

    }
    
    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalCount+=cartItem[items][item]
                        
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }
    const updateQuantity=async(itemId,size,quantity) => {
        const cartData=structuredClone(cartItem);
        cartData[itemId][size]=quantity;
        setCartItem(cartData)   
        
        if(token){
            try {
                const response=await axios.post(`${backendUrl}/api/cart/update`,{itemId,size,quantity},{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message) 
            }
        }
    }

    const getCartAmount=() => {
        let totalAmount=0;
        for(const items in cartItem){
            let itemInfo=products.find((product)=>product._id===items);
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalAmount+=itemInfo.price*cartItem[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount
    }
    const getProductsData =async ()=>{
        try {
            const response=await axios.get(`${backendUrl}/api/product/list`)
        if(response.data.success){
            setProducts(response.data.data)
        }
        else{
           toast.error(response.data.message)
        }
        } catch (error) {
            toast.error(error)
        }
    }

    const getUserCart= async (token)=>{
        try {
            const response=await axios.post(`${backendUrl}/api/cart/get`,{},{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            if(response.data.success){
                setCartItem(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)  
        }
    }
    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
        getUserCart(localStorage.getItem('token'))
    },[token])
    
    const value={
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItem,setCartItem,addToCart,
        getCartCount,updateQuantity,getCartAmount,
        navigate,backendUrl,token,setToken

    }
    
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider