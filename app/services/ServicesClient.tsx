"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { services } from "@/lib/constants";
import { fadeInVariant, staggerContainerVariant } from "@/styles/animations";

export default function ServicesClient() {
  // Group services by category for detailed descriptions
  const servicesByCategory = {
    "ai-automation": services.filter(s => s.category === "ai-automation"),
    "development": services.filter(s => s.category === "development"),
    "infrastructure": services.filter(s => s.category === "infrastructure"),
    "consulting": services.filter(s => s.category === "consulting"),
  };

  const categoryDescriptions = {
    "ai-automation": {
      title: "AI Automation & Intelligence",
      description: "Transform your business operations with cutting-edge AI solutions. We build intelligent systems that automate complex workflows, understand natural language, and make data-driven decisions to streamline your processes and boost productivity."
    },
    "development": {
      title: "Custom Development Solutions",
      description: "From internal business tools to customer-facing web applications, we create tailored software solutions that solve your unique challenges. Our development expertise spans modern web technologies, API integrations, and scalable architectures."
    },
    "infrastructure": {
      title: "Cloud Infrastructure & DevOps",
      description: "Build reliable, scalable, and secure cloud infrastructure that grows with your business. We specialize in cloud migrations, DevOps automation, and infrastructure optimization to ensure your systems are robust and cost-effective."
    },
    "consulting": {
      title: "Strategic AI Consulting",
      description: "Navigate the AI landscape with expert guidance. We help you identify opportunities, develop AI strategies, and implement solutions that deliver measurable business value while ensuring responsible AI adoption."
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-accent-secondary/10">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            className="text-center space-y-6 md:space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive technology solutions to accelerate your business growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What We Do
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              We specialize in nine core service areas, each designed to address specific business challenges with modern technology solutions.
            </p>
          </motion.div>
          
          <ServicesGrid />
        </div>
      </section>

      {/* Detailed Service Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-16"
          >
            {Object.entries(categoryDescriptions).map(([category, info]) => (
              <motion.div key={category} variants={fadeInVariant}>
                <GlassCard className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {info.title}
                      </h3>
                      <p className="text-lg text-text-secondary leading-relaxed">
                        {info.description}
                      </p>
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-white">
                          Services in this category:
                        </h4>
                        <ul className="space-y-2">
                          {servicesByCategory[category as keyof typeof servicesByCategory].map((service) => (
                            <li key={service.id} className="flex items-center text-text-secondary">
                              <div className="w-2 h-2 bg-accent-primary rounded-full mr-3 flex-shrink-0" />
                              <span>{service.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:pl-8">
                      <div className="bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-xl p-8 border border-white/10">
                        <div className="text-center space-y-4">
                          <div className="text-4xl md:text-5xl font-bold text-accent-primary">
                            {servicesByCategory[category as keyof typeof servicesByCategory].length}
                          </div>
                          <div className="text-white font-semibold">
                            Specialized Services
                          </div>
                          <div className="text-text-secondary text-sm">
                            Tailored solutions for your needs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
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
                  Ready to Transform Your Business?
                </h2>
                <p className="text-lg md:text-xl text-text-secondary">
                  Let's discuss how our services can help you achieve your goals. 
                  Book a consultation to explore the possibilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/contact">
                    <Button variant="primary">Book a Consultation</Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button variant="secondary">View Our Work</Button>
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
