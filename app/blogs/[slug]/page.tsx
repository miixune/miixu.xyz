"use client"

import { useState, useEffect } from "react"
import { PageTransition } from "@/components/page-transition"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Heart, Pin } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { getBlogPostBySlug, likeBlogPost, hasUserLikedPost, type BlogPost } from "@/lib/data-service"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"
import { MaintenanceOverlay } from "@/components/maintenance-overlay"

export default function BlogPost() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [likeError, setLikeError] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getBlogPostBySlug(slug)
        if (fetchedPost) {
          setPost(fetchedPost)
          setLikeCount(fetchedPost.likes || 0)

          // Check if user has already liked this post
          const hasLiked = await hasUserLikedPost(slug)
          setIsLiked(hasLiked)
        } else {
          router.push("/404")
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug, router])

  const handleLike = async () => {
    if (!isLiked && post) {
      const result = await likeBlogPost(post.slug)
      if (result.success && result.post) {
        setLikeCount(result.post.likes || 0)
        setIsLiked(true)
        setLikeError("")
      } else if (result.message) {
        setLikeError(result.message)
        // Show error briefly then hide it
        setTimeout(() => setLikeError(""), 2000)
      }
    }
  }

  if (isLoading) {
    return (
      <PageTransition>
        <div className="py-12 text-center">
          <p>Loading post...</p>
        </div>
      </PageTransition>
    )
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <GradientButton asChild>
            <Link href="/blogs">Back to Blogs</Link>
          </GradientButton>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <MaintenanceOverlay />
      <article className="py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer relative" onClick={handleLike}>
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  <span>{likeCount}</span>
                  {likeError && (
                    <div className="absolute -bottom-8 right-0 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs p-1 rounded whitespace-nowrap">
                      {likeError}
                    </div>
                  )}
                </div>
                {post.pinned && (
                  <div className="flex items-center gap-1 text-purple-500">
                    <Pin className="h-4 w-4" />
                    <span>Pinned</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-1">
                <span className="gradient-text">{post.title}</span>
              </h1>
              <div className="flex flex-wrap gap-2 justify-center">
                {post.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl mb-8">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover" />
            </div>
            <div className="mt-8 prose prose-gray dark:prose-invert max-w-none">
              {post.content.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <GradientButton asChild>
                <Link href="/blogs">Back to Blogs</Link>
              </GradientButton>
            </div>
          </div>
        </div>
      </article>
    </PageTransition>
  )
}
