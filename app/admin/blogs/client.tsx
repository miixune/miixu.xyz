"use client"

import { useEffect, useState } from "react"
import { ProtectedRouteClient } from "@/components/protected-route-client"
import { PageTransition } from "@/components/page-transition"
import AdminBlogsContent from "./content"

export default function AdminBlogsClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Replace the static content with the client component
    const contentElement = document.getElementById("admin-blogs-content")
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
        <AdminBlogsContent />
      </PageTransition>
    </ProtectedRouteClient>
  )
}
