"use client"

import { Suspense, useEffect, useState } from "react"
import HomeClient from "./home-client"

export function LayoutClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Only render on the home page
  const isHomePage = window.location.pathname === "/"
  if (!isHomePage) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  )
}
