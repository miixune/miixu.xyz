"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMaintenance } from "@/context/maintenance-context"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blogs" },
]

export function Navigation() {
  // Don't use usePathname() directly - we'll handle this with client-side JS
  const [pathname, setPathname] = useState("/")
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { maintenanceMode } = useMaintenance()

  useEffect(() => {
    setMounted(true)
    // Set the pathname based on window.location
    setPathname(window.location.pathname)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isAdminPage = pathname.startsWith("/admin")
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const logoSrc = theme === "dark" ? "/logo.png" : "/logo-light.png"

  return (
    <header
      className={cn(
        "sticky z-50 w-full border-b backdrop-blur-sm transition-all duration-700",
        scrolled ? "bg-background/80 border-border" : "bg-transparent border-transparent",
        // Adjust top position if maintenance banner is showing
        maintenanceMode && !isAdminPage ? "top-12" : "top-0",
      )}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="relative h-10 w-10 overflow-hidden transition-transform duration-300 hover:scale-110">
              {mounted && (
                <img src={logoSrc || "/placeholder.svg"} alt="Miixu Logo" className="h-full w-full object-contain" />
              )}
            </div>
            <span className="text-xl font-bold">Miixu</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-foreground/80 px-2 py-1 rounded-md",
                pathname === item.path ? "text-foreground" : "text-foreground/60",
              )}
            >
              {item.name}
              {pathname === item.path && (
                <motion.span
                  className="absolute inset-0 bg-foreground/5 rounded-md -z-10"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-4 rounded-full p-2 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground relative overflow-hidden group"
            aria-label={mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mounted && theme === "dark" ? "dark" : "light"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {mounted && theme === "dark" ? (
                  <Moon className="h-5 w-5 relative z-10" />
                ) : (
                  <Sun className="h-5 w-5 relative z-10" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            aria-label={mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {mounted && theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            onClick={toggleMenu}
            className="rounded-full p-2 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-4 px-4 pb-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMenu}
                  className={cn(
                    "py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.path ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
