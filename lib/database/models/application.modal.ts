import mongoose, { models, Schema } from "mongoose"

export interface IApplication {
  _id?: string
  name: string
  email: string
  cover: string
  resume: string
  jobId: {
    title: string
  }
}

const ApplicationSchema = new Schema<IApplication>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Application =
  models.Application || mongoose.model("Application", ApplicationSchema)

export default Application
