import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Analytics } from "@/components/analytics"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/context/auth-context"
import { MaintenanceProvider } from "@/context/maintenance-context"
import { PasswordProvider } from "@/context/password-context"
import { MaintenanceBanner } from "@/components/maintenance-banner"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Miixu | Self-taught Developer",
  description: "Portfolio website of Miixu, a self-taught developer",
    generator: 'v0.dev'
}

// Simple static navigation for fallback
function NavigationFallback() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex-1 flex items-center">
          <a href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden">
              <img src="/logo.png" alt="Miixu Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-bold">Miixu</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium">
            Home
          </a>
          <a href="/projects" className="text-sm font-medium">
            Projects
          </a>
          <a href="/blogs" className="text-sm font-medium">
            Blogs
          </a>
        </nav>
      </div>
    </header>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <MaintenanceProvider>
              <PasswordProvider>
                <div className="min-h-screen flex flex-col bg-background transition-all duration-700">
                  <Suspense fallback={<NavigationFallback />}>
                    <MaintenanceBanner />
                    <Navigation />
                  </Suspense>
                  <main className="container mx-auto px-4 py-8 flex flex-col items-center transition-all duration-700 flex-grow">
                    <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                  </main>
                  <Suspense fallback={<div className="py-8 border-t">© {new Date().getFullYear()} Miixu</div>}>
                    <Footer />
                  </Suspense>
                  <Analytics />
                </div>
              </PasswordProvider>
            </MaintenanceProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
