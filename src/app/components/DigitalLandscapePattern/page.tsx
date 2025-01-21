"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const DigitalLandscapePattern: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })

  useEffect(() => {
    setIsClient(true)
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const generateMountains = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      points: `0,${dimensions.height} ${Math.random() * dimensions.width},${(Math.random() * dimensions.height) / 2 + dimensions.height / 2} ${dimensions.width},${dimensions.height}`,
      color: `hsl(${200 + Math.random() * 60}, 70%, ${20 + i * 5}%)`,
    }))
  }

  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: (Math.random() * dimensions.height) / 2,
      radius: Math.random() * 2 + 1,
    }))
  }

  const mountains = isClient ? generateMountains(5) : []
  const stars = isClient ? generateStars(100) : []

  if (!isClient) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl">
          Cargando Paisaje Digital...
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        {/* Stars */}
        {stars.map((star) => (
          <motion.circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.radius}
            fill="#fff"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}

        {/* Mountains */}
        {mountains.map((mountain, index) => (
          <motion.polygon
            key={mountain.id}
            points={mountain.points}
            fill={mountain.color}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}

        {/* Sun */}
        <motion.circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 4}
          r={50}
          fill="url(#sunGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FDB813" />
            <stop offset="100%" stopColor="#FF7F50" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full mix-blend-screen"
          style={{
            left: Math.random() * dimensions.width,
            top: Math.random() * dimensions.height,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default DigitalLandscapePattern

