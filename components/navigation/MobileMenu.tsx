"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  currentPath: string;
}

export default function MobileMenu({ navLinks, currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-0.5 bg-white block"
        />
      </button>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-background-secondary/95 backdrop-blur-lg border-l border-white/10 z-40 md:hidden"
            >
              <nav className="flex flex-col pt-20 px-6">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors duration-300 ${
                            active
                              ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/20"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
