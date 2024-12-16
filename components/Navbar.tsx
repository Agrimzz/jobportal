import React from "react"

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto py-4 flex justify-between items-center border-b-2 sticky top-0">
      <h1 className="text-3xl font-bold">
        <span className="text-primary">Job</span>Portal
      </h1>

      <div className="flex gap-2 items-center">
        <button className="px-4 py-2 rounded-md text-">Login</button>
        <button className="px-4 py-2 bg-primary text-white rounded-md">
          Register
        </button>
      </div>
    </nav>
  )
}

export default Navbar
