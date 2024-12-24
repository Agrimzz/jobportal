import { connectToDatabase } from "@/lib/database"
import Job from "@/lib/database/models/job.modal"
import User from "@/lib/database/models/user.modal"

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get("limit") || "6")
  const page = parseInt(searchParams.get("page") || "1")
  const q = searchParams.get("q")

  try {
    await connectToDatabase()

    const skip = (page - 1) * limit
    await User.init()
    const searchFilter = q ? { title: { $regex: q, $options: "i" } } : {}

    const jobs = await Job.find(searchFilter)
      .populate("recruiter")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    const totalJobs = await Job.countDocuments(searchFilter)
    const hasNextPage = skip + jobs.length < totalJobs

    return new Response(
      JSON.stringify({ data: jobs, nextPage: hasNextPage ? page + 1 : null }),
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Failed to fetch jobs" }), {
      status: 500,
    })
  }
}
