import Button from "@/components/Button"
import Link from "next/link"
import React from "react"

const Login = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">
        Welcome back to <span className="text-primary">Job</span>Portal
      </h1>
      <form action="" className="flex flex-col space-y-4">
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
