"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the client component with no SSR
const ProjectsClient = dynamic(() => import("@/app/projects/client"), {
  ssr: false,
})

export function ProjectsClientWrapper() {
  return (
    <Suspense fallback={null}>
      <ProjectsClient />
    </Suspense>
  )
}
