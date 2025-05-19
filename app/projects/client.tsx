"use client"

import { useEffect, useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { ProjectCard } from "@/components/project-card"
import { getFeaturedProjects, getAllProjects } from "@/lib/data-service"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"
import { MaintenanceOverlay } from "@/components/maintenance-overlay"

export default function ProjectsClient() {
  const [isMounted, setIsMounted] = useState(false)
  const [allProjects, setAllProjects] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const contentElement = document.getElementById("projects-content")
    if (contentElement) {
      setIsMounted(true)

      // Fetch data
      const fetchData = async () => {
        try {
          const projects = await getAllProjects()
          const featured = await getFeaturedProjects()

          setAllProjects(projects)
          setFeaturedProjects(featured)
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching projects:", error)
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

      {allProjects.length > 0 ? (
        <>
          {featuredProjects.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Featured Projects</h2>
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
            </div>
          )}

          {allProjects.filter((project) => !featuredProjects.some((fp) => fp.id === project.id)).length > 0 && (
            <div className="mt-12">
              {featuredProjects.length > 0 && <h2 className="text-2xl font-bold mb-6 text-center">All Projects</h2>}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allProjects
                  .filter((project) => !featuredProjects.some((fp) => fp.id === project.id))
                  .map((project) => (
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
            </div>
          )}
        </>
      ) : (
        <div className="mt-16 text-center">
          <h2 className="text-xl font-medium mb-4">No projects yet</h2>
          <p className="text-muted-foreground mb-8">Check back later for new projects!</p>
          <GradientButton asChild>
            <Link href="/">Return Home</Link>
          </GradientButton>
        </div>
      )}
    </PageTransition>
  )
}
