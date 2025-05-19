import type React from "react"
import { Suspense } from "react"
import BlogsClient from "./client"

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <BlogsClient />
      </Suspense>
    </>
  )
}
