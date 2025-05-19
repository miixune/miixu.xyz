import type React from "react"
import { Suspense } from "react"
import { ProjectsClientWrapper } from "@/components/projects-client-wrapper"

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <ProjectsClientWrapper />
      </Suspense>
    </>
  )
}
