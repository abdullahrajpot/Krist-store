import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Frontend from './Frontend'
import Dashboard from './Dashboard'

export default function index() {
  return (
    <Routes>
    <Route path='/*' element={<Frontend/>} />
    <Route path='auth/*' element={<Auth/>} />
    <Route path='dashboard/*' element={<Dashboard/>} />


  </Routes>

  )
}
