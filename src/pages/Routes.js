import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import PrivateRoutes from '../components/privateRoutes'
import { useAuthContext } from '../Contexts/AuthContext'

export default function Index() {
  const { state } = useAuthContext(); 
  const isAdmin = state.user && state.user.role === 'Admin'; // Ensure state.user exists
  console.log("User Role:", state.user?.role); // Log the user role for debugging

  return (
    <Routes>
      <Route path='/*' element={isAdmin ? <Navigate to='/dashboard' /> : <Frontend />} />
      <Route path='auth/*' element={!state.isAuthenticated ? <Auth /> : <Navigate to='/' />} />
            <Route path='dashboard/*' element={<PrivateRoutes allowedRoles={['Admin']} Component={Dashboard} />} />
      {/* <Route path='/*' element={<Frontend/>} />
      <Route path='auth/*' element={ <Auth /> } />
            <Route path='dashboard/*' element={<Dashboard/>} /> */}
    </Routes>
  )
}

