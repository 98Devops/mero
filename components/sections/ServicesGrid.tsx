"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "@/lib/constants";
import { staggerFastVariant, scaleInVariant } from "@/styles/animations";

export default function ServicesGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      variants={staggerFastVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          variants={scaleInVariant}
          custom={index}
        >
          <ServiceCard
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
