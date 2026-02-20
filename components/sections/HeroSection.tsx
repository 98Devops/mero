"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { fadeInUpVariant, staggerContainerVariant, floatVariant } from "@/styles/animations";

export default function HeroSection() {
  // Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth) - 0.5;
      const yPos = (clientY / innerHeight) - 0.5;
      
      mouseX.set(xPos);
      mouseY.set(yPos);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.png"
          alt="Mero Tech Hero Background"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-primary/90" />
        
        {/* Animated gradient mesh overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 245, 255, 0.4) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: [
              "0% 0%",
              "100% 100%",
              "0% 100%",
              "100% 0%",
              "0% 0%",
            ],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 text-center"
        style={{ x, y }}
      >
        <motion.div
          variants={staggerContainerVariant}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 max-w-5xl mx-auto"
        >
          {/* Floating badge */}
          <motion.div
            variants={floatVariant}
            animate="animate"
            className="inline-block"
          >
            <div className="px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 backdrop-blur-sm">
              <span className="text-accent-primary text-sm font-semibold">
                ✨ Transforming Businesses with AI
              </span>
            </div>
          </motion.div>

          {/* Headline with typewriter effect */}
          <motion.h1
            variants={fadeInUpVariant}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl"
          >
            <span className="inline-block bg-gradient-to-r from-white via-accent-primary to-accent-secondary bg-clip-text text-transparent animate-gradient">
              Building Intelligent Systems
            </span>
            <br />
            <span className="text-white">for Modern Businesses</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUpVariant}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            AI Automation. Internal Tools. Scalable Infrastructure.
          </motion.p>

          {/* CTA Buttons with enhanced animations */}
          <motion.div
            variants={fadeInUpVariant}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="primary" className="relative overflow-hidden group shadow-2xl">
                  <span className="relative z-10">Book a Consultation</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-primary/0 via-white/20 to-accent-primary/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </Link>
            <Link href="/portfolio">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button variant="secondary" className="shadow-2xl">View Our Work</Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeInUpVariant}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-2 text-white/70"
            >
              <span className="text-sm drop-shadow">Scroll to explore</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Add gradient animation to global styles */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
