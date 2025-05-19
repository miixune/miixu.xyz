import type React from "react"
import { Suspense } from "react"
import AdminDashboardClient from "./client"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <AdminDashboardClient />
      </Suspense>
    </>
  )
}
