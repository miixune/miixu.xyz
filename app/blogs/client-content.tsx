"use client"

import { useState, useEffect } from "react"
import BlogsContent from "./content"

export default function BlogsClientContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="text-center py-8">Loading blog posts...</div>
  }

  return <BlogsContent />
}
