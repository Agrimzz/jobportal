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
}
