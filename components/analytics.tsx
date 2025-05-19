"use client"

import { useEffect, useState } from "react"

export function Analytics() {
  const [pathname, setPathname] = useState("")
  const [searchParams, setSearchParams] = useState("")

  useEffect(() => {
    // Get pathname and search params from window.location
    setPathname(window.location.pathname)
    setSearchParams(window.location.search)

    // Track page view
    console.log(`Page view: ${window.location.pathname}${window.location.search}`)

    // Set up listener for route changes
    const handleRouteChange = () => {
      const newPathname = window.location.pathname
      const newSearchParams = window.location.search

      setPathname(newPathname)
      setSearchParams(newSearchParams)

      console.log(`Page view: ${newPathname}${newSearchParams}`)
    }

    // Listen for popstate events (browser back/forward)
    window.addEventListener("popstate", handleRouteChange)

    // Clean up
    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return null
}
