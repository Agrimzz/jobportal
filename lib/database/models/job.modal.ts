import mongoose, { models, Schema } from "mongoose"

export interface IJob {
  _id?: string
  title: string
  type: string
  description: string
  salary: string
  experience: string
  recruiter: {
    _id: string
    fullname: string
    email: string
    photo: string
    location: string
    url: string
  }
}

const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Job = models.Job || mongoose.model("Job", JobSchema)

export default Job
