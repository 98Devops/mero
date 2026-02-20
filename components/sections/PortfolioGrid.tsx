"use client";

import { motion } from "framer-motion";
import PortfolioItem from "./PortfolioItem";
import { projects } from "@/lib/constants";
import { staggerFastVariant } from "@/styles/animations";

interface PortfolioGridProps {
  showFeaturedOnly?: boolean;
  className?: string;
}

export default function PortfolioGrid({
  showFeaturedOnly = false,
  className = "",
}: PortfolioGridProps) {
  const portfolioData = showFeaturedOnly
    ? projects.filter((project) => project.featured)
    : projects;

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${className}`}
      variants={staggerFastVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {portfolioData.map((project) => (
        <PortfolioItem key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
