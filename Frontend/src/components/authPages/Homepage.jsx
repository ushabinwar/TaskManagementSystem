import React from 'react'
import Nav from '../navbar/Nav'

const Homepage = () => {
  return (
    <>
    <Nav/>
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      {/* Main Content */}
      
      <div className="text-center bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Task Management System
        </h1>
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Register
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

export default Homepage