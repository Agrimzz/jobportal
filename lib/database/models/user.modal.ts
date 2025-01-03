import mongoose, { Document, models, Schema } from "mongoose"

export interface IUser extends Document {
  fullname: string
  email: string
  password: string
  type: "candidate" | "recruiter"
  photo?: string
  location?: string
  url?: string
}

const userSchema: Schema<IUser> = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["candidate", "recruiter"],
    required: true,
  },
  photo: {
    type: String,
    required: function () {
      return this.type === "recruiter"
    },
  },
  location: {
    type: String,
    required: function () {
      return this.type === "recruiter"
    },
  },
  url: {
    type: String,
    required: function () {
      return this.type === "recruiter"
    },
  },
})

if (models.User) {
  delete models.User
}

const User = models.User || mongoose.model("User", userSchema)

export default User
