"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface MaintenanceContextType {
  maintenanceMode: boolean
  toggleMaintenanceMode: () => void
}

const MaintenanceContext = createContext<MaintenanceContextType>({
  maintenanceMode: false,
  toggleMaintenanceMode: () => {},
})

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load maintenance state from localStorage on initial render
  useEffect(() => {
    setMounted(true)
    const storedMaintenanceMode = localStorage.getItem("maintenanceMode")
    if (storedMaintenanceMode) {
      setMaintenanceMode(storedMaintenanceMode === "true")
    }
  }, [])

  const toggleMaintenanceMode = () => {
    const newState = !maintenanceMode
    setMaintenanceMode(newState)
    if (mounted) {
      localStorage.setItem("maintenanceMode", String(newState))
    }
  }

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceMode,
        toggleMaintenanceMode,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  )
}

export const useMaintenance = () => useContext(MaintenanceContext)
