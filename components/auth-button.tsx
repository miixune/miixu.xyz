"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { Loader2, LogIn, LogOut } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AuthButton() {
  const { user, signOut, isAdmin } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const pathname = usePathname()

  const handleSignOut = () => {
    setIsLoading(true)
    try {
      signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Please wait...
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-2">
        {isAdmin && (
          <div className="flex gap-2 flex-wrap justify-center">
            <GradientButton variant="outline" size="sm" asChild>
              <Link href="/admin/dashboard">Dashboard</Link>
            </GradientButton>
            <GradientButton variant="outline" size="sm" asChild>
              <Link href="/admin/projects">Manage Projects</Link>
            </GradientButton>
            <GradientButton variant="outline" size="sm" asChild>
              <Link href="/admin/blogs">Manage Blogs</Link>
            </GradientButton>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <GradientButton variant="ghost" size="sm" onClick={handleSignOut} showArrow={false}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </GradientButton>
        </div>
      </div>
    )
  }

  return (
    <>
      <GradientButton variant="outline" size="sm" onClick={() => setShowLoginForm(true)}>
        <LogIn className="h-4 w-4 mr-1" />
        Admin Login
      </GradientButton>

      {showLoginForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowLoginForm(false)}>
          <div className="fixed inset-0 bg-background opacity-90"></div>
          <div className="z-10 w-full max-w-md mx-auto">
            <Card className="w-full" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="text-center">
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your credentials to manage your content.</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm onSuccess={() => setShowLoginForm(false)} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
