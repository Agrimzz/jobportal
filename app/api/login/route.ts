import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.modal"
import bcrypt from "bcryptjs"
export const POST = async (req: Request) => {
  const { email, password } = await req.json()

  try {
    await connectToDatabase()
    const user = await User.findOne({ email })
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      )
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      )
    }
    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          type: user.type,
        },
      }),
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
