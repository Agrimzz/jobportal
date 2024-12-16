"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="w-full  sticky top-0 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          <span className="text-primary">Job</span>Portal
        </Link>

        <div className="flex gap-2 items-center bg-primary text-white rounded-md">
          <button
            className="px-4 py-2 rounded-md text-"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
