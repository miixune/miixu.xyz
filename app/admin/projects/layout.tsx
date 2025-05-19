import type React from "react"
import { Suspense } from "react"
import AdminProjectsClient from "./client"

export default function AdminProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <AdminProjectsClient />
      </Suspense>
    </>
  )
}
