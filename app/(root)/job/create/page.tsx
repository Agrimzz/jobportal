"use client"
import Button from "@/components/Button"
import useAuthStore from "@/store/useAuthstore"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const CreateJob = () => {
  const router = useRouter()
  const { userId, type } = useAuthStore()
  const [error, setError] = useState("")

  useEffect(() => {
    if (type !== "recruiter") {
      router.push("/")
    }
  }, [])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const payload = {
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      salary: formData.get("salary") as string,
      experience: formData.get("experience") as string,
      recruiter: userId,
    }

    try {
      const response = await axios.post("/api/job/create", payload)
      if (response.status === 200) {
        router.push(`/job/${response.data.job._id}`)
        alert("Job posted successfully!")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      }
    }
  }
  return (
    <>
      <section className="max-w-full mx-auto bg-primary">
        <div className="max-w-4xl mx-auto text-white py-12 text-center sm:py-24">
          <h1 className="text-xl font-bold sm:text-5xl">Post a new Job</h1>
          <p className="text-xs font-medium sm:text-base">
            Discover and connect with highly qualified candidates who perfectly
            match the skills and expertise required for your open position,
            ensuring a seamless hiring process.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 w-full p-16">
        <div className="max-w-xl mx-auto p-8 bg-white rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="title" className="text-sm">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="eg. Fullstack Developer"
                className="p-2 outline-none border-[1px] rounded-md"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="type" className="text-sm">
                Job Type
              </label>
              <select
                name="type"
                className="p-2 outline-none border-[1px] rounded-md"
                required
              >
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="salary" className="text-sm">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                min={2500}
                placeholder="eg. 5000"
                className="p-2 outline-none border-[1px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="experience" className="text-sm">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                min={0}
                placeholder="eg. 2"
                className="p-2 outline-none border-[1px] rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter job description"
                className="p-2 outline-none border-[1px] rounded-md resize-none "
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <Button title="Post Job" className="bg-primary text-white" />
          </form>
        </div>
      </section>
    </>
  )
}

export default CreateJob
