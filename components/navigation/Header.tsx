"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic import for code splitting
const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Blur effect on scroll
  const headerOpacity = useTransform(scrollY, [0, 100], [0.05, 0.15]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-xl border-white/20 shadow-lg"
          : "bg-white/5 backdrop-blur-lg border-white/10"
      }`}
      style={{
        backgroundColor: useTransform(
          headerOpacity,
          (value) => `rgba(255, 255, 255, ${value})`
        ),
      }}
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with animation */}
          <Link href="/" className="relative group">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-white to-accent-primary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Mero Tech
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-accent-primary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation with magnetic effect */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <motion.li
                  key={link.href}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors duration-300 ${
                      active
                        ? "text-accent-primary"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {!active && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/50 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Mobile Menu */}
          <MobileMenu navLinks={navLinks} currentPath={pathname} />
        </div>
      </nav>
    </motion.header>
  );
}
