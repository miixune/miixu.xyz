"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import the component with no SSR
const BlogsContent = dynamic(() => import("@/components/blogs-content"), {
  ssr: false,
  loading: () => <div className="mt-16 text-center">Loading blog posts...</div>,
})

export default function BlogsClient() {
  return (
    <Suspense fallback={<div className="mt-16 text-center">Loading blog posts...</div>}>
      <BlogsContent />
    </Suspense>
  )
}
