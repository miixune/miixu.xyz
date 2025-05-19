// Simple data service using localStorage

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  image: string
  tags: string[]
  content: string
  likes?: number
  pinned?: boolean
  createdAt?: number // timestamp for sorting
  likedBy?: string[] // array of user IDs who liked the post
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  githubUrl?: string
  liveUrl?: string
  tags?: string[]
  featured?: boolean
}

// Helper function to initialize localStorage with empty arrays if empty
const initializeLocalStorage = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem("blogPosts")) {
    localStorage.setItem("blogPosts", JSON.stringify([]))
  }

  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify([]))
  }
}

// Generate a unique user ID for tracking likes
const getUserId = () => {
  if (typeof window === "undefined") return ""

  let userId = localStorage.getItem("userId")
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("userId", userId)
  }
  return userId
}

// Blog post functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  initializeLocalStorage()

  if (typeof window === "undefined") return []

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    return storedPosts ? JSON.parse(storedPosts) : []
  } catch (error) {
    console.error("Error getting blog posts:", error)
    return []
  }
}

export async function getPinnedBlogPosts(): Promise<BlogPost[]> {
  initializeLocalStorage()

  if (typeof window === "undefined") return []

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []
    return posts.filter((post) => post.pinned)
  } catch (error) {
    console.error("Error getting pinned blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  initializeLocalStorage()

  if (typeof window === "undefined") {
    return null
  }

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error("Error getting blog post:", error)
    return null
  }
}

export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  initializeLocalStorage()

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    // Check if slug already exists
    if (posts.some((p) => p.slug === post.slug)) {
      throw new Error("A blog post with this slug already exists")
    }

    // Add default values
    const newPost = {
      ...post,
      likes: 0,
      pinned: false,
      createdAt: Date.now(),
      likedBy: [],
    }

    const updatedPosts = [...posts, newPost]
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

    return newPost
  } catch (error) {
    console.error("Error creating blog post:", error)
    throw error
  }
}

export async function updateBlogPost(slug: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  initializeLocalStorage()

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    const index = posts.findIndex((p) => p.slug === slug)
    if (index === -1) return null

    const updatedPost = { ...posts[index], ...post }
    posts[index] = updatedPost

    localStorage.setItem("blogPosts", JSON.stringify(posts))

    return updatedPost
  } catch (error) {
    console.error("Error updating blog post:", error)
    throw error
  }
}

export async function toggleBlogPostPinned(slug: string): Promise<BlogPost | null> {
  initializeLocalStorage()

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    const index = posts.findIndex((p) => p.slug === slug)
    if (index === -1) return null

    const updatedPost = {
      ...posts[index],
      pinned: !posts[index].pinned,
    }
    posts[index] = updatedPost

    localStorage.setItem("blogPosts", JSON.stringify(posts))

    return updatedPost
  } catch (error) {
    console.error("Error toggling blog post pinned status:", error)
    throw error
  }
}

export async function likeBlogPost(
  slug: string,
): Promise<{ success: boolean; post: BlogPost | null; message?: string }> {
  initializeLocalStorage()

  try {
    const userId = getUserId()
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    const index = posts.findIndex((p) => p.slug === slug)
    if (index === -1) return { success: false, post: null, message: "Post not found" }

    // Check if user already liked this post
    const likedBy = posts[index].likedBy || []
    if (likedBy.includes(userId)) {
      return { success: false, post: posts[index], message: "You've already liked this post" }
    }

    // Get the current likes or default to 0
    const currentLikes = posts[index].likes || 0

    const updatedPost = {
      ...posts[index],
      likes: currentLikes + 1,
      likedBy: [...likedBy, userId],
    }
    posts[index] = updatedPost

    localStorage.setItem("blogPosts", JSON.stringify(posts))

    return { success: true, post: updatedPost }
  } catch (error) {
    console.error("Error liking blog post:", error)
    return { success: false, post: null, message: "An error occurred" }
  }
}

export async function hasUserLikedPost(slug: string): Promise<boolean> {
  if (typeof window === "undefined") return false

  try {
    const userId = getUserId()
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    const post = posts.find((p) => p.slug === slug)
    if (!post) return false

    const likedBy = post.likedBy || []
    return likedBy.includes(userId)
  } catch (error) {
    console.error("Error checking if user liked post:", error)
    return false
  }
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  initializeLocalStorage()

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    const updatedPosts = posts.filter((p) => p.slug !== slug)
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))

    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return false
  }
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  initializeLocalStorage()

  if (typeof window === "undefined") return []

  try {
    const storedPosts = localStorage.getItem("blogPosts")
    const posts: BlogPost[] = storedPosts ? JSON.parse(storedPosts) : []

    if (!query) return posts

    const lowerQuery = query.toLowerCase()

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        post.description.toLowerCase().includes(lowerQuery),
    )
  } catch (error) {
    console.error("Error searching blog posts:", error)
    return []
  }
}

