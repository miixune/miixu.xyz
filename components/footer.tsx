"use client"

import { SocialLinks } from "@/components/social-links"
import { AuthButton } from "@/components/auth-button"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/80 backdrop-blur-sm transition-colors duration-500">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center gap-6">
          <SocialLinks />
          <AuthButton />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Miixu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
