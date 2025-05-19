"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the component with no SSR
const BlogsContentInner = dynamic(() => import("@/components/blogs-content"), {
  ssr: false,
  loading: () => <div className="mt-16 text-center">Loading blog posts...</div>,
})

export default function BlogsContentWrapper() {
  return (
    <Suspense fallback={<div className="mt-16 text-center">Loading blog posts...</div>}>
      <BlogsContentInner />
    </Suspense>
  )
}
