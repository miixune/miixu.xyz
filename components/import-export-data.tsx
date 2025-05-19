"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ExportDataDialog } from "@/components/export-data-dialog"
import { ImportDataDialog } from "@/components/import-data-dialog"
import { ClearDataDialog } from "@/components/clear-data-dialog"
import { Download, Upload, Trash2, Database } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"

export function ImportExportData() {
  const [exportOpen, setExportOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [clearOpen, setClearOpen] = useState(false)

  const handleDataChange = () => {
    // Force a refresh by navigating to the same page
    window.location.reload()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GradientButton
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => setExportOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            <span>Export Data</span>
          </GradientButton>
          <GradientButton
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => setImportOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            <span>Import Data</span>
          </GradientButton>
          <GradientButton variant="outline" className="flex items-center justify-center">
            <Database className="mr-2 h-4 w-4" />
            <span>Backup Data</span>
          </GradientButton>
          <GradientButton
            variant="destructive"
            className="flex items-center justify-center"
            onClick={() => setClearOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Clear All Data</span>
          </GradientButton>
        </div>

        <ExportDataDialog open={exportOpen} onOpenChange={setExportOpen} />
        <ImportDataDialog open={importOpen} onOpenChange={setImportOpen} onSuccess={handleDataChange} />
        <ClearDataDialog open={clearOpen} onOpenChange={setClearOpen} onSuccess={handleDataChange} />
      </CardContent>
    </Card>
  )
}
