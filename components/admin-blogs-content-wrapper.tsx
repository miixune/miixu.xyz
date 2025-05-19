"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the component with no SSR
const AdminBlogsContentInner = dynamic(() => import("@/components/admin-blogs-content"), {
  ssr: false,
  loading: () => <div className="mt-12 text-center">Loading blog management...</div>,
})

export default function AdminBlogsContentWrapper() {
  return (
    <Suspense fallback={<div className="mt-12 text-center">Loading blog management...</div>}>
      <AdminBlogsContentInner />
    </Suspense>
  )
}
