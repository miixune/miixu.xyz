"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the component with no SSR
const AdminDashboardContentInner = dynamic(() => import("@/components/admin-dashboard-content"), {
  ssr: false,
  loading: () => <div className="mt-8 text-center">Loading dashboard...</div>,
})

export default function AdminDashboardContentWrapper() {
  return (
    <Suspense fallback={<div className="mt-8 text-center">Loading dashboard...</div>}>
      <AdminDashboardContentInner />
    </Suspense>
  )
}
