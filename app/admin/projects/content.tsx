"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getAllProjects, createProject, deleteProject, toggleProjectFeatured, type Project } from "@/lib/data-service"
import { PlusCircle, Trash2, Star } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { usePassword } from "@/context/password-context"
import { PasswordVerifyDialog } from "@/components/password-verify-dialog"

export default function AdminProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    tags: [],
    featured: false,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { isPasswordSet } = usePassword()

  // Password verification
  const [passwordVerifyOpen, setPasswordVerifyOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getAllProjects()
        setProjects(projects)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Update the executeWithPasswordCheck function
  const executeWithPasswordCheck = (action: () => void) => {
    if (isPasswordSet) {
      setPendingAction(() => action)
      setPasswordVerifyOpen(true)
    } else {
      // If no password is set, just execute the action directly
      action()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim())
    setNewProject((prev) => ({ ...prev, tags }))
  }

  const handleCreateProject = async () => {
    if (!newProject.title || !newProject.description) {
      alert("Please fill in all required fields")
      return
    }

    executeWithPasswordCheck(async () => {
      try {
        const project = await createProject({
          title: newProject.title,
          description: newProject.description,
          image: newProject.image || "/placeholder.svg?height=300&width=500", // Default image
          githubUrl: newProject.githubUrl,
          liveUrl: newProject.liveUrl,
          tags: newProject.tags,
          featured: newProject.featured,
        })

        setProjects((prev) => [...prev, project])
        setNewProject({
          title: "",
          description: "",
          image: "",
          githubUrl: "",
          liveUrl: "",
          tags: [],
          featured: false,
        })
      } catch (error) {
        console.error("Failed to create project:", error)
      }
    })
  }

  const handleToggleFeatured = async (id: string) => {
    executeWithPasswordCheck(async () => {
      try {
        const updatedProject = await toggleProjectFeatured(id)
        if (updatedProject) {
          setProjects((prev) =>
            prev.map((project) => (project.id === id ? { ...project, featured: updatedProject.featured } : project)),
          )
        }
      } catch (error) {
        console.error("Failed to toggle featured status:", error)
      }
    })
  }

  const handleDeleteProject = async (id: string) => {
    executeWithPasswordCheck(async () => {
      try {
        const success = await deleteProject(id)
        if (success) {
          setProjects((prev) => prev.filter((p) => p.id !== id))
        }
      } catch (error) {
        console.error("Failed to delete project:", error)
      }
    })
  }

  return (
    <>
      <div className="mt-12 grid gap-6">
        {/* New Project Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={newProject.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="githubUrl" className="text-sm font-medium">
                GitHub URL
              </label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={newProject.githubUrl}
                onChange={handleInputChange}
                placeholder="Enter GitHub URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="liveUrl" className="text-sm font-medium">
                Live URL
              </label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={newProject.liveUrl}
                onChange={handleInputChange}
                placeholder="Enter live URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <Input
                id="tags"
                name="tags"
                value={newProject.tags?.join(", ")}
                onChange={handleTagsChange}
                placeholder="React, Next.js, Web Development"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.featured}
                onChange={(e) => setNewProject((prev) => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Project
              </label>
            </div>
          </CardContent>
          <CardFooter>
            <GradientButton onClick={handleCreateProject} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Project
            </GradientButton>
          </CardFooter>
        </Card>

        {/* User Created Projects */}
        {projects.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className={project.featured ? "border-purple-500" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{project.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleFeatured(project.id)}
                      className={project.featured ? "text-purple-500" : ""}
                    >
                      <Star className={`h-5 w-5 ${project.featured ? "fill-current" : ""}`} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <GradientButton variant="outline" size="sm" asChild showArrow={false}>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </GradientButton>
                    )}
                    {project.liveUrl && (
                      <GradientButton size="sm" asChild showArrow={false}>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      </GradientButton>
                    )}
                  </div>
                  <GradientButton
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
                    showArrow={false}
                  >
                    <Trash2 className="h-4 w-4" />
                  </GradientButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {isLoading ? "Loading projects..." : "No projects yet. Create your first project!"}
            </p>
          </div>
        )}
      </div>

      {/* Password Verify Dialog */}
      <PasswordVerifyDialog
        open={passwordVerifyOpen}
        onOpenChange={setPasswordVerifyOpen}
        onSuccess={() => {
          if (pendingAction) {
            pendingAction()
            setPendingAction(null)
          }
        }}
      />
    </>
  )
}
