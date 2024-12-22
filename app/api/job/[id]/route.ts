import { connectToDatabase } from "@/lib/database"
import Job from "@/lib/database/models/job.modal"
import User from "@/lib/database/models/user.modal"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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
  { params }: { params: Promise<{ id: string }> }
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

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params

  try {
    const payload = await req.json()

    await connectToDatabase()

    const updatedJob = await Job.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    })

    if (!updatedJob) {
      return new Response(JSON.stringify({ message: "Job not found" }), {
        status: 404,
      })
    }

    return new Response(JSON.stringify({ job: updatedJob }), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating job:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
