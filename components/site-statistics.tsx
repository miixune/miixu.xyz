"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllProjects, getAllBlogPosts } from "@/lib/data-service"
import { Calendar, Clock, Tag, Heart, Eye, MessageSquare, Share2, Users } from "lucide-react"

export function SiteStatistics() {
  const [blogCount, setBlogCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [totalLikes, setTotalLikes] = useState(0)
  const [latestBlogDate, setLatestBlogDate] = useState<string | null>(null)
  const [latestProjectDate, setLatestProjectDate] = useState<string | null>(null)
  const [popularTags, setPopularTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await getAllProjects()
        const blogs = await getAllBlogPosts()

        setProjectCount(projects.length)
        setBlogCount(blogs.length)
        setTotalLikes(blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0))

        // Get latest blog date
        if (blogs.length > 0) {
          const sortedBlogs = [...blogs].sort((a, b) => {
            const dateA = a.createdAt || new Date(a.date).getTime()
            const dateB = b.createdAt || new Date(b.date).getTime()
            return dateB - dateA
          })
          setLatestBlogDate(sortedBlogs[0].date)
        }

        // Get latest project (assuming projects have a createdAt field)
        if (projects.length > 0) {
          setLatestProjectDate("Recently updated")
        }

        // Get popular tags
        if (blogs.length > 0) {
          const tagCounts: Record<string, number> = {}
          blogs.forEach((blog) => {
            blog.tags.forEach((tag) => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1
            })
          })

          const sortedTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag)
            .slice(0, 3)

          setPopularTags(sortedTags)
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Latest Blog</p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Loading..." : latestBlogDate || "No blogs yet"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Latest Project</p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Loading..." : latestProjectDate || "No projects yet"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Popular Tags</p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Loading..." : popularTags.length > 0 ? popularTags.join(", ") : "No tags yet"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Total Likes</p>
              <p className="text-xs text-muted-foreground">{isLoading ? "Loading..." : `${totalLikes} likes`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Page Views</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Unique Visitors</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Comments</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Shares</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
