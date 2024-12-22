import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
  userId: string | null
  name: string | null
  email: string | null
  type: "candidate" | "recruiter" | null
  favourites: string[]
  setUser: (user: {
    userId: string
    name: string
    email: string
    type: "candidate" | "recruiter"
    favourites?: string[]
  }) => void
  addFavourite: (jobId: string) => void
  removeFavourite: (jobId: string) => void
  clearUser: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      name: null,
      type: null,
      email: null,
      favourites: [],
      setUser: ({ userId, name, type, email, favourites = [] }) =>
        set({ userId, name, type, email, favourites }),
      addFavourite: (jobId) =>
        set((state) => ({
          favourites: [...state.favourites, jobId],
        })),
      removeFavourite: (jobId) =>
        set((state) => ({
          favourites: state.favourites.filter((id) => id !== jobId),
        })),
      clearUser: () =>
        set({
          userId: null,
          name: null,
          type: null,
          email: null,
          favourites: [],
        }),
    }),
    {
      name: "auth-store",
    }
  )
)

export default useAuthStore
