"use client"

import { Suspense, useState } from "react"
import { AdminBlogsContent } from "@/components/admin-blogs-content"

export function AdminBlogsClientWrapper() {
  // This ensures the component is fully client-side
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after mount
  if (typeof window !== "undefined" && !isClient) {
    setIsClient(true)
  }

  if (!isClient) {
    return <div className="mt-12 text-center">Loading blog management...</div>
  }

  return (
    <Suspense fallback={<div className="mt-12 text-center">Loading blog management...</div>}>
      <AdminBlogsContent />
    </Suspense>
  )
}
