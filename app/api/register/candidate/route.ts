import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.modal"
import bcrypt from "bcryptjs"
export const POST = async (req: Request) => {
  const { fullname, email, password, type } = await req.json()

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
        fullname,
        email,
        password: bcrypt.hashSync(password, 10),
        type,
      })
      return new Response(JSON.stringify(newUser), { status: 200 })
    }
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
