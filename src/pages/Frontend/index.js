import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'

export default function Frontend() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </>
  )
}
