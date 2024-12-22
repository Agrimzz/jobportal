"use client"
import { JobCardProps } from "@/types"
import React from "react"
import Button from "./Button"
import { useRouter } from "next/navigation"
import useAuthStore from "@/store/useAuthstore"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import axios from "axios"

const JobCard = ({
  id,
  title,
  description,
  salary,
  recruiter,
  photo,
  type,
  location,
  recruiterId,
  fetch,
  page,
}: JobCardProps) => {
  const router = useRouter()
  const { userId } = useAuthStore()

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this job?"
    )

    if (!isConfirmed) {
      return
    }

    try {
      await axios.delete(`/api/job/${id}`)
      fetch(page)
      alert("Job deleted successfully!")
    } catch (error) {
      console.error("Error deleting job:", error)
      alert("Failed to delete the job. Please try again later.")
    }
  }
  return (
    <div className="bg-white p-12 rounded-lg space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={photo}
            alt={recruiter}
            className="w-12 h-12 object-cover rounded-md"
          />
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold capitalize">{recruiter}</h4>
            <p className="text-gray-500 text-sm">{location}</p>
          </div>
        </div>
        {userId === recruiterId && (
          <div className="flex gap-2 items-center">
            <Link href={`/job/${id}/edit`}>
              <IconPencil color="green" size={20} />
            </Link>
            <IconTrash
              color="red"
              size={20}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold capitalize line-clamp-1">{title}</h2>
        <p className="text-base text-primary capitalize">{type}</p>

        <p className="mt-4 text-gray-500 text-base line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <p className="text-gray-500 text-base font-semibold">
          <span className="text-lg font-bold text-black">Rs.{salary}</span>
          /monthly
        </p>
        <Button
          title="View Details"
          className="bg-primary text-white mt-4 md:mt-0"
          onClick={() => {
            router.push(`/job/${id}`)
          }}
        />
      </div>
    </div>
  )
}

export default JobCard
