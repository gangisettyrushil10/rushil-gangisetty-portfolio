'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/organisms/navbar'
import { Footer } from '@/components/organisms/footer'

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Project Not Found
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Sorry, the project you're looking for doesn't exist or may have been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Projects
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  Go Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