// Project functions
export async function getAllProjects(): Promise<Project[]> {
  initializeLocalStorage()

  if (typeof window === "undefined") return []

  try {
    const storedProjects = localStorage.getItem("projects")
    return storedProjects ? JSON.parse(storedProjects) : []
  } catch (error) {
    console.error("Error getting projects:", error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  initializeLocalStorage()

  if (typeof window === "undefined") return []

  try {
    const storedProjects = localStorage.getItem("projects")
    const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : []
    return projects.filter((project) => project.featured)
  } catch (error) {
    console.error("Error getting featured projects:", error)
    return []
  }
}

export async function createProject(project: Omit<Project, "id">): Promise<Project> {
  initializeLocalStorage()

  try {
    const storedProjects = localStorage.getItem("projects")
    const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : []

    // Generate a simple ID
    const id = Date.now().toString()
    const newProject = { ...project, id }

    const updatedProjects = [...projects, newProject]
    localStorage.setItem("projects", JSON.stringify(updatedProjects))

    return newProject
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

export async function updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
  initializeLocalStorage()

  try {
    const storedProjects = localStorage.getItem("projects")
    const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : []

    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return null

    const updatedProject = { ...projects[index], ...project }
    projects[index] = updatedProject

    localStorage.setItem("projects", JSON.stringify(projects))

    return updatedProject
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

export async function toggleProjectFeatured(id: string): Promise<Project | null> {
  initializeLocalStorage()

  try {
    const storedProjects = localStorage.getItem("projects")
    const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : []

    const index = projects.findIndex((p) => p.id === id)
    if (index === -1) return null

    const updatedProject = {
      ...projects[index],
      featured: !projects[index].featured,
    }
    projects[index] = updatedProject

    localStorage.setItem("projects", JSON.stringify(projects))

    return updatedProject
  } catch (error) {
    console.error("Error toggling project featured status:", error)
    throw error
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  initializeLocalStorage()

  try {
    const storedProjects = localStorage.getItem("projects")
    const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : []

    const updatedProjects = projects.filter((p) => p.id !== id)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))

    return true
  } catch (error) {
    console.error("Error deleting project:", error)
    return false
  }
}

// Export all data as JSON
export async function exportAllData(): Promise<string> {
  if (typeof window === "undefined") return "{}"

  try {
    const blogPosts = localStorage.getItem("blogPosts") || "[]"
    const projects = localStorage.getItem("projects") || "[]"

    const exportData = {
      blogPosts: JSON.parse(blogPosts),
      projects: JSON.parse(projects),
      exportDate: new Date().toISOString(),
    }

    return JSON.stringify(exportData, null, 2)
  } catch (error) {
    console.error("Error exporting data:", error)
    throw error
  }
}

// Import data from JSON
export async function importAllData(jsonData: string): Promise<{ success: boolean; message: string }> {
  if (typeof window === "undefined") return { success: false, message: "Cannot import data on the server" }

  try {
    const data = JSON.parse(jsonData)

    // Validate the data structure
    if (!data.blogPosts || !data.projects) {
      return {
        success: false,
        message: "Invalid data format. The file must contain blogPosts and projects arrays.",
      }
    }

    // Store the data
    localStorage.setItem("blogPosts", JSON.stringify(data.blogPosts))
    localStorage.setItem("projects", JSON.stringify(data.projects))

    return {
      success: true,
      message: `Successfully imported ${data.blogPosts.length} blog posts and ${data.projects.length} projects.`,
    }
  } catch (error) {
    console.error("Error importing data:", error)
    return {
      success: false,
      message: "Failed to import data. The file may be corrupted or in the wrong format.",
    }
  }
}

// Clear all data
export async function clearAllData(): Promise<boolean> {
  if (typeof window === "undefined") return false

  try {
    localStorage.removeItem("blogPosts")
    localStorage.removeItem("projects")
    // Initialize with empty arrays
    localStorage.setItem("blogPosts", "[]")
    localStorage.setItem("projects", "[]")
    return true
  } catch (error) {
    console.error("Error clearing data:", error)
    return false
  }
}
