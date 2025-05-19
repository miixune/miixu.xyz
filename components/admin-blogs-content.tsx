"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  getAllBlogPosts,
  createBlogPost,
  deleteBlogPost,
  toggleBlogPostPinned,
  type BlogPost,
} from "@/lib/data-service"
import { PlusCircle, Trash2, Pin, Search } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { usePassword } from "@/context/password-context"
import { PasswordVerifyDialog } from "@/components/password-verify-dialog"

export default function AdminBlogsContent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    description: "",
    content: "",
    image: "/placeholder.svg?height=300&width=500", // Default image
    tags: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const { isPasswordSet } = usePassword()

  // Password verification
  const [passwordVerifyOpen, setPasswordVerifyOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts()
        setBlogPosts(posts)
        setFilteredPosts(posts)
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
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
    setNewPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim())
    setNewPost((prev) => ({ ...prev, tags }))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (!query) {
      setFilteredPosts(blogPosts)
      return
    }

    const filtered = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
    setFilteredPosts(filtered)
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.description || !newPost.content) {
      alert("Please fill in all required fields")
      return
    }

    executeWithPasswordCheck(async () => {
      try {
        const slug =
          newPost.title
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "") || ""
        const date = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        const post: BlogPost = {
          slug,
          title: newPost.title || "",
          description: newPost.description || "",
          content: newPost.content || "",
          date,
          image: newPost.image || "/placeholder.svg?height=300&width=500", // Use provided image or default
          tags: newPost.tags || [],
          likes: 0,
          pinned: false,
          createdAt: Date.now(),
          likedBy: [],
        }

        await createBlogPost(post)
        const updatedPosts = [...blogPosts, post]
        setBlogPosts(updatedPosts)
        setFilteredPosts(updatedPosts)
        setNewPost({
          title: "",
          description: "",
          content: "",
          image: "/placeholder.svg?height=300&width=500", // Reset to default
          tags: [],
        })
      } catch (error) {
        console.error("Failed to create blog post:", error)
      }
    })
  }

  const handleTogglePinned = async (slug: string) => {
    executeWithPasswordCheck(async () => {
      try {
        const updatedPost = await toggleBlogPostPinned(slug)
        if (updatedPost) {
          const updatedPosts = blogPosts.map((post) =>
            post.slug === slug ? { ...post, pinned: updatedPost.pinned } : post,
          )
          setBlogPosts(updatedPosts)
          setFilteredPosts(
            updatedPosts.filter(
              (post) =>
                !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            ),
          )
        }
      } catch (error) {
        console.error("Failed to toggle pinned status:", error)
      }
    })
  }

  const handleDeletePost = async (slug: string) => {
    executeWithPasswordCheck(async () => {
      try {
        const success = await deleteBlogPost(slug)
        if (success) {
          const updatedPosts = blogPosts.filter((post) => post.slug !== slug)
          setBlogPosts(updatedPosts)
          setFilteredPosts(
            updatedPosts.filter(
              (post) =>
                !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
            ),
          )
        }
      } catch (error) {
        console.error("Failed to delete blog post:", error)
      }
    })
  }

  return (
    <>
      <div className="mt-12 grid gap-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* New Blog Post Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Enter blog post title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newPost.description}
                onChange={handleInputChange}
                placeholder="Enter blog post description"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Enter blog post content"
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={newPost.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <Input
                id="tags"
                name="tags"
                value={newPost.tags?.join(", ")}
                onChange={handleTagsChange}
                placeholder="Web Development, Tutorial, React"
              />
            </div>
          </CardContent>
          <CardFooter>
            <GradientButton onClick={handleCreatePost} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Blog Post
            </GradientButton>
          </CardFooter>
        </Card>

        {/* User Created Blog Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.slug} className={post.pinned ? "border-purple-500" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{post.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTogglePinned(post.slug)}
                      className={post.pinned ? "text-purple-500" : ""}
                    >
                      <Pin className={`h-5 w-5 ${post.pinned ? "fill-current" : ""}`} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    {post.likes > 0 && <span className="ml-2">• {post.likes} likes</span>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <GradientButton size="sm" asChild showArrow={false}>
                    <a href={`/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      View Post
                    </a>
                  </GradientButton>
                  <GradientButton
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeletePost(post.slug)}
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
              {isLoading
                ? "Loading blog posts..."
                : searchQuery
                  ? "No blog posts match your search"
                  : "No blog posts yet"}
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
