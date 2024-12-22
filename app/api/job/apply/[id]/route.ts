import { connectToDatabase } from "@/lib/database"
import Application from "@/lib/database/models/application.modal"

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params

  const { name, email, cover, resume } = await req.json()

  console.log(name, email, cover, resume, id)

  try {
    await connectToDatabase()
    const newApplication = await Application.create({
      name,
      email,
      cover,
      resume,
      jobId: id,
    })
    return new Response(JSON.stringify(newApplication), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
