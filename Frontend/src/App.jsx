import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './components/authPages/Homepage'
import RegisterPage from './components/authPages/RegisterPage'
import Nav from './components/navbar/Nav'
import LoginPage from './components/authPages/LoginPage'


const App = () => {
  return (
    <>
    <Nav/>
    <Routes>
       
       <Route path="/" element={<Homepage/>} />
       <Route path="/register" element={<RegisterPage/>} />
       <Route path="/login" element={<LoginPage/>} />
    </Routes>
    </>
  )
}

export default App