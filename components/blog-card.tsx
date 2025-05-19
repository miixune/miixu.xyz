"use client"

import type React from "react"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarIcon, Heart, Pin } from "lucide-react"
import { likeBlogPost, hasUserLikedPost } from "@/lib/data-service"
import { useState, useEffect } from "react"

export interface BlogPostProps {
  slug: string
  title: string
  description: string
  date: string
  image: string
  tags?: string[]
  likes?: number
  pinned?: boolean
}

export function BlogCard({ slug, title, description, date, image, tags, likes = 0, pinned = false }: BlogPostProps) {
  const [likeCount, setLikeCount] = useState(likes)
  const [isLiked, setIsLiked] = useState(false)
  const [likeError, setLikeError] = useState("")

  useEffect(() => {
    // Check if the user has already liked this post
    const checkLikeStatus = async () => {
      const hasLiked = await hasUserLikedPost(slug)
      setIsLiked(hasLiked)
    }

    checkLikeStatus()
  }, [slug])

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLiked) {
      const result = await likeBlogPost(slug)
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

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="group">
      <Link href={`/blogs/${slug}`}>
        <Card
          className={`h-full overflow-hidden transition-all duration-300 group-hover:shadow-md ${pinned ? "border-purple-500" : ""}`}
        >
          {pinned && (
            <div className="absolute top-2 right-2 z-10 bg-purple-500 text-white p-1 rounded-full">
              <Pin className="h-4 w-4" />
            </div>
          )}
          <div className="aspect-video overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{date}</span>
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
            </div>
            <CardTitle className="line-clamp-2 group-hover:gradient-text transition-all duration-300 mt-2">
              {title}
            </CardTitle>
            <CardDescription className="line-clamp-3 mt-2">{description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
