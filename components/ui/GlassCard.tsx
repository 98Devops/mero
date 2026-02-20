"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hoverEffect = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: GlassCardProps) {
  const baseStyles =
    "bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl";

  if (hoverEffect) {
    return (
      <motion.div
        className={`${baseStyles} ${className}`}
        initial="rest"
        whileHover="hover"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        variants={{
          rest: {
            y: 0,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          },
          hover: {
            y: -8,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 245, 255, 0.1)",
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
}
