export type ButtonProps = {
  title: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export type JobCardProps = {
  id: string | undefined
  title: string
  type: string
  description: string
  salary: string
  recruiter: string
  location: string
  photo: string
  recruiterId: string
  fetch: (currentPage: number) => Promise<void>
  page: number
}

export type ApplyModalProps = {
  jobId: string | string[] | undefined
  email: string | null
  title: string | undefined
  name: string | null
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
