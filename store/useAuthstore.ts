import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
  userId: string | null
  name: string | null
  type: "candidate" | "recruiter" | null
  setUser: (user: {
    userId: string
    name: string
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
      setUser: ({ userId, name, type }) => set({ userId, name, type }),
      clearUser: () => set({ userId: null, name: null, type: null }),
    }),
    {
      name: "auth-store",
    }
  )
)

export default useAuthStore
