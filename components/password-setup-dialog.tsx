"use client"

import { useState } from "react"
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
import { Loader2, AlertCircle, CheckCircle, KeyRound } from "lucide-react"

interface PasswordSetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function PasswordSetupDialog({ open, onOpenChange, onSuccess }: PasswordSetupDialogProps) {
  const { isPasswordSet, setNewPassword, clearPassword } = usePassword()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSetPassword = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate password
      if (!/^\d{6}$/.test(password)) {
        throw new Error("Password must be exactly 6 digits")
      }

      // Validate confirmation
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Set the new password
      setNewPassword(password)
      setSuccess("Password set successfully!")

      // Reset form
      setPassword("")
      setConfirmPassword("")
      setCurrentPassword("")

      // Close dialog after success
      if (onSuccess) {
        setTimeout(() => {
          onOpenChange(false)
          onSuccess()
        }, 1500)
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearPassword = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      clearPassword()
      setSuccess("Password cleared successfully!")

      // Reset form
      setPassword("")
      setConfirmPassword("")
      setCurrentPassword("")

      // Close dialog after success
      if (onSuccess) {
        setTimeout(() => {
          onOpenChange(false)
          onSuccess()
        }, 1500)
      }
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            {isPasswordSet ? "Change Security Password" : "Set Security Password"}
          </DialogTitle>
          <DialogDescription>
            {isPasswordSet
              ? "Change your 6-digit security password for sensitive operations."
              : "Set a 6-digit security password to protect sensitive operations."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isPasswordSet && (
            <div className="flex flex-col gap-2">
              <label htmlFor="current-password" className="text-sm font-medium">
                Current Password
              </label>
              <Input
                id="current-password"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter current 6-digit password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value.replace(/\D/g, "").slice(0, 6))}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="new-password" className="text-sm font-medium">
              {isPasswordSet ? "New Password" : "Password"}
            </label>
            <Input
              id="new-password"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Enter 6-digit password"
              value={password}
              onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 6))}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="Confirm 6-digit password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.replace(/\D/g, "").slice(0, 6))}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 rounded-md flex items-start gap-2 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-md flex items-start gap-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{success}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-between">
          {isPasswordSet && (
            <Button variant="outline" onClick={handleClearPassword} disabled={isLoading} className="text-destructive">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Clearing...
                </>
              ) : (
                "Clear Password"
              )}
            </Button>
          )}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleSetPassword}
              disabled={isLoading || password.length !== 6 || confirmPassword.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Password"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
