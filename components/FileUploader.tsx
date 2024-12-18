"use client"
import { useDropzone } from "@uploadthing/react"
import { Dispatch, SetStateAction, useCallback } from "react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { convertFileToUrl } from "@/lib/utils"
type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  })

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center h-48 cursor-pointer flex-col overflow-hidden rounded-xl bg-gray-100"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col py-2 text-gray-500">
          <img src="/upload.svg" width={40} height={40} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here or click</h3>
          <p className="text-sm mb-4">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  )
}
