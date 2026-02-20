"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";
import { useState } from "react";
import { Project } from "@/lib/constants";
import { imageZoomVariant } from "@/styles/animations";

interface PortfolioItemProps {
  project: Project;
  onClick?: () => void;
}

export default function PortfolioItem({
  project,
  onClick,
}: PortfolioItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (project.projectUrl) {
      window.location.href = project.projectUrl;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <GlassCard
        hoverEffect
        className="overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <motion.div
          className="relative aspect-video w-full overflow-hidden"
          variants={imageZoomVariant}
          initial="rest"
          whileHover="hover"
        >
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzFhMWEyZSIvPjwvc3ZnPg=="
          />
          {/* Overlay with enhanced animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center"
            >
              <span className="text-white text-xl font-semibold mb-2 block">
                View Project
              </span>
              <motion.div
                className="w-12 h-0.5 bg-accent-primary mx-auto"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? 48 : 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <motion.h3
              className="text-xl font-semibold text-white"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {project.name}
            </motion.h3>
            <span className="text-sm text-text-secondary capitalize">
              {project.category.replace("-", " ")}
            </span>
          </div>
          <p className="text-text-secondary text-sm">{project.description}</p>
          
          {/* Tech stack with stagger animation */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {project.techStack.map((tech) => (
              <motion.span
                key={tech}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full text-white hover:bg-accent-primary/20 hover:border-accent-primary/40 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
