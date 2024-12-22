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

export const jobFormSchema = z.object({
  title: z
    .string()
    .min(1, "Job title is required")
    .max(30, "Job title is too long"),
  type: z.string().min(1, "Job type is required"),
  description: z.string().min(1, "Job description is required"),
  salary: z.string().min(1, "Salary is required"),
  experience: z.string().min(1, "Experience is required"),
})
