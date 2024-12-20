"use client"
import Button from "@/components/Button"
import { IJob } from "@/lib/database/models/job.modal"
import useAuthStore from "@/store/useAuthstore"
import {
  IconBriefcase,
  IconCurrencyRupeeNepalese,
  IconLocation,
  IconMapPin,
} from "@tabler/icons-react"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function JobPage() {
  const { userId } = useAuthStore()

  const params = useParams()
  const id = params.id
  const [data, setData] = useState<IJob>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/job/${id}`)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (userId) setIsLoggedIn(true)
  }, [userId])
  return (
    <>
      <section className="bg-gray-100 w-full p-8 relative">
        <div className="max-w-4xl bg-white mx-auto p-8 rounded-lg flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center">
              <img
                src={`${data?.recruiter?.photo}`}
                alt={`${data?.recruiter?.fullname}`}
                className="w-24 h-24 rounded-sm object-cover"
              />
              <div className="flex flex-col ">
                <h1 className="text-lg font-bold capitalize">{data?.title}</h1>
                <p className="text-sm font-semibold text-primary">Company</p>
              </div>
            </div>
            <Button
              title="Apply now"
              className="bg-primary text-white"
              disabled={!isLoggedIn}
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
      </section>
    </>
  )
}
