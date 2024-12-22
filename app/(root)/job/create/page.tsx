"use client"
import JobForm from "@/components/JobForm"

import React from "react"

const CreateJob = () => {
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

      <JobForm action="Create" />
    </>
  )
}

export default CreateJob
