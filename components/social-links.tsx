"use client"

import { Github, Instagram, Twitter } from "lucide-react"
import { motion } from "framer-motion"

const socialLinks = [
  {
    name: "X (Twitter)",
    url: "https://x.com/miixunes",
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@miixune",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M15 8v8a4 4 0 0 1-4 4" />
        <line x1="15" x2="15" y1="4" y2="12" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/kilii.aut",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    name: "GitHub",
    url: "https://github.com/miixune",
    icon: <Github className="h-5 w-5" />,
  },
]

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 text-foreground/60 transition-all duration-300 hover:bg-muted hover:text-foreground hover:scale-110 relative"
          aria-label={link.name}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 hover:opacity-10 rounded-full transition-opacity duration-300"></div>
          {link.icon}
        </motion.a>
      ))}
    </div>
  )
}
