import { PageTransition } from "@/components/page-transition"
import Link from "next/link"
import { GradientButton } from "@/components/ui/gradient-button"
import { getFeaturedProjects, getAllBlogPosts } from "@/lib/data-service"
import { ProjectCard } from "@/components/project-card"
import { BlogCard } from "@/components/blog-card"
import { MaintenanceOverlay } from "@/components/maintenance-overlay"

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  const allBlogPosts = await getAllBlogPosts()

  // Sort blog posts by date (newest first) and take the 3 most recent
  const recentBlogPosts = [...allBlogPosts]
    .sort((a, b) => {
      const dateA = a.createdAt || new Date(a.date).getTime()
      const dateB = b.createdAt || new Date(b.date).getTime()
      return dateB - dateA
    })
    .slice(0, 3)

  return (
    <PageTransition>
      <MaintenanceOverlay />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 w-full max-w-6xl overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl pb-1">
              <span className="gradient-text font-extrabold">Miixu</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A self-taught developer passionate about creating clean, functional, and beautiful web experiences.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <GradientButton asChild size="lg">
                <Link href="/projects">View My Projects</Link>
              </GradientButton>
              <GradientButton variant="outline" asChild size="lg">
                <Link href="/blogs">Read My Blog</Link>
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section with Gradient Text */}
      <section className="py-8 md:py-12 w-full max-w-6xl">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl pb-1 gradient-text">About Me</h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed mt-4">
              I'm a self-taught developer with a passion for creating clean, functional, and beautiful web experiences.
              I love learning new technologies and pushing the boundaries of what's possible on the web.
            </p>
          </div>
        </div>
      </section>

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
