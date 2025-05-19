"use client"

import { Suspense, useState } from "react"
import { BlogsContent } from "@/components/blogs-content"

export function BlogsClientWrapper() {
  // This ensures the component is fully client-side
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after mount
  if (typeof window !== "undefined" && !isClient) {
    setIsClient(true)
  }

  if (!isClient) {
    return <div className="mt-16 text-center">Loading blog posts...</div>
  }

  return (
    <Suspense fallback={<div className="mt-16 text-center">Loading blog posts...</div>}>
      <BlogsContent />
    </Suspense>
  )
}
