"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the component with no SSR
const AdminProjectsContentInner = dynamic(() => import("@/components/admin-projects-content"), {
  ssr: false,
  loading: () => <div className="mt-12 text-center">Loading project management...</div>,
})

export default function AdminProjectsContentWrapper() {
  return (
    <Suspense fallback={<div className="mt-12 text-center">Loading project management...</div>}>
      <AdminProjectsContentInner />
    </Suspense>
  )
}
