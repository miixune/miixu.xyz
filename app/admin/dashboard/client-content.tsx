"use client"

import { useState, useEffect } from "react"
import AdminDashboardContent from "./content"

export default function AdminDashboardClientContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  return <AdminDashboardContent />
}
