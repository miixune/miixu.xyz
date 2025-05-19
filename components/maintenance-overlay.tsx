"use client"

import { useMaintenance } from "@/context/maintenance-context"
import { usePathname } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export function MaintenanceOverlay() {
  const { maintenanceMode } = useMaintenance()
  const pathname = usePathname()

  // Don't show the overlay on admin pages
  const isAdminPage = pathname.startsWith("/admin")

  if (!maintenanceMode || isAdminPage) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-4"
    >
      <div className="bg-card border rounded-lg shadow-lg p-6 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Site Under Maintenance</h2>
        <p className="text-muted-foreground mb-6">
          We're currently performing some updates to improve your experience. Please check back soon.
        </p>
        <div className="animate-pulse flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  )
}
