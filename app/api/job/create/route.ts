import { connectToDatabase } from "@/lib/database"
import Job from "@/lib/database/models/job.modal"
import User from "@/lib/database/models/user.modal"

export const POST = async (req: Request) => {
  const { title, type, description, salary, experience, recruiter } =
    await req.json()

  try {
    console.log(recruiter)
    await connectToDatabase()
    const organization = await User.findOne({ _id: recruiter })
    if (!organization) {
      return new Response(JSON.stringify({ message: "Recruiter not found" }), {
        status: 404,
      })
    }
    const newJob = await Job.create({
      title,
      type,
      description,
      salary,
      experience,
      recruiter,
    })
    return new Response(JSON.stringify(newJob), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
