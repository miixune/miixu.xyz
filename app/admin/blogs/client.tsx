"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import the component with no SSR
const AdminBlogsContent = dynamic(() => import("@/components/admin-blogs-content"), {
  ssr: false,
  loading: () => <div className="mt-12 text-center">Loading blog management...</div>,
})

export default function AdminBlogsClient() {
  return (
    <Suspense fallback={<div className="mt-12 text-center">Loading blog management...</div>}>
      <AdminBlogsContent />
    </Suspense>
  )
}
