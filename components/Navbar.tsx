"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import Button from "./Button"
import useAuthStore from "@/store/useAuthstore"
import { IconStarFilled } from "@tabler/icons-react"

const Navbar = () => {
  const router = useRouter()
  const { name, type, clearUser, favourites } = useAuthStore()
  const handleLogout = () => {
    clearUser()
    router.push("/login")
  }

  return (
    <nav className="w-full  sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center px-4">
        <Link href="/" className="text-2xl sm:text-3xl font-bold">
          <span className="text-primary">Job</span>Portal
        </Link>
        {name ? (
          <div className="flex gap-4 items-center rounded-md">
            <p className="font-bold hidden md:block">{name}</p>
            {type === "candidate" && (
              <Link
                href="/favourites"
                className="relative flex items-center border-[1px] border-primary gap-2 px-4 py-2 rounded-md hover:bg-primary/10"
              >
                <IconStarFilled className="text-primary" size={20} />
                <p className="text-xs sm:text-base font-semibold text-primary">
                  Favourites
                </p>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                  {favourites.length}
                </div>
              </Link>
            )}
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
              className="text-red-600 border-[1px] border-red-600 hover:bg-red-100"
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
