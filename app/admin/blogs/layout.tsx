import type React from "react"
import { Suspense } from "react"
import AdminBlogsClient from "./client"

export default function AdminBlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <AdminBlogsClient />
      </Suspense>
    </>
  )
}
