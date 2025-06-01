import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Contact from './pages/Contact'
import About from './pages/About'
import Collection from './pages/Collection'
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
const App = () => {
  return (
    <div className='px-4 sm-px-[5vw] md:px=[7vw] lg:px-[9vw]'> 
    <ToastContainer></ToastContainer>
    <Navbar></Navbar>
    <SearchBar/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/https://e-commerce-website-frontend-user.vercel.app' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/collection' element={<Collection></Collection>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/product/:productId' element={<Product></Product>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/place-holder' element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path='/orders' element={<Orders></Orders>}></Route>
        <Route path='/verify' element={<Verify></Verify>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
