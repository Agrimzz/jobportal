"use client"
import React, { useRef, useState } from "react"
import Button from "./Button"
import { ApplyModalProps } from "@/types"
import { IconX } from "@tabler/icons-react"
import axios from "axios"
import { useUploadThing } from "@/lib/uploadthing"

const ApplyModal = ({
  showModal,
  setShowModal,
  jobId,
  title,
  name,
  email,
}: ApplyModalProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const { startUpload } = useUploadThing("fileUploader")

  if (!showModal) return null
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowModal(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let uploadedFileUrl = ""
    setLoading(true)
    if (files.length > 0) {
      const uploadedFile = await startUpload(files)
      if (!uploadedFile) {
        alert("Something went wrong. Please try again later.")
      }

      uploadedFileUrl = (uploadedFile && uploadedFile[0].url) ?? ""
    }
    const formData = new FormData(e.target as HTMLFormElement)
    const payload = {
      name: name as string,
      email: email as string,
      cover: formData.get("cover") as string,
      jobId: jobId,
      resume: uploadedFileUrl,
    }
    try {
      const response = await axios.post(`/api/job/apply/${jobId}`, payload)
      if (response.status === 200) {
        setShowModal(false)
        alert("Application sent successfully!")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div
      className="absolute w-full h-full bg-gray-500/20 z-10 top-0 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white w-[600px] p-8 rounded-lg flex flex-col space-y-4"
        ref={modalRef}
      >
        <div className="w-full justify-between items-start flex">
          <h3 className="text-xl font-bold">
            Apply for <span className="capitalize text-primary"> {title} </span>
          </h3>
          <IconX
            className="cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="title" className="text-sm">
              Full name
            </label>
            <input
              type="text"
              name="title"
              placeholder="eg. Fullstack Developer"
              className="p-2 outline-none border-[1px] rounded-md disabled:cursor-not-allowed"
              value={name ?? ""}
              required
              disabled
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="eg. 9D5o4@example.com"
              className="p-2 outline-none border-[1px] rounded-md disabled:cursor-not-allowed"
              value={email ?? ""}
              disabled
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="resume" className="text-sm">
              Resume
            </label>
            <input
              type="file"
              name="resume"
              placeholder="Your resume"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file && file.size > 2 * 1024 * 1024) {
                  alert("File size exceeds 2 MB. Please upload a smaller file.")
                  e.target.value = ""
                } else {
                  setFiles([file!])
                }
              }}
              className="p-2 outline-none border-[1px] rounded-md"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="cover" className="text-sm">
              Cover Letter
            </label>
            <textarea
              name="cover"
              placeholder="Your cover letter"
              className="p-2 outline-none border-[1px] rounded-md resize-none h-32"
              required
            />
          </div>
          <Button
            title={loading ? "Applying..." : "Apply"}
            className="bg-primary text-white"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}

export default ApplyModal
