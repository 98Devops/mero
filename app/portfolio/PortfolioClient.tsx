"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import PortfolioItem from "@/components/sections/PortfolioItem";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { projects } from "@/lib/constants";
import { fadeInVariant, staggerContainerVariant, gradientVariant } from "@/styles/animations";

type ProjectCategory = "all" | "ai-automation" | "web-app" | "internal-tool" | "infrastructure" | "integration";

const categoryLabels: Record<ProjectCategory, string> = {
  all: "All Projects",
  "ai-automation": "AI Automation",
  "web-app": "Web Applications",
  "internal-tool": "Internal Tools",
  infrastructure: "Infrastructure",
  integration: "Integrations",
};

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const categories: ProjectCategory[] = ["all", "ai-automation", "web-app", "internal-tool", "infrastructure", "integration"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-accent-secondary/10">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20 md:py-32">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-accent-secondary/20"
          style={{
            backgroundSize: "200% 200%",
          }}
          variants={gradientVariant}
          animate="animate"
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
              Explore our successful projects and see how we've helped businesses transform through intelligent technology solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/25"
                    : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            key={selectedCategory} // Re-animate when category changes
          >
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={fadeInVariant}>
                    <PortfolioItem project={project} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div variants={fadeInVariant} className="text-center py-16">
                <GlassCard className="p-8 md:p-12 max-w-md mx-auto">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-accent-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2v1.306z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">No Projects Found</h3>
                    <p className="text-text-secondary">
                      No projects match the selected category. Try selecting a different category.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Project Stats Section */}
      <section className="py-16 md:py-24 bg-background-secondary/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-12 md:space-y-16"
          >
            <motion.div variants={fadeInVariant}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Impact
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Every project we deliver creates measurable value for our clients
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8 text-center">
                  <div className="space-y-4">
                    <div className="text-4xl md:text-5xl font-bold text-accent-primary">
                      {projects.length}+
                    </div>
                    <div className="text-white font-semibold">Projects Completed</div>
                    <div className="text-text-secondary text-sm">
                      Across multiple industries and technologies
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8 text-center">
                  <div className="space-y-4">
                    <div className="text-4xl md:text-5xl font-bold text-accent-primary">
                      {categories.length - 1}
                    </div>
                    <div className="text-white font-semibold">Service Categories</div>
                    <div className="text-text-secondary text-sm">
                      From AI automation to cloud infrastructure
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8 text-center">
                  <div className="space-y-4">
                    <div className="text-4xl md:text-5xl font-bold text-accent-primary">
                      {projects.filter(p => p.featured).length}
                    </div>
                    <div className="text-white font-semibold">Featured Projects</div>
                    <div className="text-text-secondary text-sm">
                      Showcasing our best work and innovation
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <GlassCard className="p-8 md:p-12 text-center">
              <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg md:text-xl text-text-secondary">
                  Let's discuss how we can help you build intelligent systems that transform your business. 
                  Every great project starts with a conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/contact">
                    <Button variant="primary">Start Your Project</Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="secondary">View Our Services</Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
