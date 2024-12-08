import React from 'react'

const Nav = () => {
  return (
    <nav className="bg-blue-600 absolute w-full text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold">Task Manager</h1>

        {/* Navigation Links */}
        <div className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
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
      </div>
    </nav>
  )
}

export default Nav