"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GradientButton } from "@/components/ui/gradient-button"
import { getFeaturedProjects, getAllBlogPosts } from "@/lib/data-service"
import { ProjectCard } from "@/components/project-card"
import { BlogCard } from "@/components/blog-card"
import { MaintenanceOverlay } from "@/components/maintenance-overlay"
import { PageTransition } from "@/components/page-transition"

export default function HomeClient() {
  const [isMounted, setIsMounted] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [recentBlogPosts, setRecentBlogPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const contentElement = document.getElementById("home-content")
    if (contentElement) {
      setIsMounted(true)

      // Fetch data
      const fetchData = async () => {
        try {
          const projects = await getFeaturedProjects()
          const allBlogPosts = await getAllBlogPosts()

          // Sort blog posts by date (newest first) and take the 3 most recent
          const sortedPosts = [...allBlogPosts]
            .sort((a, b) => {
              const dateA = a.createdAt || new Date(a.date).getTime()
              const dateB = b.createdAt || new Date(b.date).getTime()
              return dateB - dateA
            })
            .slice(0, 3)

          setFeaturedProjects(projects)
          setRecentBlogPosts(sortedPosts)
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching data:", error)
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <PageTransition>
      <MaintenanceOverlay />

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-8 w-full max-w-6xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-2 text-center mb-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl pb-1">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">Check out some of my highlighted work</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  tags={project.tags}
                  featured={project.featured}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <GradientButton asChild>
                <Link href="/projects">View All Projects</Link>
              </GradientButton>
            </div>
          </div>
        </section>
      )}

      {/* Recent Blog Posts Section */}
      {recentBlogPosts.length > 0 && (
        <section className="py-8 w-full max-w-6xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-2 text-center mb-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl pb-1">
                Recent <span className="gradient-text">Blog Posts</span>
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">My latest thoughts and tutorials</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentBlogPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  image={post.image}
                  tags={post.tags}
                  likes={post.likes}
                  pinned={post.pinned}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <GradientButton asChild>
                <Link href="/blogs">Read All Posts</Link>
              </GradientButton>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
