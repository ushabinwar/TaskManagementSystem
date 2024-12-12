import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../api'
import { toast } from 'react-toastify'

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
 

   // Update login status when component mounts or token changes
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsLoggedIn(!!token)
    
  }, [])
  
  const handleLogout = async ()=>{
    
      localStorage.removeItem('authToken')
      setIsLoggedIn(false)
      toast.success("Logout Successfully")
      navigate('/login')
    


  }
  
  return (
    <nav className="bg-blue-600 absolute w-full text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <Link to='/dashboard' className="text-2xl font-bold">Task Manager</Link>


        {/* Navigation Links */}
        {isLoggedIn && (
          <div className="space-x-4">
          <Link to='/createTask' className="hover:underline">
            Create Task
          </Link>
          <a href="/login" className="hover:underline">
            Tasks
          </a>
          <a
            href="/register"
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
          >
            Logout
          </a>
        </div>

        )}
        
        {!isLoggedIn && (
          <div className="space-x-4">
          {/* <a href="/" className="hover:underline">
            Home
          </a> */}
          <a href="/login" className="hover:underline">
            Login
          </a>
          <a
            href="/register"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
          >
            Register
          </a>
        </div>

        )}
        
      </div>
    </nav>
  )
}

export default Nav