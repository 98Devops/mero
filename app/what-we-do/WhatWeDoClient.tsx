"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { fadeInVariant, staggerContainerVariant, gradientVariant } from "@/styles/animations";

export default function WhatWeDoClient() {
  return (
    <main className="min-h-screen">
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
              What We Do
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Building intelligent systems that transform how businesses operate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto space-y-8 md:space-y-12"
          >
            <motion.div variants={fadeInVariant} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                We partner with forward-thinking businesses to build intelligent systems that drive growth and efficiency. 
                From AI-powered automation that eliminates repetitive tasks to scalable cloud infrastructure that grows with your business, 
                we deliver technical solutions that solve real problems. Our approach combines deep technical expertise with practical 
                business understanding, ensuring every system we build creates measurable value for your organization.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 md:py-32 bg-background-secondary/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-16"
          >
            <motion.div variants={fadeInVariant} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Approach
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                We believe in building systems that work for your business, not against it
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8 h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Problem-First Thinking</h3>
                    <p className="text-text-secondary">
                      We start by understanding your business challenges, not the technology. 
                      Every solution is designed to solve a specific problem and deliver measurable results.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8 h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Rapid Iteration</h3>
                    <p className="text-text-secondary">
                      We build, test, and refine quickly. Our agile approach means you see progress early 
                      and often, with continuous feedback loops to ensure we're on the right track.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8 h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Built to Scale</h3>
                    <p className="text-text-secondary">
                      Every system we build is designed to grow with your business. 
                      From day one, we architect solutions that can handle increased load and complexity.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto space-y-8 md:space-y-12"
          >
            <motion.div variants={fadeInVariant} className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                About Mero Tech
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div variants={fadeInVariant} className="space-y-6">
                <p className="text-lg text-text-secondary leading-relaxed">
                  Based in Mt Pleasant, Harare, Mero Tech is a technology company focused on delivering 
                  practical AI and automation solutions for modern businesses. We specialize in building 
                  systems that actually work in the real world, not just in demos.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Our team combines years of experience in software development, AI implementation, 
                  and cloud infrastructure. We've helped businesses across various industries streamline 
                  operations, reduce costs, and unlock new growth opportunities through intelligent technology.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  What sets us apart is our commitment to building solutions that integrate seamlessly 
                  with your existing workflows. We don't believe in technology for technology's sake – 
                  every system we build has a clear purpose and measurable impact on your business.
                </p>
              </motion.div>

              <motion.div variants={fadeInVariant}>
                <GlassCard className="p-6 md:p-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">Why Choose Mero Tech?</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text-secondary">Deep technical expertise across AI, web development, and cloud infrastructure</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text-secondary">Proven track record of delivering systems that scale and perform</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text-secondary">Business-first approach that prioritizes ROI and practical outcomes</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text-secondary">Local presence with global standards and best practices</span>
                      </li>
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services CTA Section */}
      <section className="py-20 md:py-32 bg-background-secondary/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-6 md:space-y-8"
          >
            <motion.h2
              variants={fadeInVariant}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              Ready to See What We Can Build Together?
            </motion.h2>
            <motion.p
              variants={fadeInVariant}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Explore our comprehensive range of services and discover how we can help transform your business operations.
            </motion.p>
            <motion.div variants={fadeInVariant} className="pt-4">
              <Link href="/services">
                <Button variant="primary" className="text-lg px-8 py-4">
                  View Our Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
