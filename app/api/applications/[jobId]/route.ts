import { connectToDatabase } from "@/lib/database"
import Application from "@/lib/database/models/application.modal"
import Job from "@/lib/database/models/job.modal"

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) => {
  const { jobId } = await params

  try {
    await connectToDatabase()

    const jobExists = await Job.findById(jobId)
    if (!jobExists) {
      return new Response(JSON.stringify({ error: "Job not found" }), {
        status: 404,
      })
    }

    const applications = await Application.find({ jobId })
    return new Response(JSON.stringify(applications), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    })
  }
}
