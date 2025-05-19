"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import the component with no SSR
const AdminProjectsContent = dynamic(() => import("@/components/admin-projects-content"), {
  ssr: false,
  loading: () => <div className="mt-12 text-center">Loading project management...</div>,
})

export default function AdminProjectsClient() {
  return (
    <Suspense fallback={<div className="mt-12 text-center">Loading project management...</div>}>
      <AdminProjectsContent />
    </Suspense>
  )
}
