"use client"

import { useState, useEffect } from "react"
import AdminProjectsContent from "./content"

export default function AdminProjectsClientContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="text-center py-8">Loading project management...</div>
  }

  return <AdminProjectsContent />
}
