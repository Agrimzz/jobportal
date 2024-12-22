"use client"
import JobForm from "@/components/JobForm"
import { IJob } from "@/lib/database/models/job.modal"
import { IconLoader2 } from "@tabler/icons-react"
import axios from "axios"
import { useParams } from "next/navigation"

import React, { useEffect, useState } from "react"

const UpdateJob = () => {
  const params = useParams()
  const id = params.id

  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState<IJob>()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/job/${id}`)

        setJob(response.data)
      } catch (error) {
        console.error("Error fetching job:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <IconLoader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }

  return (
    <>
      <section className="max-w-full mx-auto bg-primary">
        <div className="max-w-4xl mx-auto text-white py-12 text-center sm:py-24">
          <h1 className="text-xl font-bold sm:text-5xl">Edit Job</h1>
          <p className="text-xs font-medium sm:text-base capitalize">
            {job?.title}
          </p>
        </div>
      </section>

      <JobForm action="Update" job={job} />
    </>
  )
}

export default UpdateJob
