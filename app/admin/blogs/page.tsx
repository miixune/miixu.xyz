import { Suspense } from "react"
import { PageTransition } from "@/components/page-transition"
import { ProtectedRoute } from "@/components/protected-route"
import AdminBlogsClientContent from "./client-content"

export default function AdminBlogsPage() {
  return (
    <ProtectedRoute>
      <PageTransition>
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-1">
                Manage <span className="gradient-text">Blogs</span>
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Create, edit, and delete your blog posts.
              </p>
            </div>

            <div className="mt-12">
              <Suspense fallback={<div className="text-center">Loading blog management...</div>}>
                <AdminBlogsClientContent />
              </Suspense>
            </div>
          </div>
        </section>
      </PageTransition>
    </ProtectedRoute>
  )
}
