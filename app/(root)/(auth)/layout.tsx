import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full py-16 bg-gray-200">
      <div className="max-w-lg mx-auto shadow-lg  rounded-xl  p-8 bg-white flex flex-col space-y-6">
        {children}
      </div>
    </div>
  )
}

export default Layout
