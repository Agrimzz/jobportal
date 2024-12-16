import Link from "next/link"
import React from "react"

const RecruiterRegsiter = () => {
  return (
    <div className="w-full py-16 bg-gray-200">
      <div className="max-w-lg mx-auto shadow-lg  rounded-md  p-8 bg-white flex flex-col space-y-6">
        <h1 className="text-2xl font-semibold">
          Create an account as <span className="text-primary">Recruiter</span>
        </h1>

        <form action="" className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="text" className="text-sm">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="eg. XYZ Corporation"
              className="p-2 outline-none border-[1px] rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm">
              Company Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="eg. xyzcorp@example.com"
              className="p-2 outline-none border-[1px] rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="text" className="text-sm">
              Company Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="eg. Koteshwor, Kathmandu, Nepal"
              className="p-2 outline-none border-[1px] rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="text" className="text-sm">
              Company Website
            </label>
            <input
              type="text"
              name="url"
              placeholder="eg. Enter company website URL"
              className="p-2 outline-none border-[1px] rounded-md"
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
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm">
              Confirm Password
            </label>
            <input
              type="cpassword"
              name="cpassword"
              placeholder="Enter your confirm password"
              className="p-2 outline-none border-[1px] rounded-md"
            />
          </div>
          <button className="w-full py-2 bg-primary text-white rounded-md">
            Sign Up
          </button>
        </form>

        <div className="flex flex-col space-y-2 items-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecruiterRegsiter