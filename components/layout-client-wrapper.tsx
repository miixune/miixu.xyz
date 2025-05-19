"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the client component with no SSR
const LayoutClient = dynamic(() => import("@/app/layout-client").then((mod) => mod.LayoutClient), {
  ssr: false,
})

export function LayoutClientWrapper() {
  return (
    <Suspense fallback={null}>
      <LayoutClient />
    </Suspense>
  )
}
