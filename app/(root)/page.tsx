"use client"
import React, { useEffect, useState } from "react"
import JobCard from "@/components/JobCard"
import axios from "axios"
import { IJob } from "@/lib/database/models/job.modal"
import { IconArrowLeft, IconArrowRight, IconLoader2 } from "@tabler/icons-react"

const Home = () => {
  const [jobs, setJobs] = useState<IJob[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchJobs = async (currentPage: number) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/job?limit=6&page=${currentPage}`)
      const { data, nextPage } = response.data
      setJobs(data)
      setHasMore(!!nextPage)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs(page)
  }, [page])

  const goToNextPage = () => {
    setJobs([])
    if (hasMore) setPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      setJobs([])
      setPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <>
      <section className="max-w-full mx-auto bg-primary" id="jobs">
        <div className="max-w-4xl mx-auto text-white py-12 text-center sm:py-24 px-4">
          <h1 className="text-xl font-bold sm:text-5xl">
            Unlock Opportunities, One Click Away
          </h1>
          <p className="text-xs font-medium sm:text-base">
            Discover your next career move or find the perfect candidate with
            our seamless hiring platform.
          </p>
        </div>
      </section>

      <section className="bg-gray-100 w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Browse Jobs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                title={job.title}
                description={job.description}
                salary={job.salary}
                recruiter={job.recruiter.fullname}
                photo={job.recruiter.photo}
                type={job.type}
                location={job.recruiter.location}
                recruiterId={job.recruiter._id}
                fetch={fetchJobs}
                page={page}
              />
            ))}
          </div>

          {isLoading && (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <IconLoader2 className="animate-spin text-primary" size={48} />
            </div>
          )}

          <div className="flex gap-4 mt-8  justify-center">
            <button
              className="bg-primary text-white p-2 rounded-full disabled:bg-gray-400  disabled:cursor-not-allowed"
              onClick={goToPreviousPage}
              disabled={page === 1 || isLoading}
            >
              <IconArrowLeft />
            </button>

            <button
              className="bg-primary text-white p-2 rounded-full disabled:bg-gray-400  disabled:cursor-not-allowed"
              onClick={goToNextPage}
              disabled={!hasMore || isLoading}
            >
              <IconArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
