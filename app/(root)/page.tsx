"use client"
import Button from "@/components/Button"
import React from "react"

const Home = () => {
  return (
    <>
      <section className="max-w-full mx-auto bg-primary">
        <div className="max-w-4xl mx-auto text-white py-12 text-center sm:py-24">
          <h1 className="text-xl font-bold sm:text-5xl">
            Unlock Opportunities, One Click Away
          </h1>
          <p className="text-xs font-medium sm:text-base">
            Discover your next career move or find the perfect candidate with
            our seamless hiring platform.
          </p>

          <Button title="Apply Now" className="mt-8 bg-white text-primary" />
        </div>
      </section>
    </>
  )
}

export default Home
