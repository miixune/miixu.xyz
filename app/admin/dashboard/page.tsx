export const dynamic = "force-dynamic"

export default function AdminDashboardPage() {
  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl pb-1">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">Overview of your portfolio content</p>
        </div>

        <div className="mt-8">
          <div id="admin-dashboard-content">
            {/* Client content will be rendered here */}
            <div className="text-center py-8">Loading dashboard...</div>
          </div>
        </div>
      </div>
    </div>
  )
}
