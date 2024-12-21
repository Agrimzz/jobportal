"use client"
import { JobCardProps } from "@/types"
import React from "react"
import Button from "./Button"
import { useRouter } from "next/navigation"

const JobCard = ({
  id,
  title,
  description,
  salary,
  recruiter,
  photo,
  type,
  location,
}: JobCardProps) => {
  const router = useRouter()
  return (
    <div className="bg-white p-12 rounded-lg space-y-4">
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
