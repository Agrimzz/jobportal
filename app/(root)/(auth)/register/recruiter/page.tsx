"use client"

import Button from "@/components/Button"
import { FileUploader } from "@/components/FileUploader"
import { recruiterSchema } from "@/lib/validator"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const RecruiterRegsiter = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFileUrl, setUploadedFileUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!uploadedFileUrl) {
      setError("Please upload a company logo!")
      return
    }

    const formData = new FormData(e.target as HTMLFormElement)
    formData.append("photo", uploadedFileUrl)

    const payload = {
      photo: uploadedFileUrl,
      fullname: formData.get("fullname") as string,
      type: "recruiter",
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      url: formData.get("url") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("cpassword") as string,
    }

    if (payload.password !== payload.confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    try {
      const validate = recruiterSchema.safeParse(payload)
      if (!validate.success) {
        setError(validate.error.issues[0].message)
        return
      }
      const response = await axios.post("/api/register/recruiter", payload)
      if (response.status === 200) {
        alert("Account created successfully!")
        router.push("/login")
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
        Create an account as <span className="text-primary">Recruiter</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="text" className="text-sm">
            Company Logo
          </label>
          <FileUploader
            imageUrl={uploadedFileUrl}
            onFieldChange={(url) => setUploadedFileUrl(url)}
            setFiles={setFiles}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="text" className="text-sm">
            Company Name
          </label>
          <input
            type="text"
            name="fullname"
            placeholder="eg. XYZ Corporation"
            className="p-2 outline-none border-[1px] rounded-md"
            required
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
            required
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
            required
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
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            placeholder="Enter your confirm password"
            className="p-2 outline-none border-[1px] rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Button title="Sign Up" className="w-full  bg-primary text-white " />
      </form>

      <div className="flex flex-col space-y-2 items-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </>
  )
}

export default RecruiterRegsiter
