"use client"

import { Suspense, useState } from "react"
import { AdminProjectsContent } from "@/components/admin-projects-content"

export function AdminProjectsClientWrapper() {
  // This ensures the component is fully client-side
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after mount
  if (typeof window !== "undefined" && !isClient) {
    setIsClient(true)
  }

  if (!isClient) {
    return <div className="mt-12 text-center">Loading project management...</div>
  }

  return (
    <Suspense fallback={<div className="mt-12 text-center">Loading project management...</div>}>
      <AdminProjectsContent />
    </Suspense>
  )
}
