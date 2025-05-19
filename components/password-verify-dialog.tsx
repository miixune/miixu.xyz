"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePassword } from "@/context/password-context"
import { Loader2, AlertCircle, KeyRound } from "lucide-react"

interface PasswordVerifyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  title?: string
  description?: string
}

export function PasswordVerifyDialog({
  open,
  onOpenChange,
  onSuccess,
  title = "Verify Password",
  description = "Enter your 6-digit security password to continue.",
}: PasswordVerifyDialogProps) {
  const { verifyPassword, isPasswordSet } = usePassword()
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle the case when no password is set
  useEffect(() => {
    if (open && !isPasswordSet) {
      // If dialog is open but no password is set, call success and close
      onSuccess()
      onOpenChange(false)
    }
  }, [open, isPasswordSet, onSuccess, onOpenChange])

  const handleVerify = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Validate password
      if (!/^\d{6}$/.test(password)) {
        throw new Error("Password must be exactly 6 digits")
      }

      // Verify the password
      const isValid = verifyPassword(password)
      if (!isValid) {
        throw new Error("Incorrect password")
      }

      // Call success callback
      onSuccess()

      // Reset form and close dialog
      setPassword("")
      onOpenChange(false)
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render the dialog at all if no password is set
  if (!isPasswordSet) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="verify-password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="verify-password"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit password"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 6))}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 rounded-md flex items-start gap-2 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleVerify} disabled={isLoading || password.length !== 6}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
