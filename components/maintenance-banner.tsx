"use client"

import { AlertTriangle } from "lucide-react"
import { useMaintenance } from "@/context/maintenance-context"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function MaintenanceBanner() {
  const { maintenanceMode } = useMaintenance()
  const pathname = usePathname()

  // Don't show the banner on admin pages
  const isAdminPage = pathname?.startsWith("/admin") || false

  if (!maintenanceMode || isAdminPage) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black py-3 px-4 flex items-center justify-center"
      >
        <AlertTriangle className="h-5 w-5 mr-2" />
        <p className="font-medium text-center">
          This site is currently undergoing maintenance. Some features may be limited.
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
