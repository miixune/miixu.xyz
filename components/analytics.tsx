"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // You can add your analytics code here (Google Analytics, Plausible, etc.)
    // For example:
    // if (window.gtag) {
    //   window.gtag("config", "YOUR-GA-ID", {
    //     page_path: pathname + searchParams.toString(),
    //   });
    // }

    console.log(`Page view: ${pathname}${searchParams.toString()}`)
  }, [pathname, searchParams])

  return null
}
