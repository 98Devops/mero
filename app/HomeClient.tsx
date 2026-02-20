"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import Button from "@/components/ui/Button";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import { fadeInVariant, staggerContainerVariant } from "@/styles/animations";

export default function HomeClient() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* What We Do Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            <motion.h2
              variants={fadeInVariant}
              className="text-4xl md:text-5xl font-bold text-white"
            >
              What We Do
            </motion.h2>
            <motion.p
              variants={fadeInVariant}
              className="text-lg md:text-xl text-text-secondary leading-relaxed"
            >
              We partner with forward-thinking businesses to build intelligent systems that drive growth and efficiency. 
              From AI-powered automation that eliminates repetitive tasks to scalable cloud infrastructure that grows with your business, 
              we deliver technical solutions that solve real problems. Our approach combines deep technical expertise with practical 
              business understanding, ensuring every system we build creates measurable value for your organization.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Services
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Comprehensive technology solutions tailored to your business needs
              </p>
            </motion.div>
            <ServicesGrid />
          </motion.div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-16"
          >
            <motion.div variants={fadeInVariant} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Featured Work
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Recent projects that showcase our expertise and impact
              </p>
            </motion.div>
            <motion.div variants={fadeInVariant}>
              <PortfolioGrid showFeaturedOnly={true} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
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
              className="text-4xl md:text-5xl font-bold text-white"
            >
              Ready to Build Something Great?
            </motion.h2>
            <motion.p
              variants={fadeInVariant}
              className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto"
            >
              Let's discuss how we can help transform your business with intelligent technology solutions.
            </motion.p>
            <motion.div variants={fadeInVariant} className="pt-4">
              <Link href="/contact">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Get In Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
