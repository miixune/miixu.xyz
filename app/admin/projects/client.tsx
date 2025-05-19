"use client"

import { useEffect, useState } from "react"
import { ProtectedRouteClient } from "@/components/protected-route-client"
import { PageTransition } from "@/components/page-transition"
import AdminProjectsContent from "./content"

export default function AdminProjectsClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Replace the static content with the client component
    const contentElement = document.getElementById("admin-projects-content")
    if (contentElement) {
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ProtectedRouteClient>
      <PageTransition>
        <AdminProjectsContent />
      </PageTransition>
    </ProtectedRouteClient>
  )
}
