"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import the component with no SSR
const AdminDashboardContent = dynamic(() => import("@/components/admin-dashboard-content"), {
  ssr: false,
  loading: () => <div className="mt-8 text-center">Loading dashboard...</div>,
})

export default function AdminDashboardClient() {
  return (
    <Suspense fallback={<div className="mt-8 text-center">Loading dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}
