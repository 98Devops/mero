"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedIcon from "@/components/ui/AnimatedIcon";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative"
    >
      <GlassCard hoverEffect className="p-6 md:p-8 relative overflow-hidden">
        {/* Shimmer effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.3), transparent)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <motion.div
            animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <AnimatedIcon icon={icon} />
          </motion.div>
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            {title}
          </h3>
          <p className="text-text-secondary">{description}</p>
        </div>

        {/* Glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0, 245, 255, 0.1), transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </GlassCard>
    </motion.div>
  );
}
