"use client"
import Button from "@/components/Button"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const Login = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      const response = await axios.post("/api/login", payload)
      if (response.status === 200) {
        alert("Login successfull!")
        router.push("/")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again later.")
      }
    }
  }
  return (
    <>
      <h1 className="text-2xl font-semibold">
        Welcome back to <span className="text-primary">Job</span>Portal
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="eg. jonhdoe@example.com"
            className="p-2 outline-none border-[1px] rounded-md"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="p-2 outline-none border-[1px] rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <Button title="Sign In" className="w-full  bg-primary text-white " />
      </form>
      <div className="flex flex-col space-y-2 items-center">
        <p className="text-gray-400">Don{"'"}t have an account? Register as</p>
        <div className="flex gap-4">
          <Link href="/register/candidate" className="text-primary">
            Candidate
          </Link>
          /
          <Link href="/register/recruiter" className="text-primary">
            Recruiter
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
