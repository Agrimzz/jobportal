import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.modal"

export const POST = async (req: Request) => {
  const { photo, fullname, email, location, url, password, type } =
    await req.json()

  try {
    await connectToDatabase()
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Email already exists!" }),
        { status: 400 }
      )
    }
    if (!existingUser) {
      const newUser = await User.create({
        photo,
        fullname,
        email,
        location,
        url,
        password,
        type,
      })
      return new Response(JSON.stringify(newUser), { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
