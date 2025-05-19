"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PasswordSetupDialog } from "@/components/password-setup-dialog"
import { usePassword } from "@/context/password-context"
import { Shield, AlertTriangle, KeyRound } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

export function PasswordSetup() {
  const [open, setOpen] = useState(false)
  const { isPasswordSet } = usePassword()

  return (
    <Card className={isPasswordSet ? "border-green-500" : "border-yellow-500"}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {isPasswordSet ? (
            <Shield className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
          Security Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">
              {isPasswordSet
                ? "Security password is set. Sensitive operations are protected."
                : "No security password set. Sensitive operations are unprotected."}
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <GradientButton size="sm" variant={isPasswordSet ? "outline" : "default"}>
                <KeyRound className="mr-2 h-4 w-4" />
                {isPasswordSet ? "Change Password" : "Set Password"}
              </GradientButton>
            </DialogTrigger>
            <PasswordSetupDialog open={open} onOpenChange={setOpen} />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
