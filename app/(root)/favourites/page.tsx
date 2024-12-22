"use client"
import JobCard from "@/components/JobCard"
import { IJob } from "@/lib/database/models/job.modal"
import useAuthStore from "@/store/useAuthstore"
import { IconLoader2, IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import axios from "axios"
import React, { useEffect, useState } from "react"

const Favourites = () => {
  const { favourites } = useAuthStore()
  const [jobs, setJobs] = useState<IJob[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchJobs = async (currentPage: number) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `/api/favourites?limit=6&page=${currentPage}`,
        { ids: favourites }
      )
      const { data, nextPage } = response.data
      console.log(response.data)
      setJobs(data)
      setHasMore(!!nextPage)
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (favourites && favourites.length > 0) {
      fetchJobs(page)
    } else {
      setJobs([])
      setHasMore(false)
    }
  }, [page, favourites])

  useEffect(() => {
    console.log(jobs)
  }, [jobs])

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
      <section className="max-w-full mx-auto bg-primary">
        <div className="max-w-4xl mx-auto text-white py-12 text-center sm:py-24">
          <h1 className="text-xl font-bold sm:text-5xl">Your Favourites</h1>
          <p className="text-xs font-medium sm:text-base">
            Check out your favourite jobs here
          </p>
        </div>
      </section>

      <section className="bg-gray-100 w-full py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">Favourite Jobs</h2>
          {jobs?.length === 0 && !isLoading ? (
            <div className="w-full flex justify-center items-center h-[40vh]">
              <p className="text-xl font-bold">
                You have no favourite jobs{" "}
                {page > 1 && (
                  <button onClick={goToPreviousPage} className="text-primary">
                    Go to Previous Page
                  </button>
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {jobs?.map((job) => (
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
          )}
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

export default Favourites
