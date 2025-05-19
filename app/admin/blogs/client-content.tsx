"use client"

import { useState, useEffect } from "react"
import AdminBlogsContent from "./content"

export default function AdminBlogsClientContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="text-center py-8">Loading blog management...</div>
  }

  return <AdminBlogsContent />
}
