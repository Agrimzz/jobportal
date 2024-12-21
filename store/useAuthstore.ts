import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
  userId: string | null
  name: string | null
  email: string | null
  type: "candidate" | "recruiter" | null
  setUser: (user: {
    userId: string
    name: string
    email: string
    type: "candidate" | "recruiter"
  }) => void
  clearUser: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      name: null,
      type: null,
      email: null,
      setUser: ({ userId, name, type, email }) =>
        set({ userId, name, type, email }),
      clearUser: () =>
        set({ userId: null, name: null, type: null, email: null }),
    }),
    {
      name: "auth-store",
    }
  )
)

export default useAuthStore
