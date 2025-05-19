"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends ButtonProps {
  showArrow?: boolean
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, showArrow = true, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn("relative group transition-all duration-300", className)} {...props}>
        <span className="relative z-10 flex items-center">
          {children}
          {showArrow && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md"></div>
      </Button>
    )
  },
)
GradientButton.displayName = "GradientButton"

export { GradientButton }
