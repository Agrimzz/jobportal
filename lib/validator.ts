import { z } from "zod"

const commonFields = {
  fullname: z
    .string()
    .min(1, "Full name is required")
    .max(50, "Full name is too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
}

export const candidateSchema = z.object({
  ...commonFields,
  type: z.literal("candidate"),
})

export const recruiterSchema = z.object({
  ...commonFields,
  type: z.literal("recruiter"),
  location: z.string().min(1, "Location is required"),
  url: z.string().url("Company URL must be a valid URL"),
})
