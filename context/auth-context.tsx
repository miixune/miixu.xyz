"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// The only authorized credentials
const ADMIN_EMAIL = "kilian.steffen.stolz@icloud.com" // Replace with your preferred email
const ADMIN_PASSWORD = "Th!s!sTh€@DM1N_PASSwordle.0735" // Replace with your preferred password

interface User {
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ success: false }),
  signOut: () => {},
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    // Simple authentication check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = { email, isAdmin: true }
      setUser(user)
      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user))
      return { success: true }
    }

    return {
      success: false,
      error: "Invalid email or password",
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        isAdmin: user?.isAdmin || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
