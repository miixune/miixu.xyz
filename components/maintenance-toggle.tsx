"use client"

import { useMaintenance } from "@/context/maintenance-context"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"

export function MaintenanceToggle() {
  const { maintenanceMode, toggleMaintenanceMode } = useMaintenance()

  return (
    <Card className={maintenanceMode ? "border-yellow-500" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {maintenanceMode ? (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          Maintenance Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">
              {maintenanceMode
                ? "Maintenance mode is currently active. A banner will be displayed on all public pages."
                : "Maintenance mode is currently inactive."}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{maintenanceMode ? "Active" : "Inactive"}</span>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={toggleMaintenanceMode}
              aria-label="Toggle maintenance mode"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
