"use client"

import { useEffect, useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { MaintenanceOverlay } from "@/components/maintenance-overlay"
import BlogsContent from "./content"

export default function BlogsClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Replace the static content with the client component
    const contentElement = document.getElementById("blogs-content")
    if (contentElement) {
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <PageTransition>
      <MaintenanceOverlay />
      <BlogsContent />
    </PageTransition>
  )
}
