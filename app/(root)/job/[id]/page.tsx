import React from "react"

const JobDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return <div>JobDetails {id}</div>
}

export default JobDetails
