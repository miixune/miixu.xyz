"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Star } from "lucide-react"
import { motion } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"

export interface ProjectProps {
  title: string
  description: string
  image: string
  githubUrl?: string
  liveUrl?: string
  tags?: string[]
  featured?: boolean
}

export function ProjectCard({ title, description, image, githubUrl, liveUrl, tags, featured }: ProjectProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="group">
      <Card
        className={`h-full overflow-hidden transition-all duration-300 group-hover:shadow-md ${featured ? "border-purple-500" : ""}`}
      >
        {featured && (
          <div className="absolute top-2 right-2 z-10 bg-purple-500 text-white p-1 rounded-full">
            <Star className="h-4 w-4" />
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
          <CardTitle className="group-hover:gradient-text transition-all duration-300">{title}</CardTitle>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-1 text-xs font-medium transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          {githubUrl && (
            <GradientButton variant="outline" size="sm" asChild showArrow={false}>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                Code
              </a>
            </GradientButton>
          )}
          {liveUrl && (
            <GradientButton size="sm" asChild showArrow={false}>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </GradientButton>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
