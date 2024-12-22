import { connectToDatabase } from "@/lib/database"
import Job from "@/lib/database/models/job.modal"
import User from "@/lib/database/models/user.modal"

export const POST = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get("limit") || "6")
  const page = parseInt(searchParams.get("page") || "1")
  const { ids } = await req.json()

  try {
    await connectToDatabase()
    const skip = (page - 1) * limit
    await User.init()

    const totalJobs = await Job.countDocuments({ _id: { $in: ids } })
    const jobs = await Job.find({ _id: { $in: ids } })
      .populate("recruiter")
      .skip(skip)
      .limit(limit)

    const hasNextPage = skip + jobs.length < totalJobs
    return new Response(
      JSON.stringify({ data: jobs, nextPage: hasNextPage ? page + 1 : null }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
