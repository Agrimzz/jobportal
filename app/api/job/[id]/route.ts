import { connectToDatabase } from "@/lib/database"
import Job from "@/lib/database/models/job.modal"
import User from "@/lib/database/models/user.modal"

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params

  try {
    await connectToDatabase()
    await User.init()
    const job = await Job.findById(id).populate("recruiter")
    if (!job) {
      return new Response(JSON.stringify({ message: "Job not found" }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify(job), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
