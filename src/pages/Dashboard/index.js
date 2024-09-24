import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddProducts from './AddProducts'

export default function Dashboard() {
  return (
    <Routes>
      <Route path='home' element={<Home/>} />
      <Route path='add-products' element={<AddProducts/>} />
    </Routes>
  )
}
