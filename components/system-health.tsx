"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, HardDrive, Database, Cpu, MemoryStickIcon as Memory } from "lucide-react"

export function SystemHealth() {
  const [storageUsed, setStorageUsed] = useState<number>(0)
  const [storageLimit, setStorageLimit] = useState<number>(5 * 1024 * 1024) // 5MB limit for localStorage
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const calculateStorageUsage = () => {
      try {
        let total = 0
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length + key.length) * 2 // Approximate size in bytes
          }
        }
        setStorageUsed(total)
      } catch (error) {
        console.error("Error calculating storage usage:", error)
      } finally {
        setIsLoading(false)
      }
    }

    calculateStorageUsage()
  }, [])

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const storagePercentage = (storageUsed / storageLimit) * 100
  const isStorageCritical = storagePercentage > 80

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Storage</span>
            </div>
            <div className="flex items-center gap-2">
              {isStorageCritical ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
              <span className="text-sm">
                {isLoading ? "Calculating..." : `${formatSize(storageUsed)} / ${formatSize(storageLimit)}`}
              </span>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${isStorageCritical ? "bg-amber-500" : "bg-green-500"}`}
              style={{ width: `${Math.min(storagePercentage, 100)}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">LocalStorage</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Operational</span>
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">System</p>
                <p className="text-xs text-muted-foreground">Browser</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Operational</span>
            </div>

            <div className="flex items-center gap-2">
              <Memory className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Memory</p>
                <p className="text-xs text-muted-foreground">Browser</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Operational</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
