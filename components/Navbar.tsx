"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import Button from "./Button"
import useAuthStore from "@/store/useAuthstore"

const Navbar = () => {
  const router = useRouter()
  const { name, type, clearUser } = useAuthStore()
  const handleLogout = () => {
    clearUser()
    router.push("/login")
  }

  return (
    <nav className="w-full  sticky top-0 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center px-4">
        <Link href="/" className="text-3xl font-bold">
          <span className="text-primary">Job</span>Portal
        </Link>
        {name ? (
          <div className="flex gap-4 items-center rounded-md">
            <p className="font-bold hidden md:block">{name}</p>
            {type === "recruiter" && (
              <Button
                title="Post a job"
                onClick={() => router.push("/job/create")}
                className="bg-primary text-white"
              />
            )}
            <Button
              title="Logout"
              onClick={handleLogout}
              className="text-red-600 border-[1px] border-red-600"
            />
          </div>
        ) : (
          <div className="flex gap-2 items-center bg-primary text-white rounded-md">
            <Button title="Login" onClick={() => router.push("/login")} />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
