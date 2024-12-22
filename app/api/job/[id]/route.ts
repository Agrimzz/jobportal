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

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await params
  console.log(id)
  try {
    await connectToDatabase()
    const job = await Job.findByIdAndDelete(id)

    if (!job) {
      return new Response(JSON.stringify({ message: "Job not found" }), {
        status: 404,
      })
    }

    return new Response(
      JSON.stringify({ message: "Job deleted successfully" }),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error("Error deleting job:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}
