"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface PasswordContextType {
  isPasswordSet: boolean
  verifyPassword: (password: string) => boolean
  setNewPassword: (password: string) => void
  clearPassword: () => void
}

const PasswordContext = createContext<PasswordContextType>({
  isPasswordSet: false,
  verifyPassword: () => false,
  setNewPassword: () => {},
  clearPassword: () => {},
})

export function PasswordProvider({ children }: { children: React.ReactNode }) {
  const [isPasswordSet, setIsPasswordSet] = useState(false)
  const [password, setPassword] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load password from localStorage on initial render
  useEffect(() => {
    setMounted(true)
    const storedPassword = localStorage.getItem("adminPassword")
    if (storedPassword) {
      setPassword(storedPassword)
      setIsPasswordSet(true)
    }
  }, [])

  const verifyPassword = (inputPassword: string): boolean => {
    return inputPassword === password
  }

  const setNewPassword = (newPassword: string) => {
    // Validate that it's a 6-digit password
    if (/^\d{6}$/.test(newPassword)) {
      setPassword(newPassword)
      setIsPasswordSet(true)
      if (mounted) {
        localStorage.setItem("adminPassword", newPassword)
      }
    } else {
      throw new Error("Password must be exactly 6 digits")
    }
  }

  const clearPassword = () => {
    setPassword(null)
    setIsPasswordSet(false)
    if (mounted) {
      localStorage.removeItem("adminPassword")
    }
  }

  return (
    <PasswordContext.Provider
      value={{
        isPasswordSet,
        verifyPassword,
        setNewPassword,
        clearPassword,
      }}
    >
      {children}
    </PasswordContext.Provider>
  )
}

export const usePassword = () => useContext(PasswordContext)
