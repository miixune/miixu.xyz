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
import { clearAllData } from "@/lib/data-service"
import { Loader2, AlertTriangle } from "lucide-react"

interface ClearDataDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ClearDataDialog({ open, onOpenChange, onSuccess }: ClearDataDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  const handleClear = async () => {
    setIsLoading(true)

    try {
      const success = await clearAllData()
      if (success && onSuccess) {
        onOpenChange(false)
        onSuccess()
      }
    } catch (error) {
      console.error("Error clearing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isConfirmed = confirmText === "DELETE"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Clear All Data
          </DialogTitle>
          <DialogDescription>
            This action will permanently delete all your blog posts and projects. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm" className="text-sm font-medium">
              Type <span className="font-bold">DELETE</span> to confirm
            </label>
            <input
              id="confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleClear} disabled={!isConfirmed || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              "Clear All Data"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
