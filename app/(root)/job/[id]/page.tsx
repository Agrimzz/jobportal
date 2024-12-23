"use client"
import ApplyModal from "@/components/ApplyModal"
import Button from "@/components/Button"
import { IApplication } from "@/lib/database/models/application.modal"
import { IJob } from "@/lib/database/models/job.modal"
import useAuthStore from "@/store/useAuthstore"
import {
  IconBriefcase,
  IconCurrencyRupeeNepalese,
  IconLoader2,
  IconLocation,
  IconMapPin,
} from "@tabler/icons-react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function JobPage() {
  const { userId, name, email, type } = useAuthStore()

  const params = useParams()
  const id = params.id
  const [data, setData] = useState<IJob>()
  const [applications, setApplications] = useState<IApplication[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [expandedApplicationId, setExpandedApplicationId] = useState<string>("")

  const toggleExpand = (id: string) => {
    setExpandedApplicationId((prev) => (prev === id ? "" : id))
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/job/${id}`)
      setData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`/api/applications/${id}`)
      setApplications(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (userId === data?.recruiter._id) {
      fetchApplications()
    }
  }, [data?.recruiter._id])
  useEffect(() => {
    if (userId) setIsLoggedIn(true)
  }, [userId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[90vh] bg-gray-100">
        <IconLoader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }
  return (
    <div>
      <section className="bg-gray-100 w-full p-8 ">
        <div className="max-w-4xl bg-white mx-auto p-8 rounded-lg flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-start">
            <div className="flex gap-2 items-center">
              <Image
                src={data?.recruiter.photo ?? ""}
                alt={data?.recruiter.fullname ?? ""}
                width={100}
                height={100}
              />
              <div className="flex flex-col ">
                <h1 className="text-lg font-bold capitalize">{data?.title}</h1>
                <p className="text-sm font-semibold text-primary capitalize">
                  {data?.recruiter?.fullname}
                </p>
              </div>
            </div>
            <Button
              title="Apply now"
              className="bg-primary text-white w-full sm:w-auto"
              disabled={!isLoggedIn || type === "recruiter"}
              onClick={() => setShowModal(true)}
            />
          </div>

          <hr className="border-gray-300" />

          <div className="flex flex-col md:flex-row justify-between md:items-center py-2  space-y-2">
            <div className="flex gap-4">
              <div className="bg-primary/40 text-primary px-2 rounded-sm flex items-center justify-center">
                <IconCurrencyRupeeNepalese />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Salary</p>
                <p className="text-base font-semibold">Rs.{data?.salary}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/40 text-primary px-2 rounded-sm flex items-center justify-center">
                <IconMapPin />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-base font-semibold capitalize">
                  {data?.type}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/40 text-primary px-2 rounded-sm flex items-center justify-center">
                <IconLocation />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-base font-semibold">
                  {data?.recruiter.location}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/40 text-primary px-2 rounded-sm flex items-center justify-center">
                <IconBriefcase />
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Experience</p>
                <p className="text-base font-semibold">
                  {data?.experience} Year
                </p>
              </div>
            </div>
          </div>
          <hr className="border-gray-300" />

          <div className="flex flex-col py-2 gap-2">
            <h3 className="text-lg font-semibold">Job Description:</h3>
            <p className="text-base text-gray-600">{data?.description}</p>
          </div>
        </div>
        <div className="max-w-4xl bg-white mx-auto p-8 rounded-lg flex flex-col space-y-4 mt-8">
          <h3 className="text-lg font-bold">About Company</h3>

          <div className="flex flex-col gap-2">
            <p className="text-md text-primary font-semibold">
              {data?.recruiter.fullname}
            </p>
            <p className="text-md text-gray-400">
              Location: {data?.recruiter.location}
            </p>
            <p className="text-md text-gray-400">
              Email: {data?.recruiter.email}
            </p>
            <Link href={data?.recruiter.url || "#"} target="_blank">
              Visit website
            </Link>
          </div>
        </div>
        {data?.recruiter._id === userId && (
          <div className="max-w-4xl bg-white mx-auto p-8 rounded-lg flex flex-col space-y-4 mt-8">
            <h3 className="text-lg font-semibold">Candidate Details:</h3>
            <table className="w-full ">
              <thead>
                <tr className="text-primary font-bold text-xs sm:text-base text-left">
                  <th className=" py-4">Candidate name</th>
                  <th className=" py-4">Candidate email</th>
                  <th className=" py-4 max-w-[250px]">Cover letter</th>
                  <th className=" py-4 text-right">Resume</th>
                </tr>
              </thead>
              <tbody>
                {applications && applications.length === 0 ? (
                  <tr>
                    <td className="text-center text-gray-500 py-4" colSpan={5}>
                      No Applications found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {applications &&
                      applications.map((application) => (
                        <tr
                          key={application._id}
                          className="text-xs sm:text-base border-t"
                        >
                          <td className="py-4">{application.name}</td>
                          <td className="py-4">{application.email}</td>
                          <td className="py-4 max-w-[250px] text-sm text-gray-500">
                            <div
                              className={`${
                                expandedApplicationId === application._id
                                  ? ""
                                  : "line-clamp-2"
                              }`}
                            >
                              {application.cover}
                            </div>
                            <button
                              onClick={() =>
                                toggleExpand(application._id || "")
                              }
                              className="text-primary underline text-sm mt-1 hidden sm:block"
                            >
                              {expandedApplicationId === application._id
                                ? "View Less"
                                : "View More"}
                            </button>
                          </td>

                          <td className="py-4 text-right">
                            <Link
                              href={application.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=" underline hover:text-primary"
                            >
                              Download
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <ApplyModal
        showModal={showModal}
        setShowModal={setShowModal}
        jobId={id}
        title={data?.title}
        name={name}
        email={email}
      />
    </div>
  )
}
