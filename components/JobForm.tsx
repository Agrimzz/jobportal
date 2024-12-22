"use client"
import Button from "@/components/Button"
import { jobFormSchema } from "@/lib/validator"
import useAuthStore from "@/store/useAuthstore"
import { FormProps } from "@/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const JobForm = ({ action, job }: FormProps) => {
  const router = useRouter()
  const { userId, type } = useAuthStore()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: job?.title || "",
    type: job?.type || "remote",
    salary: job?.salary || "",
    experience: job?.experience || "",
    description: job?.description || "",
  })

  useEffect(() => {
    if (
      job &&
      action === "Update" &&
      (type !== "recruiter" || userId !== job?.recruiter?._id)
    ) {
      router.push("/")
    }
  }, [action, type, userId, job?.recruiter?._id])

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        type: job.type,
        salary: job.salary,
        experience: job.experience,
        description: job.description,
      })
    }
  }, [job])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload = {
      ...formData,
      recruiter: userId,
    }

    try {
      const validate = jobFormSchema.safeParse(payload)
      if (!validate.success) {
        setError(validate.error.issues[0].message)
        return
      }
      if (action === "Create") {
        const response = await axios.post("/api/job/create", payload)
        if (response.status === 200) {
          router.push(`/job/${response.data._id}`)
          alert("Job created successfully!")
        }
      } else if (action === "Update" && job?._id) {
        const response = await axios.put(`/api/job/${job._id}`, payload)
        if (response.status === 200) {
          router.push(`/job/${job._id}`)
          alert("Job updated successfully!")
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Caught error:", error)
      setError(
        error?.response?.data?.message || "An error occurred. Please try again."
      )
    }
  }

  return (
    <>
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
                value={formData.title}
                onChange={handleChange}
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
                value={formData.type}
                onChange={handleChange}
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
                className="p-2 outline-none border-[1px] rounded-md"
                value={formData.salary}
                onChange={handleChange}
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
                max={20}
                placeholder="eg. 2"
                className="p-2 outline-none border-[1px] rounded-md"
                value={formData.experience}
                onChange={handleChange}
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
                className="p-2 outline-none border-[1px] rounded-md resize-none"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <Button
              title={action === "Create" ? "Post Job" : "Update Job"}
              className="bg-primary text-white"
            />
          </form>
        </div>
      </section>
    </>
  )
}

export default JobForm
