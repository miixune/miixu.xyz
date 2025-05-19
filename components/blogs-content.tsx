"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { getAllBlogPosts, searchBlogPosts, type BlogPost } from "@/lib/data-service"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search, SortAsc, SortDesc, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

type SortOption = "newest" | "oldest" | "hot"

export default function BlogsContent() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("newest")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts()
        setBlogPosts(posts)
        setFilteredPosts(sortPosts(posts, sortOption))
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [sortOption])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const results = await searchBlogPosts(searchQuery)
      setFilteredPosts(sortPosts(results, sortOption))
    } catch (error) {
      console.error("Error searching:", error)
    }
  }

  const sortPosts = (posts: BlogPost[], option: SortOption): BlogPost[] => {
    // First separate pinned posts
    const pinnedPosts = posts.filter((post) => post.pinned)
    const unpinnedPosts = posts.filter((post) => !post.pinned)

    // Sort unpinned posts
    let sortedUnpinned: BlogPost[]

    switch (option) {
      case "newest":
        sortedUnpinned = [...unpinnedPosts].sort((a, b) => {
          const dateA = a.createdAt || new Date(a.date).getTime()
          const dateB = b.createdAt || new Date(b.date).getTime()
          return dateB - dateA
        })
        break
      case "oldest":
        sortedUnpinned = [...unpinnedPosts].sort((a, b) => {
          const dateA = a.createdAt || new Date(a.date).getTime()
          const dateB = b.createdAt || new Date(b.date).getTime()
          return dateA - dateB
        })
        break
      case "hot":
        sortedUnpinned = [...unpinnedPosts].sort((a, b) => {
          const likesA = a.likes || 0
          const likesB = b.likes || 0
          return likesB - likesA
        })
        break
      default:
        sortedUnpinned = unpinnedPosts
    }

    // Combine pinned and unpinned posts
    return [...pinnedPosts, ...sortedUnpinned]
  }

  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
    setFilteredPosts(sortPosts(filteredPosts, option))
  }

  return (
    <>
      <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <form onSubmit={handleSearch} className="w-full md:w-auto flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title or tag..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Sort Options */}
        <div className="flex gap-2">
          <Button
            variant={sortOption === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("newest")}
            className="flex items-center gap-1"
          >
            <SortDesc className="h-4 w-4" />
            Newest
          </Button>
          <Button
            variant={sortOption === "oldest" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("oldest")}
            className="flex items-center gap-1"
          >
            <SortAsc className="h-4 w-4" />
            Oldest
          </Button>
          <Button
            variant={sortOption === "hot" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange("hot")}
            className="flex items-center gap-1"
          >
            <Flame className="h-4 w-4" />
            Hot
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-16 text-center">
          <p>Loading blog posts...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} {...post} likes={post.likes} pinned={post.pinned} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <h2 className="text-xl font-medium mb-4">No blog posts found</h2>
          <p className="text-muted-foreground mb-8">
            {searchQuery ? "Try a different search term" : "Check back later for new content!"}
          </p>
          <GradientButton asChild>
            <Link href="/">Return Home</Link>
          </GradientButton>
        </div>
      )}
    </>
  )
}
