"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllProjects, getAllBlogPosts } from "@/lib/data-service"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"
import { FolderKanban, FileText, Heart } from "lucide-react"
import { SiteStatistics } from "@/components/site-statistics"
import { SystemHealth } from "@/components/system-health"
import { MaintenanceToggle } from "@/components/maintenance-toggle"
import { PasswordSetup } from "@/components/password-setup"
import { ImportExportData } from "@/components/import-export-data"

export default function AdminDashboardContent() {
  const [projectCount, setProjectCount] = useState(0)
  const [featuredProjectCount, setFeaturedProjectCount] = useState(0)
  const [blogCount, setBlogCount] = useState(0)
  const [pinnedBlogCount, setPinnedBlogCount] = useState(0)
  const [totalLikes, setTotalLikes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await getAllProjects()
        const blogs = await getAllBlogPosts()

        setProjectCount(projects.length)
        setFeaturedProjectCount(projects.filter((p) => p.featured).length)
        setBlogCount(blogs.length)
        setPinnedBlogCount(blogs.filter((b) => b.pinned).length)
        setTotalLikes(blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0))
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* Security Status */}
      <PasswordSetup />

      {/* Maintenance Mode Toggle */}
      <MaintenanceToggle />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Projects Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : projectCount}</div>
            <p className="text-xs text-muted-foreground">{featuredProjectCount} featured projects</p>
            <div className="mt-4">
              <GradientButton size="sm" asChild>
                <Link href="/admin/projects">Manage Projects</Link>
              </GradientButton>
            </div>
          </CardContent>
        </Card>

        {/* Blog Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : blogCount}</div>
            <p className="text-xs text-muted-foreground">{pinnedBlogCount} pinned posts</p>
            <div className="mt-4">
              <GradientButton size="sm" asChild>
                <Link href="/admin/blogs">Manage Blogs</Link>
              </GradientButton>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : totalLikes}</div>
            <p className="text-xs text-muted-foreground">Total likes across all blog posts</p>
            <div className="mt-4">
              <GradientButton size="sm" asChild variant="outline">
                <Link href="/admin/blogs">View Details</Link>
              </GradientButton>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <ImportExportData />

      {/* System Health */}
      <div className="mt-8">
        <SystemHealth />
      </div>

      {/* Site Statistics */}
      <div className="mt-8">
        <SiteStatistics />
      </div>
    </>
  )
}
