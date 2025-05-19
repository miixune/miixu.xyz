"use client"

import { Suspense, useState } from "react"
import { AdminDashboardContent } from "@/components/admin-dashboard-content"

export function AdminDashboardClientWrapper() {
  // This ensures the component is fully client-side
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after mount
  if (typeof window !== "undefined" && !isClient) {
    setIsClient(true)
  }

  if (!isClient) {
    return <div className="mt-8 text-center">Loading dashboard...</div>
  }

  return (
    <Suspense fallback={<div className="mt-8 text-center">Loading dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}
