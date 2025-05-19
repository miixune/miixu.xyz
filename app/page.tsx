export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <div className="w-full">
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
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10"
              >
                View My Projects
              </a>
              <a
                href="/blogs"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10"
              >
                Read My Blog
              </a>
            </div>
          </div>
        </div>
      </section>

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

      <div id="home-content">
        {/* Client content will be rendered here */}
        <div className="text-center py-8">Loading content...</div>
      </div>
    </div>
  )
}
