"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export function ProtectedRouteClient({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!loading && !user && mounted) {
      window.location.href = "/"
    }
  }, [user, loading, mounted])

  if (!mounted || loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login Required</CardTitle>
          </CardHeader>
          <LoginForm />
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p className="text-muted-foreground">You don't have permission to access this page.</p>
      </div>
    )
  }

  return <>{children}</>
}
