import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Products from './Products'
import SingleProduct from './SingleProduct'
import Cart from './Cart'
import Footer from '../../components/Footer'
import MyOrders from './MyOrders'
import Profile from './Profile'
import Favorites from './Favorites'

export default function Frontend() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products' element={<Products />} />
          <Route path='singleproduct' element={<SingleProduct />} />
          <Route path='cart' element={<Cart />} />
          <Route path='profile' element={<Profile />} />
          <Route path='my-orders' element={<MyOrders />} />
          <Route path='favorites' element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
